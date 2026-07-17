# Nova AI Chatbot — Free Local Version

Nova is an AI assistant that chats in English, solves problems, calculates accurately, and can search the live web. The main AI runs locally with Ollama, so normal use costs **$0** and has no per-message bill.

## What is free?

- Chatting and problem solving run with the lightweight `qwen3.5:2b` model.
- The built-in calculator runs inside Nova's Node.js server.
- Web search uses Ollama's free individual search allowance. It needs a free account key but no paid subscription.

## One-time setup

Ollama is already installed on this computer. Open Terminal in this project and run:

```bash
npm run setup
```

This starts Ollama safely and downloads the local model into this project. It happens only once.

Next, make your settings file:

```bash
cp .env.example .env
```

For normal chat and problem solving, you can leave it exactly as it is.

## Optional free web search

1. Make a free account at <https://ollama.com>.
2. Create a key at <https://ollama.com/settings/keys>.
3. Put it in `.env`:

   ```env
   OLLAMA_API_KEY=your_free_key_here
   ```

Do not paste your key into `public/app.js` or `index.html`. Those browser files are visible to users. `.env` is ignored by Git and stays on the server.

## Run Nova

```bash
npm start
```

Then open <http://localhost:3000>.

## Azure App Service B2 setup

Push the code first. Nova automatically recognizes Azure App Service and uses these persistent paths:

- Ollama program: `/home/ollama/bin/ollama`
- Model files: `/home/ollama-models`
- Model: `qwen3.5:2b` (about 2.7 GB)

Before using SSH, open **Settings → Environment variables** in the Azure portal and make sure this App Service storage setting exists:

```text
WEBSITES_ENABLE_APP_SERVICE_STORAGE=true
```

This is an Azure storage switch, not an Ollama model setting. It ensures that `/home/ollama` and `/home/ollama-models` survive an app restart.

Open **Azure Portal → your App Service → Development Tools → SSH → Go**. Then run each command:

```bash
mkdir -p /home/ollama /home/ollama-models
curl -fsSL https://ollama.com/download/ollama-linux-amd64.tar.zst -o /tmp/ollama-linux-amd64.tar.zst
tar --zstd -xf /tmp/ollama-linux-amd64.tar.zst -C /home/ollama
/home/ollama/bin/ollama --version
```

Start Ollama temporarily and download the model:

```bash
export OLLAMA_MODELS=/home/ollama-models
/home/ollama/bin/ollama serve > /home/LogFiles/ollama-install.log 2>&1 &
OLLAMA_SERVER_PID=$!
sleep 5
/home/ollama/bin/ollama pull qwen3.5:2b
kill "$OLLAMA_SERVER_PID"
unset OLLAMA_MODELS OLLAMA_SERVER_PID
```

The `export` above affects only this SSH session; it is not a permanent Azure environment variable. Finally, use **Overview → Restart** in the Azure portal. Nova will start Ollama automatically after every app restart.

For a B2 plan, Nova sends only 2,048 context tokens to the model and uses two CPU threads. Keep the app to one active AI conversation at a time because B2 has limited RAM.

## How it works

The browser sends messages to the local Node server. The server asks the model running in Ollama for an answer. The model can choose to call two tools:

- `calculate` safely evaluates exact arithmetic;
- `web_search` retrieves current results when the free search key is configured.

The search results are returned as clickable source links below Nova's answer.

## Useful commands

```bash
npm start       # Run Nova
npm run setup   # Download/check the free local model
npm run dev     # Restart after code changes
npm test        # Run the automated tests
```

## Main files

- `server.mjs` — local web server and API route
- `lib/ollama.mjs` — local model and search-tool connection
- `lib/calculator.mjs` — safe maths calculator
- `public/index.html` — page structure
- `public/styles.css` — visual design and phone layout
- `public/app.js` — chat interactions and saved conversation
