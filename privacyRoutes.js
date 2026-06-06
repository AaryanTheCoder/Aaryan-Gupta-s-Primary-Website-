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
      <p class="updated">Last updated: June 6, 2026</p>

      <p>
        This privacy policy applies to Chrome Extensions made by developer <strong>Aaryan Gupta</strong>.
        These extensions are designed to provide their features without collecting personal user data wherever possible.
      </p>

      <h2>Data Collection</h2>
      <p>
        Chrome Extensions made by Aaryan Gupta do not sell, share, or intentionally collect personal user data for advertising,
        tracking, analytics, or profiling.
      </p>
      <p>
        Some data may be processed only when it is needed for extension functionality. Depending on the extension, this may include:
      </p>
      <ul>
        <li>IP address or basic request information received by the website server</li>
        <li>Website URLs needed for the extension to understand or manage browser tabs</li>
        <li>Browser history or tab information only when required by a specific extension feature</li>
      </ul>

      <h2>Where Data Is Stored</h2>
      <p>
        Any user data used by these extensions is stored either locally on the user's device or, when required for functionality,
        on <strong>aaryangupta.azurewebsites.net</strong>.
      </p>
      <p>
        Data stored locally in Chrome or on the user's device is not visible to Aaryan Gupta. It is accessed by the extension only
        so the extension can provide its intended functionality.
      </p>

      <h2>Developer Access</h2>
      <p>
        Aaryan Gupta does not view, sell, share, or use user browsing data, URLs, history, or locally stored extension data.
        The extension may access this information only to perform the feature the user requested.
      </p>
      <p>
        Like most websites, <strong>aaryangupta.azurewebsites.net</strong> may receive basic technical request information, such as
        IP address and request URL, through normal server operation. This information is not used to identify, track, or profile users.
      </p>

      <h2>Third Parties</h2>
      <p>
        User data is not sold to third parties. User data is not shared with third parties except where necessary for the extension
        or website hosting infrastructure to operate.
      </p>

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
