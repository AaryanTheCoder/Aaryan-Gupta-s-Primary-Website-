const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      } catch {
        resolve(null);
      }
    });
    req.on('error', reject);
  });
}

function executeCode(code, language) {
  try {
    const tmpDir = os.tmpdir();
    const timestamp = Date.now();
    let result = '';

    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js': {
        // Execute JavaScript in Node.js
        const tmpFile = path.join(tmpDir, `code_${timestamp}.js`);
        fs.writeFileSync(tmpFile, code);
        try {
          result = execSync(`node "${tmpFile}"`, { 
            encoding: 'utf-8',
            timeout: 10000,
            maxBuffer: 1024 * 1024 // 1MB buffer
          });
        } finally {
          fs.unlinkSync(tmpFile);
        }
        break;
      }

      case 'python':
      case 'py': {
        // Execute Python
        const tmpFile = path.join(tmpDir, `code_${timestamp}.py`);
        fs.writeFileSync(tmpFile, code);
        try {
          result = execSync(`python3 "${tmpFile}"`, {
            encoding: 'utf-8',
            timeout: 10000,
            maxBuffer: 1024 * 1024
          });
        } finally {
          fs.unlinkSync(tmpFile);
        }
        break;
      }

      case 'bash':
      case 'sh': {
        // Execute Bash
        try {
          result = execSync(code, {
            encoding: 'utf-8',
            timeout: 10000,
            maxBuffer: 1024 * 1024,
            shell: '/bin/bash'
          });
        } catch (error) {
          throw new Error(error.stderr || error.message);
        }
        break;
      }

      default:
        throw new Error(`Language '${language}' is not supported. Supported languages: JavaScript, Python, Bash`);
    }

    return { success: true, output: result || '(no output)' };
  } catch (error) {
    return { 
      success: false, 
      output: error.message || 'Unknown error occurred',
      error: true
    };
  }
}

function handle(request, response) {
  // Serve the cloud console HTML page
  if (request.url === '/cloudconsole' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(getConsoleHTML());
    return;
  }

  // Handle code execution API
  if (request.url === '/api/cloudconsole/execute' && request.method === 'POST') {
    readBody(request).then(body => {
      if (!body || !body.code || !body.language) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ 
          error: 'Missing code or language parameter',
          success: false 
        }));
        return;
      }

      const result = executeCode(body.code, body.language);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(result));
    }).catch(error => {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ 
        error: error.message,
        success: false 
      }));
    });
    return;
  }

  // 404 for other cloud console routes
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.end('Not Found');
}

function getConsoleHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloud Code Console</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', 'Courier New', monospace;
      background: linear-gradient(135deg, #081120 0%, #132238 100%);
      color: #f8fbff;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      height: calc(100vh - 40px);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .header {
      text-align: center;
      padding: 20px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header h1 {
      font-size: 2.5em;
      background: linear-gradient(135deg, #8bd3ff, #c8a6ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }

    .header p {
      color: #d6e2f1;
      font-size: 0.95em;
    }

    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      flex: 1;
      min-height: 0;
    }

    .panel {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    .panel-header {
      padding: 15px 20px;
      background: rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .panel-header h2 {
      font-size: 1.3em;
      color: #8bd3ff;
    }

    .language-selector {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .lang-btn {
      padding: 8px 16px;
      background: rgba(139, 211, 255, 0.15);
      border: 1px solid #8bd3ff;
      color: #8bd3ff;
      border-radius: 6px;
      cursor: pointer;
      font-family: 'Poppins', monospace;
      font-size: 0.9em;
      transition: all 0.3s ease;
    }

    .lang-btn:hover {
      background: rgba(139, 211, 255, 0.3);
      transform: translateY(-2px);
    }

    .lang-btn.active {
      background: #8bd3ff;
      color: #081120;
      font-weight: 600;
    }

    .panel-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
    }

    .code-editor {
      flex: 1;
      background: #0a1520;
      padding: 15px;
      font-family: 'Courier New', monospace;
      font-size: 0.95em;
      border: none;
      color: #f8fbff;
      resize: none;
      line-height: 1.6;
      overflow-y: auto;
    }

    .code-editor:focus {
      outline: 1px solid #8bd3ff;
    }

    .output-display {
      flex: 1;
      background: #0a1520;
      padding: 15px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-all;
      line-height: 1.6;
      color: #8bd3ff;
    }

    .output-display.error {
      color: #ff6b6b;
    }

    .output-display.success {
      color: #51cf66;
    }

    .output-display.loading {
      color: #ffd76a;
    }

    .controls {
      display: flex;
      gap: 10px;
      padding: 15px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 24px;
      border: none;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #8bd3ff, #6fb5ff);
      color: #081120;
      flex: 1;
      justify-content: center;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(139, 211, 255, 0.3);
    }

    .btn-secondary {
      background: rgba(200, 166, 255, 0.15);
      color: #c8a6ff;
      border: 1px solid #c8a6ff;
    }

    .btn-secondary:hover:not(:disabled) {
      background: rgba(200, 166, 255, 0.25);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .info-box {
      padding: 12px 15px;
      background: rgba(200, 166, 255, 0.1);
      border-left: 3px solid #c8a6ff;
      border-radius: 4px;
      font-size: 0.9em;
      color: #d6e2f1;
    }

    .scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(139, 211, 255, 0.3) transparent;
    }

    .scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .scrollbar::-webkit-scrollbar-thumb {
      background: rgba(139, 211, 255, 0.3);
      border-radius: 4px;
    }

    .scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(139, 211, 255, 0.5);
    }

    @media (max-width: 768px) {
      .content {
        grid-template-columns: 1fr;
      }

      .header h1 {
        font-size: 1.8em;
      }

      .container {
        height: auto;
        min-height: calc(100vh - 40px);
      }

      .code-editor,
      .output-display {
        min-height: 300px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>☁️ Cloud Code Console</h1>
      <p>Write and execute code in multiple languages instantly</p>
    </div>

    <div class="content">
      <!-- Code Editor Panel -->
      <div class="panel">
        <div class="panel-header">
          <h2>Code Editor</h2>
          <div class="language-selector">
            <button class="lang-btn" data-lang="javascript">JavaScript</button>
            <button class="lang-btn active" data-lang="python">Python</button>
            <button class="lang-btn" data-lang="bash">Bash</button>
          </div>
        </div>
        <div class="panel-content">
          <textarea class="code-editor scrollbar" id="codeEditor" placeholder="Write your code here..."></textarea>
        </div>
        <div class="controls">
          <button class="btn btn-primary" id="executeBtn">
            ▶ Execute Code
          </button>
          <button class="btn btn-secondary" id="clearBtn">
            🗑️ Clear
          </button>
        </div>
      </div>

      <!-- Output Panel -->
      <div class="panel">
        <div class="panel-header">
          <h2>Output</h2>
        </div>
        <div class="panel-content">
          <div class="output-display scrollbar" id="outputDisplay">
            Ready to execute code...
          </div>
        </div>
        <div class="info-box">
          💡 Output will appear here. Execution timeout: 10 seconds max.
        </div>
      </div>
    </div>
  </div>

  <script>
    let currentLanguage = 'python';
    const codeEditor = document.getElementById('codeEditor');
    const outputDisplay = document.getElementById('outputDisplay');
    const executeBtn = document.getElementById('executeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const langButtons = document.querySelectorAll('.lang-btn');

    // Language templates
    const templates = {
      javascript: \`// JavaScript Example
console.log('Hello, World!');
console.log('2 + 2 =', 2 + 2);\`,
      python: \`import random


NUM_PRISONERS = 100
MAX_OPENS = 50


def random_strategy_success(boxes):
    """Each prisoner opens 50 distinct boxes chosen at random."""
    for prisoner in range(1, NUM_PRISONERS + 1):
        opened = random.sample(range(NUM_PRISONERS), MAX_OPENS)
        if prisoner not in (boxes[i] for i in opened):
            return False
    return True


def loop_strategy_success(boxes):
    """Each prisoner follows the cycle starting from their own number."""
    for prisoner in range(1, NUM_PRISONERS + 1):
        box_index = prisoner - 1
        for _ in range(MAX_OPENS):
            if boxes[box_index] == prisoner:
                break
            box_index = boxes[box_index] - 1
        else:
            return False
    return True


def main():
    boxes = list(range(1, NUM_PRISONERS + 1))
    random.shuffle(boxes)

    random_result = random_strategy_success(boxes)
    loop_result = loop_strategy_success(boxes)

    print("Random strategy:", "WIN" if random_result else "LOSS")
    print("Cycle/loop strategy:", "WIN" if loop_result else "LOSS")


if __name__ == "__main__":
    main()\`,
      bash: \`# Bash Example
echo "Hello, World!"
echo "Current date: \$(date)"\`
    };

    // Language switcher
    langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLanguage = btn.dataset.lang;
        codeEditor.value = templates[currentLanguage];
        codeEditor.focus();
        outputDisplay.textContent = 'Ready to execute code...';
        outputDisplay.className = 'output-display scrollbar';
      });
    });

    // Execute code
    executeBtn.addEventListener('click', async () => {
      const code = codeEditor.value.trim();
      
      if (!code) {
        outputDisplay.textContent = 'Error: No code to execute';
        outputDisplay.className = 'output-display scrollbar error';
        return;
      }

      executeBtn.disabled = true;
      outputDisplay.textContent = '⏳ Executing...';
      outputDisplay.className = 'output-display scrollbar loading';

      try {
        const response = await fetch('/api/cloudconsole/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: code,
            language: currentLanguage
          })
        });

        const result = await response.json();

        if (result.success) {
          outputDisplay.textContent = result.output;
          outputDisplay.className = 'output-display scrollbar success';
        } else {
          outputDisplay.textContent = 'Error: ' + result.output;
          outputDisplay.className = 'output-display scrollbar error';
        }
      } catch (error) {
        outputDisplay.textContent = 'Network Error: ' + error.message;
        outputDisplay.className = 'output-display scrollbar error';
      } finally {
        executeBtn.disabled = false;
      }
    });

    // Clear code
    clearBtn.addEventListener('click', () => {
      codeEditor.value = '';
      outputDisplay.textContent = 'Ready to execute code...';
      outputDisplay.className = 'output-display scrollbar';
      codeEditor.focus();
    });

    // Allow Ctrl+Enter to execute
    codeEditor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        executeBtn.click();
      }
    });

    // Initialize
    codeEditor.value = templates.python;
  </script>
</body>
</html>`;
}

module.exports = { handle };
