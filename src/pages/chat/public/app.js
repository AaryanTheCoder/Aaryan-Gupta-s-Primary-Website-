const messagesElement = document.querySelector('#messages');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const sendButton = document.querySelector('#sendButton');
const fileInput = document.querySelector('#fileInput');
const clearButton = document.querySelector('#clearButton');
const nameButton = document.querySelector('#nameButton');
const nameDialog = document.querySelector('#nameDialog');
const nameForm = document.querySelector('#nameForm');
const nameInput = document.querySelector('#nameInput');
const nameError = document.querySelector('#nameError');
const uploadStatus = document.querySelector('#uploadStatus');
const uploadLabel = document.querySelector('#uploadLabel');
const uploadPercent = document.querySelector('#uploadPercent');
const uploadProgress = document.querySelector('#uploadProgress');

const MAX_FILE_BYTES = 500 * 1024 * 1024;
let displayName = localStorage.getItem('publicChatName') || '';
let latestSignature = '';
let firstLoad = true;

function showNameDialog() {
  nameInput.value = displayName;
  nameError.textContent = '';
  if (!nameDialog.open) nameDialog.showModal();
  setTimeout(() => nameInput.focus(), 0);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unit = units[0];
  for (let index = 1; value >= 1024 && index < units.length; index += 1) {
    value /= 1024;
    unit = units[index];
  }
  return `${value >= 10 ? value.toFixed(1) : value.toFixed(2)} ${unit}`;
}

function makeMessageElement(message) {
  const article = document.createElement('article');
  article.className = 'message';

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = message.name.slice(0, 1) || '?';

  const content = document.createElement('div');
  const heading = document.createElement('div');
  heading.className = 'message-heading';
  const name = document.createElement('strong');
  name.textContent = message.name;
  const time = document.createElement('time');
  const date = new Date(message.createdAt);
  time.dateTime = message.createdAt;
  time.textContent = Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
  heading.append(name, time);
  content.append(heading);

  if (message.type === 'file' && message.file) {
    const link = document.createElement('a');
    link.className = 'file-card';
    link.href = `/chat/files/${encodeURIComponent(message.id)}`;
    link.innerHTML = '<span class="file-icon">📎</span>';
    const details = document.createElement('span');
    details.className = 'file-details';
    const fileName = document.createElement('strong');
    fileName.textContent = message.file.name;
    const size = document.createElement('span');
    size.textContent = formatBytes(message.file.size);
    details.append(fileName, size);
    const download = document.createElement('span');
    download.className = 'download-icon';
    download.textContent = '↓';
    link.append(details, download);
    content.append(link);
  } else {
    const text = document.createElement('p');
    text.className = 'message-text';
    text.textContent = message.text;
    content.append(text);
  }

  article.append(avatar, content);
  return article;
}

function renderMessages(messages) {
  const signature = messages.map(message => message.id).join(',');
  if (signature === latestSignature) return;
  latestSignature = signature;

  const nearBottom = messagesElement.scrollHeight - messagesElement.scrollTop - messagesElement.clientHeight < 100;
  messagesElement.replaceChildren();
  if (!messages.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<span>👋</span><h2>It’s quiet in here</h2><p>Send the first message!</p>';
    messagesElement.append(empty);
  } else {
    messages.forEach(message => messagesElement.append(makeMessageElement(message)));
  }

  if (firstLoad || nearBottom) messagesElement.scrollTop = messagesElement.scrollHeight;
  firstLoad = false;
}

async function refreshMessages() {
  try {
    const response = await fetch('/chat/api/messages', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    renderMessages(data.messages || []);
  } catch {
    // A later poll will try again if the connection briefly drops.
  }
}

nameForm.addEventListener('submit', event => {
  event.preventDefault();
  const chosenName = nameInput.value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 32);
  if (!chosenName) {
    nameError.textContent = 'Please enter a name.';
    return;
  }
  displayName = chosenName;
  localStorage.setItem('publicChatName', displayName);
  nameDialog.close();
  messageInput.focus();
});

nameDialog.addEventListener('cancel', event => {
  if (!displayName) event.preventDefault();
});

nameButton.addEventListener('click', showNameDialog);

messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto';
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 130)}px`;
});

messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    messageForm.requestSubmit();
  }
});

messageForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!displayName) {
    showNameDialog();
    return;
  }
  const text = messageInput.value.trim();
  if (!text) return;

  sendButton.disabled = true;
  try {
    const response = await fetch('/chat/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: displayName, text })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Message could not be sent.');
    messageInput.value = '';
    messageInput.style.height = 'auto';
    await refreshMessages();
  } catch (error) {
    alert(error.message);
  } finally {
    sendButton.disabled = false;
    messageInput.focus();
  }
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  fileInput.value = '';
  if (!file) return;
  if (!displayName) {
    showNameDialog();
    return;
  }
  if (file.size > MAX_FILE_BYTES) {
    alert('That file is larger than 500 MB.');
    return;
  }

  const request = new XMLHttpRequest();
  const url = `/chat/api/files?name=${encodeURIComponent(displayName)}&filename=${encodeURIComponent(file.name)}`;
  request.open('POST', url);
  request.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
  uploadStatus.hidden = false;
  uploadLabel.textContent = `Uploading ${file.name}`;
  uploadProgress.value = 0;
  uploadPercent.textContent = '0%';

  request.upload.addEventListener('progress', event => {
    if (!event.lengthComputable) return;
    const percent = Math.round((event.loaded / event.total) * 100);
    uploadProgress.value = percent;
    uploadPercent.textContent = `${percent}%`;
  });

  request.addEventListener('load', async () => {
    uploadStatus.hidden = true;
    if (request.status < 200 || request.status >= 300) {
      let error = 'The file could not be uploaded.';
      try {
        error = JSON.parse(request.responseText).error || error;
      } catch {}
      alert(error);
      return;
    }
    await refreshMessages();
  });

  request.addEventListener('error', () => {
    uploadStatus.hidden = true;
    alert('The upload failed. Please check your connection and try again.');
  });
  request.send(file);
});

clearButton.addEventListener('click', async () => {
  const confirmed = confirm('Clear every public message and uploaded file? This cannot be undone.');
  if (!confirmed) return;
  clearButton.disabled = true;
  try {
    const response = await fetch('/chat/api/messages', { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Chat could not be cleared.');
    latestSignature = '__refresh__';
    await refreshMessages();
  } catch (error) {
    alert(error.message);
  } finally {
    clearButton.disabled = false;
  }
});

refreshMessages();
setInterval(refreshMessages, 2000);
if (!displayName) showNameDialog();
