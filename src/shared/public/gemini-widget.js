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
      .close:focus-visible, .remove-shot:focus-visible {
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

    <section class="panel" aria-label="Gemini chat" aria-hidden="true">
      <header class="header">
        <span class="gemini-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M16 2c1.5 8.1 5.9 12.5 14 14-8.1 1.5-12.5 5.9-14 14C14.5 21.9 10.1 17.5 2 16 10.1 14.5 14.5 10.1 16 2Z" fill="url(#gemini-gradient-widget)"/>
            <defs><linearGradient id="gemini-gradient-widget" x1="5" y1="5" x2="27" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#5EB9F0"/><stop offset=".48" stop-color="#A77BF3"/><stop offset="1" stop-color="#F38CB3"/></linearGradient></defs>
          </svg>
        </span>
        <span class="heading">
          <strong>Ask Gemini</strong>
          <span>Chat about this page or attach your screen</span>
        </span>
        <button class="close" type="button" aria-label="Close Gemini chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
      </header>

      <div class="messages" aria-live="polite">
        <div class="message assistant">Hi! Ask me anything. Use the screen button to include what you are viewing.</div>
      </div>

      <div class="composer-area">
        <div class="shot-preview">
          <img alt="Screenshot ready to send">
          <span>Screenshot attached</span>
          <button class="remove-shot" type="button" aria-label="Remove screenshot">×</button>
        </div>
        <div class="composer">
          <button class="icon-button capture" type="button" aria-label="Capture current screen" title="Attach a screenshot of the current tab">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8.5 5 10 3h4l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5Z"/>
              <circle cx="12" cy="12" r="3.5"/>
            </svg>
          </button>
          <textarea rows="1" maxlength="8000" aria-label="Message Gemini" placeholder="Ask Gemini…"></textarea>
          <button class="send" type="button" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 14-7-4 14-3-6-7-1Z"/><path d="m12 13 7-8"/></svg>
          </button>
        </div>
        <div class="status" role="status"></div>
      </div>
    </section>

    <button class="launcher" type="button" aria-label="Open Gemini chat" aria-expanded="false">
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 2c1.5 8.1 5.9 12.5 14 14-8.1 1.5-12.5 5.9-14 14C14.5 21.9 10.1 17.5 2 16 10.1 14.5 14.5 10.1 16 2Z" fill="url(#gemini-gradient-launcher)"/>
        <defs><linearGradient id="gemini-gradient-launcher" x1="5" y1="5" x2="27" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#BEE9FF"/><stop offset=".48" stop-color="#E3D2FF"/><stop offset="1" stop-color="#FFD1E1"/></linearGradient></defs>
      </svg>
    </button>
  `;

  const panel = root.querySelector('.panel');
  const launcher = root.querySelector('.launcher');
  const closeButton = root.querySelector('.close');
  const messages = root.querySelector('.messages');
  const textarea = root.querySelector('textarea');
  const sendButton = root.querySelector('.send');
  const captureButton = root.querySelector('.capture');
  const preview = root.querySelector('.shot-preview');
  const previewImage = preview.querySelector('img');
  const removeScreenshotButton = root.querySelector('.remove-shot');
  const status = root.querySelector('.status');

  const conversation = [];
  let screenshot = null;
  let requestInProgress = false;

  function setOpen(open) {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Close Gemini chat' : 'Open Gemini chat');
    if (open) window.setTimeout(() => textarea.focus(), 30);
  }

  function scrollToLatest() {
    messages.scrollTop = messages.scrollHeight;
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
    if (!message || requestInProgress) return;

    const outgoingScreenshot = screenshot;
    appendMessage('user', message, outgoingScreenshot && outgoingScreenshot.previewUrl);
    textarea.value = '';
    updateTextareaHeight();
    clearScreenshot();

    requestInProgress = true;
    sendButton.disabled = true;
    captureButton.disabled = true;
    status.textContent = 'Gemini is thinking…';
    const typing = appendMessage('assistant typing', '');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: conversation.slice(-10),
          image: outgoingScreenshot
            ? { mimeType: outgoingScreenshot.mimeType, data: outgoingScreenshot.data }
            : undefined
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Gemini did not return a reply.');

      typing.remove();
      appendMessage('assistant', data.reply);
      conversation.push(
        { role: 'user', text: message },
        { role: 'assistant', text: data.reply }
      );
      if (conversation.length > 20) conversation.splice(0, conversation.length - 20);
      status.textContent = '';
    } catch (error) {
      typing.remove();
      appendMessage('error', error.message || 'Unable to reach Gemini.');
      status.textContent = '';
    } finally {
      requestInProgress = false;
      sendButton.disabled = false;
      captureButton.disabled = false;
      textarea.focus();
    }
  }

  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  closeButton.addEventListener('click', () => setOpen(false));
  captureButton.addEventListener('click', captureScreen);
  removeScreenshotButton.addEventListener('click', clearScreenshot);
  sendButton.addEventListener('click', sendMessage);
  textarea.addEventListener('input', updateTextareaHeight);
  textarea.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });
})();
