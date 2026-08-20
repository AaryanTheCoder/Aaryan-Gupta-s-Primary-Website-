(function () {
  'use strict';

  const codeInput = document.getElementById('codeInput');
  const languageSelect = document.getElementById('languageSelect');
  const highlightLayer = document.getElementById('highlightLayer');
  const lineNumbers = document.getElementById('lineNumbers');
  const validationMessage = document.getElementById('validationMessage');
  const saveStatus = document.getElementById('saveStatus');
  const statusDot = document.getElementById('statusDot');
  const saveButton = document.getElementById('saveButton');
  const copyButton = document.getElementById('copyButton');
  const pasteButton = document.getElementById('pasteButton');
  let saveTimer = null;
  let isLoaded = false;
  let isSaving = false;

  const keywordPattern = /\b(const|let|var|function|return|if|else|for|while|class|new|import|from|export|async|await|try|catch|throw|def|lambda|in|and|or|not|True|False|None|public|private|static|void|int|double|boolean|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|TABLE|JOIN|ON|AS|NULL)\b/g;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character]));
  }

  function lineForPosition(code, position) {
    return code.slice(0, Math.max(0, position)).split('\n').length;
  }

  function validateBrackets(code, language) {
    const pairs = { '(': ')', '[': ']', '{': '}' };
    const closing = new Set(Object.values(pairs));
    const stack = [];
    let quote = '';
    let escaped = false;
    let lineComment = false;
    let blockComment = false;
    for (let index = 0; index < code.length; index += 1) {
      const character = code[index];
      const nextCharacter = code[index + 1];

      if (lineComment) {
        if (character === '\n') lineComment = false;
        continue;
      }
      if (blockComment) {
        if (character === '*' && nextCharacter === '/') {
          blockComment = false;
          index += 1;
        }
        continue;
      }
      if (quote) {
        if (escaped) {
          escaped = false;
        } else if (character === '\\') {
          escaped = true;
        } else if (character === quote) {
          quote = '';
        }
        continue;
      }
      if (character === '"' || character === "'" || character === '`') {
        quote = character;
        continue;
      }
      if (character === '/' && nextCharacter === '/' && language !== 'json') {
        lineComment = true;
        index += 1;
        continue;
      }
      if (character === '/' && nextCharacter === '*') {
        blockComment = true;
        index += 1;
        continue;
      }
      if (character === '#' && (language === 'python' || language === 'markdown')) {
        lineComment = true;
        continue;
      }
      if (pairs[character]) stack.push({ character, line: lineForPosition(code, index) });
      if (closing.has(character)) {
        const opening = stack.pop();
        if (!opening || pairs[opening.character] !== character) {
          return { ok: false, line: lineForPosition(code, index), message: `Unexpected “${character}”.` };
        }
      }
    }
    if (stack.length) {
      const opening = stack.pop();
      return { ok: false, line: opening.line, message: `“${opening.character}” is missing its closing character.` };
    }
    return { ok: true };
  }

  function validateHtml(code) {
    const stack = [];
    const tags = /<\/?([a-zA-Z][\w-]*)(?:\s[^<>]*)?>/g;
    const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
    let match;
    while ((match = tags.exec(code))) {
      const fullTag = match[0];
      const name = match[1].toLowerCase();
      if (voidTags.has(name) || fullTag.endsWith('/>')) continue;
      if (fullTag.startsWith('</')) {
        const opening = stack.pop();
        if (!opening || opening.name !== name) return { ok: false, line: lineForPosition(code, match.index), message: `Closing </${name}> does not match the open tag.` };
      } else {
        stack.push({ name, line: lineForPosition(code, match.index) });
      }
    }
    if (stack.length) {
      const opening = stack.pop();
      return { ok: false, line: opening.line, message: `<${opening.name}> has no closing tag.` };
    }
    return { ok: true };
  }

  function validateCode(code, language) {
    if (!code.trim()) return { ok: true, message: 'Ready — start typing or paste code here.' };
    if (language === 'json') {
      try {
        JSON.parse(code);
        return { ok: true, message: 'JSON is valid.' };
      } catch (error) {
        const positionMatch = /position (\d+)/.exec(error.message);
        const line = positionMatch ? lineForPosition(code, Number(positionMatch[1])) : 1;
        return { ok: false, line, message: `JSON error: ${error.message}` };
      }
    }
    if (language === 'html') {
      const html = validateHtml(code);
      return html.ok ? { ok: true, message: 'HTML tags look balanced.' } : html;
    }
    const brackets = validateBrackets(code, language);
    if (!brackets.ok) return brackets;
    if (language === 'javascript') {
      try {
        new Function(code);
      } catch (error) {
        return { ok: false, line: code.split('\n').length, message: `JavaScript error: ${error.message}` };
      }
    }
    return { ok: true, message: `${language === 'css' ? 'CSS' : language} looks structurally valid.` };
  }

  function highlightLine(line, language) {
    let result = '';
    const tokenPattern = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[a-zA-Z][^>]*>|\b\d+(?:\.\d+)?\b/g;
    let cursor = 0;
    let match;
    function paintPlain(text) {
      return escapeHtml(text).replace(keywordPattern, '<span class="token-keyword">$1</span>');
    }
    while ((match = tokenPattern.exec(line))) {
      result += paintPlain(line.slice(cursor, match.index));
      const token = match[0];
      let className = 'token-string';
      if (/^\/\//.test(token) || /^\/\*/.test(token) || (language === 'python' && /^#/.test(token))) className = 'token-comment';
      else if (/^<\/?/.test(token)) className = 'token-tag';
      else if (/^\d/.test(token)) className = 'token-number';
      result += `<span class="${className}">${escapeHtml(token)}</span>`;
      cursor = match.index + token.length;
    }
    return result + paintPlain(line.slice(cursor));
  }

  function renderEditor() {
    const code = codeInput.value;
    const language = languageSelect.value;
    const check = validateCode(code, language);
    const lines = code.split('\n');
    highlightLayer.innerHTML = lines.map((line, index) => {
      const contents = highlightLine(line, language) || ' ';
      return check.line === index + 1 ? `<span class="lint-error">${contents}</span>` : contents;
    }).join('\n');
    lineNumbers.textContent = lines.map((_, index) => index + 1).join('\n');
    validationMessage.textContent = check.ok ? check.message : check.message;
    validationMessage.classList.toggle('error', !check.ok);
    syncScroll();
  }

  function syncScroll() {
    const top = -codeInput.scrollTop;
    const left = -codeInput.scrollLeft;
    highlightLayer.style.transform = `translate(${left}px, ${top}px)`;
    lineNumbers.style.transform = `translateY(${top}px)`;
  }

  function setStatus(message, state) {
    saveStatus.textContent = message;
    statusDot.className = `status-dot ${state || ''}`;
  }

  function scheduleSave() {
    if (!isLoaded) return;
    window.clearTimeout(saveTimer);
    setStatus('Changes waiting to save…', 'saving');
    saveTimer = window.setTimeout(saveDocument, 800);
  }

  async function saveDocument() {
    if (!isLoaded || isSaving) return;
    isSaving = true;
    setStatus('Saving to your server…', 'saving');
    try {
      const response = await fetch('/code-copy-paste/api/document', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: { language: languageSelect.value, code: codeInput.value } })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'Save failed.');
      setStatus(`Saved ${new Date(data.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 'saved');
    } catch (error) {
      setStatus(error.message || 'Could not save your code.', 'error');
    } finally {
      isSaving = false;
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(codeInput.value);
      setStatus('Copied to your clipboard.', 'saved');
    } catch {
      codeInput.focus();
      codeInput.select();
      document.execCommand('copy');
      setStatus('Copied to your clipboard.', 'saved');
    }
  }

  async function pasteCode() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const start = codeInput.selectionStart;
      const end = codeInput.selectionEnd;
      codeInput.setRangeText(clipboardText, start, end, 'end');
      renderEditor();
      scheduleSave();
      codeInput.focus();
    } catch {
      setStatus('Paste was blocked. Press Ctrl/Cmd + V in the editor instead.', 'error');
    }
  }

  async function loadDocument() {
    try {
      const response = await fetch('/code-copy-paste/api/document');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not load your saved code.');
      languageSelect.value = data.document.language;
      codeInput.value = data.document.code;
      isLoaded = true;
      renderEditor();
      setStatus(data.exists ? 'Saved code loaded.' : 'Ready — your first save will be stored on the server.', 'saved');
    } catch (error) {
      renderEditor();
      setStatus(error.message || 'Could not load your saved code.', 'error');
    }
  }

  codeInput.addEventListener('input', () => { renderEditor(); scheduleSave(); });
  codeInput.addEventListener('scroll', syncScroll);
  languageSelect.addEventListener('change', () => { renderEditor(); scheduleSave(); });
  saveButton.addEventListener('click', saveDocument);
  copyButton.addEventListener('click', copyCode);
  pasteButton.addEventListener('click', pasteCode);
  renderEditor();
  loadDocument();
}());
