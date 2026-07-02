const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const { isPathInside, readJsonBody } = require('../../shared/routeHelpers');

const STORAGE_PASSWORD = process.env.STORAGE_PASSWORD;
const SIMULATOR_SESSION_SECRET = process.env.SIMULATOR_SESSION_SECRET || STORAGE_PASSWORD || 'simulator-dev-secret';
const TWELVEDATA_API_KEY = process.env.TWELVEDATA_API_KEY || '';
const ALPACA_API_KEY = process.env.ALPACA_API_KEY || '';
const ALPACA_API_SECRET = process.env.ALPACA_API_SECRET || '';
const MAX_SIMULATOR_BODY_BYTES = 512 * 1024;

const SIMULATOR_DIR = path.join(__dirname, 'public');
const DATA_DIR = process.env.SIMULATOR_DATA_DIR
  ? path.resolve(process.env.SIMULATOR_DATA_DIR)
  : path.join(__dirname, 'data');
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

const SYMBOL_CATALOG_TEXT = `
AAPL|Apple|Technology|NASDAQ|stock|US
MSFT|Microsoft|Technology|NASDAQ|stock|US
NVDA|NVIDIA|Technology|NASDAQ|stock|US
AMZN|Amazon|Consumer Cyclical|NASDAQ|stock|US
META|Meta Platforms|Technology|NASDAQ|stock|US
GOOGL|Alphabet Class A|Communication Services|NASDAQ|stock|US
GOOG|Alphabet Class C|Communication Services|NASDAQ|stock|US
TSLA|Tesla|Consumer Cyclical|NASDAQ|stock|US
AMD|AMD|Technology|NASDAQ|stock|US
NFLX|Netflix|Communication Services|NASDAQ|stock|US
PLTR|Palantir|Technology|NYSE|stock|US
AVGO|Broadcom|Technology|NASDAQ|stock|US
ORCL|Oracle|Technology|NYSE|stock|US
IBM|IBM|Technology|NYSE|stock|US
CRM|Salesforce|Technology|NYSE|stock|US
ADBE|Adobe|Technology|NASDAQ|stock|US
INTC|Intel|Technology|NASDAQ|stock|US
QCOM|Qualcomm|Technology|NASDAQ|stock|US
TXN|Texas Instruments|Technology|NASDAQ|stock|US
MU|Micron|Technology|NASDAQ|stock|US
CSCO|Cisco|Technology|NASDAQ|stock|US
NOW|ServiceNow|Technology|NYSE|stock|US
PANW|Palo Alto Networks|Technology|NASDAQ|stock|US
CRWD|CrowdStrike|Technology|NASDAQ|stock|US
SNOW|Snowflake|Technology|NYSE|stock|US
SHOP|Shopify|Technology|NASDAQ|stock|US
UBER|Uber|Technology|NYSE|stock|US
ABNB|Airbnb|Consumer Cyclical|NASDAQ|stock|US
PYPL|PayPal|Technology|NASDAQ|stock|US
SQ|Block|Technology|NYSE|stock|US
JPM|JPMorgan Chase|Financial Services|NYSE|stock|US
BAC|Bank of America|Financial Services|NYSE|stock|US
WFC|Wells Fargo|Financial Services|NYSE|stock|US
C|Citigroup|Financial Services|NYSE|stock|US
GS|Goldman Sachs|Financial Services|NYSE|stock|US
MS|Morgan Stanley|Financial Services|NYSE|stock|US
V|Visa|Financial Services|NYSE|stock|US
MA|Mastercard|Financial Services|NYSE|stock|US
AXP|American Express|Financial Services|NYSE|stock|US
BLK|BlackRock|Financial Services|NYSE|stock|US
SCHW|Charles Schwab|Financial Services|NYSE|stock|US
UNH|UnitedHealth|Healthcare|NYSE|stock|US
JNJ|Johnson & Johnson|Healthcare|NYSE|stock|US
PFE|Pfizer|Healthcare|NYSE|stock|US
MRK|Merck|Healthcare|NYSE|stock|US
ABBV|AbbVie|Healthcare|NYSE|stock|US
LLY|Eli Lilly|Healthcare|NYSE|stock|US
TMO|Thermo Fisher Scientific|Healthcare|NYSE|stock|US
ISRG|Intuitive Surgical|Healthcare|NASDAQ|stock|US
DHR|Danaher|Healthcare|NYSE|stock|US
CVS|CVS Health|Healthcare|NYSE|stock|US
AMGN|Amgen|Healthcare|NASDAQ|stock|US
GILD|Gilead Sciences|Healthcare|NASDAQ|stock|US
WMT|Walmart|Consumer Defensive|NYSE|stock|US
COST|Costco|Consumer Defensive|NASDAQ|stock|US
HD|Home Depot|Consumer Cyclical|NYSE|stock|US
LOW|Lowe's|Consumer Cyclical|NYSE|stock|US
MCD|McDonald's|Consumer Cyclical|NYSE|stock|US
SBUX|Starbucks|Consumer Cyclical|NASDAQ|stock|US
NKE|Nike|Consumer Cyclical|NYSE|stock|US
TGT|Target|Consumer Defensive|NYSE|stock|US
DIS|Disney|Communication Services|NYSE|stock|US
CMG|Chipotle|Consumer Cyclical|NYSE|stock|US
KO|Coca-Cola|Consumer Defensive|NYSE|stock|US
PEP|PepsiCo|Consumer Defensive|NASDAQ|stock|US
PG|Procter & Gamble|Consumer Defensive|NYSE|stock|US
CL|Colgate-Palmolive|Consumer Defensive|NYSE|stock|US
XOM|Exxon Mobil|Energy|NYSE|stock|US
CVX|Chevron|Energy|NYSE|stock|US
COP|ConocoPhillips|Energy|NYSE|stock|US
SLB|Schlumberger|Energy|NYSE|stock|US
CAT|Caterpillar|Industrials|NYSE|stock|US
DE|Deere|Industrials|NYSE|stock|US
GE|GE Aerospace|Industrials|NYSE|stock|US
BA|Boeing|Industrials|NYSE|stock|US
HON|Honeywell|Industrials|NASDAQ|stock|US
UPS|UPS|Industrials|NYSE|stock|US
UNP|Union Pacific|Industrials|NYSE|stock|US
LMT|Lockheed Martin|Industrials|NYSE|stock|US
RTX|RTX|Industrials|NYSE|stock|US
NOC|Northrop Grumman|Industrials|NYSE|stock|US
TMUS|T-Mobile|Communication Services|NASDAQ|stock|US
VZ|Verizon|Communication Services|NYSE|stock|US
T|AT&T|Communication Services|NYSE|stock|US
CMCSA|Comcast|Communication Services|NASDAQ|stock|US
CHTR|Charter Communications|Communication Services|NASDAQ|stock|US
NEE|NextEra Energy|Utilities|NYSE|stock|US
DUK|Duke Energy|Utilities|NYSE|stock|US
SO|Southern Company|Utilities|NYSE|stock|US
SPY|SPDR S&P 500 ETF|ETF|NYSE Arca|etf|US
QQQ|Invesco QQQ|ETF|NASDAQ|etf|US
DIA|SPDR Dow Jones Industrial Average ETF|ETF|NYSE Arca|etf|US
IWM|iShares Russell 2000 ETF|ETF|NYSE Arca|etf|US
VOO|Vanguard S&P 500 ETF|ETF|NYSE Arca|etf|US
VTI|Vanguard Total Stock Market ETF|ETF|NYSE Arca|etf|US
SCHD|Schwab U.S. Dividend Equity ETF|ETF|NYSE Arca|etf|US
XLK|Technology Select Sector SPDR Fund|ETF|NYSE Arca|etf|US
XLF|Financial Select Sector SPDR Fund|ETF|NYSE Arca|etf|US
XLE|Energy Select Sector SPDR Fund|ETF|NYSE Arca|etf|US
XLV|Health Care Select Sector SPDR Fund|ETF|NYSE Arca|etf|US
XLI|Industrial Select Sector SPDR Fund|ETF|NYSE Arca|etf|US
XLY|Consumer Discretionary Select Sector SPDR Fund|ETF|NYSE Arca|etf|US
XLP|Consumer Staples Select Sector SPDR Fund|ETF|NYSE Arca|etf|US
TLT|iShares 20+ Year Treasury Bond ETF|ETF|NASDAQ|etf|US
GLD|SPDR Gold Shares|ETF|NYSE Arca|etf|US
SLV|iShares Silver Trust|ETF|NYSE Arca|etf|US
ARKK|ARK Innovation ETF|ETF|NYSE Arca|etf|US
SMH|VanEck Semiconductor ETF|ETF|NASDAQ|etf|US
SOXX|iShares Semiconductor ETF|ETF|NASDAQ|etf|US
HYG|iShares iBoxx High Yield Corporate Bond ETF|ETF|NYSE Arca|etf|US
LQD|iShares iBoxx Investment Grade Corporate Bond ETF|ETF|NYSE Arca|etf|US
D05.SI|DBS Group|Financial Services|SGX|stock|SG
U11.SI|United Overseas Bank|Financial Services|SGX|stock|SG
O39.SI|OCBC Bank|Financial Services|SGX|stock|SG
Z74.SI|Singapore Telecommunications|Communication Services|SGX|stock|SG
C6L.SI|Singapore Airlines|Industrials|SGX|stock|SG
S68.SI|Singapore Exchange|Financial Services|SGX|stock|SG
BN4.SI|Keppel|Industrials|SGX|stock|SG
U96.SI|Sembcorp Industries|Utilities|SGX|stock|SG
Y92.SI|Thai Beverage|Consumer Defensive|SGX|stock|SG
G13.SI|Genting Singapore|Consumer Cyclical|SGX|stock|SG
F34.SI|Wilmar International|Consumer Defensive|SGX|stock|SG
S58.SI|SATS|Industrials|SGX|stock|SG
AAJ.SI|AEM Holdings|Technology|SGX|stock|SG
M35.SI|Venture Corporation|Technology|SGX|stock|SG
BS6.SI|Yangzijiang Shipbuilding|Industrials|SGX|stock|SG
CC3.SI|StarHub|Communication Services|SGX|stock|SG
OV8.SI|Sheng Siong|Consumer Defensive|SGX|stock|SG
1B1.SI|Raffles Medical|Healthcare|SGX|stock|SG
SK3.SI|ST Engineering|Industrials|SGX|stock|SG
S51.SI|Seatrium|Industrials|SGX|stock|SG
9CI.SI|CapitaLand Investment|Real Estate|SGX|stock|SG
Q0F.SI|City Developments|Real Estate|SGX|stock|SG
U14.SI|UOL Group|Real Estate|SGX|stock|SG
CLR.SI|iFAST Corporation|Financial Services|SGX|stock|SG
C38U.SI|CapitaLand Integrated Commercial Trust|REIT|SGX|reit|SG
A17U.SI|CapitaLand Ascendas REIT|REIT|SGX|reit|SG
ME8U.SI|Mapletree Industrial Trust|REIT|SGX|reit|SG
M44U.SI|Mapletree Logistics Trust|REIT|SGX|reit|SG
N2IU.SI|Mapletree Pan Asia Commercial Trust|REIT|SGX|reit|SG
AJBU.SI|Keppel DC REIT|REIT|SGX|reit|SG
T82U.SI|Suntec REIT|REIT|SGX|reit|SG
BUOU.SI|Frasers Logistics & Commercial Trust|REIT|SGX|reit|SG
J69U.SI|ESR-LOGOS REIT|REIT|SGX|reit|SG
ES3.SI|STI ETF|ETF|SGX|etf|SG
G3B.SI|Nikko AM STI ETF|ETF|SGX|etf|SG
MBH.SI|Nikko AM SGD Investment Grade Corporate Bond ETF|ETF|SGX|etf|SG
`;

const RESEARCH_UNIVERSE = [...new Map(
  SYMBOL_CATALOG_TEXT.trim().split('\n').map(line => {
    const [symbol, name, sector, exchange, assetType, country] = line.split('|');
    return [symbol, { symbol, name, sector, exchange, assetType, country }];
  })
).values()];

const RESEARCH_UNIVERSE_BY_SYMBOL = new Map(RESEARCH_UNIVERSE.map(item => [item.symbol.toUpperCase(), item]));
const POPULAR_SYMBOLS = RESEARCH_UNIVERSE.slice(0, 24);

const FUNDAMENTAL_OVERRIDES = {
  NVDA: { marketCap: 4_900_000_000_000, peRatio: 41.15, epsTtm: 4.93, employees: 42_000, technicalRating: 'Buy' },
  GOOG: { marketCap: 4_120_000_000_000, peRatio: 31.41, epsTtm: 10.91, employees: 190_820, technicalRating: 'Buy' },
  GOOGL: { marketCap: 4_120_000_000_000, peRatio: 31.41, epsTtm: 10.91, employees: 190_820, technicalRating: 'Buy' },
  AAPL: { marketCap: 3_970_000_000_000, peRatio: 34.19, epsTtm: 7.93, employees: 166_000, technicalRating: 'Strong Buy' },
  MSFT: { marketCap: 3_140_000_000_000, peRatio: 26.45, epsTtm: 16.05, employees: 228_000, technicalRating: 'Neutral' },
  AMZN: { marketCap: 2_690_000_000_000, peRatio: 34.93, epsTtm: 7.29, employees: 1_580_000, technicalRating: 'Buy' },
  AVGO: { marketCap: 1_920_000_000_000, peRatio: 79.30, epsTtm: 5.28, employees: 33_000, technicalRating: 'Strong Buy' },
  META: { marketCap: 1_740_000_000_000, peRatio: 29.31, epsTtm: 23.96, employees: 78_860, technicalRating: 'Buy' },
  TSLA: { marketCap: 1_500_000_000_000, peRatio: 372.32, epsTtm: 1.18, employees: 134_780, technicalRating: 'Buy' },
  WMT: { marketCap: 1_020_000_000_000, peRatio: 46.71, epsTtm: 2.74, employees: 2_100_000, technicalRating: 'Strong Buy' },
  LLY: { marketCap: 875_880_000_000, peRatio: 41.04, epsTtm: 22.62, employees: 50_000, technicalRating: 'Neutral' },
  JPM: { marketCap: 836_860_000_000, peRatio: 14.86, epsTtm: 20.91, employees: 318_510, technicalRating: 'Strong Buy' },
  XOM: { marketCap: 610_180_000_000, peRatio: 21.87, epsTtm: 6.69, employees: 58_000, technicalRating: 'Sell' },
  V: { marketCap: 604_240_000_000, peRatio: 30.04, epsTtm: 10.68, employees: 34_100, technicalRating: 'Neutral' },
  JNJ: { marketCap: 564_050_000_000, peRatio: 27.08, epsTtm: 0, employees: 140_800, technicalRating: 'Sell' },
  MU: { marketCap: 513_200_000_000, peRatio: 21.48, epsTtm: 21.44, employees: 53_000, technicalRating: 'Buy' },
  ORCL: { marketCap: 503_480_000_000, peRatio: 31.43, epsTtm: 5.69, employees: 162_000, technicalRating: 'Neutral' },
  MA: { marketCap: 464_900_000_000, peRatio: 31.55, epsTtm: 16.55, employees: 39_800, technicalRating: 'Neutral' },
  AMD: { marketCap: 453_870_000_000, peRatio: 105.26, epsTtm: 2.67, employees: 31_000, technicalRating: 'Buy' },
  COST: { marketCap: 443_600_000_000, peRatio: 52.00, epsTtm: 19.26, employees: 341_000, technicalRating: 'Buy' },
  NFLX: { marketCap: 410_860_000_000, peRatio: 31.43, epsTtm: 3.16, employees: 16_000, technicalRating: 'Sell' },
  BAC: { marketCap: 386_890_000_000, peRatio: 13.37, epsTtm: 4.09, employees: 213_000, technicalRating: 'Buy' },
  CAT: { marketCap: 369_740_000_000, peRatio: 42.21, epsTtm: 18.91, employees: 118_000, technicalRating: 'Strong Buy' },
  ABBV: { marketCap: 368_570_000_000, peRatio: 88.24, epsTtm: 2.36, employees: 57_000, technicalRating: 'Sell' },
  CVX: { marketCap: 367_130_000_000, peRatio: 27.68, epsTtm: 6.67, employees: 43_040, technicalRating: 'Sell' },
  PLTR: { marketCap: 350_120_000_000, peRatio: 231.34, epsTtm: 0.68, employees: 4_430, technicalRating: 'Buy' },
  HD: { marketCap: 348_010_000_000, peRatio: 24.54, epsTtm: 14.26, employees: 472_400, technicalRating: 'Buy' },
  INTC: { marketCap: 343_940_000_000, peRatio: 0, epsTtm: -0.08, employees: 85_100, technicalRating: 'Buy' },
  PG: { marketCap: 341_470_000_000, peRatio: 21.77, epsTtm: 6.90, employees: 109_000, technicalRating: 'Buy' },
  CSCO: { marketCap: 340_680_000_000, peRatio: 30.34, epsTtm: 2.87, employees: 86_200, technicalRating: 'Strong Buy' },
  KO: { marketCap: 326_000_000_000, peRatio: 24.93, epsTtm: 3.05, employees: 65_900, technicalRating: 'Sell' },
  GE: { marketCap: 317_760_000_000, peRatio: 37.37, epsTtm: 8.20, employees: 57_000, technicalRating: 'Neutral' },
  MS: { marketCap: 299_820_000_000, peRatio: 17.11, epsTtm: 11.17, employees: 83_000, technicalRating: 'Buy' },
  UNH: { marketCap: 294_660_000_000, peRatio: 24.60, epsTtm: 13.26, employees: 390_000, technicalRating: 'Strong Buy' },
  MRK: { marketCap: 294_390_000_000, peRatio: 16.37, epsTtm: 7.29, employees: 75_000, technicalRating: 'Buy' },
  RTX: { marketCap: 264_380_000_000, peRatio: 39.58, epsTtm: 5.02, employees: 180_000, technicalRating: 'Sell' },
  WFC: { marketCap: 249_460_000_000, peRatio: 12.58, epsTtm: 6.56, employees: 205_000, technicalRating: 'Sell' },
  IBM: { marketCap: 237_760_000_000, peRatio: 22.74, epsTtm: 11.34, employees: 286_800, technicalRating: 'Neutral' },
  AXP: { marketCap: 227_470_000_000, peRatio: 21.56, epsTtm: 15.41, employees: 76_800, technicalRating: 'Buy' },
  MCD: { marketCap: 221_190_000_000, peRatio: 26.05, epsTtm: 12.00, employees: 150_000, technicalRating: 'Buy' },
  TMUS: { marketCap: 217_810_000_000, peRatio: 20.36, epsTtm: 9.73, employees: 75_000, technicalRating: 'Sell' },
  PEP: { marketCap: 215_500_000_000, peRatio: 24.76, epsTtm: 6.38, employees: 306_000, technicalRating: 'Buy' },
  TXN: { marketCap: 209_240_000_000, peRatio: 42.20, epsTtm: 5.47, employees: 33_000, technicalRating: 'Strong Buy' },
  VZ: { marketCap: 196_330_000_000, peRatio: 11.47, epsTtm: 4.06, employees: 89_900, technicalRating: 'Sell' },
  TMO: { marketCap: 195_700_000_000, peRatio: 29.69, epsTtm: 17.76, employees: 125_000, technicalRating: 'Buy' },
  NEE: { marketCap: 191_810_000_000, peRatio: 27.87, epsTtm: 3.31, employees: 17_400, technicalRating: 'Neutral' },
  AMGN: { marketCap: 191_530_000_000, peRatio: 24.96, epsTtm: 14.33, employees: 31_500, technicalRating: 'Strong Buy' },
  DIS: { marketCap: 188_290_000_000, peRatio: 15.66, epsTtm: 6.81, employees: 231_000, technicalRating: 'Strong Buy' },
  T: { marketCap: 185_130_000_000, peRatio: 8.69, epsTtm: 3.05, employees: 133_030, technicalRating: 'Sell' },
  ADBE: { marketCap: 98_810_000_000, peRatio: 14.24, epsTtm: 17.19, employees: 31_360, technicalRating: 'Sell' },
};

const PROFILE_OVERRIDES = {
  NVDA: {
    description: 'NVIDIA designs GPUs, AI accelerators, networking hardware, and software platforms used across data centers, gaming, robotics, and autonomous systems.',
    industry: 'Semiconductors',
    website: 'https://www.nvidia.com/',
  },
  AAPL: {
    description: 'Apple designs consumer hardware, operating systems, and services, with major businesses in iPhone, Mac, iPad, wearables, and digital subscriptions.',
    industry: 'Consumer Electronics',
    website: 'https://www.apple.com/',
  },
  MSFT: {
    description: 'Microsoft develops enterprise software, cloud infrastructure, developer platforms, productivity tools, gaming services, and AI products.',
    industry: 'Software Infrastructure',
    website: 'https://www.microsoft.com/',
  },
  AMZN: {
    description: 'Amazon operates global e-commerce, logistics, digital advertising, devices, and AWS cloud infrastructure services.',
    industry: 'Internet Retail & Cloud',
    website: 'https://www.amazon.com/',
  },
  GOOGL: {
    description: 'Alphabet operates Google Search, YouTube, Android, cloud services, advertising products, and a portfolio of AI-driven technology businesses.',
    industry: 'Internet Content & Information',
    website: 'https://abc.xyz/',
  },
  GOOG: {
    description: 'Alphabet operates Google Search, YouTube, Android, cloud services, advertising products, and a portfolio of AI-driven technology businesses.',
    industry: 'Internet Content & Information',
    website: 'https://abc.xyz/',
  },
  META: {
    description: 'Meta Platforms runs social and messaging products including Facebook, Instagram, WhatsApp, and Messenger, while also investing in AI and mixed reality.',
    industry: 'Internet Content & Information',
    website: 'https://about.meta.com/',
  },
  TSLA: {
    description: 'Tesla builds electric vehicles, battery systems, charging infrastructure, energy storage products, and autonomous driving software.',
    industry: 'Auto Manufacturers',
    website: 'https://www.tesla.com/',
  },
  AVGO: {
    description: 'Broadcom develops semiconductor components and infrastructure software for networking, wireless, broadband, storage, and enterprise systems.',
    industry: 'Semiconductors',
    website: 'https://www.broadcom.com/',
  },
  AMD: {
    description: 'AMD designs CPUs, GPUs, adaptive computing products, and data-center chips used in PCs, servers, gaming consoles, and AI workloads.',
    industry: 'Semiconductors',
    website: 'https://www.amd.com/',
  },
  NFLX: {
    description: 'Netflix operates a global subscription streaming service focused on licensed and original film, television, and interactive entertainment.',
    industry: 'Entertainment',
    website: 'https://www.netflix.com/',
  },
  JPM: {
    description: 'JPMorgan Chase provides consumer banking, investment banking, markets, asset management, and payment services globally.',
    industry: 'Banks - Diversified',
    website: 'https://www.jpmorganchase.com/',
  },
  BAC: {
    description: 'Bank of America provides consumer banking, wealth management, lending, markets, and corporate banking services.',
    industry: 'Banks - Diversified',
    website: 'https://www.bankofamerica.com/',
  },
  WMT: {
    description: 'Walmart operates large-scale retail, grocery, marketplace, fulfillment, and membership businesses across stores and digital channels.',
    industry: 'Discount Stores',
    website: 'https://www.walmart.com/',
  },
  COST: {
    description: 'Costco operates membership warehouse clubs focused on high-volume retail, grocery, and private-label consumer products.',
    industry: 'Discount Stores',
    website: 'https://www.costco.com/',
  },
  ORCL: {
    description: 'Oracle provides databases, enterprise applications, cloud infrastructure, and mission-critical software platforms for businesses and governments.',
    industry: 'Software Infrastructure',
    website: 'https://www.oracle.com/',
  },
  PLTR: {
    description: 'Palantir builds data integration, analytics, and operational software platforms used by government agencies and commercial enterprises.',
    industry: 'Software - Application',
    website: 'https://www.palantir.com/',
  },
  XOM: {
    description: 'Exxon Mobil is an integrated energy company involved in upstream production, refining, chemicals, and global fuel distribution.',
    industry: 'Oil & Gas Integrated',
    website: 'https://corporate.exxonmobil.com/',
  },
  CVX: {
    description: 'Chevron is an integrated energy company with operations spanning upstream oil and gas, refining, chemicals, and fuels distribution.',
    industry: 'Oil & Gas Integrated',
    website: 'https://www.chevron.com/',
  },
  SPY: {
    description: 'SPY is an ETF designed to track the S&P 500, giving broad exposure to large-cap U.S. equities.',
    industry: 'Large Blend ETF',
    website: 'https://www.ssga.com/',
  },
  QQQ: {
    description: 'QQQ is an ETF designed to track the Nasdaq-100, concentrating exposure in large non-financial growth and technology-oriented companies.',
    industry: 'Large Growth ETF',
    website: 'https://www.invesco.com/',
  },
};

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
  return readJsonBody(req, { maxBytes: MAX_SIMULATOR_BODY_BYTES });
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
  const match = RESEARCH_UNIVERSE_BY_SYMBOL.get(upper);
  return match || { symbol: upper, name: upper, sector: 'Unknown', exchange: 'US', assetType: 'stock', country: 'US' };
}

function fundamentalForSymbol(symbol, quote = {}) {
  const upper = String(symbol || '').toUpperCase();
  const override = FUNDAMENTAL_OVERRIDES[upper] || {};
  const marketCap = toNumber(quote.marketCap, 0) || override.marketCap || Math.round((toNumber(quote.price, 100) || 100) * (500_000_000 + seededRandom(`${upper}:shares`) * 9_000_000_000));
  const epsTtm = toNumber(quote.epsTtm, 0) || override.epsTtm || roundTo((seededRandom(`${upper}:eps`) * 18) - 1, 2);
  const peRatio = toNumber(quote.peRatio, 0) || override.peRatio || (epsTtm > 0 ? roundTo((toNumber(quote.price, 100) || 100) / epsTtm, 2) : 0);
  const employees = Math.round(toNumber(quote.employees, 0) || override.employees || (1_000 + seededRandom(`${upper}:employees`) * 280_000));
  const technicalRating = quote.technicalRating || override.technicalRating || technicalRatingFromChange(toNumber(quote.percentChange, 0));
  return { marketCap, peRatio, epsTtm, employees, technicalRating };
}

function technicalRatingFromChange(percentChange) {
  if (percentChange >= 3) return 'Strong Buy';
  if (percentChange >= 0.75) return 'Buy';
  if (percentChange <= -3) return 'Strong Sell';
  if (percentChange <= -0.75) return 'Sell';
  return 'Neutral';
}

function generatedProfileFallback(meta) {
  const assetLabel = meta.assetType === 'etf'
    ? 'exchange-traded fund'
    : meta.assetType === 'reit'
      ? 'real estate investment trust'
      : 'public company';
  return `${meta.name} is a ${assetLabel} tracked in the simulator universe. It trades on ${meta.exchange} and is grouped under ${meta.sector}. Live profile text depends on the connected market-data plan, so this fallback summarizes the security classification and market listing.`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function optionsEligible(meta) {
  return meta.country === 'US' && (meta.assetType === 'stock' || meta.assetType === 'etf');
}

function avgVolumeEstimate(symbol, volume) {
  return Math.max(50000, Math.round(volume * (0.7 + seededRandom(`${symbol}:avg-volume`) * 0.9)));
}

function enrichScreenerRow(meta, quote, overlay = {}) {
  const overlayPrice = toNumber(overlay.price, 0);
  const overlayVolume = toNumber(overlay.volume, 0);
  const price = overlayPrice > 0 ? overlayPrice : quote.price;
  const volume = Math.round(overlayVolume > 0 ? overlayVolume : (quote.volume || 0));
  const percentChange = roundTo(toNumber(overlay.percentChange, quote.percentChange || 0));
  const change = roundTo(toNumber(overlay.change, quote.change || 0));
  const displayName = overlay.name || quote.name || meta.name || meta.symbol;
  const fundamentals = fundamentalForSymbol(meta.symbol, { ...quote, price, percentChange });
  const avgVolume = avgVolumeEstimate(meta.symbol, volume || 0);
  const relativeVolume = avgVolume ? roundTo((volume || 0) / avgVolume, 2) : 1;
  const volatilityScore = roundTo((((quote.high || quote.price) - (quote.low || quote.price)) / Math.max(quote.price || 1, 1)) * 100, 2);
  const liquidityScore = Math.log10(Math.max(volume || 1, 10));
  const trendScore = roundTo((Math.abs(percentChange || 0) * 1.8) + (relativeVolume * 10) + (liquidityScore * 1.25) + volatilityScore, 2);

  return {
    symbol: meta.symbol,
    name: displayName,
    sector: meta.sector,
    exchange: meta.exchange,
    assetType: meta.assetType,
    country: meta.country,
    price: roundTo(price),
    previousClose: quote.previousClose,
    change,
    percentChange,
    high: quote.high,
    low: quote.low,
    volume,
    tradeCount: Math.round(toNumber(overlay.tradeCount, 0)),
    dollarVolume: roundTo(price * volume, 0),
    marketCap: fundamentals.marketCap,
    peRatio: fundamentals.peRatio,
    epsTtm: fundamentals.epsTtm,
    employees: fundamentals.employees,
    technicalRating: fundamentals.technicalRating,
    source: overlay.source ? `${overlay.source}/${quote.source}` : quote.source,
    rankSource: overlay.source || quote.source,
    providerRank: overlay.providerRank || 9999,
    relativeVolume,
    volatilityScore,
    trendScore,
    optionsEligible: optionsEligible(meta),
  };
}

function alpacaHeaders() {
  return {
    'APCA-API-KEY-ID': ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': ALPACA_API_SECRET,
  };
}

function normalizeProviderSymbol(value) {
  return String(value || '').trim().toUpperCase().replace(/[^A-Z0-9.-]/g, '').slice(0, 16);
}

function fieldNumber(item, fields, fallback = 0) {
  for (const field of fields) {
    const value = item?.[field];
    if (value !== undefined && value !== null && value !== '') {
      const normalized = typeof value === 'string' ? value.replace(/[%,$,]/g, '') : value;
      return toNumber(normalized, fallback);
    }
  }
  return fallback;
}

function normalizeAlpacaMostActives(payload) {
  const rows = payload.most_actives || payload.mostActives || payload.data || payload.results || [];
  return (Array.isArray(rows) ? rows : []).map((item, index) => ({
    symbol: normalizeProviderSymbol(item.symbol || item.ticker || item.S),
    name: safeText(item.name || item.description || item.company_name || '', 120),
    volume: fieldNumber(item, ['volume', 'v']),
    tradeCount: fieldNumber(item, ['trade_count', 'tradeCount', 'trades', 't']),
    providerRank: index + 1,
    source: 'alpaca-most-active',
  })).filter(item => item.symbol);
}

function normalizeAlpacaMoverRows(rows, direction) {
  return (Array.isArray(rows) ? rows : []).map((item, index) => ({
    symbol: normalizeProviderSymbol(item.symbol || item.ticker || item.S),
    name: safeText(item.name || item.description || item.company_name || '', 120),
    price: fieldNumber(item, ['price', 'close', 'last', 'p']),
    change: fieldNumber(item, ['change', 'change_amount', 'changeAmount']),
    percentChange: fieldNumber(item, ['percent_change', 'percentChange', 'change_percent', 'changePercent', 'pct_change']),
    volume: fieldNumber(item, ['volume', 'v']),
    providerRank: index + 1,
    source: `alpaca-${direction}`,
  })).filter(item => item.symbol);
}

function normalizeAlpacaMovers(payload) {
  return {
    gainers: normalizeAlpacaMoverRows(payload.gainers || payload.top_gainers || payload.topGainers || [], 'gainers'),
    losers: normalizeAlpacaMoverRows(payload.losers || payload.top_losers || payload.topLosers || [], 'losers'),
    lastUpdated: payload.last_updated || payload.lastUpdated || '',
  };
}

async function getAlpacaMostActives(top = 100, by = 'volume') {
  if (!ALPACA_API_KEY || !ALPACA_API_SECRET) return [];
  return withCache('alpaca-most-actives', [top, by], 60_000, async () => {
    const payload = await httpsJson({
      hostname: 'data.alpaca.markets',
      path: `/v1beta1/screener/stocks/most-actives?top=${encodeURIComponent(top)}&by=${encodeURIComponent(by)}`,
      method: 'GET',
      headers: alpacaHeaders(),
    });
    return normalizeAlpacaMostActives(payload);
  }).catch(() => []);
}

async function getAlpacaMovers(top = 50) {
  if (!ALPACA_API_KEY || !ALPACA_API_SECRET) return { gainers: [], losers: [], lastUpdated: '' };
  return withCache('alpaca-movers', [top], 60_000, async () => {
    const payload = await httpsJson({
      hostname: 'data.alpaca.markets',
      path: `/v1beta1/screener/stocks/movers?top=${encodeURIComponent(top)}`,
      method: 'GET',
      headers: alpacaHeaders(),
    });
    return normalizeAlpacaMovers(payload);
  }).catch(() => ({ gainers: [], losers: [], lastUpdated: '' }));
}

function presetDefaults(preset) {
  switch (preset) {
    case 'most-active':
      return { sortBy: 'volume', direction: 'desc', explanation: 'Most Active ranks stocks by current trading volume.' };
    case 'top-gainers':
      return { sortBy: 'percentChange', direction: 'desc', explanation: 'Top Gainers ranks the filtered list by percentage change.' };
    case 'top-losers':
      return { sortBy: 'percentChange', direction: 'asc', explanation: 'Top Losers ranks the filtered list by percentage change ascending.' };
    case 'most-volatile':
      return { sortBy: 'volatilityScore', direction: 'desc', explanation: 'Most Volatile ranks by intraday high-low range relative to price.' };
    case 'large-cap':
    case 'most-capitalized':
      return { sortBy: 'marketCap', direction: 'desc', explanation: 'Most Capitalized ranks companies by market capitalization, using provider fields where available and simulator fundamentals otherwise.' };
    case 'options-ready':
      return { sortBy: 'trendScore', direction: 'desc', explanation: 'Options Ready shows U.S. stocks and ETFs that can load an option chain.' };
    case 'us':
      return { sortBy: 'trendScore', direction: 'desc', explanation: 'US filters the research universe to U.S. stocks and ETFs.' };
    case 'singapore':
      return { sortBy: 'trendScore', direction: 'desc', explanation: 'Singapore filters the research universe to SGX stocks, REITs, and ETFs.' };
    case 'etfs':
      return { sortBy: 'trendScore', direction: 'desc', explanation: 'ETFs filters the research universe to exchange-traded funds.' };
    default:
      return { sortBy: 'trendScore', direction: 'desc', explanation: 'Trending blends price move, relative volume, liquidity, and intraday range.' };
  }
}

function compareScreenerRows(left, right, sortBy, direction) {
  const order = direction === 'asc' ? 1 : -1;
  const a = left[sortBy];
  const b = right[sortBy];
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b) * order;
  }
  return ((a || 0) - (b || 0)) * order;
}

async function providerRowsForPreset(preset) {
  if (!ALPACA_API_KEY || !ALPACA_API_SECRET) {
    return null;
  }

  if (preset === 'most-active') {
    const rows = await getAlpacaMostActives(100, 'volume');
    return rows.length
      ? { rows, explanation: 'Most Active is ranked from Alpaca\'s live screener endpoint by current U.S. trading volume.' }
      : null;
  }

  if (preset === 'top-gainers' || preset === 'top-losers') {
    const movers = await getAlpacaMovers(50);
    const rows = preset === 'top-gainers' ? movers.gainers : movers.losers;
    const direction = preset === 'top-gainers' ? 'gainers' : 'losers';
    return rows.length
      ? { rows, explanation: `Top ${direction[0].toUpperCase()}${direction.slice(1)} is ranked from Alpaca's live market movers endpoint.` }
      : null;
  }

  if (preset === 'trending') {
    const [actives, movers] = await Promise.all([
      getAlpacaMostActives(100, 'volume'),
      getAlpacaMovers(50),
    ]);
    const combined = new Map();
    [...actives, ...movers.gainers, ...movers.losers].forEach(item => {
      if (!combined.has(item.symbol)) {
        combined.set(item.symbol, { ...item, source: item.source || 'alpaca-screener' });
      }
    });
    const rows = [...combined.values()];
    return rows.length
      ? { rows, explanation: 'Trending blends Alpaca most-active and market-mover symbols with quote movement, relative volume, liquidity, and range.' }
      : null;
  }

  return null;
}

async function buildScreenerPayload(params = {}) {
  const preset = safeText(params.preset || 'trending', 32).toLowerCase();
  const search = safeText(params.search || '', 80).toUpperCase();
  const sector = safeText(params.sector || 'all', 80);
  const exchange = safeText(params.exchange || 'all', 80);
  const country = safeText(params.country || 'all', 24);
  const assetType = safeText(params.assetType || 'all', 24);
  const page = clamp(Math.floor(toNumber(params.page, 1)), 1, 20);
  const pageSize = clamp(Math.floor(toNumber(params.pageSize, 20)), 10, 40);
  const defaults = presetDefaults(preset);
  const requestedSortBy = safeText(params.sortBy || 'preset', 32);
  const sortBy = requestedSortBy === 'preset' ? defaults.sortBy : requestedSortBy;
  const direction = safeText(params.direction || defaults.direction, 8).toLowerCase() === 'asc' ? 'asc' : 'desc';
  const optionsOnly = params.optionsOnly === 'true' || params.optionsOnly === true;

  const providerSource = await providerRowsForPreset(preset);
  const providerOverlay = new Map((providerSource?.rows || []).map(item => [item.symbol, item]));
  const sourceUniverse = providerSource?.rows?.length
    ? providerSource.rows.map(item => symbolMeta(item.symbol))
    : RESEARCH_UNIVERSE;

  let candidates = sourceUniverse.filter(meta => {
    const matchesSearch = !search || meta.symbol.toUpperCase().includes(search) || meta.name.toUpperCase().includes(search);
    const matchesSector = sector === 'all' || meta.sector === sector;
    const matchesExchange = exchange === 'all' || meta.exchange === exchange;
    const matchesCountry = country === 'all' || meta.country === country;
    const matchesAssetType = assetType === 'all' || meta.assetType === assetType;
    return matchesSearch && matchesSector && matchesExchange && matchesCountry && matchesAssetType;
  });

  if (preset === 'options-ready' || optionsOnly) {
    candidates = candidates.filter(optionsEligible);
  } else if (preset === 'us') {
    candidates = candidates.filter(meta => meta.country === 'US');
  } else if (preset === 'singapore') {
    candidates = candidates.filter(meta => meta.country === 'SG');
  } else if (preset === 'etfs') {
    candidates = candidates.filter(meta => meta.assetType === 'etf');
  }

  const baselineRows = candidates
    .map(meta => enrichScreenerRow(meta, generateMockQuote(meta.symbol), providerOverlay.get(meta.symbol)))
    .sort((left, right) => {
      if (providerSource?.rows?.length && requestedSortBy === 'preset') {
        return (left.providerRank - right.providerRank) || left.symbol.localeCompare(right.symbol);
      }
      return compareScreenerRows(left, right, sortBy, direction) || left.symbol.localeCompare(right.symbol);
    });

  const start = (page - 1) * pageSize;
  const baselinePage = baselineRows.slice(start, start + pageSize);
  const visibleQuotes = await getQuotes(baselinePage.map(row => row.symbol));
  const quoteMap = new Map(visibleQuotes.map(quote => [quote.symbol, quote]));
  const rows = baselinePage.map(row => {
    const meta = symbolMeta(row.symbol);
    return enrichScreenerRow(meta, quoteMap.get(row.symbol) || generateMockQuote(row.symbol), providerOverlay.get(row.symbol));
  });

  return {
    preset,
    search,
    sortBy,
    direction,
    page,
    pageSize,
    total: baselineRows.length,
    universeSize: RESEARCH_UNIVERSE.length,
    hasMore: start + pageSize < baselineRows.length,
    explanation: providerSource?.explanation || defaults.explanation,
    dataMode: providerSource?.rows?.length ? 'alpaca-screener' : (TWELVEDATA_API_KEY ? 'twelvedata-catalog' : 'mock-catalog'),
    rows,
    filters: {
      presets: [
        { value: 'trending', label: 'Trending' },
        { value: 'most-active', label: 'Most Active' },
        { value: 'top-gainers', label: 'Top Gainers' },
        { value: 'top-losers', label: 'Top Losers' },
        { value: 'most-volatile', label: 'Most Volatile' },
        { value: 'most-capitalized', label: 'Most Capitalized' },
        { value: 'options-ready', label: 'Options Ready' },
        { value: 'us', label: 'US' },
        { value: 'singapore', label: 'Singapore' },
        { value: 'etfs', label: 'ETFs' },
      ],
      sectors: [...new Set(RESEARCH_UNIVERSE.map(item => item.sector))].sort(),
      exchanges: [...new Set(RESEARCH_UNIVERSE.map(item => item.exchange))].sort(),
      countries: [...new Set(RESEARCH_UNIVERSE.map(item => item.country))].sort(),
      assetTypes: [...new Set(RESEARCH_UNIVERSE.map(item => item.assetType))].sort(),
      sortOptions: [
        { value: 'preset', label: 'Preset ranking' },
        { value: 'trendScore', label: 'Trend Score' },
        { value: 'volume', label: 'Volume' },
        { value: 'dollarVolume', label: 'Volume * Price' },
        { value: 'percentChange', label: '% Change' },
        { value: 'volatilityScore', label: 'Volatility' },
        { value: 'relativeVolume', label: 'Relative Volume' },
        { value: 'marketCap', label: 'Market Cap' },
        { value: 'peRatio', label: 'P/E' },
        { value: 'epsTtm', label: 'EPS (TTM)' },
        { value: 'employees', label: 'Employees' },
        { value: 'price', label: 'Price' },
        { value: 'name', label: 'Name' },
      ],
    },
  };
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
  const fundamentals = fundamentalForSymbol(meta.symbol, { price: last, percentChange: previousClose ? roundTo((change / previousClose) * 100, 2) : 0 });
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
    marketCap: fundamentals.marketCap,
    peRatio: fundamentals.peRatio,
    epsTtm: fundamentals.epsTtm,
    employees: fundamentals.employees,
    technicalRating: fundamentals.technicalRating,
    exchange: meta.exchange,
    sector: meta.sector,
    source: 'mock',
    isMarketOpen: true,
    delayed: true,
    fiftyTwoWeekLow: roundTo(last * (0.62 + seededRandom(`${symbol}:52wlow`) * 0.14)),
    fiftyTwoWeekHigh: roundTo(last * (1.12 + seededRandom(`${symbol}:52whigh`) * 0.38)),
  };
}

function withFundamentals(symbol, quote) {
  const fundamentals = fundamentalForSymbol(symbol, quote);
  return {
    ...quote,
    marketCap: toNumber(quote.marketCap, 0) || fundamentals.marketCap,
    peRatio: toNumber(quote.peRatio, 0) || fundamentals.peRatio,
    epsTtm: toNumber(quote.epsTtm, 0) || fundamentals.epsTtm,
    employees: Math.round(toNumber(quote.employees, 0) || fundamentals.employees),
    technicalRating: quote.technicalRating || fundamentals.technicalRating,
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
      marketCap: roundTo(data.market_cap || data.marketCap || 0, 0),
      peRatio: roundTo(data.pe || data.pe_ratio || data.peRatio || 0),
      epsTtm: roundTo(data.eps || data.eps_ttm || data.epsTtm || 0),
      employees: Math.round(toNumber(data.employees || data.full_time_employees, 0)),
    };
  });
}

async function getQuote(symbol) {
  try {
    const quote = await getTwelveDataQuote(symbol);
    if (quote && quote.price > 0) return withFundamentals(symbol, quote);
  } catch {}
  return withFundamentals(symbol, generateMockQuote(symbol));
}

async function getQuotes(symbols) {
  const uniqueSymbols = [...new Set((symbols || []).map(value => String(value || '').trim().toUpperCase()).filter(Boolean))];
  const results = await Promise.all(uniqueSymbols.map(async symbol => getQuote(symbol)));
  return results;
}

function chartIntervalForTimeframe(timeframe) {
  const customMatch = String(timeframe || '').match(/^CUSTOM:(\d{1,3})$/i);
  if (customMatch) {
    const days = clamp(Math.round(toNumber(customMatch[1], 30)), 2, 365);
    if (days <= 3) {
      return { interval: '15min', outputsize: Math.min(104, days * 26), span: days };
    }
    if (days <= 14) {
      return { interval: '1h', outputsize: Math.min(120, days * 8), span: days };
    }
    if (days <= 180) {
      return { interval: '1day', outputsize: days, span: days };
    }
    return { interval: '1week', outputsize: Math.max(12, Math.ceil(days / 7)), span: days };
  }

  switch (timeframe) {
    case '1D':
      return { interval: '15min', outputsize: 26, span: 1 };
    case '1W':
      return { interval: '1h', outputsize: 40, span: 7 };
    case '1M':
      return { interval: '1day', outputsize: 30, span: 30 };
    case '3M':
      return { interval: '1day', outputsize: 90, span: 90 };
    case '1Y':
      return { interval: '1week', outputsize: 52, span: 365 };
    default:
      return { interval: '1day', outputsize: 60, span: 60 };
  }
}

function buildMockChart(symbol, timeframe) {
  const points = [];
  const quote = generateMockQuote(symbol);
  const config = chartIntervalForTimeframe(timeframe);
  const count = config.outputsize;
  const stepMs = config.interval === '15min'
    ? 15 * 60 * 1000
    : config.interval === '1h'
      ? 60 * 60 * 1000
      : config.interval === '1week'
        ? 7 * 24 * 60 * 60 * 1000
        : 24 * 60 * 60 * 1000;
  let current = quote.previousClose || quote.price;
  for (let index = count - 1; index >= 0; index -= 1) {
    const noise = (seededRandom(`${symbol}:${timeframe}:${index}`) - 0.5) * current * 0.03;
    current = Math.max(1, current + noise);
    points.push({
      datetime: new Date(Date.now() - index * stepMs).toISOString(),
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
  const profileOverride = PROFILE_OVERRIDES[meta.symbol] || {};
  const fallback = {
    symbol: meta.symbol,
    name: meta.name,
    exchange: meta.exchange,
    sector: meta.sector,
    industry: profileOverride.industry || meta.sector,
    description: profileOverride.description || generatedProfileFallback(meta),
    website: profileOverride.website || '',
    country: meta.country || '',
    employees: FUNDAMENTAL_OVERRIDES[meta.symbol]?.employees || 0,
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
      industry: data.industry || fallback.industry,
      description: data.description || fallback.description,
      website: data.website || fallback.website,
      country: data.country || fallback.country,
      employees: data.full_time_employees || fallback.employees,
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
  const meta = symbolMeta(normalizedSymbol);
  const quote = await getQuote(normalizedSymbol);
  const [profile, chart, optionChain] = await Promise.all([
    getProfileInfo(normalizedSymbol),
    getChart(normalizedSymbol, timeframe),
    optionsEligible(meta) ? getOptionChain(normalizedSymbol, quote) : Promise.resolve([]),
  ]);
  const enrichedProfile = {
    ...profile,
    name: profile.name && profile.name !== normalizedSymbol ? profile.name : (quote.name || profile.name || normalizedSymbol),
    exchange: profile.exchange || quote.exchange || meta.exchange,
    sector: profile.sector && profile.sector !== 'Unknown' ? profile.sector : (quote.sector || meta.sector),
    industry: profile.industry && profile.industry !== 'Unknown' ? profile.industry : (quote.sector || meta.sector),
    employees: profile.employees || quote.employees || 0,
  };

  return {
    symbol: normalizedSymbol,
    quote,
    profile: enrichedProfile,
    chart,
    optionChain,
    optionsEligible: optionsEligible(meta),
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
    if (!optionsEligible(symbolMeta(order.underlyingSymbol))) {
      rejectOrder(account, order, 'Options are only supported for U.S. stocks and ETFs.');
      return order;
    }
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
  const screenerPreview = await buildScreenerPayload({ preset: 'trending', page: 1, pageSize: 20 });
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
    researchUniverseSize: RESEARCH_UNIVERSE.length,
    screenerPreview,
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
    const timeframe = safeText(url.searchParams.get('timeframe') || '1M', 16);
    const payload = await buildResearchPayload(symbol, timeframe);
    return json(res, 200, { ok: true, ...payload });
  }

  if (pathname === '/simulator/api/screener' && req.method === 'GET') {
    const payload = await buildScreenerPayload({
      preset: url.searchParams.get('preset'),
      search: url.searchParams.get('search'),
      sector: url.searchParams.get('sector'),
      exchange: url.searchParams.get('exchange'),
      country: url.searchParams.get('country'),
      assetType: url.searchParams.get('assetType'),
      sortBy: url.searchParams.get('sortBy'),
      direction: url.searchParams.get('direction'),
      page: url.searchParams.get('page'),
      pageSize: url.searchParams.get('pageSize'),
      optionsOnly: url.searchParams.get('optionsOnly'),
    });
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
  const relativePath = cleanPath.replace(/^\/+/, '');
  const filePath = path.resolve(SIMULATOR_DIR, relativePath);
  if (!isPathInside(SIMULATOR_DIR, filePath) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
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
      json(res, error.statusCode || 500, { ok: false, error: error.message || 'Simulator error' });
    }
    return;
  }

  serveStatic(req, res);
}

module.exports = { handle };
