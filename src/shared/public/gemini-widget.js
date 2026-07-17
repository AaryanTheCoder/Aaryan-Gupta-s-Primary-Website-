(function initializeGeminiWidget() {
  'use strict';

  if (window.__aaryanGeminiWidgetLoaded) return;
  window.__aaryanGeminiWidgetLoaded = true;

  const host = document.createElement('div');
  host.id = 'aaryan-gemini-widget';
  host.setAttribute('data-html2canvas-ignore', 'true');
  document.body.appendChild(host);

  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `
    <style>
      :host {
        all: initial;
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 2147483000;
        color-scheme: dark;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      *, *::before, *::after { box-sizing: border-box; }
      button, textarea { font: inherit; }

      .launcher {
        width: 56px;
        height: 56px;
        display: grid;
        place-items: center;
        margin-left: auto;
        padding: 0;
        border: 1px solid rgba(255, 255, 255, .34);
        border-radius: 50%;
        color: white;
        background: linear-gradient(145deg, #3155d9, #8b5cf6);
        box-shadow: 0 12px 34px rgba(19, 31, 76, .42);
        cursor: pointer;
        transition: transform .18s ease, box-shadow .18s ease;
      }

      .launcher:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 16px 38px rgba(19, 31, 76, .5);
      }

      .launcher:focus-visible, .icon-button:focus-visible, .send:focus-visible,
      .close:focus-visible, .remove-shot:focus-visible, .remove-file:focus-visible {
        outline: 3px solid rgba(147, 197, 253, .8);
        outline-offset: 2px;
      }

      .launcher svg { width: 29px; height: 29px; }

      .panel {
        width: min(390px, calc(100vw - 24px));
        height: min(580px, calc(100vh - 94px));
        margin-bottom: 12px;
        display: none;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, .16);
        border-radius: 22px;
        color: #f7f8fc;
        background: rgba(15, 20, 35, .98);
        box-shadow: 0 24px 70px rgba(0, 0, 0, .45);
      }

      .panel.open {
        display: flex;
        flex-direction: column;
        animation: open-panel .18s ease-out;
      }

      @keyframes open-panel {
        from { opacity: 0; transform: translateY(8px) scale(.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .header {
        min-height: 66px;
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 13px 14px 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, .1);
        background: linear-gradient(135deg, rgba(49, 85, 217, .24), rgba(139, 92, 246, .17));
      }

      .gemini-mark {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        border-radius: 11px;
        background: rgba(255, 255, 255, .09);
      }

      .gemini-mark svg { width: 24px; height: 24px; }
      .heading { min-width: 0; flex: 1; }
      .heading strong { display: block; font-size: 14px; line-height: 1.3; }
      .heading span { display: block; margin-top: 2px; color: #aeb8d1; font-size: 11px; line-height: 1.3; }

      .close, .icon-button, .remove-shot {
        display: grid;
        place-items: center;
        padding: 0;
        border: 0;
        color: #cfd6e7;
        background: transparent;
        cursor: pointer;
      }

      .close {
        width: 34px;
        height: 34px;
        border-radius: 10px;
      }

      .close:hover, .icon-button:hover { color: white; background: rgba(255, 255, 255, .1); }
      .close svg { width: 19px; height: 19px; }

      .model-picker {
        display: flex;
        gap: 6px;
        padding: 8px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, .08);
        background: rgba(8, 12, 24, .52);
      }

      .model-option {
        min-height: 30px;
        flex: 1;
        padding: 5px 9px;
        border: 1px solid rgba(255, 255, 255, .1);
        border-radius: 9px;
        color: #aeb8d1;
        background: rgba(255, 255, 255, .04);
        font-size: 11px;
        font-weight: 650;
        cursor: pointer;
      }

      .model-option:hover:not(:disabled) {
        color: white;
        background: rgba(255, 255, 255, .08);
      }

      .model-option.active {
        border-color: rgba(129, 140, 248, .65);
        color: white;
        background: rgba(79, 70, 229, .3);
      }

      .model-option:disabled { opacity: .55; cursor: not-allowed; }
      .model-option:focus-visible { outline: 3px solid rgba(147, 197, 253, .8); outline-offset: 1px; }
      .model-option small { margin-left: 3px; color: #93c5fd; font-size: 9px; font-weight: 700; }

      .messages {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;
        padding: 16px;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, .18) transparent;
      }

      .message {
        max-width: 86%;
        padding: 10px 12px;
        border-radius: 15px;
        font-size: 13px;
        line-height: 1.48;
        overflow-wrap: anywhere;
        white-space: pre-wrap;
      }

      .message.assistant {
        align-self: flex-start;
        border: 1px solid rgba(255, 255, 255, .1);
        border-bottom-left-radius: 5px;
        color: #e8ecf6;
        background: rgba(255, 255, 255, .07);
      }

      .message.user {
        align-self: flex-end;
        border-bottom-right-radius: 5px;
        color: white;
        background: linear-gradient(135deg, #3155d9, #6848d8);
      }

      .message.error {
        align-self: center;
        max-width: 94%;
        padding: 8px 10px;
        color: #fecaca;
        background: rgba(127, 29, 29, .32);
        border: 1px solid rgba(248, 113, 113, .28);
        font-size: 12px;
      }

      .message img {
        width: 100%;
        display: block;
        margin: 0 0 8px;
        border-radius: 9px;
        border: 1px solid rgba(255, 255, 255, .18);
      }

      .typing::after {
        content: "•••";
        letter-spacing: 3px;
        animation: pulse 1s infinite;
      }

      @keyframes pulse { 50% { opacity: .35; } }

      .composer-area {
        padding: 10px 12px 12px;
        border-top: 1px solid rgba(255, 255, 255, .1);
        background: rgba(8, 12, 24, .72);
      }

      .shot-preview {
        display: none;
        align-items: center;
        gap: 9px;
        margin-bottom: 8px;
        padding: 7px;
        border: 1px solid rgba(129, 140, 248, .3);
        border-radius: 11px;
        color: #dfe4f1;
        background: rgba(79, 70, 229, .12);
        font-size: 11px;
      }

      .shot-preview.visible { display: flex; }
      .shot-preview img { width: 48px; height: 32px; object-fit: cover; border-radius: 6px; }
      .shot-preview span { min-width: 0; flex: 1; }

      .remove-shot {
        width: 24px;
        height: 24px;
        flex: 0 0 auto;
        border-radius: 7px;
        font-size: 18px;
      }

      .file-preview {
        display: none;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        padding: 7px 8px;
        border: 1px solid rgba(56, 189, 248, .28);
        border-radius: 11px;
        color: #dfe4f1;
        background: rgba(14, 165, 233, .10);
        font-size: 11px;
      }

      .file-preview.visible { display: flex; }
      .file-preview span { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .remove-file {
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        padding: 0;
        border: 0;
        border-radius: 7px;
        color: #cfd6e7;
        background: transparent;
        cursor: pointer;
        font-size: 18px;
      }

      .remove-file:hover { color: white; background: rgba(255, 255, 255, .1); }

      .composer {
        display: flex;
        align-items: flex-end;
        gap: 7px;
        padding: 6px;
        border: 1px solid rgba(255, 255, 255, .14);
        border-radius: 15px;
        background: rgba(255, 255, 255, .06);
      }

      textarea {
        min-width: 0;
        min-height: 34px;
        max-height: 104px;
        flex: 1;
        resize: none;
        padding: 8px 5px 6px;
        border: 0;
        outline: 0;
        color: white;
        background: transparent;
        font-size: 13px;
        line-height: 1.42;
      }

      textarea::placeholder { color: #8994ad; }

      .icon-button {
        width: 34px;
        height: 34px;
        flex: 0 0 auto;
        border-radius: 10px;
      }

      .icon-button svg { width: 18px; height: 18px; }
      .icon-button:disabled, .send:disabled { opacity: .45; cursor: not-allowed; }

      .send {
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        padding: 0;
        border: 0;
        border-radius: 11px;
        color: white;
        background: #4f46e5;
        cursor: pointer;
      }

      .send:hover:not(:disabled) { background: #6366f1; }
      .send svg { width: 18px; height: 18px; }

      .status {
        min-height: 15px;
        margin: 6px 3px 0;
        color: #9ca8c1;
        font-size: 10px;
        line-height: 1.4;
      }

      @media (max-width: 520px) {
        :host { right: 12px; bottom: 12px; }
        .launcher { width: 52px; height: 52px; }
        .panel { height: min(620px, calc(100vh - 80px)); border-radius: 18px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .panel.open, .launcher { animation: none; transition: none; }
      }
    </style>

    <section class="panel" aria-label="AI chat" aria-hidden="true">
      <header class="header">
        <span class="gemini-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M16 2c1.5 8.1 5.9 12.5 14 14-8.1 1.5-12.5 5.9-14 14C14.5 21.9 10.1 17.5 2 16 10.1 14.5 14.5 10.1 16 2Z" fill="url(#gemini-gradient-widget)"/>
            <defs><linearGradient id="gemini-gradient-widget" x1="5" y1="5" x2="27" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#5EB9F0"/><stop offset=".48" stop-color="#A77BF3"/><stop offset="1" stop-color="#F38CB3"/></linearGradient></defs>
          </svg>
        </span>
        <span class="heading">
          <strong>Ask Gemini</strong>
          <span>Conversation context enabled</span>
        </span>
        <button class="close" type="button" aria-label="Close AI chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
      </header>

      <div class="model-picker" role="radiogroup" aria-label="Choose AI model">
        <button class="model-option active" type="button" role="radio" aria-checked="true" data-provider="gemini">Gemini 2.5 Flash</button>
        <button class="model-option" type="button" role="radio" aria-checked="false" data-provider="gpt5">GPT-5 <small>WEB</small></button>
        <button class="model-option" type="button" role="radio" aria-checked="false" data-provider="qwen">Qwen <small>NOVA</small></button>
      </div>

      <div class="messages" aria-live="polite">
        <div class="message assistant">Hi! Ask me anything. Use the screen button to include what you are viewing.</div>
      </div>

      <div class="composer-area">
        <div class="shot-preview">
          <img alt="Screenshot ready to send">
          <span>Screenshot attached</span>
          <button class="remove-shot" type="button" aria-label="Remove screenshot">×</button>
        </div>
        <div class="file-preview">
          <span>File attached</span>
          <button class="remove-file" type="button" aria-label="Remove attached files">×</button>
        </div>
        <div class="composer">
          <button class="icon-button capture" type="button" aria-label="Capture current screen" title="Attach a screenshot of the current tab">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8.5 5 10 3h4l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5Z"/>
              <circle cx="12" cy="12" r="3.5"/>
            </svg>
          </button>
          <button class="icon-button attach" type="button" aria-label="Attach text files" title="Attach text files">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.4 11.6-8.5 8.5a5 5 0 0 1-7.1-7.1l9.2-9.2a3.4 3.4 0 0 1 4.8 4.8l-9.2 9.2a1.8 1.8 0 1 1-2.5-2.5l8.5-8.5"/>
            </svg>
          </button>
          <input class="file-input" type="file" multiple hidden>
          <textarea rows="1" maxlength="8000" aria-label="Message Gemini" placeholder="Ask Gemini…"></textarea>
          <button class="send" type="button" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 14-7-4 14-3-6-7-1Z"/><path d="m12 13 7-8"/></svg>
          </button>
        </div>
        <div class="status" role="status"></div>
      </div>
    </section>

    <button class="launcher" type="button" aria-label="Open AI chat" aria-expanded="false">
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 2c1.5 8.1 5.9 12.5 14 14-8.1 1.5-12.5 5.9-14 14C14.5 21.9 10.1 17.5 2 16 10.1 14.5 14.5 10.1 16 2Z" fill="url(#gemini-gradient-launcher)"/>
        <defs><linearGradient id="gemini-gradient-launcher" x1="5" y1="5" x2="27" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#BEE9FF"/><stop offset=".48" stop-color="#E3D2FF"/><stop offset="1" stop-color="#FFD1E1"/></linearGradient></defs>
      </svg>
    </button>
  `;

  const panel = root.querySelector('.panel');
  const launcher = root.querySelector('.launcher');
  const closeButton = root.querySelector('.close');
  const heading = root.querySelector('.heading strong');
  const headingDetail = root.querySelector('.heading span');
  const modelButtons = [...root.querySelectorAll('.model-option')];
  const messages = root.querySelector('.messages');
  const textarea = root.querySelector('textarea');
  const sendButton = root.querySelector('.send');
  const captureButton = root.querySelector('.capture');
  const attachButton = root.querySelector('.attach');
  const fileInput = root.querySelector('.file-input');
  const preview = root.querySelector('.shot-preview');
  const previewImage = preview.querySelector('img');
  const removeScreenshotButton = root.querySelector('.remove-shot');
  const filePreview = root.querySelector('.file-preview');
  const filePreviewText = filePreview.querySelector('span');
  const removeFileButton = root.querySelector('.remove-file');
  const status = root.querySelector('.status');

  const providerMeta = {
    gemini: {
      name: 'Gemini',
      title: 'Ask Gemini',
      detail: 'Conversation context enabled',
      label: 'Message Gemini',
      placeholder: 'Ask Gemini…',
      thinking: 'Gemini is thinking…'
    },
    gpt5: {
      name: 'GPT-5',
      title: 'Ask GPT-5',
      detail: 'Web search · current message only',
      label: 'Message GPT-5',
      placeholder: 'Ask GPT-5…',
      thinking: 'GPT-5 is thinking and may search the web…'
    },
    qwen: {
      name: 'Qwen/Nova',
      title: 'Ask Nova',
      detail: 'Qwen · web search · file text',
      label: 'Message Nova',
      placeholder: 'Ask Nova…',
      thinking: 'Nova is starting Qwen and may search the web…'
    }
  };

  const geminiConversation = [];
  const qwenConversation = [];
  let selectedProvider = 'gemini';
  let screenshot = null;
  let attachedFiles = [];
  let requestInProgress = false;

  function setOpen(open) {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Close AI chat' : 'Open AI chat');
    if (open) window.setTimeout(() => textarea.focus(), 30);
  }

  function scrollToLatest() {
    messages.scrollTop = messages.scrollHeight;
  }

  function setProvider(provider) {
    if (requestInProgress || !providerMeta[provider]) return;
    selectedProvider = provider;
    const meta = providerMeta[provider];
    modelButtons.forEach(button => {
      const active = button.dataset.provider === provider;
      button.classList.toggle('active', active);
      button.setAttribute('aria-checked', String(active));
    });
    heading.textContent = meta.title;
    headingDetail.textContent = meta.detail;
    textarea.setAttribute('aria-label', meta.label);
    textarea.placeholder = meta.placeholder;
    status.textContent = '';
    textarea.focus();
  }

  function appendMessage(role, text, imageUrl) {
    const element = document.createElement('div');
    element.className = `message ${role}`;
    if (imageUrl) {
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = 'Attached screenshot';
      element.appendChild(image);
    }
    element.appendChild(document.createTextNode(text));
    messages.appendChild(element);
    scrollToLatest();
    return element;
  }

  function updateTextareaHeight() {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 104)}px`;
  }

  function clearScreenshot() {
    screenshot = null;
    preview.classList.remove('visible');
    previewImage.removeAttribute('src');
    status.textContent = '';
  }

  function clearFiles() {
    attachedFiles = [];
    fileInput.value = '';
    filePreview.classList.remove('visible');
    filePreviewText.textContent = 'File attached';
  }

  function fileSummary(files) {
    if (files.length === 1) return files[0].name;
    return `${files.length} files attached`;
  }

  function messageWithFileNotice(message, files) {
    if (!files.length) return message;
    return `${message}\n\n[Attached: ${files.map(file => file.name).join(', ')}]`;
  }

  function messageWithFileText(message, files) {
    if (!files.length) return message;
    const fileText = files
      .map(file => `File: ${file.name}\n${file.text}`)
      .join('\n\n---\n\n');
    return `${message}\n\nAttached file text:\n\n${fileText}`;
  }

  async function attachFiles() {
    if (requestInProgress) return;
    fileInput.click();
  }

  fileInput.addEventListener('change', async () => {
    const files = Array.from(fileInput.files || []).slice(0, 4);
    if (!files.length) return;

    attachButton.disabled = true;
    status.textContent = 'Reading attached file text…';

    try {
      let usedCharacters = 0;
      const nextFiles = [];
      for (const file of files) {
        if (file.size > 512 * 1024) {
          appendMessage('error', `${file.name} is too large. Please attach files under 512 KB.`);
          continue;
        }

        const text = await file.text();
        const remaining = 12000 - usedCharacters;
        if (remaining <= 0) break;
        const slicedText = text.slice(0, remaining);
        usedCharacters += slicedText.length;
        nextFiles.push({ name: file.name, type: file.type || 'text/plain', text: slicedText });
      }

      attachedFiles = nextFiles;
      if (attachedFiles.length) {
        filePreviewText.textContent = fileSummary(attachedFiles);
        filePreview.classList.add('visible');
        status.textContent = 'File text ready — it will be sent with your next message.';
      } else {
        clearFiles();
        status.textContent = '';
      }
    } catch {
      clearFiles();
      appendMessage('error', 'The selected file could not be read as text.');
      status.textContent = '';
    } finally {
      attachButton.disabled = false;
    }
  });

  function waitForVideo(video) {
    return new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error('Screen capture timed out.')), 8000);
      video.addEventListener('loadedmetadata', () => {
        window.clearTimeout(timeout);
        resolve();
      }, { once: true });
      video.addEventListener('error', () => {
        window.clearTimeout(timeout);
        reject(new Error('The captured screen could not be read.'));
      }, { once: true });
    });
  }

  function nextPaint() {
    return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  async function captureScreen() {
    if (requestInProgress || captureButton.disabled) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      appendMessage('error', 'Screen capture is not supported by this browser.');
      return;
    }

    captureButton.disabled = true;
    status.textContent = 'Choose “This Tab” in the share dialog…';
    let stream;

    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' },
        audio: false,
        preferCurrentTab: true,
        selfBrowserSurface: 'include'
      });

      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.srcObject = stream;
      await waitForVideo(video);
      await video.play();

      host.style.visibility = 'hidden';
      await nextPaint();

      const maxDimension = 1280;
      const scale = Math.min(1, maxDimension / Math.max(video.videoWidth, video.videoHeight));
      const width = Math.max(1, Math.round(video.videoWidth * scale));
      const height = Math.max(1, Math.round(video.videoHeight * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('The screenshot could not be created.');
      context.drawImage(video, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.74);
      screenshot = {
        mimeType: 'image/jpeg',
        data: dataUrl.slice(dataUrl.indexOf(',') + 1),
        previewUrl: dataUrl
      };
      previewImage.src = dataUrl;
      preview.classList.add('visible');
      status.textContent = 'Screenshot ready — it will be sent with your next message.';
    } catch (error) {
      if (error && error.name === 'NotAllowedError') {
        status.textContent = 'Screen capture was cancelled.';
      } else {
        appendMessage('error', error.message || 'Could not capture the screen.');
        status.textContent = '';
      }
    } finally {
      host.style.visibility = '';
      if (stream) stream.getTracks().forEach(track => track.stop());
      captureButton.disabled = false;
    }
  }

  async function sendMessage() {
    const message = textarea.value.trim();
    if ((!message && !attachedFiles.length) || requestInProgress) return;

    if (selectedProvider === 'qwen' && screenshot) {
      appendMessage('error', 'Nova/Qwen can read attached text files, but this local model cannot read screenshots yet. Remove the screenshot or switch models.');
      return;
    }

    const outgoingScreenshot = screenshot;
    const outgoingFiles = attachedFiles.slice();
    appendMessage('user', messageWithFileNotice(message || 'Please read the attached file text.', outgoingFiles), outgoingScreenshot && outgoingScreenshot.previewUrl);
    textarea.value = '';
    updateTextareaHeight();
    clearScreenshot();
    clearFiles();

    requestInProgress = true;
    sendButton.disabled = true;
    captureButton.disabled = true;
    attachButton.disabled = true;
    modelButtons.forEach(button => { button.disabled = true; });
    const isGpt5 = selectedProvider === 'gpt5';
    const isQwen = selectedProvider === 'qwen';
    const meta = providerMeta[selectedProvider] || providerMeta.gemini;
    status.textContent = meta.thinking;
    const typing = appendMessage('assistant typing', '');

    try {
      const hostedMessage = messageWithFileText(message || 'Please read the attached file text.', outgoingFiles);
      const response = await fetch(isQwen ? '/api/qwen' : '/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isQwen
          ? {
              message: message || 'Please read the attached file text.',
              history: qwenConversation.slice(-10),
              attachments: outgoingFiles.map(file => ({ name: file.name, text: file.text })),
              useWebSearch: true
            }
          : {
              provider: selectedProvider,
              message: hostedMessage,
              history: isGpt5 ? undefined : geminiConversation.slice(-10),
              image: outgoingScreenshot
                ? { mimeType: outgoingScreenshot.mimeType, data: outgoingScreenshot.data }
                : undefined
            })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `${meta.name} did not return a reply.`);
      }

      typing.remove();
      const sourceText = data.sources?.length
        ? `\n\nSources:\n${data.sources.map((source, index) => `${index + 1}. ${source.title || source.url} - ${source.url}`).join('\n')}`
        : '';
      appendMessage('assistant', `${data.reply || data.answer || ''}${sourceText}`.trim());
      if (isQwen) {
        qwenConversation.push(
          { role: 'user', content: messageWithFileText(message || 'Please read the attached file text.', outgoingFiles) },
          { role: 'assistant', content: data.reply || data.answer || '' }
        );
        if (qwenConversation.length > 20) {
          qwenConversation.splice(0, qwenConversation.length - 20);
        }
      } else if (!isGpt5) {
        geminiConversation.push(
          { role: 'user', text: hostedMessage },
          { role: 'assistant', text: data.reply }
        );
        if (geminiConversation.length > 20) {
          geminiConversation.splice(0, geminiConversation.length - 20);
        }
      }
      status.textContent = '';
    } catch (error) {
      typing.remove();
      appendMessage('error', error.message || `Unable to reach ${meta.name}.`);
      status.textContent = '';
    } finally {
      requestInProgress = false;
      sendButton.disabled = false;
      captureButton.disabled = false;
      attachButton.disabled = false;
      modelButtons.forEach(button => { button.disabled = false; });
      textarea.focus();
    }
  }

  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  closeButton.addEventListener('click', () => setOpen(false));
  modelButtons.forEach(button => {
    button.addEventListener('click', () => setProvider(button.dataset.provider));
  });
  captureButton.addEventListener('click', captureScreen);
  attachButton.addEventListener('click', attachFiles);
  removeScreenshotButton.addEventListener('click', clearScreenshot);
  removeFileButton.addEventListener('click', clearFiles);
  sendButton.addEventListener('click', sendMessage);
  textarea.addEventListener('input', updateTextareaHeight);
  textarea.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });
})();
