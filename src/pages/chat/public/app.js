const messagesElement = document.querySelector('#messages');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const sendButton = document.querySelector('#sendButton');
const fileInput = document.querySelector('#fileInput');
const folderInput = document.querySelector('#folderInput');
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
const shareDialog = document.querySelector('#shareDialog');
const shareForm = document.querySelector('#shareForm');
const shareSummary = document.querySelector('#shareSummary');
const sharePinInput = document.querySelector('#sharePinInput');
const shareError = document.querySelector('#shareError');
const savedShareButton = document.querySelector('#savedShareButton');
const liveShareButton = document.querySelector('#liveShareButton');

const SAVED_FILE_BYTES = 200 * 1024 * 1024;
const LIVE_CHUNK_BYTES = 8 * 1024 * 1024;
let displayName = localStorage.getItem('publicChatName') || '';
let latestSignature = '';
let firstLoad = true;
let pendingShare = null;
const senderTransfers = new Map();
const receiverTransfers = new Set();

function showNameDialog() {
  nameInput.value = displayName;
  nameError.textContent = '';
  if (!nameDialog.open) nameDialog.showModal();
  setTimeout(() => nameInput.focus(), 0);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unit = units[0];
  for (let index = 1; value >= 1024 && index < units.length; index += 1) {
    value /= 1024;
    unit = units[index];
  }
  return `${value >= 10 ? value.toFixed(1) : value.toFixed(2)} ${unit}`;
}

function cleanPath(value) {
  return String(value || '')
    .replace(/\\/g, '/')
    .split('/')
    .filter(part => part && part !== '.' && part !== '..')
    .join('/');
}

function filePathFor(file, kind) {
  if (kind === 'folder') return cleanPath(file.webkitRelativePath || file.name) || file.name;
  return file.name;
}

function fileNameFromPath(filePath) {
  const parts = cleanPath(filePath).split('/').filter(Boolean);
  return parts[parts.length - 1] || 'download';
}

function makeTransferFiles(files, kind) {
  return files.map(file => ({
    path: filePathFor(file, kind),
    size: file.size
  }));
}

function messageSignature(message) {
  const stream = message.stream;
  return [
    message.id,
    stream && stream.status,
    stream && stream.acceptedBy,
    stream && stream.completedAt
  ].filter(Boolean).join(':');
}

function makeLiveTransferElement(message, content) {
  const stream = message.stream;
  const card = document.createElement('div');
  card.className = 'file-card stream-card';

  const icon = document.createElement('span');
  icon.className = 'file-icon';
  icon.textContent = stream.kind === 'folder' ? '📁' : '⇄';

  const details = document.createElement('span');
  details.className = 'file-details';
  const title = document.createElement('strong');
  title.textContent = stream.title;
  const meta = document.createElement('span');
  meta.textContent = `${stream.kind === 'folder' ? `${stream.fileCount} files` : 'Live file'} · ${formatBytes(stream.totalSize)} · 8 MB chunks`;
  details.append(title, meta);

  const status = document.createElement('span');
  status.className = `stream-status ${stream.status || 'waiting'}`;
  status.textContent = stream.status === 'completed'
    ? 'Done'
    : stream.status === 'accepted'
      ? `Accepted${stream.acceptedBy ? ` by ${stream.acceptedBy}` : ''}`
      : stream.pinRequired
        ? 'PIN needed'
        : 'Accept';

  card.append(icon, details, status);

  if (stream.status === 'waiting' && message.name !== displayName) {
    const accept = document.createElement('button');
    accept.className = 'stream-accept-button';
    accept.type = 'button';
    accept.textContent = 'Accept live transfer';
    accept.addEventListener('click', () => acceptLiveTransfer(message));
    card.append(accept);
  }

  if (message.name === displayName && senderTransfers.has(message.id)) {
    const senderState = senderTransfers.get(message.id);
    const senderHint = document.createElement('span');
    senderHint.className = 'stream-hint';
    senderHint.textContent = senderState.statusText || 'Keep this tab open until someone accepts.';
    card.append(senderHint);
  }

  content.append(card);
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
  } else if (message.type === 'folder' && message.folder) {
    const folder = document.createElement('details');
    folder.className = 'file-card folder-card';
    const summary = document.createElement('summary');
    summary.innerHTML = '<span class="file-icon">📁</span>';
    const details = document.createElement('span');
    details.className = 'file-details';
    const folderName = document.createElement('strong');
    folderName.textContent = message.folder.name;
    const folderSize = document.createElement('span');
    folderSize.textContent = `${message.folder.fileCount} files · ${formatBytes(message.folder.size)}`;
    details.append(folderName, folderSize);
    summary.append(details);
    folder.append(summary);
    const files = document.createElement('div');
    files.className = 'folder-files';
    message.folder.files.forEach(item => {
      const link = document.createElement('a');
      link.href = `/chat/folders/${encodeURIComponent(message.id)}?path=${encodeURIComponent(item.path)}`;
      link.textContent = `${item.path} (${formatBytes(item.size)})`;
      files.append(link);
    });
    folder.append(files);
    content.append(folder);
  } else if (message.type === 'stream' && message.stream) {
    makeLiveTransferElement(message, content);
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
  const signature = messages.map(messageSignature).join(',');
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

function setUploadStatus(label, percent) {
  uploadStatus.hidden = false;
  uploadLabel.textContent = label;
  uploadProgress.value = percent;
  uploadPercent.textContent = `${percent}%`;
}

function hideUploadStatus() {
  uploadStatus.hidden = true;
}

function chooseShare(files, kind) {
  if (!displayName) {
    showNameDialog();
    return;
  }
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const title = kind === 'folder'
    ? ((files[0].webkitRelativePath || files[0].name).split('/')[0] || 'Folder')
    : files[0].name;
  pendingShare = { files, kind, title, totalSize };
  sharePinInput.value = '';
  shareError.textContent = '';
  shareSummary.textContent = `${title} · ${files.length} file${files.length === 1 ? '' : 's'} · ${formatBytes(totalSize)}`;
  savedShareButton.disabled = totalSize > SAVED_FILE_BYTES;
  savedShareButton.textContent = totalSize > SAVED_FILE_BYTES ? 'Saved upload unavailable' : 'Saved upload';
  liveShareButton.textContent = totalSize > SAVED_FILE_BYTES ? 'Large live transfer' : 'Live transfer';
  if (!shareDialog.open) shareDialog.showModal();
}

function uploadSingleSavedFile(file) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    const url = `/chat/api/files?name=${encodeURIComponent(displayName)}&filename=${encodeURIComponent(file.name)}`;
    request.open('POST', url);
    request.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    setUploadStatus(`Uploading ${file.name}`, 0);

    request.upload.addEventListener('progress', event => {
      if (!event.lengthComputable) return;
      const percent = Math.round((event.loaded / event.total) * 100);
      setUploadStatus(`Uploading ${file.name}`, percent);
    });

    request.addEventListener('load', () => {
      if (request.status < 200 || request.status >= 300) {
        let error = 'The file could not be uploaded.';
        try {
          error = JSON.parse(request.responseText).error || error;
        } catch {}
        reject(new Error(error));
        return;
      }
      resolve();
    });

    request.addEventListener('error', () => reject(new Error('The upload failed. Please check your connection and try again.')));
    request.send(file);
  });
}

async function uploadSavedFolder(files, folderName, totalSize) {
  const startResponse = await fetch('/chat/api/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: displayName, folderName, totalSize, fileCount: files.length })
  });
  const startData = await startResponse.json();
  if (!startResponse.ok) throw new Error(startData.error || 'The folder upload could not start.');

  let uploadedBytes = 0;
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const relativePath = (file.webkitRelativePath || file.name).split('/').slice(1).join('/') || file.name;
    setUploadStatus(`Uploading ${folderName} (${index + 1}/${files.length})`, Math.round((uploadedBytes / totalSize) * 100) || 0);
    const response = await fetch(`/chat/api/folders/${startData.uploadId}/files?path=${encodeURIComponent(relativePath)}`, {
      method: 'POST',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `Could not upload ${relativePath}.`);
    uploadedBytes += file.size;
    setUploadStatus(`Uploading ${folderName} (${index + 1}/${files.length})`, totalSize ? Math.round((uploadedBytes / totalSize) * 100) : 100);
  }

  const finishResponse = await fetch(`/chat/api/folders/${startData.uploadId}/finish`, { method: 'POST' });
  const finishData = await finishResponse.json();
  if (!finishResponse.ok) throw new Error(finishData.error || 'The folder upload could not finish.');
}

async function uploadSavedShare() {
  if (!pendingShare || pendingShare.totalSize > SAVED_FILE_BYTES) return;
  const share = pendingShare;
  shareDialog.close();
  pendingShare = null;

  try {
    if (share.kind === 'file') {
      await uploadSingleSavedFile(share.files[0]);
    } else {
      await uploadSavedFolder(share.files, share.title, share.totalSize);
    }
    await refreshMessages();
  } catch (error) {
    alert(error.message);
  } finally {
    hideUploadStatus();
  }
}

async function waitForReceiver(messageId, senderToken) {
  for (;;) {
    const response = await fetch(`/chat/api/streams/${encodeURIComponent(messageId)}/status`, {
      headers: { 'X-Sender-Token': senderToken },
      cache: 'no-store'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not check live transfer status.');
    if (data.status === 'accepted') return data;
    if (data.status === 'completed' || data.status === 'cancelled' || data.status === 'failed') {
      throw new Error('The live transfer ended before a receiver accepted it.');
    }
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

async function sendLiveChunks(messageId, senderToken, files, kind, totalSize) {
  let sentBytes = 0;
  let seq = 0;

  for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
    const file = files[fileIndex];
    let offset = 0;
    while (offset < file.size || (file.size === 0 && offset === 0)) {
      const end = Math.min(offset + LIVE_CHUNK_BYTES, file.size);
      const body = file.size === 0 ? new Blob([]) : file.slice(offset, end);
      const fileDone = end >= file.size;
      const transferDone = fileDone && fileIndex === files.length - 1;
      const url = `/chat/api/streams/${encodeURIComponent(messageId)}/chunks?seq=${seq}&fileIndex=${fileIndex}&offset=${offset}&fileDone=${fileDone ? '1' : '0'}&transferDone=${transferDone ? '1' : '0'}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-Sender-Token': senderToken
        },
        body
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'A live transfer chunk could not be sent.');

      sentBytes += body.size;
      const percent = totalSize ? Math.round((sentBytes / totalSize) * 100) : 100;
      setUploadStatus(`Live sending ${kind === 'folder' ? 'folder' : file.name}`, percent);
      seq += 1;
      offset = end;
      if (file.size === 0) break;
    }
  }
}

async function startLiveShare() {
  if (!pendingShare) return;
  const pin = sharePinInput.value.trim();
  if (pin && !/^\d{4}$/.test(pin)) {
    shareError.textContent = 'PIN must be exactly 4 digits.';
    return;
  }

  const share = pendingShare;
  shareDialog.close();
  pendingShare = null;

  try {
    const response = await fetch('/chat/api/streams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: displayName,
        title: share.title,
        kind: share.kind,
        totalSize: share.totalSize,
        fileCount: share.files.length,
        files: makeTransferFiles(share.files, share.kind),
        pin
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not create live transfer invite.');

    senderTransfers.set(data.message.id, {
      statusText: 'Waiting for someone to accept. Keep this tab open.'
    });
    await refreshMessages();
    setUploadStatus('Waiting for receiver to accept live transfer', 0);
    await waitForReceiver(data.message.id, data.senderToken);
    senderTransfers.set(data.message.id, { statusText: 'Receiver accepted. Sending now...' });
    await refreshMessages();
    await sendLiveChunks(data.message.id, data.senderToken, share.files, share.kind, share.totalSize);
    senderTransfers.set(data.message.id, { statusText: 'Live transfer complete.' });
    setUploadStatus('Live transfer complete', 100);
    await refreshMessages();
    setTimeout(hideUploadStatus, 1200);
  } catch (error) {
    hideUploadStatus();
    alert(error.message);
  }
}

async function getWritableForFile(fileName) {
  if (!window.showSaveFilePicker) {
    throw new Error('Your browser cannot stream-save huge files. Use Chrome or Edge for live transfers.');
  }
  const handle = await window.showSaveFilePicker({ suggestedName: fileName });
  return handle.createWritable();
}

async function getWritableForFolderFile(directoryHandle, filePath) {
  const parts = cleanPath(filePath).split('/').filter(Boolean);
  const fileName = parts.pop() || 'download';
  let directory = directoryHandle;
  for (const part of parts) {
    directory = await directory.getDirectoryHandle(part, { create: true });
  }
  const handle = await directory.getFileHandle(fileName, { create: true });
  return handle.createWritable();
}

async function acceptLiveTransfer(message) {
  if (!displayName) {
    showNameDialog();
    return;
  }
  if (receiverTransfers.has(message.id)) return;
  if (message.stream.kind === 'folder' && !window.showDirectoryPicker) {
    alert('Your browser cannot stream-save folders. Use Chrome or Edge for live folder transfers.');
    return;
  }

  const pin = message.stream.pinRequired ? prompt('Enter the 4-digit PIN for this live transfer:') : '';
  if (message.stream.pinRequired && !/^\d{4}$/.test(String(pin || ''))) {
    alert('A 4-digit PIN is required.');
    return;
  }

  try {
    const saveTarget = message.stream.kind === 'folder'
      ? await window.showDirectoryPicker({ mode: 'readwrite' })
      : await getWritableForFile(fileNameFromPath(message.stream.files[0]?.path || message.stream.title));
    const response = await fetch(`/chat/api/streams/${encodeURIComponent(message.id)}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: displayName, pin })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not accept live transfer.');

    receiverTransfers.add(message.id);
    await refreshMessages();
    await receiveLiveTransfer(message.id, data.receiverToken, data.stream, saveTarget);
  } catch (error) {
    receiverTransfers.delete(message.id);
    hideUploadStatus();
    alert(error.message);
  }
}

async function receiveLiveTransfer(messageId, receiverToken, stream, saveTarget) {
  const folderHandle = stream.kind === 'folder' ? saveTarget : null;
  const openWriters = new Map();
  let currentWritable = null;
  let currentFileIndex = -1;
  let receivedBytes = 0;
  let seq = 0;

  try {
    for (;;) {
      const response = await fetch(`/chat/api/streams/${encodeURIComponent(messageId)}/chunks/next?receiverToken=${encodeURIComponent(receiverToken)}&seq=${seq}`, {
        cache: 'no-store'
      });
      if (response.status === 204) {
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }
      if (!response.ok) throw new Error(await response.text() || 'Could not receive the next live chunk.');

      const fileIndex = Number(response.headers.get('X-File-Index'));
      const filePath = decodeURIComponent(response.headers.get('X-File-Path') || '');
      const fileDone = response.headers.get('X-File-Done') === '1';
      const transferDone = response.headers.get('X-Transfer-Done') === '1';
      const chunk = await response.arrayBuffer();

      if (fileIndex !== currentFileIndex) {
        if (currentWritable) await currentWritable.close();
        currentFileIndex = fileIndex;
        if (stream.kind === 'folder') {
          currentWritable = await getWritableForFolderFile(folderHandle, filePath);
        } else {
          currentWritable = saveTarget;
        }
        openWriters.set(fileIndex, currentWritable);
      }

      await currentWritable.write(new Uint8Array(chunk));
      receivedBytes += chunk.byteLength;
      const percent = stream.totalSize ? Math.round((receivedBytes / stream.totalSize) * 100) : 100;
      setUploadStatus(`Receiving ${stream.title}`, percent);

      if (fileDone && currentWritable) {
        await currentWritable.close();
        openWriters.delete(fileIndex);
        currentWritable = null;
        currentFileIndex = -1;
      }
      seq += 1;
      if (transferDone) break;
    }

    setUploadStatus('Live transfer received', 100);
    setTimeout(hideUploadStatus, 1200);
  } finally {
    for (const writable of openWriters.values()) {
      try {
        await writable.close();
      } catch {}
    }
    receiverTransfers.delete(messageId);
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

shareForm.addEventListener('submit', event => event.preventDefault());
savedShareButton.addEventListener('click', uploadSavedShare);
liveShareButton.addEventListener('click', startLiveShare);
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
  chooseShare([file], 'file');
});

folderInput.addEventListener('change', () => {
  const files = Array.from(folderInput.files || []);
  folderInput.value = '';
  if (!files.length) return;
  chooseShare(files, 'folder');
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
