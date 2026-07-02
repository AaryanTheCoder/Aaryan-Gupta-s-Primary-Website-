(() => {
  'use strict';

  const CAR_IMAGE = '/game-theory/assets/lamborghini.jpg';
  const GOAT_IMAGE = '/game-theory/assets/goat.jpg';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delayScale = reducedMotion ? 0 : 1;
  const completed = new Set();
  const chapters = ['monty', 'prisoner', 'newcomb', 'hundred'];
  let audioContext = null;
  let soundEnabled = false;
  let adminEditing = false;
  let adminDirty = false;
  let adminAuthHeader = '';
  let selectedEditable = null;
  let selectedMedia = null;
  let adminSnapshot = null;
  let toastTimer = null;
  const managedRegions = [];
  const managedTemplates = [];
  const CMS_SELECTOR = [
    'main h1',
    'main h2',
    'main h3:not([id])',
    'main p:not([id]):not(.mono-label):not(.kicker):not(.bot-clue):not(.loop-status)',
    'main code',
    'main .truth-table .table-head span',
    'main .payoff-matrix > b',
    'main .payoff-matrix > span',
    'footer > p:first-child'
  ].join(',');

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms * delayScale));

  function sanitizeHtml(rawHtml) {
    const documentFragment = new DOMParser().parseFromString(`<body>${String(rawHtml || '')}</body>`, 'text/html');
    const body = documentFragment.body;
    const blockedTags = 'script,style,iframe,object,embed,link,meta,base,form,input,button,textarea,select,svg,math';
    body.querySelectorAll(blockedTags).forEach(element => element.remove());
    const allowedTags = new Set([
      'A', 'ARTICLE', 'B', 'BR', 'CODE', 'DIV', 'EM', 'FIGCAPTION', 'FIGURE',
      'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'I', 'IMG', 'LI', 'OL', 'P',
      'SMALL', 'SPAN', 'STRONG', 'SUB', 'SUP', 'UL'
    ]);

    [...body.querySelectorAll('*')].forEach(element => {
      if (!allowedTags.has(element.tagName)) {
        element.replaceWith(...element.childNodes);
        return;
      }

      [...element.attributes].forEach(attribute => {
        const allowed = ['alt', 'class', 'href', 'rel', 'src', 'target', 'title'].includes(attribute.name);
        if (!allowed || attribute.name.startsWith('on')) element.removeAttribute(attribute.name);
      });

      if (element.hasAttribute('class')) {
        const safeClasses = element.className
          .split(/\s+/)
          .filter(className => /^[a-z0-9_-]{1,64}$/i.test(className));
        if (safeClasses.length) element.className = safeClasses.join(' ');
        else element.removeAttribute('class');
      }

      if (element.tagName === 'IMG') {
        const source = element.getAttribute('src') || '';
        const safeImage = /^data:image\/(?:png|jpe?g|gif|webp);base64,/i.test(source)
          || /^\/game-theory\/assets\//.test(source)
          || /^https:\/\//i.test(source);
        if (!safeImage) element.remove();
      }

      if (element.tagName === 'A') {
        const href = element.getAttribute('href') || '';
        if (!/^(?:https?:\/\/|\/|#)/i.test(href)) element.removeAttribute('href');
        if (/^https?:\/\//i.test(href)) {
          element.setAttribute('target', '_blank');
          element.setAttribute('rel', 'noopener');
        }
      }
    });

    return body.innerHTML;
  }

  function registerManagedContent() {
    $$(CMS_SELECTOR).forEach((element, index) => {
      const key = `section-${index}`;
      element.dataset.cmsKey = key;
      managedRegions.push({
        key,
        element,
        defaultHtml: sanitizeHtml(element.innerHTML)
      });
    });

    $$('template[id^="info-"]').forEach((template, index) => {
      const key = `section-${managedRegions.length + index}`;
      template.dataset.cmsKey = key;
      managedTemplates.push({
        key,
        template,
        defaultHtml: sanitizeHtml(template.innerHTML)
      });
    });
  }

  function findTemplateRecord(template) {
    return managedTemplates.find(record => record.template === template) || null;
  }

  function applyManagedSections(sections = {}) {
    managedRegions.forEach(record => {
      if (typeof sections[record.key] === 'string') {
        record.element.innerHTML = sanitizeHtml(sections[record.key]);
      }
    });
    managedTemplates.forEach(record => {
      if (typeof sections[record.key] === 'string') {
        record.template.innerHTML = sanitizeHtml(sections[record.key]);
      }
    });
    decorateAdminMedia();
  }

  async function loadManagedContent() {
    try {
      const response = await fetch('/game-theory/api/content', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Content request failed (${response.status})`);
      const payload = await response.json();
      applyManagedSections(payload.sections);
    } catch (error) {
      console.warn('Game Theory custom content could not be loaded:', error);
    }
  }

  function captureManagedSections() {
    commitOpenTemplateEdits();
    const sections = {};
    managedRegions.forEach(record => {
      sections[record.key] = sanitizeHtml(record.element.innerHTML);
    });
    managedTemplates.forEach(record => {
      sections[record.key] = sanitizeHtml(record.template.innerHTML);
    });
    return sections;
  }

  function restoreManagedSections(snapshot) {
    selectMedia(null);
    managedRegions.forEach(record => {
      record.element.innerHTML = snapshot?.[record.key] ?? record.defaultHtml;
    });
    managedTemplates.forEach(record => {
      record.template.innerHTML = snapshot?.[record.key] ?? record.defaultHtml;
    });
    decorateAdminMedia();
  }

  function basicAuthorization(password) {
    const bytes = new TextEncoder().encode(`:${password}`);
    let binary = '';
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return `Basic ${btoa(binary)}`;
  }

  function showAdminToast(message, isError = false) {
    const toast = $('#admin-toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.style.borderColor = isError ? 'rgba(255, 107, 85, .55)' : '';
    toast.hidden = false;
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3200);
  }

  function setAdminStatus(message) {
    $('#admin-status').textContent = message;
  }

  function markAdminDirty(message = 'Unsaved changes') {
    if (!adminEditing) return;
    adminDirty = true;
    setAdminStatus(message);
  }

  function selectEditable(element) {
    if (!adminEditing || !element) return;
    selectedEditable?.classList.remove('admin-selected');
    selectedEditable = element;
    selectedEditable.classList.add('admin-selected');
    selectMedia(null);
    setAdminStatus('Editing selected text block');
  }

  function selectMedia(media) {
    selectedMedia?.classList.remove('admin-media-selected');
    selectedMedia = media;
    if (selectedMedia) {
      selectedMedia.classList.add('admin-media-selected');
      $('#admin-image-tools').hidden = false;
      setAdminStatus('Image selected — align, drag, or remove it');
    } else {
      $('#admin-image-tools').hidden = true;
    }
  }

  function decorateAdminMedia(root = document) {
    $$('.admin-added-media', root).forEach(media => {
      media.contentEditable = 'false';
      media.draggable = adminEditing;
      const caption = $('.admin-image-caption', media);
      if (caption) caption.contentEditable = adminEditing ? 'true' : 'false';
    });
  }

  function setEditableMode(enabled) {
    managedRegions.forEach(record => {
      record.element.contentEditable = enabled ? 'true' : 'false';
      record.element.spellcheck = enabled;
      if (!enabled) record.element.classList.remove('admin-selected');
    });
    adminEditing = enabled;
    document.body.classList.toggle('admin-editing', enabled);
    $('#admin-toolbar').hidden = !enabled;
    if (!enabled) {
      selectedEditable = null;
      selectMedia(null);
    }
    decorateAdminMedia();
  }

  function commitOpenTemplateEdits() {
    const content = $('#info-content');
    const key = content?.dataset.cmsTemplateKey;
    if (!key) return;
    const record = managedTemplates.find(item => item.key === key);
    if (record) record.template.innerHTML = sanitizeHtml(content.innerHTML);
  }

  function enableOpenTemplateEditing(template) {
    if (!adminEditing) return;
    const record = findTemplateRecord(template);
    if (!record) return;
    const content = $('#info-content');
    content.dataset.cmsTemplateKey = record.key;
    content.contentEditable = 'true';
    content.spellcheck = true;
    content.addEventListener('focus', () => {
      selectedEditable = content;
      selectMedia(null);
      setAdminStatus('Editing this rules/explanation panel');
    });
    content.addEventListener('input', () => markAdminDirty('Unsaved explanation changes'));
    decorateAdminMedia(content);
  }

  function clearOpenTemplateEditing() {
    const content = $('#info-content');
    if (!content) return;
    content.contentEditable = 'false';
    delete content.dataset.cmsTemplateKey;
  }

  async function decodeAdminImage(file) {
    if ('createImageBitmap' in window) return createImageBitmap(file);
    const source = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Image could not be read.'));
      reader.readAsDataURL(file);
    });
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Image could not be decoded.'));
      image.src = source;
    });
  }

  async function compressAdminImage(file) {
    if (!file || !/^image\/(?:png|jpeg|gif|webp)$/i.test(file.type)) {
      throw new Error('Choose a PNG, JPEG, GIF, or WebP image.');
    }
    if (file.size > 12 * 1024 * 1024) {
      throw new Error('Image must be smaller than 12 MB.');
    }

    const bitmap = await decodeAdminImage(file);
    let width = bitmap.width;
    let height = bitmap.height;
    const maxDimension = 1500;
    const scale = Math.min(1, maxDimension / Math.max(width, height));
    width = Math.max(1, Math.round(width * scale));
    height = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    let quality = 0.82;
    let dataUrl = canvas.toDataURL('image/webp', quality);
    while (dataUrl.length > 620_000 && quality > 0.42) {
      quality -= 0.1;
      dataUrl = canvas.toDataURL('image/webp', quality);
    }
    if (dataUrl.length > 720_000) {
      throw new Error('This image remains too large after compression.');
    }
    return dataUrl;
  }

  function insertAdminImage(dataUrl, fileName) {
    if (!selectedEditable) {
      showAdminToast('Select a highlighted text block first.', true);
      return;
    }

    const media = document.createElement('span');
    media.className = 'admin-added-media media-center';
    media.contentEditable = 'false';
    media.draggable = true;

    const image = document.createElement('img');
    image.src = dataUrl;
    image.alt = fileName.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');

    const caption = document.createElement('span');
    caption.className = 'admin-image-caption';
    caption.contentEditable = 'true';
    caption.textContent = 'Click to add a caption';

    media.append(image, caption);
    selectedEditable.append(media);
    selectMedia(media);
    markAdminDirty('New image added — drag or align it, then save');
    media.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  }

  async function saveAdminChanges() {
    const button = $('#admin-save');
    button.disabled = true;
    button.textContent = 'Saving…';
    setAdminStatus('Saving changes to the site…');
    try {
      const sections = captureManagedSections();
      const response = await fetch('/game-theory/api/content', {
        method: 'PUT',
        headers: {
          Authorization: adminAuthHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sections })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || `Save failed (${response.status})`);
      selectMedia(null);
      applyManagedSections(sections);
      adminSnapshot = { ...sections };
      adminDirty = false;
      setAdminStatus(`Saved ${new Date(payload.updatedAt).toLocaleTimeString()}`);
      showAdminToast('Changes saved. They are now live on this site.');
      beep(760, 0.14, 'triangle');
    } catch (error) {
      setAdminStatus('Save failed');
      showAdminToast(error.message || 'Changes could not be saved.', true);
    } finally {
      button.disabled = false;
      button.textContent = 'Save changes';
    }
  }

  function showAdminLogin() {
    $('#admin-login-error').hidden = true;
    $('#admin-password').value = '';
    $('#admin-login').hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => $('#admin-password').focus());
  }

  function hideAdminLogin() {
    $('#admin-login').hidden = true;
    $('#admin-login-error').hidden = true;
    $('#admin-password').value = '';
    if (infoModal?.hidden !== false) document.body.classList.remove('modal-open');
  }

  function enterAdminMode() {
    adminSnapshot = captureManagedSections();
    adminDirty = false;
    setEditableMode(true);
    setAdminStatus('Select any highlighted text block to edit');
    showAdminToast('Editing mode enabled. Changes are private until you press Save.');
  }

  function discardAdminChanges() {
    if (!adminDirty) {
      showAdminToast('There are no unsaved changes.');
      return;
    }
    if (!window.confirm('Discard all unsaved Game Theory edits?')) return;
    if (!infoModal.hidden) closeInfo();
    restoreManagedSections(adminSnapshot);
    adminDirty = false;
    setAdminStatus('Unsaved changes discarded');
    showAdminToast('Unsaved changes were discarded.');
  }

  function exitAdminMode() {
    if (adminDirty && !window.confirm('Exit editing mode and discard unsaved changes?')) return;
    if (!infoModal.hidden) closeInfo();
    if (adminDirty) restoreManagedSections(adminSnapshot);
    adminDirty = false;
    adminAuthHeader = '';
    setEditableMode(false);
    showAdminToast('Editing mode closed.');
  }

  registerManagedContent();
  const managedContentReady = loadManagedContent();

  function beep(frequency = 440, duration = 0.08, type = 'sine') {
    if (!soundEnabled) return;
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.06, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }

  function completeChapter(index) {
    completed.add(index);
    $('#completed-count').textContent = completed.size;
    const navItems = $$('.progress-item');
    navItems[index].classList.add('complete');
    if (navItems[index + 1]) navItems[index + 1].disabled = false;
  }

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  function confetti(amount = 55) {
    const layer = $('#confetti-layer');
    const colors = ['#c8f54a', '#ff6b55', '#6ad9e8', '#a98cff', '#ffc84a'];
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement('i');
      piece.className = 'confetti';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty('--fall', `${1.4 + Math.random() * 1.5}s`);
      piece.style.setProperty('--drift', `${-120 + Math.random() * 240}px`);
      piece.style.animationDelay = `${Math.random() * 0.35}s`;
      layer.append(piece);
      setTimeout(() => piece.remove(), 3400);
    }
  }

  function setButtonGroupDisabled(selector, disabled) {
    $$(selector).forEach(button => {
      button.disabled = disabled;
    });
  }

  // Global controls
  $('#sound-toggle').addEventListener('click', event => {
    soundEnabled = !soundEnabled;
    event.currentTarget.setAttribute('aria-pressed', String(soundEnabled));
    event.currentTarget.setAttribute('aria-label', soundEnabled ? 'Turn sound off' : 'Turn sound on');
    if (soundEnabled) beep(660, 0.12);
  });

  $$('[data-scroll]').forEach(button => {
    button.addEventListener('click', () => scrollToId(button.dataset.scroll));
  });

  $$('[data-next]').forEach(button => {
    button.addEventListener('click', () => scrollToId(button.dataset.next));
  });

  $$('.progress-item').forEach(button => {
    button.addEventListener('click', () => {
      if (!button.disabled) scrollToId(button.dataset.target);
    });
  });

  const infoModal = $('#info-modal');
  const infoDialog = $('.info-dialog', infoModal);
  let lastInfoTrigger = null;

  function openInfo(key, trigger) {
    const template = document.getElementById(`info-${key}`);
    if (!template) return;
    lastInfoTrigger = trigger;
    $('#info-title').textContent = template.dataset.title || 'Explanation';
    $('#info-type').textContent = template.dataset.type || 'Game guide';
    $('#info-content').replaceChildren(template.content.cloneNode(true));
    enableOpenTemplateEditing(template);
    infoModal.hidden = false;
    document.body.classList.add('modal-open');
    trigger.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => infoDialog.focus());
    beep(560, 0.08, 'triangle');
  }

  function closeInfo() {
    if (infoModal.hidden) return;
    commitOpenTemplateEdits();
    if (selectedEditable === $('#info-content')) selectedEditable = null;
    selectMedia(null);
    clearOpenTemplateEditing();
    infoModal.hidden = true;
    document.body.classList.remove('modal-open');
    $('#info-content').replaceChildren();
    if (lastInfoTrigger) {
      lastInfoTrigger.setAttribute('aria-expanded', 'false');
      lastInfoTrigger.focus();
    }
    lastInfoTrigger = null;
  }

  $$('[data-info]').forEach(button => {
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', async () => {
      await managedContentReady;
      openInfo(button.dataset.info, button);
    });
  });
  $$('[data-close-info]').forEach(button => button.addEventListener('click', closeInfo));
  infoDialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = $$('button, a[href], input, [tabindex]:not([tabindex="-1"])', infoDialog)
      .filter(element => !element.disabled && element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !infoModal.hidden) closeInfo();
    if (event.key === 'Escape' && !$('#admin-login').hidden) hideAdminLogin();
  });

  managedRegions.forEach(record => {
    record.element.addEventListener('focus', () => selectEditable(record.element));
    record.element.addEventListener('click', event => {
      if (!adminEditing || event.target.closest('.admin-added-media')) return;
      selectEditable(record.element);
    });
    record.element.addEventListener('input', () => markAdminDirty('Unsaved text changes'));
  });

  $('#admin-entry').addEventListener('click', async () => {
    await managedContentReady;
    showAdminLogin();
  });
  $('#admin-login-cancel').addEventListener('click', hideAdminLogin);
  $('#admin-login-backdrop').addEventListener('click', hideAdminLogin);
  $('#admin-login-form').addEventListener('submit', async event => {
    event.preventDefault();
    const password = $('#admin-password').value;
    const submit = $('#admin-login-submit');
    if (!password) return;
    submit.disabled = true;
    submit.textContent = 'Checking…';
    $('#admin-login-error').hidden = true;
    try {
      const authorization = basicAuthorization(password);
      const response = await fetch('/game-theory/api/admin/verify', {
        method: 'POST',
        headers: { Authorization: authorization }
      });
      if (!response.ok) throw new Error('Incorrect password');
      adminAuthHeader = authorization;
      hideAdminLogin();
      enterAdminMode();
    } catch (error) {
      $('#admin-login-error').textContent = error.message || 'Admin login failed.';
      $('#admin-login-error').hidden = false;
      $('#admin-password').select();
    } finally {
      submit.disabled = false;
      submit.textContent = 'Enter editing mode';
    }
  });

  $('#admin-add-image').addEventListener('click', () => {
    if (!selectedEditable) {
      showAdminToast('Select a highlighted text block before adding an image.', true);
      return;
    }
    $('#admin-image-input').click();
  });
  $('#admin-image-input').addEventListener('change', async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setAdminStatus('Compressing image…');
    try {
      const dataUrl = await compressAdminImage(file);
      insertAdminImage(dataUrl, file.name);
    } catch (error) {
      showAdminToast(error.message || 'Image could not be added.', true);
      setAdminStatus('Image upload failed');
    }
  });

  $$('[data-image-align]').forEach(button => {
    button.addEventListener('click', () => {
      if (!selectedMedia) return;
      selectedMedia.classList.remove('media-left', 'media-center', 'media-right', 'media-wide');
      selectedMedia.classList.add(`media-${button.dataset.imageAlign}`);
      markAdminDirty(`Image aligned ${button.dataset.imageAlign}`);
    });
  });
  $('#admin-remove-image').addEventListener('click', () => {
    if (!selectedMedia) return;
    const media = selectedMedia;
    selectMedia(null);
    media.remove();
    markAdminDirty('Image removed');
  });

  document.addEventListener('click', event => {
    if (!adminEditing) return;
    const media = event.target.closest('.admin-added-media');
    if (media) {
      event.stopPropagation();
      selectMedia(media);
    }
  });
  document.addEventListener('dragstart', event => {
    if (!adminEditing) return;
    const media = event.target.closest('.admin-added-media');
    if (!media) return;
    selectMedia(media);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', 'game-theory-admin-image');
  });
  document.addEventListener('dragover', event => {
    if (!adminEditing || !selectedMedia) return;
    const target = event.target.closest('[data-cms-key], [data-cms-template-key]');
    if (!target) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });
  document.addEventListener('drop', event => {
    if (!adminEditing || !selectedMedia) return;
    const target = event.target.closest('[data-cms-key], [data-cms-template-key]');
    if (!target) return;
    event.preventDefault();
    target.append(selectedMedia);
    selectedEditable?.classList.remove('admin-selected');
    selectedEditable = target;
    target.classList.add('admin-selected');
    markAdminDirty('Image moved to a new section');
  });

  $('#admin-save').addEventListener('click', saveAdminChanges);
  $('#admin-discard').addEventListener('click', discardAdminChanges);
  $('#admin-exit').addEventListener('click', exitAdminMode);
  window.addEventListener('beforeunload', event => {
    if (!adminEditing || !adminDirty) return;
    event.preventDefault();
    event.returnValue = '';
  });

  document.addEventListener('pointermove', event => {
    const glow = $('.cursor-glow');
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });

  const chapterObserver = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const index = chapters.indexOf(visible.target.id);
    $$('.progress-item').forEach((item, itemIndex) => {
      item.classList.toggle('active', itemIndex === index);
      if (itemIndex === index) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
  }, { threshold: [0.18, 0.4], rootMargin: '-15% 0px -55%' });
  $$('.experiment').forEach(section => chapterObserver.observe(section));

  // Experiment 1: Monty Hall
  const monty = {
    prizeDoor: 0,
    firstPick: null,
    revealDoor: null,
    switchDoor: null,
    locked: false
  };

  function imageFallback(event, kind) {
    event.currentTarget.style.display = 'none';
    event.currentTarget.parentElement.style.background = kind === 'car'
      ? 'radial-gradient(circle, #ffe066, #9b5b12)'
      : 'radial-gradient(circle, #f2efe8, #847762)';
  }

  function resetMonty() {
    Object.assign(monty, {
      prizeDoor: Math.floor(Math.random() * 3),
      firstPick: null,
      revealDoor: null,
      switchDoor: null,
      locked: false
    });
    $$('.door-wrap').forEach((door, index) => {
      door.classList.remove('open', 'selected', 'dim');
      door.disabled = false;
      const image = $('img', door);
      const isCar = index === monty.prizeDoor;
      image.style.display = '';
      image.src = isCar ? CAR_IMAGE : GOAT_IMAGE;
      image.alt = isCar ? `Yellow sports car behind door ${index + 1}` : `Goat behind door ${index + 1}`;
      image.onerror = event => imageFallback(event, isCar ? 'car' : 'goat');
      $('b', $('.prize', door)).textContent = isCar ? 'The car' : 'A goat';
    });
    $('#monty-speech').textContent = 'One hides the car. Choose a door.';
    $('#monty-choice').classList.add('hidden');
    $('#monty-reveal').hidden = true;
  }

  async function chooseMontyDoor(index) {
    if (monty.locked) return;
    monty.locked = true;
    monty.firstPick = index;
    const candidates = [0, 1, 2].filter(value => value !== index && value !== monty.prizeDoor);
    monty.revealDoor = candidates[Math.floor(Math.random() * candidates.length)];
    monty.switchDoor = [0, 1, 2].find(value => value !== monty.firstPick && value !== monty.revealDoor);

    $$('.door-wrap').forEach((door, doorIndex) => {
      door.disabled = true;
      door.classList.toggle('selected', doorIndex === index);
    });
    beep(330, 0.08, 'triangle');
    $('#monty-speech').textContent = `Door ${index + 1}? Interesting. I know exactly what’s behind them.`;
    await wait(650);
    $(`.door-wrap[data-door="${monty.revealDoor}"]`).classList.add('open', 'dim');
    beep(180, 0.18, 'sawtooth');
    $('#monty-speech').textContent = `Door ${monty.revealDoor + 1} has a goat. Stay—or switch?`;
    $('#stay-button span').textContent = monty.firstPick + 1;
    $('#switch-button span').textContent = monty.switchDoor + 1;
    $('#monty-choice').classList.remove('hidden');
  }

  async function finishMonty(shouldSwitch) {
    $('#monty-choice').classList.add('hidden');
    const finalPick = shouldSwitch ? monty.switchDoor : monty.firstPick;
    $$('.door-wrap').forEach((door, index) => {
      door.classList.toggle('selected', index === finalPick);
      door.classList.remove('dim');
    });
    $('#monty-speech').textContent = shouldSwitch
      ? `Switching to door ${finalPick + 1}. Let’s open them!`
      : `Staying with door ${finalPick + 1}. Let’s open them!`;
    await wait(430);
    $(`.door-wrap[data-door="${finalPick}"]`).classList.add('open');
    beep(finalPick === monty.prizeDoor ? 880 : 150, 0.25, 'triangle');
    await wait(650);
    $$('.door-wrap').forEach(door => door.classList.add('open'));
    const won = finalPick === monty.prizeDoor;
    $$('.truth-table > div:not(.table-head)').forEach((row, carDoor) => {
      const cells = $$('span', row);
      const stayingWins = carDoor === monty.firstPick;
      cells[1].textContent = stayingWins ? 'Car' : 'Goat';
      cells[1].className = stayingWins ? 'win' : 'lose';
      cells[2].textContent = stayingWins ? 'Goat' : 'Car';
      cells[2].className = stayingWins ? 'lose' : 'win';
    });
    $('#monty-result-label').textContent = won ? 'You won the car!' : 'The goat says hello.';
    $('#monty-result-title').textContent = won
      ? `${shouldSwitch ? 'Switching' : 'Staying'} paid off this time.`
      : `Not this time—but one play is not the probability.`;
    $('#monty-reveal').hidden = false;
    if (won) confetti();
    completeChapter(0);
    await wait(100);
    $('#monty-reveal').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  $$('.door-wrap').forEach(door => {
    door.addEventListener('click', () => chooseMontyDoor(Number(door.dataset.door)));
  });
  $('#stay-button').addEventListener('click', () => finishMonty(false));
  $('#switch-button').addEventListener('click', () => finishMonty(true));
  $('#monty-replay').addEventListener('click', () => {
    resetMonty();
    scrollToId('monty');
  });
  resetMonty();

  // Experiment 2: Prisoner's Dilemma
  const prisoner = {
    oneShotDone: false,
    round: 0,
    playerScore: 0,
    botScore: 0,
    lastPlayerMove: null,
    busy: false
  };

  const payoff = {
    'cooperate-cooperate': [3, 3],
    'cooperate-defect': [0, 5],
    'defect-cooperate': [5, 0],
    'defect-defect': [1, 1]
  };

  function applyJailState(playerMove, rivalMove) {
    const playerRoom = $('.player-room');
    const rivalRoom = $('.rival-room');
    playerRoom.classList.remove('jailed', 'freed');
    rivalRoom.classList.remove('jailed', 'freed');
    if (playerMove === 'defect' && rivalMove === 'cooperate') {
      playerRoom.classList.add('freed');
      rivalRoom.classList.add('jailed');
      return ['You walk free.', 'The stranger stayed silent. Your testimony sends them away for a long time.'];
    }
    if (playerMove === 'cooperate' && rivalMove === 'defect') {
      playerRoom.classList.add('jailed');
      rivalRoom.classList.add('freed');
      return ['You get the long sentence.', 'The stranger snitched while you stayed silent. They walk free.'];
    }
    if (playerMove === 'defect') {
      playerRoom.classList.add('jailed');
      rivalRoom.classList.add('jailed');
      return ['You both snitched.', 'Both are convicted: a long sentence for each.'];
    }
    playerRoom.classList.add('jailed');
    rivalRoom.classList.add('jailed');
    return ['You both stayed silent.', 'The evidence is weak, so both receive reduced time.'];
  }

  async function playOneShot(playerMove) {
    if (prisoner.oneShotDone) return;
    prisoner.oneShotDone = true;
    setButtonGroupDisabled('[data-one-shot]', true);
    const rivalMove = Math.random() < 0.5 ? 'cooperate' : 'defect';
    await wait(450);
    const [title, detail] = applyJailState(playerMove, rivalMove);
    $('#jail-outcome').textContent = title;
    $('#jail-detail').textContent = detail;
    $('#one-shot-prompt').classList.add('hidden');
    $('#one-shot-result').classList.remove('hidden');
    beep(playerMove === 'defect' ? 170 : 350, 0.2, 'square');
  }

  function buildRoundTrack() {
    $('#round-track').replaceChildren(...Array.from({ length: 10 }, (_, index) => {
      const cell = document.createElement('div');
      cell.className = 'round-cell';
      cell.innerHTML = `<span>R${index + 1}</span><b>·</b>`;
      return cell;
    }));
  }

  function resetTft() {
    Object.assign(prisoner, {
      round: 0,
      playerScore: 0,
      botScore: 0,
      lastPlayerMove: null,
      busy: false
    });
    $('#player-score').textContent = '0';
    $('#bot-score').textContent = '0';
    $('#round-number').textContent = '1';
    $('#bot-clue').textContent = 'The bot begins nicely. After that, it remembers.';
    $('#prisoner-reveal').hidden = true;
    buildRoundTrack();
    setButtonGroupDisabled('[data-tft]', false);
  }

  async function playTftRound(playerMove) {
    if (prisoner.busy || prisoner.round >= 10) return;
    prisoner.busy = true;
    setButtonGroupDisabled('[data-tft]', true);
    const botMove = prisoner.round === 0 ? 'cooperate' : prisoner.lastPlayerMove;
    const [playerPoints, botPoints] = payoff[`${playerMove}-${botMove}`];
    prisoner.playerScore += playerPoints;
    prisoner.botScore += botPoints;
    const roundCell = $$('.round-cell')[prisoner.round];
    roundCell.classList.add('played');
    $('b', roundCell).innerHTML = `<span title="You: ${playerMove}">${playerMove === 'cooperate' ? '🤝' : '⚡'}</span><span title="Bot: ${botMove}">${botMove === 'cooperate' ? '🤝' : '⚡'}</span>`;
    $('#player-score').textContent = prisoner.playerScore;
    $('#bot-score').textContent = prisoner.botScore;
    $('#bot-clue').textContent = `You chose ${playerMove}; Tit for Tat chose ${botMove}. Score: ${playerPoints}–${botPoints}.`;
    beep(playerMove === botMove ? 520 : 250, 0.1, 'triangle');
    prisoner.lastPlayerMove = playerMove;
    prisoner.round += 1;
    $('#round-number').textContent = Math.min(10, prisoner.round + 1);
    await wait(360);

    if (prisoner.round === 10) {
      const difference = prisoner.playerScore - prisoner.botScore;
      $('#tft-verdict').textContent = difference > 0
        ? `You won ${prisoner.playerScore}–${prisoner.botScore}.`
        : difference < 0
          ? `Tit for Tat won ${prisoner.botScore}–${prisoner.playerScore}.`
          : `A ${prisoner.playerScore}–${prisoner.botScore} draw.`;
      $('#prisoner-reveal').hidden = false;
      completeChapter(1);
      if (prisoner.playerScore >= 25) confetti(35);
      await wait(100);
      $('#prisoner-reveal').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
      return;
    }
    prisoner.busy = false;
    setButtonGroupDisabled('[data-tft]', false);
  }

  $$('[data-one-shot]').forEach(button => {
    button.addEventListener('click', () => playOneShot(button.dataset.oneShot));
  });
  $('#start-tft').addEventListener('click', () => {
    $('#tft-game').hidden = false;
    $('#tft-game').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  });
  $$('[data-tft]').forEach(button => {
    button.addEventListener('click', () => playTftRound(button.dataset.tft));
  });
  $('#prisoner-replay').addEventListener('click', () => {
    prisoner.oneShotDone = false;
    $('.player-room').classList.remove('jailed', 'freed');
    $('.rival-room').classList.remove('jailed', 'freed');
    $('#one-shot-prompt').classList.remove('hidden');
    $('#one-shot-result').classList.add('hidden');
    $('#tft-game').hidden = true;
    setButtonGroupDisabled('[data-one-shot]', false);
    resetTft();
    scrollToId('prisoner');
  });
  resetTft();

  // Experiment 3: Newcomb's Paradox
  let newcombPlayed = false;

  function formatMoney(value) {
    return `$${value.toLocaleString('en-US')}`;
  }

  async function playNewcomb(choice) {
    if (newcombPlayed) return;
    newcombPlayed = true;
    setButtonGroupDisabled('[data-newcomb]', true);
    const predictionIsCorrect = Math.random() < 0.9;
    const predictedChoice = predictionIsCorrect ? choice : (choice === 'one' ? 'both' : 'one');
    const boxBValue = predictedChoice === 'one' ? 1_000_000 : 0;
    const total = boxBValue + (choice === 'both' ? 1_000 : 0);

    $('#prediction-slip b').textContent = predictedChoice === 'one' ? 'ONLY BOX B' : 'BOTH BOXES';
    $('#prediction-slip').classList.add('revealed');
    $('#box-b-money').textContent = boxBValue ? '$1M' : '$0';
    $('#box-b').classList.add('selected');
    if (choice === 'both') $('#box-a').classList.add('selected');
    beep(260, 0.15, 'sawtooth');
    await wait(600);
    $('#box-b').classList.add('open');
    if (choice === 'both') $('#box-a').classList.add('open');
    beep(boxBValue ? 880 : 130, 0.3, 'triangle');
    await wait(850);
    $('#newcomb-verdict').textContent = `You took home ${formatMoney(total)}.`;
    $('#newcomb-reveal').hidden = false;
    completeChapter(2);
    if (total >= 1_000_000) confetti();
    await wait(100);
    $('#newcomb-reveal').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  $$('[data-newcomb]').forEach(button => {
    button.addEventListener('click', () => playNewcomb(button.dataset.newcomb));
  });
  $('#newcomb-replay').addEventListener('click', () => {
    newcombPlayed = false;
    $('#prediction-slip b').textContent = '••••••••';
    $('#prediction-slip').classList.remove('revealed');
    $$('.newcomb-box').forEach(box => box.classList.remove('open', 'selected'));
    $('#newcomb-reveal').hidden = true;
    setButtonGroupDisabled('[data-newcomb]', false);
    scrollToId('newcomb');
  });

  // Experiment 4: 100 Prisoners
  const crowdFragment = document.createDocumentFragment();
  for (let number = 1; number <= 100; number += 1) {
    const person = document.createElement('i');
    person.className = 'tiny-prisoner';
    person.style.animationDelay = `${(number % 13) * 0.08}s`;
    person.innerHTML = `<span>${number}</span>`;
    crowdFragment.append(person);
  }
  $('#prisoner-crowd').append(crowdFragment);

  function shuffle(size) {
    const values = Array.from({ length: size }, (_, index) => index + 1);
    for (let i = values.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values;
  }

  let loopPermutation = shuffle(12);
  let loopBusy = false;

  function buildLoopBoxes() {
    loopPermutation = shuffle(12);
    const boxes = loopPermutation.map((slipValue, index) => {
      const box = document.createElement('div');
      box.className = 'loop-box';
      box.dataset.box = index + 1;
      box.innerHTML = `<span class="slip">${slipValue}</span><span class="drawer-front">${index + 1}</span>`;
      return box;
    });
    $('#box-grid').replaceChildren(...boxes);
    $('#loop-status').textContent = 'Waiting for prisoner 1…';
  }

  async function runLoopDemo() {
    if (loopBusy) return;
    loopBusy = true;
    $('#run-loop').disabled = true;
    buildLoopBoxes();
    let currentBox = 1;
    let found = false;
    const path = [];
    for (let attempt = 1; attempt <= 6; attempt += 1) {
      const box = $(`.loop-box[data-box="${currentBox}"]`);
      box.classList.add('active');
      await wait(280);
      box.classList.add('open');
      const slip = loopPermutation[currentBox - 1];
      path.push(currentBox);
      $('#loop-status').textContent = `Open ${currentBox} → slip says ${slip}. ${attempt}/6 opens used.`;
      beep(280 + attempt * 45, 0.08, 'triangle');
      await wait(520);
      box.classList.remove('active');
      if (slip === 1) {
        found = true;
        box.classList.add('success');
        break;
      }
      currentBox = slip;
    }
    $('#loop-status').textContent = found
      ? `Success: ${path.join(' → ')} found slip 1 within six opens.`
      : `This loop was longer than six: ${path.join(' → ')}… Prisoner 1 fails.`;
    if (found) confetti(22);
    loopBusy = false;
    $('#run-loop').disabled = false;
  }

  function arrangementSucceeds(permutation) {
    const visited = new Uint8Array(permutation.length);
    for (let start = 0; start < permutation.length; start += 1) {
      if (visited[start]) continue;
      let current = start;
      let cycleLength = 0;
      while (!visited[current]) {
        visited[current] = 1;
        current = permutation[current] - 1;
        cycleLength += 1;
      }
      if (cycleLength > permutation.length / 2) return false;
    }
    return true;
  }

  function simulatePrisons(trials = 1000) {
    let successes = 0;
    for (let trial = 0; trial < trials; trial += 1) {
      if (arrangementSucceeds(shuffle(100))) successes += 1;
    }
    return successes;
  }

  const guessRange = $('#guess-range');
  function updateGuess() {
    const value = Number(guessRange.value);
    $('#guess-output').textContent = value;
    $('#lock-guess').textContent = `Lock in ${value}%`;
    guessRange.style.background = `linear-gradient(90deg, var(--lime) ${value}%, #353a44 ${value}%)`;
  }
  guessRange.addEventListener('input', updateGuess);

  $('#lock-guess').addEventListener('click', async () => {
    const guess = Number(guessRange.value);
    const difference = Math.abs(31.18 - guess);
    $('#guess-reaction').textContent = difference < 3
      ? `Your ${guess}% guess was remarkably close.`
      : guess < 31.18
        ? `Your ${guess}% guess was low—the loop strategy is surprisingly powerful.`
        : `Your ${guess}% guess was optimistic, but 31.18% is still enormous compared with random play.`;
    $('#probability-guess').hidden = true;
    $('#hundred-reveal').hidden = false;
    completeChapter(3);
    beep(740, 0.25, 'triangle');
    confetti(80);
    await wait(100);
    $('#hundred-reveal').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  });

  $('#run-loop').addEventListener('click', runLoopDemo);
  $('#run-simulation').addEventListener('click', async event => {
    const button = event.currentTarget;
    button.disabled = true;
    $('#simulation-label').textContent = 'Shuffling 100,000 slips…';
    $('#simulation-fill').style.width = '8%';
    await wait(350);
    const successes = simulatePrisons(1000);
    const percentage = successes / 10;
    $('#simulation-fill').style.width = `${percentage}%`;
    $('#simulation-label').textContent = `${successes}/1,000 escaped · ${percentage.toFixed(1)}%`;
    button.textContent = 'Run again';
    button.disabled = false;
    beep(620, 0.18, 'triangle');
  });
  $('#restart-all').addEventListener('click', () => {
    window.location.hash = 'home';
    window.location.reload();
  });

  buildLoopBoxes();
  updateGuess();
})();
