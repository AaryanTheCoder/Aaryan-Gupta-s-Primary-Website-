const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const STORAGE_PASSWORD = process.env.STORAGE_PASSWORD;
const SIMULATOR_SESSION_SECRET = process.env.SIMULATOR_SESSION_SECRET || STORAGE_PASSWORD || 'simulator-dev-secret';
const TWELVEDATA_API_KEY = process.env.TWELVEDATA_API_KEY || '';
const ALPACA_API_KEY = process.env.ALPACA_API_KEY || '';
const ALPACA_API_SECRET = process.env.ALPACA_API_SECRET || '';

const SIMULATOR_DIR = path.join(__dirname, 'simulator');
const DATA_DIR = process.env.SIMULATOR_DATA_DIR
  ? path.resolve(process.env.SIMULATOR_DATA_DIR)
  : path.join(__dirname, 'simulator_data');
const PROFILES_DIR = path.join(DATA_DIR, 'profiles');
const GAMES_FILE = path.join(DATA_DIR, 'games.json');

for (const dir of [DATA_DIR, PROFILES_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

if (!fs.existsSync(GAMES_FILE)) {
  fs.writeFileSync(GAMES_FILE, JSON.stringify({ games: [] }, null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

const POPULAR_SYMBOLS = [
  { symbol: 'AAPL', name: 'Apple', sector: 'Technology', exchange: 'NASDAQ' },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Technology', exchange: 'NASDAQ' },
  { symbol: 'NVDA', name: 'NVIDIA', sector: 'Technology', exchange: 'NASDAQ' },
  { symbol: 'AMZN', name: 'Amazon', sector: 'Consumer Cyclical', exchange: 'NASDAQ' },
  { symbol: 'META', name: 'Meta', sector: 'Technology', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', name: 'Alphabet', sector: 'Communication Services', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla', sector: 'Consumer Cyclical', exchange: 'NASDAQ' },
  { symbol: 'AMD', name: 'AMD', sector: 'Technology', exchange: 'NASDAQ' },
  { symbol: 'NFLX', name: 'Netflix', sector: 'Communication Services', exchange: 'NASDAQ' },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financial Services', exchange: 'NYSE' },
  { symbol: 'BAC', name: 'Bank of America', sector: 'Financial Services', exchange: 'NYSE' },
  { symbol: 'V', name: 'Visa', sector: 'Financial Services', exchange: 'NYSE' },
  { symbol: 'WMT', name: 'Walmart', sector: 'Consumer Defensive', exchange: 'NYSE' },
  { symbol: 'XOM', name: 'Exxon Mobil', sector: 'Energy', exchange: 'NYSE' },
  { symbol: 'UNH', name: 'UnitedHealth', sector: 'Healthcare', exchange: 'NYSE' },
  { symbol: 'PLTR', name: 'Palantir', sector: 'Technology', exchange: 'NYSE' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', sector: 'ETF', exchange: 'NYSE Arca' },
  { symbol: 'QQQ', name: 'Invesco QQQ', sector: 'ETF', exchange: 'NASDAQ' },
  { symbol: 'IWM', name: 'iShares Russell 2000 ETF', sector: 'ETF', exchange: 'NYSE Arca' },
  { symbol: 'D05.SI', name: 'DBS Group', sector: 'Financial Services', exchange: 'SGX' },
];

const cache = new Map();

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString().trim();
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function json(res, statusCode, payload, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    ...extraHeaders,
  });
  res.end(JSON.stringify(payload));
}

function redirect(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}

function basicAuthMatches(req) {
  if (!STORAGE_PASSWORD) return false;
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) return false;
  const decoded = Buffer.from(auth.slice(6), 'base64').toString();
  const colonIndex = decoded.indexOf(':');
  const password = colonIndex >= 0 ? decoded.slice(colonIndex + 1) : '';
  return password === STORAGE_PASSWORD;
}

function requireSimulatorAuth(req, res) {
  if (basicAuthMatches(req)) return true;
  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
    'WWW-Authenticate': 'Basic realm="Simulator"',
  });
  res.end('Simulator password required');
  return false;
}

function parseCookies(req) {
  const raw = req.headers.cookie || '';
  const cookies = {};
  raw.split(';').forEach(part => {
    const idx = part.indexOf('=');
    if (idx === -1) return;
    const key = part.slice(0, idx).trim();
    const value = decodeURIComponent(part.slice(idx + 1).trim());
    cookies[key] = value;
  });
  return cookies;
}

function signProfileId(profileId) {
  return crypto.createHmac('sha256', SIMULATOR_SESSION_SECRET).update(profileId).digest('hex').slice(0, 24);
}

function buildProfileCookie(profileId) {
  return `simulator_profile=${encodeURIComponent(`${profileId}.${signProfileId(profileId)}`)}; Path=/simulator; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}`;
}

function getVerifiedProfileId(req) {
  const cookies = parseCookies(req);
  const raw = cookies.simulator_profile || '';
  const [profileId, signature] = raw.split('.');
  if (!profileId || !signature) return null;
  if (signProfileId(profileId) !== signature) return null;
  return sanitizeId(profileId, 64);
}

function sanitizeId(value, maxLength = 64) {
  return String(value || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, maxLength);
}

function safeText(value, maxLength = 160) {
  return String(value || '').trim().slice(0, maxLength);
}

function hashPassword(value) {
  return crypto.createHash('sha256').update(String(value || '')).digest('hex');
}

function nowIso() {
  return new Date().toISOString();
}

function roundTo(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
}

function toNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function createAccountState(name, settings = {}) {
  const startingCash = toNumber(settings.startingCash, 100000);
  return {
    id: crypto.randomUUID(),
    name: safeText(name || 'Paper Portfolio', 80),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    startingCash,
    cash: startingCash,
    settings: {
      allowShort: settings.allowShort !== false,
      allowOptions: settings.allowOptions !== false,
      commission: roundTo(toNumber(settings.commission, 0)),
      marketDelayMinutes: Number.isFinite(settings.marketDelayMinutes) ? settings.marketDelayMinutes : 15,
      isGame: Boolean(settings.isGame),
    },
    positions: {
      stocks: {},
      options: {},
    },
    orders: [],
    activities: [],
    equityHistory: [
      {
        timestamp: nowIso(),
        equity: startingCash,
        cash: startingCash,
        marketValue: 0,
      },
    ],
  };
}

function createProfile(profileId) {
  return {
    version: 1,
    id: profileId,
    createdAt: nowIso(),
    watchlist: ['AAPL', 'MSFT', 'NVDA', 'SPY', 'TSLA', 'QQQ'],
    personal: createAccountState('Personal Account', {
      startingCash: 100000,
      allowShort: true,
      allowOptions: true,
      commission: 0,
      marketDelayMinutes: 15,
      isGame: false,
    }),
    games: {},
  };
}

function getProfilePath(profileId) {
  return path.join(PROFILES_DIR, `${sanitizeId(profileId, 64)}.json`);
}

function loadProfile(profileId) {
  const filePath = getProfilePath(profileId);
  if (!fs.existsSync(filePath)) {
    const profile = createProfile(profileId);
    writeJson(filePath, profile);
    return profile;
  }
  const profile = readJson(filePath, createProfile(profileId));
  profile.games = profile.games || {};
  profile.watchlist = Array.isArray(profile.watchlist) && profile.watchlist.length ? profile.watchlist : ['AAPL', 'MSFT', 'NVDA', 'SPY'];
  return profile;
}

function saveProfile(profile) {
  profile.personal.updatedAt = nowIso();
  writeJson(getProfilePath(profile.id), profile);
}

function loadGames() {
  const value = readJson(GAMES_FILE, { games: [] });
  value.games = Array.isArray(value.games) ? value.games : [];
  return value;
}

function saveGames(data) {
  writeJson(GAMES_FILE, data);
}

function resolveAccount(profile, contextId) {
  if (!contextId || contextId === 'personal') {
    return { account: profile.personal, contextId: 'personal', label: profile.personal.name, type: 'personal' };
  }
  const gameId = sanitizeId(contextId, 64);
  if (!profile.games[gameId]) {
    return null;
  }
  return { account: profile.games[gameId], contextId: gameId, label: profile.games[gameId].name, type: 'game' };
}

function listContexts(profile, gamesData) {
  const contexts = [
    {
      id: 'personal',
      label: profile.personal.name,
      type: 'personal',
      subtitle: '$100,000 default sandbox',
    },
  ];

  for (const [gameId, account] of Object.entries(profile.games || {})) {
    const game = gamesData.games.find(item => item.id === gameId);
    contexts.push({
      id: gameId,
      label: account.name,
      type: 'game',
      subtitle: game ? game.name : 'Joined game',
    });
  }

  return contexts;
}

function cacheKey(namespace, parts) {
  return `${namespace}:${parts.join(':')}`;
}

async function withCache(namespace, parts, ttlMs, loader) {
  const key = cacheKey(namespace, parts);
  const current = cache.get(key);
  const now = Date.now();
  if (current && current.expiresAt > now) {
    return current.value;
  }
  const value = await loader();
  cache.set(key, { value, expiresAt: now + ttlMs });
  return value;
}

function httpsJson(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        }
        try {
          resolve(JSON.parse(data || '{}'));
        } catch (error) {
          reject(error);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function symbolMeta(symbol) {
  const upper = String(symbol || '').toUpperCase();
  const match = POPULAR_SYMBOLS.find(item => item.symbol.toUpperCase() === upper);
  return match || { symbol: upper, name: upper, sector: 'Unknown', exchange: 'US' };
}

function seededRandom(seed) {
  const hash = crypto.createHash('sha256').update(String(seed)).digest();
  return ((hash.readUInt32BE(0) % 1000000) / 1000000);
}

function generateMockQuote(symbol) {
  const meta = symbolMeta(symbol);
  const base = 25 + seededRandom(symbol) * 420;
  const drift = (seededRandom(`${symbol}:drift`) - 0.5) * 0.06;
  const change = roundTo(base * drift);
  const last = roundTo(base + change);
  const previousClose = roundTo(last - change);
  const high = roundTo(Math.max(last, previousClose) * (1 + seededRandom(`${symbol}:high`) * 0.015));
  const low = roundTo(Math.min(last, previousClose) * (1 - seededRandom(`${symbol}:low`) * 0.015));
  const bid = roundTo(last * 0.999);
  const ask = roundTo(last * 1.001);
  return {
    symbol: meta.symbol,
    name: meta.name,
    price: last,
    previousClose,
    change,
    percentChange: previousClose ? roundTo((change / previousClose) * 100, 2) : 0,
    open: previousClose,
    high,
    low,
    volume: Math.round(800000 + seededRandom(`${symbol}:volume`) * 8000000),
    bid,
    ask,
    marketCap: Math.round((last * (500000000 + seededRandom(`${symbol}:shares`) * 9000000000))),
    exchange: meta.exchange,
    sector: meta.sector,
    source: 'mock',
    isMarketOpen: true,
    delayed: true,
  };
}

async function getTwelveDataQuote(symbol) {
  if (!TWELVEDATA_API_KEY) return null;
  return withCache('td-quote', [symbol], 12_000, async () => {
    const pathname = `/quote?symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(TWELVEDATA_API_KEY)}`;
    const data = await httpsJson({
      hostname: 'api.twelvedata.com',
      path: pathname,
      method: 'GET',
    });
    if (data.status === 'error') {
      throw new Error(data.message || 'Twelve Data quote error');
    }
    return {
      symbol: data.symbol || symbol.toUpperCase(),
      name: data.name || symbol.toUpperCase(),
      price: roundTo(data.close || data.price || data.last || 0),
      previousClose: roundTo(data.previous_close || data.previousClose || 0),
      change: roundTo(data.change || 0),
      percentChange: roundTo(data.percent_change || data.percentChange || 0),
      open: roundTo(data.open || 0),
      high: roundTo(data.high || 0),
      low: roundTo(data.low || 0),
      volume: Math.round(toNumber(data.volume, 0)),
      bid: roundTo(data.bid || data.close || 0),
      ask: roundTo(data.ask || data.close || 0),
      exchange: data.exchange || symbolMeta(symbol).exchange,
      sector: symbolMeta(symbol).sector,
      source: 'twelvedata',
      isMarketOpen: Boolean(data.is_market_open),
      delayed: false,
      fiftyTwoWeekLow: roundTo(data.fifty_two_week?.low || 0),
      fiftyTwoWeekHigh: roundTo(data.fifty_two_week?.high || 0),
    };
  });
}

async function getQuote(symbol) {
  try {
    const quote = await getTwelveDataQuote(symbol);
    if (quote && quote.price > 0) return quote;
  } catch {}
  return generateMockQuote(symbol);
}

async function getQuotes(symbols) {
  const uniqueSymbols = [...new Set((symbols || []).map(value => String(value || '').trim().toUpperCase()).filter(Boolean))];
  const results = await Promise.all(uniqueSymbols.map(async symbol => getQuote(symbol)));
  return results;
}

function chartIntervalForTimeframe(timeframe) {
  switch (timeframe) {
    case '1D':
      return { interval: '15min', outputsize: 26 };
    case '1W':
      return { interval: '1h', outputsize: 40 };
    case '1M':
      return { interval: '1day', outputsize: 30 };
    case '3M':
      return { interval: '1day', outputsize: 90 };
    case '1Y':
      return { interval: '1week', outputsize: 52 };
    default:
      return { interval: '1day', outputsize: 60 };
  }
}

function buildMockChart(symbol, timeframe) {
  const points = [];
  const quote = generateMockQuote(symbol);
  const count = timeframe === '1D' ? 26 : timeframe === '1W' ? 40 : timeframe === '3M' ? 90 : timeframe === '1Y' ? 52 : 30;
  let current = quote.previousClose || quote.price;
  for (let index = count - 1; index >= 0; index -= 1) {
    const noise = (seededRandom(`${symbol}:${timeframe}:${index}`) - 0.5) * current * 0.03;
    current = Math.max(1, current + noise);
    points.push({
      datetime: new Date(Date.now() - index * 60 * 60 * 1000).toISOString(),
      close: roundTo(current),
      open: roundTo(current - noise * 0.4),
      high: roundTo(current * 1.01),
      low: roundTo(current * 0.99),
      volume: Math.round(quote.volume / Math.max(1, count)),
    });
  }
  return points;
}

async function getChart(symbol, timeframe) {
  if (!TWELVEDATA_API_KEY) {
    return buildMockChart(symbol, timeframe);
  }

  const config = chartIntervalForTimeframe(timeframe);
  return withCache('td-chart', [symbol, timeframe], 30_000, async () => {
    const pathname = `/time_series?symbol=${encodeURIComponent(symbol)}&interval=${encodeURIComponent(config.interval)}&outputsize=${config.outputsize}&order=asc&apikey=${encodeURIComponent(TWELVEDATA_API_KEY)}`;
    const data = await httpsJson({
      hostname: 'api.twelvedata.com',
      path: pathname,
      method: 'GET',
    });
    if (data.status === 'error' || !Array.isArray(data.values)) {
      throw new Error(data.message || 'Twelve Data chart error');
    }
    return data.values.map(point => ({
      datetime: point.datetime,
      close: roundTo(point.close),
      open: roundTo(point.open),
      high: roundTo(point.high),
      low: roundTo(point.low),
      volume: Math.round(toNumber(point.volume, 0)),
    }));
  }).catch(() => buildMockChart(symbol, timeframe));
}

async function getProfileInfo(symbol) {
  const meta = symbolMeta(symbol);
  const fallback = {
    symbol: meta.symbol,
    name: meta.name,
    exchange: meta.exchange,
    sector: meta.sector,
    industry: meta.sector,
    description: `${meta.name} is being tracked in the simulator research workspace. Attach a supported market-data key to upgrade this panel with live fundamentals and company profile information.`,
    source: 'mock',
  };

  if (!TWELVEDATA_API_KEY) {
    return fallback;
  }

  return withCache('td-profile', [symbol], 300_000, async () => {
    const pathname = `/profile?symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(TWELVEDATA_API_KEY)}`;
    const data = await httpsJson({
      hostname: 'api.twelvedata.com',
      path: pathname,
      method: 'GET',
    });
    if (data.status === 'error') {
      throw new Error(data.message || 'Twelve Data profile error');
    }
    return {
      symbol: data.symbol || meta.symbol,
      name: data.name || meta.name,
      exchange: data.exchange || meta.exchange,
      sector: data.sector || meta.sector,
      industry: data.industry || meta.sector,
      description: data.description || fallback.description,
      website: data.website || '',
      country: data.country || '',
      employees: data.full_time_employees || 0,
      source: 'twelvedata',
    };
  }).catch(() => fallback);
}

function nextFridays(limit = 3) {
  const expirations = [];
  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  while (expirations.length < limit) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    if (cursor.getUTCDay() === 5) {
      expirations.push(cursor.toISOString().slice(0, 10));
    }
  }
  return expirations;
}

function syntheticGreeks(moneyness, daysToExpiry, type) {
  const deltaBase = Math.max(0.05, Math.min(0.95, 0.5 + ((type === 'call' ? 1 : -1) * moneyness * 2)));
  return {
    delta: roundTo(type === 'call' ? deltaBase : deltaBase - 1, 3),
    gamma: roundTo(Math.max(0.01, 0.18 - Math.abs(moneyness) * 0.15), 3),
    theta: roundTo(-Math.max(0.01, 0.03 + daysToExpiry / 3650), 3),
    vega: roundTo(Math.max(0.05, 0.22 - Math.abs(moneyness) * 0.08), 3),
    rho: roundTo(type === 'call' ? 0.08 : -0.08, 3),
  };
}

function buildSyntheticOptionChain(symbol, quote) {
  const base = quote.price || 100;
  const strikes = [];
  for (let offset = -5; offset <= 5; offset += 1) {
    strikes.push(roundTo(base + offset * Math.max(2, Math.round(base * 0.025))));
  }
  const expirations = nextFridays(3);
  const contracts = [];

  expirations.forEach((expiration, expiryIndex) => {
    const daysToExpiry = Math.max(7, (expiryIndex + 1) * 14);
    strikes.forEach(strike => {
      ['call', 'put'].forEach(type => {
        const intrinsic = type === 'call'
          ? Math.max(0, base - strike)
          : Math.max(0, strike - base);
        const timeValue = Math.max(0.35, base * 0.015 * ((daysToExpiry / 14) + 0.35));
        const mid = roundTo(intrinsic + timeValue + Math.abs(base - strike) * 0.04);
        const bid = roundTo(Math.max(0.05, mid - 0.1));
        const ask = roundTo(mid + 0.1);
        const moneyness = (base - strike) / Math.max(base, 1);
        const greeks = syntheticGreeks(moneyness, daysToExpiry, type);
        const contractSymbol = `${symbol.toUpperCase()}_${expiration}_${type.toUpperCase()}_${strike.toFixed(2)}`;
        contracts.push({
          contractSymbol,
          symbol: contractSymbol,
          underlyingSymbol: symbol.toUpperCase(),
          expiration,
          strike,
          type,
          bid,
          ask,
          mid,
          last: mid,
          openInterest: Math.round(100 + seededRandom(contractSymbol) * 5000),
          volume: Math.round(10 + seededRandom(`${contractSymbol}:vol`) * 1800),
          impliedVolatility: roundTo(0.18 + seededRandom(`${contractSymbol}:iv`) * 0.42, 3),
          greeks,
          source: 'synthetic',
          multiplier: 100,
        });
      });
    });
  });

  return contracts;
}

function normalizeAlpacaSnapshots(payload, symbol, quote) {
  const snapshots = payload.snapshots || payload.option_snapshots || payload.data || {};
  const contracts = [];
  for (const [contractSymbol, snapshot] of Object.entries(snapshots)) {
    const detail = snapshot.latestQuote || snapshot.quote || snapshot.latest_quote || {};
    const trade = snapshot.latestTrade || snapshot.trade || snapshot.latest_trade || {};
    const greeks = snapshot.greeks || {};
    const expirationMatch = contractSymbol.match(/(\d{2})(\d{2})(\d{2})[CP]/);
    const strikeMatch = contractSymbol.match(/[CP](\d{8})$/);
    const type = contractSymbol.includes('C') ? 'call' : 'put';
    let expiration = '';
    if (expirationMatch) {
      expiration = `20${expirationMatch[1]}-${expirationMatch[2]}-${expirationMatch[3]}`;
    }
    let strike = 0;
    if (strikeMatch) {
      strike = Number(strikeMatch[1]) / 1000;
    }
    const bid = roundTo(detail.bp || detail.bid_price || trade.price || 0);
    const ask = roundTo(detail.ap || detail.ask_price || trade.price || bid);
    const mid = roundTo((bid && ask) ? ((bid + ask) / 2) : (trade.price || quote.price * 0.02));
    contracts.push({
      contractSymbol,
      symbol: contractSymbol,
      underlyingSymbol: symbol.toUpperCase(),
      expiration,
      strike,
      type,
      bid,
      ask,
      mid,
      last: roundTo(trade.p || trade.price || mid),
      openInterest: Math.round(snapshot.open_interest || 0),
      volume: Math.round(trade.s || trade.size || 0),
      impliedVolatility: roundTo(greeks.iv || greeks.implied_volatility || 0, 3),
      greeks: {
        delta: roundTo(greeks.delta || 0, 3),
        gamma: roundTo(greeks.gamma || 0, 3),
        theta: roundTo(greeks.theta || 0, 3),
        vega: roundTo(greeks.vega || 0, 3),
        rho: roundTo(greeks.rho || 0, 3),
      },
      source: 'alpaca-indicative',
      multiplier: 100,
    });
  }
  return contracts;
}

async function getOptionChain(symbol, quote) {
  if (!ALPACA_API_KEY || !ALPACA_API_SECRET) {
    return buildSyntheticOptionChain(symbol, quote);
  }

  return withCache('alpaca-options', [symbol], 20_000, async () => {
    const payload = await httpsJson({
      hostname: 'data.alpaca.markets',
      path: `/v1beta1/options/snapshots/${encodeURIComponent(symbol.toUpperCase())}?feed=indicative&limit=120`,
      method: 'GET',
      headers: {
        'APCA-API-KEY-ID': ALPACA_API_KEY,
        'APCA-API-SECRET-KEY': ALPACA_API_SECRET,
      },
    });
    const normalized = normalizeAlpacaSnapshots(payload, symbol, quote);
    if (!normalized.length) {
      throw new Error('No option snapshots returned');
    }
    return normalized;
  }).catch(() => buildSyntheticOptionChain(symbol, quote));
}

async function buildResearchPayload(symbol, timeframe = '1M') {
  const normalizedSymbol = String(symbol || '').trim().toUpperCase();
  const quote = await getQuote(normalizedSymbol);
  const [profile, chart, optionChain] = await Promise.all([
    getProfileInfo(normalizedSymbol),
    getChart(normalizedSymbol, timeframe),
    getOptionChain(normalizedSymbol, quote),
  ]);

  return {
    symbol: normalizedSymbol,
    quote,
    profile,
    chart,
    optionChain,
    availableTimeframes: ['1D', '1W', '1M', '3M', '1Y'],
  };
}

function recordActivity(account, activity) {
  account.activities.unshift({
    id: crypto.randomUUID(),
    timestamp: nowIso(),
    ...activity,
  });
  account.activities = account.activities.slice(0, 250);
}

function appendEquityHistory(account, equity, cash, marketValue) {
  const last = account.equityHistory[account.equityHistory.length - 1];
  if (!last || Math.abs(last.equity - equity) >= 0.01 || Date.now() - new Date(last.timestamp).getTime() > 5 * 60 * 1000) {
    account.equityHistory.push({
      timestamp: nowIso(),
      equity: roundTo(equity),
      cash: roundTo(cash),
      marketValue: roundTo(marketValue),
    });
    if (account.equityHistory.length > 240) {
      account.equityHistory = account.equityHistory.slice(-240);
    }
  }
}

function positionWinRate(positions) {
  const closed = positions.filter(item => item.realizedPnl !== 0);
  if (!closed.length) return 0;
  return roundTo((closed.filter(item => item.realizedPnl > 0).length / closed.length) * 100, 1);
}

function maxDrawdown(series) {
  let peak = null;
  let drawdown = 0;
  for (const point of series) {
    if (peak === null || point.equity > peak) {
      peak = point.equity;
    }
    if (peak > 0) {
      drawdown = Math.max(drawdown, ((peak - point.equity) / peak) * 100);
    }
  }
  return roundTo(drawdown, 2);
}

async function evaluateOpenOrders(account) {
  const openOrders = account.orders.filter(order => order.status === 'open');
  if (!openOrders.length) return;

  const stockSymbols = [...new Set(openOrders.filter(order => order.assetClass === 'stock').map(order => order.symbol))];
  const quotes = await getQuotes(stockSymbols);
  const quoteMap = new Map(quotes.map(quote => [quote.symbol, quote]));
  const optionsByUnderlying = {};

  for (const order of openOrders) {
    try {
      if (order.assetClass === 'stock') {
        const quote = quoteMap.get(order.symbol) || generateMockQuote(order.symbol);
        const triggerPrice = order.action === 'buy' || order.action === 'cover'
          ? (quote.ask || quote.price)
          : (quote.bid || quote.price);
        let shouldFill = false;
        if (order.orderType === 'limit') {
          shouldFill = (order.action === 'buy' || order.action === 'cover')
            ? triggerPrice <= order.limitPrice
            : triggerPrice >= order.limitPrice;
        } else if (order.orderType === 'stop') {
          shouldFill = (order.action === 'buy' || order.action === 'cover')
            ? triggerPrice >= order.stopPrice
            : triggerPrice <= order.stopPrice;
        }
        if (shouldFill) {
          fillStockOrder(account, order, quote);
        }
      } else {
        if (!optionsByUnderlying[order.underlyingSymbol]) {
          const quote = await getQuote(order.underlyingSymbol);
          optionsByUnderlying[order.underlyingSymbol] = await getOptionChain(order.underlyingSymbol, quote);
        }
        const contract = optionsByUnderlying[order.underlyingSymbol].find(item => item.contractSymbol === order.contractSymbol);
        if (!contract) continue;
        const triggerPrice = order.action === 'buy_to_open' ? contract.ask : contract.bid;
        let shouldFill = false;
        if (order.orderType === 'limit') {
          shouldFill = order.action === 'buy_to_open'
            ? triggerPrice <= order.limitPrice
            : triggerPrice >= order.limitPrice;
        } else if (order.orderType === 'stop') {
          shouldFill = order.action === 'buy_to_open'
            ? triggerPrice >= order.stopPrice
            : triggerPrice <= order.stopPrice;
        }
        if (shouldFill) {
          fillOptionOrder(account, order, contract);
        }
      }
    } catch {}
  }
}

function rejectOrder(account, order, reason) {
  order.status = 'rejected';
  order.rejectedAt = nowIso();
  order.reason = reason;
  recordActivity(account, {
    kind: 'order-rejected',
    title: 'Order rejected',
    description: `${order.assetClass.toUpperCase()} ${order.symbol || order.contractSymbol} was rejected: ${reason}`,
    amount: 0,
  });
}

function ensureStockPosition(account, symbol) {
  if (!account.positions.stocks[symbol]) {
    account.positions.stocks[symbol] = {
      symbol,
      qty: 0,
      avgCost: 0,
      realizedPnl: 0,
      openedAt: nowIso(),
    };
  }
  return account.positions.stocks[symbol];
}

function ensureOptionPosition(account, contract) {
  if (!account.positions.options[contract.contractSymbol]) {
    account.positions.options[contract.contractSymbol] = {
      contractSymbol: contract.contractSymbol,
      symbol: contract.contractSymbol,
      underlyingSymbol: contract.underlyingSymbol,
      expiration: contract.expiration,
      strike: contract.strike,
      type: contract.type,
      qty: 0,
      avgCost: 0,
      realizedPnl: 0,
      multiplier: contract.multiplier || 100,
      openedAt: nowIso(),
    };
  }
  return account.positions.options[contract.contractSymbol];
}

function fillStockOrder(account, order, quote) {
  const price = roundTo(
    order.action === 'buy' || order.action === 'cover'
      ? (quote.ask || quote.price)
      : (quote.bid || quote.price)
  );
  const qty = Math.max(1, Math.floor(toNumber(order.qty, 0)));
  const commission = account.settings.commission;
  const position = ensureStockPosition(account, order.symbol);

  if (order.action === 'buy') {
    const cost = roundTo(price * qty + commission);
    if (position.qty < 0) {
      return rejectOrder(account, order, 'Use Buy to Cover for short positions.');
    }
    if (account.cash < cost) {
      return rejectOrder(account, order, 'Not enough cash.');
    }
    const totalShares = position.qty + qty;
    position.avgCost = totalShares > 0 ? roundTo(((position.avgCost * position.qty) + (price * qty)) / totalShares) : 0;
    position.qty = totalShares;
    account.cash = roundTo(account.cash - cost);
  } else if (order.action === 'sell') {
    if (position.qty < qty) {
      return rejectOrder(account, order, 'Not enough shares to sell.');
    }
    account.cash = roundTo(account.cash + (price * qty) - commission);
    const realized = roundTo((price - position.avgCost) * qty);
    position.realizedPnl = roundTo(position.realizedPnl + realized);
    position.qty -= qty;
    if (position.qty === 0) {
      position.avgCost = 0;
    }
  } else if (order.action === 'short') {
    if (!account.settings.allowShort) {
      return rejectOrder(account, order, 'Short selling is disabled for this account.');
    }
    if (position.qty > 0) {
      return rejectOrder(account, order, 'Close the existing long position before shorting.');
    }
    const previousShort = Math.abs(position.qty);
    const totalShort = previousShort + qty;
    position.avgCost = totalShort > 0 ? roundTo(((position.avgCost * previousShort) + (price * qty)) / totalShort) : 0;
    position.qty -= qty;
    account.cash = roundTo(account.cash + (price * qty) - commission);
  } else if (order.action === 'cover') {
    const shortQty = Math.abs(Math.min(position.qty, 0));
    if (!shortQty || shortQty < qty) {
      return rejectOrder(account, order, 'Not enough short shares to cover.');
    }
    const cost = roundTo(price * qty + commission);
    if (account.cash < cost) {
      return rejectOrder(account, order, 'Not enough cash to cover.');
    }
    account.cash = roundTo(account.cash - cost);
    const realized = roundTo((position.avgCost - price) * qty);
    position.realizedPnl = roundTo(position.realizedPnl + realized);
    position.qty += qty;
    if (position.qty === 0) {
      position.avgCost = 0;
    }
  }

  if (position.qty === 0) {
    delete account.positions.stocks[order.symbol];
  }

  order.status = 'filled';
  order.filledAt = nowIso();
  order.fillPrice = price;
  account.updatedAt = nowIso();
  recordActivity(account, {
    kind: 'trade',
    title: `${order.action.toUpperCase()} ${qty} ${order.symbol}`,
    description: `${order.orderType.toUpperCase()} filled at $${price.toFixed(2)}`,
    amount: roundTo(price * qty),
  });
}

function fillOptionOrder(account, order, contract) {
  const price = roundTo(order.action === 'buy_to_open' ? contract.ask : contract.bid);
  const qty = Math.max(1, Math.floor(toNumber(order.qty, 0)));
  const multiplier = contract.multiplier || 100;
  const position = ensureOptionPosition(account, contract);
  const commission = account.settings.commission;

  if (!account.settings.allowOptions) {
    return rejectOrder(account, order, 'Options are disabled for this account.');
  }

  if (order.action === 'buy_to_open') {
    const totalCost = roundTo((price * qty * multiplier) + commission);
    if (account.cash < totalCost) {
      return rejectOrder(account, order, 'Not enough cash for this option trade.');
    }
    const totalContracts = position.qty + qty;
    position.avgCost = totalContracts > 0 ? roundTo(((position.avgCost * position.qty) + (price * qty)) / totalContracts) : 0;
    position.qty = totalContracts;
    account.cash = roundTo(account.cash - totalCost);
  } else if (order.action === 'sell_to_close') {
    if (position.qty < qty) {
      return rejectOrder(account, order, 'Not enough contracts to close.');
    }
    account.cash = roundTo(account.cash + (price * qty * multiplier) - commission);
    const realized = roundTo((price - position.avgCost) * qty * multiplier);
    position.realizedPnl = roundTo(position.realizedPnl + realized);
    position.qty -= qty;
    if (position.qty === 0) {
      position.avgCost = 0;
    }
  } else {
    return rejectOrder(account, order, 'Unsupported options action.');
  }

  if (position.qty === 0) {
    delete account.positions.options[contract.contractSymbol];
  }

  order.status = 'filled';
  order.filledAt = nowIso();
  order.fillPrice = price;
  account.updatedAt = nowIso();
  recordActivity(account, {
    kind: 'option-trade',
    title: `${order.action.replace(/_/g, ' ').toUpperCase()} ${qty} ${contract.contractSymbol}`,
    description: `${contract.type.toUpperCase()} ${contract.expiration} $${contract.strike} at $${price.toFixed(2)}`,
    amount: roundTo(price * qty * multiplier),
  });
}

async function placeOrder(account, body) {
  const order = {
    id: crypto.randomUUID(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    assetClass: body.assetClass === 'option' ? 'option' : 'stock',
    action: safeText(body.action, 40).toLowerCase(),
    orderType: safeText(body.orderType || 'market', 24).toLowerCase(),
    qty: Math.max(1, Math.floor(toNumber(body.qty, 0))),
    status: 'open',
    symbol: safeText(body.symbol, 24).toUpperCase(),
    underlyingSymbol: safeText(body.underlyingSymbol || body.symbol, 24).toUpperCase(),
    contractSymbol: safeText(body.contractSymbol, 64),
    limitPrice: body.limitPrice ? roundTo(body.limitPrice) : null,
    stopPrice: body.stopPrice ? roundTo(body.stopPrice) : null,
    note: safeText(body.note, 120),
  };

  if (!order.qty) {
    throw new Error('Quantity must be greater than zero.');
  }

  account.orders.unshift(order);
  account.orders = account.orders.slice(0, 250);

  if (order.assetClass === 'stock') {
    const quote = await getQuote(order.symbol);
    if (order.orderType === 'market') {
      fillStockOrder(account, order, quote);
    } else {
      const marketable = order.orderType === 'limit'
        ? ((order.action === 'buy' || order.action === 'cover')
          ? (quote.ask || quote.price) <= order.limitPrice
          : (quote.bid || quote.price) >= order.limitPrice)
        : ((order.action === 'buy' || order.action === 'cover')
          ? (quote.ask || quote.price) >= order.stopPrice
          : (quote.bid || quote.price) <= order.stopPrice);
      if (marketable) {
        fillStockOrder(account, order, quote);
      }
    }
  } else {
    const quote = await getQuote(order.underlyingSymbol);
    const optionChain = await getOptionChain(order.underlyingSymbol, quote);
    const contract = optionChain.find(item => item.contractSymbol === order.contractSymbol);
    if (!contract) {
      rejectOrder(account, order, 'Option contract not found.');
    } else if (order.orderType === 'market') {
      fillOptionOrder(account, order, contract);
    } else {
      const triggerPrice = order.action === 'buy_to_open' ? contract.ask : contract.bid;
      const marketable = order.orderType === 'limit'
        ? (order.action === 'buy_to_open' ? triggerPrice <= order.limitPrice : triggerPrice >= order.limitPrice)
        : (order.action === 'buy_to_open' ? triggerPrice >= order.stopPrice : triggerPrice <= order.stopPrice);
      if (marketable) {
        fillOptionOrder(account, order, contract);
      }
    }
  }

  return order;
}

async function buildAccountSnapshot(account, contextsMeta) {
  await evaluateOpenOrders(account);

  const stockSymbols = Object.keys(account.positions.stocks || {});
  const stockQuotes = await getQuotes(stockSymbols);
  const quoteMap = new Map(stockQuotes.map(quote => [quote.symbol, quote]));
  let stockMarketValue = 0;
  let totalRealized = 0;

  const stockPositions = Object.values(account.positions.stocks || {}).map(position => {
    const quote = quoteMap.get(position.symbol) || generateMockQuote(position.symbol);
    const marketValue = roundTo(position.qty * quote.price);
    const unrealizedPnl = position.qty >= 0
      ? roundTo((quote.price - position.avgCost) * position.qty)
      : roundTo((position.avgCost - quote.price) * Math.abs(position.qty));
    stockMarketValue += marketValue;
    totalRealized += position.realizedPnl || 0;
    return {
      ...position,
      side: position.qty >= 0 ? 'long' : 'short',
      lastPrice: quote.price,
      marketValue,
      unrealizedPnl,
      sector: quote.sector || symbolMeta(position.symbol).sector,
      exchange: quote.exchange,
    };
  }).sort((a, b) => Math.abs(b.marketValue) - Math.abs(a.marketValue));

  const optionSymbols = Object.keys(account.positions.options || {});
  const optionsByUnderlying = {};
  let optionsMarketValue = 0;
  const optionPositions = [];
  for (const position of Object.values(account.positions.options || {})) {
    if (!optionsByUnderlying[position.underlyingSymbol]) {
      const underlyingQuote = await getQuote(position.underlyingSymbol);
      optionsByUnderlying[position.underlyingSymbol] = await getOptionChain(position.underlyingSymbol, underlyingQuote);
    }
    const contract = optionsByUnderlying[position.underlyingSymbol].find(item => item.contractSymbol === position.contractSymbol)
      || buildSyntheticOptionChain(position.underlyingSymbol, generateMockQuote(position.underlyingSymbol)).find(item => item.contractSymbol === position.contractSymbol);
    const mark = contract ? (contract.mid || contract.last || contract.bid || 0) : position.avgCost;
    const marketValue = roundTo(mark * position.qty * (position.multiplier || 100));
    const unrealizedPnl = roundTo((mark - position.avgCost) * position.qty * (position.multiplier || 100));
    optionsMarketValue += marketValue;
    totalRealized += position.realizedPnl || 0;
    optionPositions.push({
      ...position,
      lastPrice: mark,
      marketValue,
      unrealizedPnl,
      impliedVolatility: contract?.impliedVolatility || 0,
      greeks: contract?.greeks || {},
    });
  }

  const equity = roundTo(account.cash + stockMarketValue + optionsMarketValue);
  const unrealizedPnl = roundTo(stockPositions.reduce((sum, position) => sum + position.unrealizedPnl, 0) + optionPositions.reduce((sum, position) => sum + position.unrealizedPnl, 0));
  const totalReturn = roundTo(equity - account.startingCash);
  const returnPct = account.startingCash ? roundTo((totalReturn / account.startingCash) * 100, 2) : 0;
  const previousPoint = account.equityHistory.length > 1 ? account.equityHistory[account.equityHistory.length - 2] : account.equityHistory[0];
  const dailyPnl = previousPoint ? roundTo(equity - previousPoint.equity) : totalReturn;
  appendEquityHistory(account, equity, account.cash, stockMarketValue + optionsMarketValue);

  const allocation = [
    ...stockPositions.map(position => ({
      label: position.symbol,
      value: Math.abs(position.marketValue),
      sector: position.sector,
      kind: position.side,
    })),
    ...optionPositions.map(position => ({
      label: position.contractSymbol,
      value: Math.abs(position.marketValue),
      sector: 'Options',
      kind: 'option',
    })),
  ].sort((a, b) => b.value - a.value);
  const allocationTotal = allocation.reduce((sum, item) => sum + item.value, 0) || 1;

  const allClosedLike = [
    ...stockPositions.map(item => ({ realizedPnl: item.realizedPnl || 0 })),
    ...optionPositions.map(item => ({ realizedPnl: item.realizedPnl || 0 })),
  ];

  return {
    contexts: contextsMeta,
    account: {
      name: account.name,
      settings: account.settings,
      summary: {
        startingCash: roundTo(account.startingCash),
        cash: roundTo(account.cash),
        marketValue: roundTo(stockMarketValue + optionsMarketValue),
        stockMarketValue: roundTo(stockMarketValue),
        optionsMarketValue: roundTo(optionsMarketValue),
        equity,
        realizedPnl: roundTo(totalRealized),
        unrealizedPnl,
        totalReturn,
        returnPct,
        dailyPnl,
        openOrders: account.orders.filter(order => order.status === 'open').length,
        positions: stockPositions.length + optionPositions.length,
        winRate: positionWinRate(allClosedLike),
        maxDrawdown: maxDrawdown(account.equityHistory),
      },
      positions: {
        stocks: stockPositions,
        options: optionPositions,
      },
      orders: account.orders.slice(0, 60),
      activities: account.activities.slice(0, 80),
      equityHistory: account.equityHistory,
      allocation: allocation.map(item => ({
        ...item,
        weight: roundTo((item.value / allocationTotal) * 100, 2),
      })),
      benchmarkContext: {
        compareSymbol: 'SPY',
      },
    },
    quotes: stockQuotes,
    holdingsUniverse: [...new Set([...stockSymbols, ...optionSymbols.map(symbol => symbol)])],
  };
}

async function buildBootstrapPayload(profile, contextId) {
  const gamesData = loadGames();
  const contexts = listContexts(profile, gamesData);
  const resolved = resolveAccount(profile, contextId) || resolveAccount(profile, 'personal');
  const watchlistQuotes = await getQuotes(profile.watchlist);
  const accountSnapshot = await buildAccountSnapshot(resolved.account, contexts);

  const discoverGames = gamesData.games
    .filter(game => !game.isPrivate || game.members.includes(profile.id))
    .map(game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      isPrivate: game.isPrivate,
      memberCount: game.members.length,
      settings: game.settings,
      joined: game.members.includes(profile.id),
    }))
    .slice(0, 24);

  return {
    profile: {
      id: profile.id,
      createdAt: profile.createdAt,
      watchlist: profile.watchlist,
    },
    providers: {
      equities: TWELVEDATA_API_KEY ? 'twelvedata' : 'mock',
      options: ALPACA_API_KEY && ALPACA_API_SECRET ? 'alpaca-indicative' : 'synthetic',
      gatedBy: 'STORAGE_PASSWORD basic auth',
    },
    universe: POPULAR_SYMBOLS,
    watchlistQuotes,
    selectedContext: resolved.contextId,
    contexts,
    games: discoverGames,
    accountSnapshot,
  };
}

function validateGameSettings(body) {
  const name = safeText(body.name, 80);
  if (!name) {
    throw new Error('Game name is required.');
  }

  return {
    id: crypto.randomUUID(),
    name,
    description: safeText(body.description, 200),
    isPrivate: Boolean(body.isPrivate),
    passwordHash: body.password ? hashPassword(body.password) : '',
    createdAt: nowIso(),
    creatorProfileId: body.profileId,
    members: [body.profileId],
    settings: {
      startingCash: Math.min(1000000, Math.max(1000, Math.round(toNumber(body.startingCash, 100000)))),
      allowShort: body.allowShort !== false,
      allowOptions: body.allowOptions !== false,
      commission: roundTo(toNumber(body.commission, 0)),
      marketDelayMinutes: Math.max(0, Math.min(20, Math.round(toNumber(body.marketDelayMinutes, 15)))),
    },
  };
}

async function buildLeaderboard(game) {
  const entries = [];
  for (const memberId of game.members) {
    const profile = loadProfile(memberId);
    const account = profile.games[game.id];
    if (!account) continue;
    const snapshot = await buildAccountSnapshot(account, []);
    entries.push({
      profileId: memberId,
      label: `Trader ${memberId.slice(0, 6).toUpperCase()}`,
      equity: snapshot.account.summary.equity,
      returnPct: snapshot.account.summary.returnPct,
      totalReturn: snapshot.account.summary.totalReturn,
    });
  }
  entries.sort((a, b) => b.returnPct - a.returnPct);
  return entries.slice(0, 50);
}

async function handleApi(req, res, profile) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  if (pathname === '/simulator/api/bootstrap' && req.method === 'GET') {
    const context = safeText(url.searchParams.get('context') || 'personal', 64);
    const payload = await buildBootstrapPayload(profile, context);
    saveProfile(profile);
    return json(res, 200, { ok: true, ...payload });
  }

  if (pathname === '/simulator/api/account' && req.method === 'GET') {
    const gamesData = loadGames();
    const contexts = listContexts(profile, gamesData);
    const context = safeText(url.searchParams.get('context') || 'personal', 64);
    const resolved = resolveAccount(profile, context);
    if (!resolved) {
      return json(res, 404, { ok: false, error: 'Account context not found.' });
    }
    const snapshot = await buildAccountSnapshot(resolved.account, contexts);
    saveProfile(profile);
    return json(res, 200, { ok: true, selectedContext: resolved.contextId, ...snapshot });
  }

  if (pathname === '/simulator/api/research' && req.method === 'GET') {
    const symbol = safeText(url.searchParams.get('symbol') || 'AAPL', 24);
    const timeframe = safeText(url.searchParams.get('timeframe') || '1M', 8);
    const payload = await buildResearchPayload(symbol, timeframe);
    return json(res, 200, { ok: true, ...payload });
  }

  if (pathname === '/simulator/api/orders' && req.method === 'POST') {
    const body = await readBody(req);
    const context = safeText(body.context || 'personal', 64);
    const resolved = resolveAccount(profile, context);
    if (!resolved) {
      return json(res, 404, { ok: false, error: 'Account context not found.' });
    }
    try {
      const order = await placeOrder(resolved.account, body);
      saveProfile(profile);
      return json(res, 200, { ok: true, order });
    } catch (error) {
      return json(res, 400, { ok: false, error: error.message });
    }
  }

  if (pathname === '/simulator/api/orders/cancel' && req.method === 'POST') {
    const body = await readBody(req);
    const context = safeText(body.context || 'personal', 64);
    const resolved = resolveAccount(profile, context);
    if (!resolved) {
      return json(res, 404, { ok: false, error: 'Account context not found.' });
    }
    const order = resolved.account.orders.find(item => item.id === body.orderId);
    if (!order || order.status !== 'open') {
      return json(res, 404, { ok: false, error: 'Open order not found.' });
    }
    order.status = 'cancelled';
    order.cancelledAt = nowIso();
    recordActivity(resolved.account, {
      kind: 'order-cancelled',
      title: 'Order cancelled',
      description: `${order.symbol || order.contractSymbol} ${order.orderType.toUpperCase()} order was cancelled.`,
      amount: 0,
    });
    saveProfile(profile);
    return json(res, 200, { ok: true, order });
  }

  if (pathname === '/simulator/api/account/reset' && req.method === 'POST') {
    const body = await readBody(req);
    const context = safeText(body.context || 'personal', 64);
    const resolved = resolveAccount(profile, context);
    if (!resolved) {
      return json(res, 404, { ok: false, error: 'Account context not found.' });
    }
    const existingName = resolved.account.name;
    const settings = resolved.account.settings;
    const startingCash = body.startingCash ? Math.min(1000000, Math.max(1000, Math.round(toNumber(body.startingCash, resolved.account.startingCash)))) : resolved.account.startingCash;
    const replacement = createAccountState(existingName, {
      startingCash,
      allowShort: settings.allowShort,
      allowOptions: settings.allowOptions,
      commission: settings.commission,
      marketDelayMinutes: settings.marketDelayMinutes,
      isGame: settings.isGame,
    });
    if (context === 'personal') {
      profile.personal = replacement;
    } else {
      profile.games[context] = replacement;
      profile.games[context].name = existingName;
    }
    saveProfile(profile);
    return json(res, 200, { ok: true });
  }

  if (pathname === '/simulator/api/watchlist' && req.method === 'POST') {
    const body = await readBody(req);
    const symbol = safeText(body.symbol, 24).toUpperCase();
    if (!symbol) {
      return json(res, 400, { ok: false, error: 'Symbol is required.' });
    }
    const exists = profile.watchlist.includes(symbol);
    profile.watchlist = exists
      ? profile.watchlist.filter(item => item !== symbol)
      : [symbol, ...profile.watchlist].slice(0, 12);
    saveProfile(profile);
    return json(res, 200, { ok: true, watchlist: profile.watchlist });
  }

  if (pathname === '/simulator/api/games' && req.method === 'GET') {
    const gamesData = loadGames();
    const games = await Promise.all(gamesData.games.map(async game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      isPrivate: game.isPrivate,
      memberCount: game.members.length,
      settings: game.settings,
      joined: game.members.includes(profile.id),
      leaderboard: await buildLeaderboard(game),
    })));
    return json(res, 200, { ok: true, games });
  }

  if (pathname === '/simulator/api/games' && req.method === 'POST') {
    const body = await readBody(req);
    const gamesData = loadGames();
    try {
      const game = validateGameSettings({
        ...body,
        profileId: profile.id,
      });
      gamesData.games.unshift(game);
      saveGames(gamesData);
      profile.games[game.id] = createAccountState(game.name, {
        startingCash: game.settings.startingCash,
        allowShort: game.settings.allowShort,
        allowOptions: game.settings.allowOptions,
        commission: game.settings.commission,
        marketDelayMinutes: game.settings.marketDelayMinutes,
        isGame: true,
      });
      profile.games[game.id].name = game.name;
      saveProfile(profile);
      return json(res, 200, { ok: true, game });
    } catch (error) {
      return json(res, 400, { ok: false, error: error.message });
    }
  }

  if (pathname === '/simulator/api/games/join' && req.method === 'POST') {
    const body = await readBody(req);
    const gameId = safeText(body.gameId, 64);
    const gamesData = loadGames();
    const game = gamesData.games.find(item => item.id === gameId);
    if (!game) {
      return json(res, 404, { ok: false, error: 'Game not found.' });
    }
    if (game.isPrivate && game.passwordHash && hashPassword(body.password || '') !== game.passwordHash) {
      return json(res, 403, { ok: false, error: 'Incorrect game password.' });
    }
    if (!game.members.includes(profile.id)) {
      game.members.push(profile.id);
      saveGames(gamesData);
    }
    if (!profile.games[game.id]) {
      profile.games[game.id] = createAccountState(game.name, {
        startingCash: game.settings.startingCash,
        allowShort: game.settings.allowShort,
        allowOptions: game.settings.allowOptions,
        commission: game.settings.commission,
        marketDelayMinutes: game.settings.marketDelayMinutes,
        isGame: true,
      });
      profile.games[game.id].name = game.name;
      saveProfile(profile);
    }
    return json(res, 200, { ok: true, gameId: game.id });
  }

  return json(res, 404, { ok: false, error: 'Simulator API route not found.' });
}

function getOrCreateProfile(req, res) {
  let profileId = getVerifiedProfileId(req);
  if (!profileId) {
    profileId = crypto.randomUUID().replace(/-/g, '');
    res.setHeader('Set-Cookie', buildProfileCookie(profileId));
  }
  return loadProfile(profileId);
}

function serveStatic(req, res) {
  const requestPath = req.url.replace(/^\/simulator/, '') || '/';
  const cleanPath = requestPath === '/' ? '/index.html' : requestPath.split('?')[0];
  const filePath = path.join(SIMULATOR_DIR, cleanPath);
  if (!filePath.startsWith(SIMULATOR_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': getMime(filePath) });
  res.end(fs.readFileSync(filePath));
}

async function handle(req, res) {
  if (!requireSimulatorAuth(req, res)) {
    return;
  }

  if (req.url === '/simulator') {
    return redirect(res, '/simulator/');
  }

  if (req.url.startsWith('/simulator/api/')) {
    const profile = getOrCreateProfile(req, res);
    try {
      await handleApi(req, res, profile);
    } catch (error) {
      json(res, 500, { ok: false, error: error.message || 'Simulator error' });
    }
    return;
  }

  serveStatic(req, res);
}

module.exports = { handle };
