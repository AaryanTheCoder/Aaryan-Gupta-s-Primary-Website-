function handle(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;

  if (pathname === '/privacy' && (req.method === 'GET' || req.method === 'HEAD')) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    });
    res.end(req.method === 'HEAD' ? undefined : getPrivacyHtml());
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Privacy route not found');
}

function getPrivacyHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy | Aaryan Gupta Chrome Extensions</title>
  <style>
    :root {
      --bg: #f6f8fb;
      --panel: #ffffff;
      --ink: #172033;
      --muted: #566173;
      --line: #dce3ee;
      --accent: #2358c4;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--ink);
      background: var(--bg);
    }

    main {
      width: min(860px, calc(100% - 32px));
      margin: 0 auto;
      padding: 48px 0 56px;
    }

    article {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 34px;
      box-shadow: 0 18px 50px rgba(23, 32, 51, 0.08);
    }

    h1 {
      margin: 0 0 8px;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.08;
    }

    .updated {
      margin: 0 0 26px;
      color: var(--muted);
      font-size: 0.98rem;
    }

    h2 {
      margin: 28px 0 10px;
      font-size: 1.25rem;
      color: var(--accent);
    }

    p,
    li {
      color: var(--muted);
      font-size: 1rem;
      line-height: 1.75;
    }

    p {
      margin: 0 0 14px;
    }

    ul {
      margin: 0 0 14px;
      padding-left: 22px;
    }

    strong {
      color: var(--ink);
    }

    a {
      color: var(--accent);
    }

    @media (max-width: 640px) {
      main {
        width: min(100% - 20px, 100%);
        padding: 20px 0 28px;
      }

      article {
        padding: 22px;
      }
    }
  </style>
</head>
<body>
  <main>
    <article>
      <h1>Privacy Policy</h1>
      <p class="updated">Last updated: September 19, 2026</p>

      <p>This policy covers this website and its related Chrome-extension tools. It explains the data a feature needs to work; it is not used for advertising or sold to advertisers.</p>

      <h2>Information this website can store</h2>
      <ul>
        <li>Public Chat stores the display name, messages, and files or folders that a visitor chooses to post.</li>
        <li>Extension Feedback stores the name, email address, description, and screenshots submitted through its form.</li>
        <li>Private tools such as Storage, planners, Code Copy Paste, Sandbox, and the Stock Simulator store the content saved by their authenticated user.</li>
        <li>The Stock Simulator uses a signed browser cookie to remember its simulator profile. It does not represent a real brokerage account.</li>
        <li>Server logs contain basic technical information such as the request method and route. Sensitive query values are not intentionally logged.</li>
      </ul>

      <h2>AI and external services</h2>
      <p>If you choose an AI feature, the text or image you submit is sent to the configured AI provider so it can answer your request. Market-data and weather features also send the requested symbol or location parameters to their provider. Do not submit passwords, private documents, or sensitive personal information to these features.</p>

      <h2>Storage, sharing, and deletion</h2>
      <p>Website data is stored on the website server or on the visitor's device when a feature uses local browser storage. Public Chat posts are visible to other visitors. Files sent through a live transfer are relayed between the sender and receiver and are not intentionally saved as live-transfer content.</p>
      <p>Data is kept while it is needed for the feature or until the site owner removes it. To request removal of feedback or other personal information, use the contact address below and include enough detail to identify the item.</p>

      <h2>Chrome extensions</h2>
      <p>An extension may process browser tabs, URLs, or locally stored extension settings only when that is needed for its stated feature. The site owner does not sell this information or use it for advertising, tracking, or profiling.</p>

      <h2>Security</h2>
      <p>Private tools require a password. No internet service can promise perfect security, so please avoid uploading sensitive information unless the feature is clearly private and you trust the device and network you are using.</p>

      <h2>Contact</h2>
      <p>
        For privacy questions, contact Aaryan Gupta at
        <a href="mailto:aaryangupta2.com@gmail.com">aaryangupta2.com@gmail.com</a>.
      </p>
    </article>
  </main>
</body>
</html>`;
}

module.exports = { handle };
