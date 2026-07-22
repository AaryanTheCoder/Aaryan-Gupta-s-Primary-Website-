const form = document.querySelector('#feedback-form');
const imageInput = document.querySelector('#images');
const previewGrid = document.querySelector('#preview-grid');
const formStatus = document.querySelector('#form-status');
const submitButton = form.querySelector('button[type="submit"]');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const descriptionInput = document.querySelector('#description');
const adminOpen = document.querySelector('#admin-open');
const adminModal = document.querySelector('#admin-modal');
const adminLogin = document.querySelector('#admin-login');
const adminPassword = document.querySelector('#admin-password');
const adminStatus = document.querySelector('#admin-status');
const feedbackList = document.querySelector('#feedback-list');
const MAX_TOTAL_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_IMAGE_COUNT = 6;

let selectedImages = [];
let adminAuthHeader = '';

function setStatus(element, message, type) {
  element.textContent = message;
  element.classList.toggle('is-error', type === 'error');
  element.classList.toggle('is-ok', type === 'ok');
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB'];
  let value = bytes;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function renderPreviews() {
  previewGrid.innerHTML = selectedImages.map(image => `
    <article class="preview-card">
      <img src="${image.dataUrl}" alt="${escapeHtml(image.name)} preview" />
      <p>${escapeHtml(image.name)}<br>${formatBytes(image.size)}</p>
    </article>
  `).join('');
}

async function collectImages(files) {
  const images = Array.from(files);
  const totalBytes = images.reduce((sum, file) => sum + file.size, 0);

  if (images.length > MAX_IMAGE_COUNT) {
    throw new Error(`Please attach ${MAX_IMAGE_COUNT} images or fewer.`);
  }

  if (totalBytes > MAX_TOTAL_IMAGE_BYTES) {
    throw new Error('Your image attachments must be 20 MB or smaller in total.');
  }

  for (const file of images) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files can be attached.');
    }
  }

  return Promise.all(images.map(async file => ({
    name: file.name,
    size: file.size,
    type: file.type,
    dataUrl: await readFileAsDataUrl(file)
  })));
}

imageInput.addEventListener('change', async () => {
  try {
    setStatus(formStatus, '', '');
    selectedImages = await collectImages(imageInput.files);
    renderPreviews();
  } catch (error) {
    imageInput.value = '';
    selectedImages = [];
    renderPreviews();
    setStatus(formStatus, error.message, 'error');
  }
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  submitButton.disabled = true;
  setStatus(formStatus, 'Saving...', '');

  const payload = {
    name: nameInput.value,
    email: emailInput.value,
    description: descriptionInput.value,
    images: selectedImages.map(image => ({
      name: image.name,
      dataUrl: image.dataUrl
    }))
  };

  try {
    const response = await fetch('/extension-feedback/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      throw new Error(result.error || 'Feedback could not be saved.');
    }

    form.reset();
    selectedImages = [];
    renderPreviews();
    setStatus(formStatus, 'Saved. Thank you for the feedback!', 'ok');
  } catch (error) {
    setStatus(formStatus, error.message, 'error');
  } finally {
    submitButton.disabled = false;
  }
});

function openAdmin() {
  adminModal.classList.add('is-open');
  adminModal.setAttribute('aria-hidden', 'false');
  adminPassword.focus();
}

function closeAdmin() {
  adminModal.classList.remove('is-open');
  adminModal.setAttribute('aria-hidden', 'true');
}

adminOpen.addEventListener('click', openAdmin);

document.querySelectorAll('[data-close-admin]').forEach(button => {
  button.addEventListener('click', closeAdmin);
});

async function loadAdminImage(image) {
  const response = await fetch(image.url, {
    headers: { Authorization: adminAuthHeader }
  });

  if (!response.ok) return '';
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  return `
    <a href="${objectUrl}" target="_blank" rel="noopener">
      <img src="${objectUrl}" alt="${escapeHtml(image.originalName)}" />
      <span>${escapeHtml(image.originalName)}</span>
    </a>
  `;
}

async function renderFeedback(items) {
  if (!items.length) {
    feedbackList.innerHTML = '<p>No feedback yet.</p>';
    return;
  }

  feedbackList.innerHTML = items.map(item => `
    <article class="feedback-card" data-feedback-id="${escapeHtml(item.id)}">
      <header>
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          <a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a>
        </div>
        <time datetime="${escapeHtml(item.createdAt)}">${new Date(item.createdAt).toLocaleString()}</time>
      </header>
      <p>${escapeHtml(item.description)}</p>
      <div class="admin-images" data-images-for="${escapeHtml(item.id)}"></div>
    </article>
  `).join('');

  for (const item of items) {
    const imageWrap = feedbackList.querySelector(`[data-images-for="${CSS.escape(item.id)}"]`);
    if (!imageWrap || !item.images || !item.images.length) continue;
    imageWrap.innerHTML = 'Loading images...';
    const imageHtml = await Promise.all(item.images.map(loadAdminImage));
    imageWrap.innerHTML = imageHtml.filter(Boolean).join('') || 'Images could not be loaded.';
  }
}

adminLogin.addEventListener('submit', async event => {
  event.preventDefault();
  adminAuthHeader = `Basic ${btoa(`:${adminPassword.value}`)}`;
  setStatus(adminStatus, 'Checking...', '');

  try {
    const response = await fetch('/extension-feedback/api/admin/feedback', {
      headers: { Authorization: adminAuthHeader }
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.error || 'Wrong password or admin is not configured.');
    }

    setStatus(adminStatus, `Showing ${result.feedback.length} feedback item${result.feedback.length === 1 ? '' : 's'}.`, 'ok');
    await renderFeedback(result.feedback);
  } catch (error) {
    feedbackList.innerHTML = '';
    setStatus(adminStatus, error.message, 'error');
  }
});
