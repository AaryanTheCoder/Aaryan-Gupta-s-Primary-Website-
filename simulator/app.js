(function () {
  const state = {
    bootstrap: null,
    research: null,
    screener: {
      preset: 'trending',
      rows: [],
      page: 1,
      pageSize: 20,
      total: 0,
      hasMore: false,
      filters: null,
    },
    context: 'personal',
    selectedSymbol: 'AAPL',
    timeframe: '1M',
  };

  const dom = {
    tabs: [...document.querySelectorAll('.tab')],
    panels: {
      portfolio: document.getElementById('portfolioTab'),
      trade: document.getElementById('tradeTab'),
      research: document.getElementById('researchTab'),
      games: document.getElementById('gamesTab'),
    },
    timeframes: [...document.querySelectorAll('.timeframe')],
    contextSelect: document.getElementById('contextSelect'),
    watchlist: document.getElementById('watchlist'),
    providerBadges: document.getElementById('providerBadges'),
    symbolInput: document.getElementById('symbolInput'),
    loadSymbolBtn: document.getElementById('loadSymbolBtn'),
    toggleWatchlistBtn: document.getElementById('toggleWatchlistBtn'),
    accountHeadline: document.getElementById('accountHeadline'),
    metricEquity: document.getElementById('metricEquity'),
    metricCash: document.getElementById('metricCash'),
    metricUnrealized: document.getElementById('metricUnrealized'),
    metricWinRate: document.getElementById('metricWinRate'),
    metricReturn: document.getElementById('metricReturn'),
    metricMarketValue: document.getElementById('metricMarketValue'),
    metricDailyPnl: document.getElementById('metricDailyPnl'),
    metricDrawdown: document.getElementById('metricDrawdown'),
    equityChart: document.getElementById('equityChart'),
    allocationList: document.getElementById('allocationList'),
    stockPositionsBody: document.getElementById('stockPositionsBody'),
    optionPositionsBody: document.getElementById('optionPositionsBody'),
    ordersBody: document.getElementById('ordersBody'),
    activityFeed: document.getElementById('activityFeed'),
    assetClassSelect: document.getElementById('assetClassSelect'),
    tradeSymbolInput: document.getElementById('tradeSymbolInput'),
    optionContractWrap: document.getElementById('optionContractWrap'),
    optionContractSelect: document.getElementById('optionContractSelect'),
    actionSelect: document.getElementById('actionSelect'),
    orderTypeSelect: document.getElementById('orderTypeSelect'),
    qtyInput: document.getElementById('qtyInput'),
    priceInputWrap: document.getElementById('priceInputWrap'),
    priceInput: document.getElementById('priceInput'),
    orderForm: document.getElementById('orderForm'),
    tradeLensTitle: document.getElementById('tradeLensTitle'),
    tradeLensContent: document.getElementById('tradeLensContent'),
    ticketPreview: document.getElementById('ticketPreview'),
    refreshTradeResearchBtn: document.getElementById('refreshTradeResearchBtn'),
    researchTitle: document.getElementById('researchTitle'),
    researchSnapshot: document.getElementById('researchSnapshot'),
    researchChart: document.getElementById('researchChart'),
    profileCard: document.getElementById('profileCard'),
    optionChainBody: document.getElementById('optionChainBody'),
    screenerPresetRow: document.getElementById('screenerPresetRow'),
    screenerSearch: document.getElementById('screenerSearch'),
    screenerSector: document.getElementById('screenerSector'),
    screenerExchange: document.getElementById('screenerExchange'),
    screenerCountry: document.getElementById('screenerCountry'),
    screenerAssetType: document.getElementById('screenerAssetType'),
    screenerSort: document.getElementById('screenerSort'),
    screenerDirection: document.getElementById('screenerDirection'),
    screenerOptionsOnly: document.getElementById('screenerOptionsOnly'),
    screenerBody: document.getElementById('screenerBody'),
    screenerSummary: document.getElementById('screenerSummary'),
    screenerExplainer: document.getElementById('screenerExplainer'),
    screenerCount: document.getElementById('screenerCount'),
    loadMoreScreenerBtn: document.getElementById('loadMoreScreenerBtn'),
    createGameForm: document.getElementById('createGameForm'),
    gamesList: document.getElementById('gamesList'),
    resetAccountBtn: document.getElementById('resetAccountBtn'),
    toastHost: document.getElementById('toastHost'),
  };

  function money(value) {
    const num = Number(value || 0);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(num);
  }

  function percent(value) {
    const num = Number(value || 0);
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  }

  function signedMoney(value) {
    const num = Number(value || 0);
    return `${num >= 0 ? '+' : '-'}${money(Math.abs(num))}`;
  }

  function relativeClass(value) {
    return Number(value || 0) >= 0 ? 'positive' : 'negative';
  }

  function compactNumber(value) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(Number(value || 0));
  }

  function fillSelect(select, values, current, allLabel) {
    select.innerHTML = [
      `<option value="all">${allLabel}</option>`,
      ...values.map(value => `<option value="${value}">${value}</option>`),
    ].join('');
    select.value = current || 'all';
  }

  async function request(path, options = {}) {
    const response = await fetch(path, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
    const payload = await response.json();
    if (!response.ok || payload.ok === false) {
      throw new Error(payload.error || `Request failed (${response.status})`);
    }
    return payload;
  }

  function toast(title, description) {
    const element = document.createElement('div');
    element.className = 'toast';
    element.innerHTML = `<strong>${title}</strong><span>${description}</span>`;
    dom.toastHost.appendChild(element);
    setTimeout(() => element.remove(), 3400);
  }

  function renderTabs(active) {
    dom.tabs.forEach(tab => {
      tab.classList.toggle('is-active', tab.dataset.tab === active);
      dom.panels[tab.dataset.tab].classList.toggle('is-active', tab.dataset.tab === active);
    });
  }

  function buildLineChart(points, color) {
    if (!points || !points.length) {
      return '<div class="trade-lens"><p>No chart data available yet.</p></div>';
    }

    const width = 900;
    const height = 320;
    const padding = 28;
    const values = points.map(point => Number(point.value ?? point.close ?? point.equity ?? 0));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);
    const path = points.map((point, index) => {
      const value = Number(point.value ?? point.close ?? point.equity ?? 0);
      const x = padding + (index / Math.max(1, points.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');

    const area = `${path} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;
    return `
      <svg class="svg-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Line chart">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.42"></stop>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" rx="22" fill="rgba(4, 13, 20, 0.88)"></rect>
        <path d="${area}" fill="url(#chartGradient)"></path>
        <path d="${path}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"></path>
        <text x="${padding}" y="${padding}" fill="rgba(243,248,251,0.72)" font-size="16">${money(max)}</text>
        <text x="${padding}" y="${height - 12}" fill="rgba(243,248,251,0.5)" font-size="16">${money(min)}</text>
      </svg>
    `;
  }

  function renderProviderBadges() {
    const providers = state.bootstrap.providers;
    dom.providerBadges.innerHTML = [
      `<span class="badge">Equities: ${providers.equities}</span>`,
      `<span class="badge">Options: ${providers.options}</span>`,
      `<span class="badge">Access: ${providers.gatedBy}</span>`,
    ].join('');
  }

  function renderWatchlist() {
    dom.watchlist.innerHTML = state.bootstrap.watchlistQuotes.map(item => `
      <button class="watch-item" type="button" data-symbol="${item.symbol}">
        <div class="watch-symbol-row">
          <span class="watch-symbol">${item.symbol}</span>
          <span class="watch-price">${money(item.price)}</span>
        </div>
        <div class="watch-symbol-row">
          <span>${item.name}</span>
          <span class="watch-change ${item.percentChange >= 0 ? 'up' : 'down'}">${percent(item.percentChange)}</span>
        </div>
      </button>
    `).join('');

    [...dom.watchlist.querySelectorAll('.watch-item')].forEach(button => {
      button.addEventListener('click', () => {
        loadResearch(button.dataset.symbol);
      });
    });
  }

  function renderContextSelect() {
    dom.contextSelect.innerHTML = state.bootstrap.contexts.map(context => `
      <option value="${context.id}" ${context.id === state.context ? 'selected' : ''}>${context.label} · ${context.subtitle}</option>
    `).join('');
  }

  function renderHero() {
    const summary = state.bootstrap.accountSnapshot.account.summary;
    dom.accountHeadline.textContent = state.bootstrap.contexts.find(item => item.id === state.context)?.label || 'Account';
    dom.metricEquity.textContent = money(summary.equity);
    dom.metricCash.textContent = money(summary.cash);
    dom.metricUnrealized.textContent = signedMoney(summary.unrealizedPnl);
    dom.metricWinRate.textContent = `${summary.winRate.toFixed(1)}%`;
    dom.metricReturn.textContent = `${signedMoney(summary.totalReturn)} · ${percent(summary.returnPct)}`;
    dom.metricMarketValue.textContent = `${money(summary.marketValue)} invested`;
    dom.metricDailyPnl.textContent = `${signedMoney(summary.dailyPnl)} today`;
    dom.metricDrawdown.textContent = `${summary.maxDrawdown.toFixed(2)}% max drawdown`;
    dom.metricUnrealized.className = relativeClass(summary.unrealizedPnl);
    dom.metricReturn.className = relativeClass(summary.totalReturn);
    dom.metricDailyPnl.className = relativeClass(summary.dailyPnl);
  }

  function renderPortfolio() {
    const account = state.bootstrap.accountSnapshot.account;
    dom.equityChart.innerHTML = buildLineChart(account.equityHistory.map(point => ({ value: point.equity })), '#6fe8d8');

    dom.allocationList.innerHTML = account.allocation.length ? account.allocation.map(item => `
      <div class="allocation-item">
        <div class="metric-row">
          <strong>${item.label}</strong>
          <span>${item.weight.toFixed(2)}%</span>
        </div>
        <div class="metric-row">
          <span>${item.sector}</span>
          <span>${money(item.value)}</span>
        </div>
        <div class="allocation-bar"><span style="width:${Math.max(item.weight, 2)}%"></span></div>
      </div>
    `).join('') : '<div class="trade-lens"><p>No active positions yet. Use the Trade tab to start building the simulator portfolio.</p></div>';

    dom.stockPositionsBody.innerHTML = account.positions.stocks.length ? account.positions.stocks.map(position => `
      <tr>
        <td>${position.symbol}</td>
        <td>${position.side}</td>
        <td>${position.qty}</td>
        <td>${money(position.avgCost)}</td>
        <td>${money(position.lastPrice)}</td>
        <td>${money(position.marketValue)}</td>
        <td class="${relativeClass(position.unrealizedPnl)}">${signedMoney(position.unrealizedPnl)}</td>
      </tr>
    `).join('') : '<tr><td colspan="7">No stock positions.</td></tr>';

    dom.optionPositionsBody.innerHTML = account.positions.options.length ? account.positions.options.map(position => `
      <tr>
        <td>${position.contractSymbol}</td>
        <td>${position.qty}</td>
        <td>${money(position.avgCost)}</td>
        <td>${money(position.lastPrice)}</td>
        <td>${money(position.marketValue)}</td>
        <td class="${relativeClass(position.unrealizedPnl)}">${signedMoney(position.unrealizedPnl)}</td>
      </tr>
    `).join('') : '<tr><td colspan="6">No option positions.</td></tr>';

    dom.ordersBody.innerHTML = account.orders.length ? account.orders.map(order => `
      <tr>
        <td>${new Date(order.createdAt).toLocaleString()}</td>
        <td>${order.assetClass === 'option' ? order.contractSymbol : order.symbol}</td>
        <td>${order.action}</td>
        <td>${order.orderType}</td>
        <td>${order.qty}</td>
        <td>${order.status}</td>
        <td>${order.fillPrice ? money(order.fillPrice) : (order.limitPrice ? money(order.limitPrice) : order.stopPrice ? money(order.stopPrice) : 'Market')}</td>
        <td>${order.status === 'open' ? `<button class="ghost-button cancel-order" data-id="${order.id}">Cancel</button>` : ''}</td>
      </tr>
    `).join('') : '<tr><td colspan="8">No orders yet.</td></tr>';

    [...dom.ordersBody.querySelectorAll('.cancel-order')].forEach(button => {
      button.addEventListener('click', async () => {
        try {
          await request('/simulator/api/orders/cancel', {
            method: 'POST',
            body: JSON.stringify({ context: state.context, orderId: button.dataset.id }),
          });
          toast('Order cancelled', 'The open order has been removed from the book.');
          await refreshAccount();
        } catch (error) {
          toast('Cancel failed', error.message);
        }
      });
    });

    dom.activityFeed.innerHTML = account.activities.length ? account.activities.map(activity => `
      <div class="activity-item">
        <div class="metric-row">
          <strong>${activity.title}</strong>
          <span>${new Date(activity.timestamp).toLocaleString()}</span>
        </div>
        <span>${activity.description}</span>
        ${activity.amount ? `<span class="${relativeClass(activity.amount)}">${signedMoney(activity.amount)}</span>` : ''}
      </div>
    `).join('') : '<div class="trade-lens"><p>Activity will appear here after you start trading.</p></div>';
  }

  function renderScreenerControls(payload) {
    if (!payload.filters) return;
    state.screener.filters = payload.filters;

    dom.screenerPresetRow.innerHTML = payload.filters.presets.map(preset => `
      <button type="button" class="screener-preset ${preset.value === state.screener.preset ? 'is-active' : ''}" data-preset="${preset.value}">
        ${preset.label}
      </button>
    `).join('');

    fillSelect(dom.screenerSector, payload.filters.sectors, dom.screenerSector.value || 'all', 'All sectors');
    fillSelect(dom.screenerExchange, payload.filters.exchanges, dom.screenerExchange.value || 'all', 'All exchanges');
    fillSelect(dom.screenerCountry, payload.filters.countries, dom.screenerCountry.value || 'all', 'All countries');
    fillSelect(dom.screenerAssetType, payload.filters.assetTypes, dom.screenerAssetType.value || 'all', 'All asset types');

    const currentSort = dom.screenerSort.value || 'preset';
    dom.screenerSort.innerHTML = payload.filters.sortOptions.map(option => `
      <option value="${option.value}">${option.label}</option>
    `).join('');
    dom.screenerSort.value = payload.filters.sortOptions.some(option => option.value === currentSort) ? currentSort : 'preset';

    [...dom.screenerPresetRow.querySelectorAll('.screener-preset')].forEach(button => {
      button.addEventListener('click', () => {
        state.screener.preset = button.dataset.preset;
        state.screener.page = 1;
        dom.screenerSort.value = 'preset';
        loadScreener();
      });
    });
  }

  function renderScreener(payload, append = false) {
    if (!append) {
      state.screener.rows = [];
      state.screener.page = payload.page || 1;
      renderScreenerControls(payload);
    }

    const knownSymbols = new Set(state.screener.rows.map(row => row.symbol));
    const nextRows = (payload.rows || []).filter(row => !knownSymbols.has(row.symbol));
    state.screener.rows = append ? [...state.screener.rows, ...nextRows] : nextRows;
    state.screener.total = payload.total || 0;
    state.screener.hasMore = Boolean(payload.hasMore);
    state.screener.preset = payload.preset || state.screener.preset;
    state.screener.page = payload.page || state.screener.page;

    dom.screenerSummary.textContent = `${payload.total || 0} matches · ${payload.universeSize || state.bootstrap?.researchUniverseSize || 0} symbol universe`;
    dom.screenerExplainer.textContent = payload.explanation || '';
    dom.screenerCount.textContent = `${state.screener.rows.length} shown of ${state.screener.total}`;
    dom.loadMoreScreenerBtn.classList.toggle('hidden', !state.screener.hasMore);

    dom.screenerBody.innerHTML = state.screener.rows.length ? state.screener.rows.map(row => `
      <tr>
        <td>
          <button type="button" class="symbol-link view-symbol" data-symbol="${row.symbol}">${row.symbol}</button>
          <div class="row-sub">${row.exchange} · ${row.country}</div>
        </td>
        <td>
          <strong>${row.name}</strong>
          <div class="row-sub">${row.sector} · ${row.assetType.toUpperCase()}</div>
        </td>
        <td>${money(row.price)}</td>
        <td class="${relativeClass(row.percentChange)}">${percent(row.percentChange)}</td>
        <td>${compactNumber(row.volume)}</td>
        <td>${Number(row.relativeVolume || 0).toFixed(2)}x</td>
        <td>${Number(row.trendScore || 0).toFixed(1)}</td>
        <td><span class="source-pill">${row.source}${row.optionsEligible ? ' · options' : ''}</span></td>
        <td>
          <div class="row-actions">
            <button type="button" class="ghost-button compact view-symbol" data-symbol="${row.symbol}">View</button>
            <button type="button" class="ghost-button compact trade-stock" data-symbol="${row.symbol}">Stock</button>
            <button type="button" class="ghost-button compact trade-options ${row.optionsEligible ? '' : 'disabled'}" data-symbol="${row.symbol}" ${row.optionsEligible ? '' : 'disabled'}>Options</button>
          </div>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="9">No symbols match these filters.</td></tr>';

    [...dom.screenerBody.querySelectorAll('.view-symbol')].forEach(button => {
      button.addEventListener('click', async () => {
        await loadResearch(button.dataset.symbol);
      });
    });

    [...dom.screenerBody.querySelectorAll('.trade-stock')].forEach(button => {
      button.addEventListener('click', async () => {
        await loadResearch(button.dataset.symbol);
        dom.assetClassSelect.value = 'stock';
        dom.tradeSymbolInput.value = button.dataset.symbol;
        syncOrderActions();
        renderTabs('trade');
      });
    });

    [...dom.screenerBody.querySelectorAll('.trade-options')].forEach(button => {
      button.addEventListener('click', async () => {
        if (button.disabled) return;
        await loadResearch(button.dataset.symbol);
        dom.assetClassSelect.value = 'option';
        dom.tradeSymbolInput.value = button.dataset.symbol;
        syncOrderActions();
        renderTabs('trade');
      });
    });
  }

  function screenerQuery(page = 1) {
    const params = new URLSearchParams({
      preset: state.screener.preset,
      search: dom.screenerSearch.value.trim(),
      sector: dom.screenerSector.value || 'all',
      exchange: dom.screenerExchange.value || 'all',
      country: dom.screenerCountry.value || 'all',
      assetType: dom.screenerAssetType.value || 'all',
      sortBy: dom.screenerSort.value || 'preset',
      direction: dom.screenerDirection.value || 'desc',
      optionsOnly: String(dom.screenerOptionsOnly.checked),
      page: String(page),
      pageSize: String(state.screener.pageSize),
    });
    return params.toString();
  }

  async function loadScreener({ append = false } = {}) {
    const page = append ? state.screener.page + 1 : 1;
    const payload = await request(`/simulator/api/screener?${screenerQuery(page)}`);
    renderScreener(payload, append);
  }

  function renderResearch() {
    const research = state.research;
    if (!research) return;
    dom.researchTitle.textContent = `${research.symbol} · ${research.quote.name}`;
    dom.researchSnapshot.innerHTML = `
      <div class="metric-row"><strong>${money(research.quote.price)}</strong><span class="${relativeClass(research.quote.change)}">${signedMoney(research.quote.change)} · ${percent(research.quote.percentChange)}</span></div>
      <div class="metric-row"><span>Open ${money(research.quote.open)}</span><span>High ${money(research.quote.high)}</span><span>Low ${money(research.quote.low)}</span><span>Volume ${Number(research.quote.volume || 0).toLocaleString()}</span></div>
      <div class="metric-row"><span>Quote source: ${research.quote.source}</span><span>${research.optionsEligible ? 'Options eligible' : 'No options for this symbol'}</span></div>
    `;
    dom.researchChart.innerHTML = buildLineChart(research.chart.map(point => ({ value: point.close })), research.quote.change >= 0 ? '#7ee787' : '#ff7b72');
    dom.profileCard.innerHTML = `
      <h4>${research.profile.name}</h4>
      <p>${research.profile.description || 'Profile data is limited for this symbol in the current feed mode.'}</p>
      <div class="profile-stats">
        <span>Exchange: ${research.profile.exchange || research.quote.exchange}</span>
        <span>Sector: ${research.profile.sector || research.quote.sector}</span>
      </div>
      <div class="profile-stats">
        <span>Industry: ${research.profile.industry || 'Unknown'}</span>
        <span>Data source: ${research.profile.source}</span>
      </div>
    `;
    dom.optionChainBody.innerHTML = research.optionChain.length ? research.optionChain.slice(0, 40).map(contract => `
      <tr>
        <td>${contract.contractSymbol}</td>
        <td>${contract.type}</td>
        <td>${contract.expiration || '-'}</td>
        <td>${money(contract.strike)}</td>
        <td>${money(contract.bid)}</td>
        <td>${money(contract.ask)}</td>
        <td>${money(contract.mid)}</td>
        <td>${(Number(contract.impliedVolatility || 0) * 100).toFixed(1)}%</td>
        <td>${Number(contract.greeks?.delta || 0).toFixed(3)}</td>
        <td><button class="ghost-button use-contract" data-contract="${contract.contractSymbol}">Trade</button></td>
      </tr>
    `).join('') : '<tr><td colspan="10">No options chain is available for this symbol. U.S. stocks and ETFs can load options.</td></tr>';

    [...dom.optionChainBody.querySelectorAll('.use-contract')].forEach(button => {
      button.addEventListener('click', () => {
        renderTabs('trade');
        dom.assetClassSelect.value = 'option';
        dom.tradeSymbolInput.value = research.symbol;
        syncOrderActions();
        populateOptionContracts();
        dom.optionContractSelect.value = button.dataset.contract;
        updateTradeLens();
      });
    });
  }

  function renderTradeLens() {
    if (!state.research) return;
    const quote = state.research.quote;
    dom.tradeLensTitle.textContent = `${state.research.symbol} execution view`;
    dom.tradeLensContent.innerHTML = `
      <h4>${quote.name}</h4>
      <div class="profile-stats">
        <span>Last ${money(quote.price)}</span>
        <span class="${relativeClass(quote.change)}">${percent(quote.percentChange)}</span>
      </div>
      <div class="profile-stats">
        <span>Bid ${money(quote.bid)}</span>
        <span>Ask ${money(quote.ask)}</span>
      </div>
      <p>The ticket supports market, limit, and stop orders. Stock actions include buy, sell, short, and buy to cover. Options actions include buy to open and sell to close on the selected contract.</p>
    `;
  }

  function populateOptionContracts() {
    const symbol = dom.tradeSymbolInput.value.trim().toUpperCase() || state.selectedSymbol;
    const contracts = (state.research?.optionChain || []).filter(item => item.underlyingSymbol === symbol);
    dom.optionContractSelect.innerHTML = contracts.length ? contracts.map(contract => `
      <option value="${contract.contractSymbol}">${contract.type.toUpperCase()} ${contract.expiration} ${money(contract.strike)} · ${money(contract.mid)}</option>
    `).join('') : '<option value="">No option contracts available</option>';
  }

  function syncOrderActions() {
    const assetClass = dom.assetClassSelect.value;
    if (assetClass === 'stock') {
      dom.optionContractWrap.classList.add('hidden');
      dom.actionSelect.innerHTML = `
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
        <option value="short">Short</option>
        <option value="cover">Buy to Cover</option>
      `;
    } else {
      dom.optionContractWrap.classList.remove('hidden');
      dom.actionSelect.innerHTML = `
        <option value="buy_to_open">Buy to Open</option>
        <option value="sell_to_close">Sell to Close</option>
      `;
      populateOptionContracts();
    }
    updateTicketPreview();
  }

  function updateTicketPreview() {
    const summary = state.bootstrap?.accountSnapshot?.account?.summary;
    if (!summary) return;
    const assetClass = dom.assetClassSelect.value;
    const qty = Number(dom.qtyInput.value || 0);
    const action = dom.actionSelect.value || 'buy';
    const quote = state.research?.quote;
    let estimate = 0;
    if (assetClass === 'stock' && quote) {
      estimate = quote.price * qty;
    } else if (assetClass === 'option') {
      const contract = (state.research?.optionChain || []).find(item => item.contractSymbol === dom.optionContractSelect.value);
      estimate = (contract?.mid || 0) * qty * 100;
    }
    dom.ticketPreview.innerHTML = `
      <div class="metric-row">
        <strong>${action.replace(/_/g, ' ').toUpperCase()}</strong>
        <span>Est. ticket: ${money(estimate)}</span>
      </div>
      <div class="metric-row">
        <span>Account cash</span>
        <span>${money(summary.cash)}</span>
      </div>
      <div class="metric-row">
        <span>Open orders</span>
        <span>${summary.openOrders}</span>
      </div>
    `;
  }

  function renderGames() {
    const gameMarkup = (state.bootstrap.games || []).map(game => `
      <div class="game-card">
        <div class="metric-row">
          <h4>${game.name}</h4>
          <span>${game.memberCount} traders</span>
        </div>
        <p>${game.description || 'No description provided.'}</p>
        <div class="game-meta">
          <span>Cash ${money(game.settings.startingCash)}</span>
          <span>${game.settings.allowShort ? 'Shorting on' : 'Shorting off'}</span>
          <span>${game.settings.allowOptions ? 'Options on' : 'Options off'}</span>
        </div>
        <div class="game-actions">
          ${game.joined ? `<button class="ghost-button" type="button" data-context="${game.id}">Open Context</button>` : `<button class="primary-button join-game" type="button" data-id="${game.id}" data-private="${game.isPrivate}">Join Game</button>`}
        </div>
        <div class="leaderboard" id="leaderboard-${game.id}"></div>
      </div>
    `).join('');

    dom.gamesList.innerHTML = gameMarkup || '<div class="trade-lens"><p>No games yet. Create the first competition from the form on the left.</p></div>';

    (state.bootstrap.games || []).forEach(async game => {
      try {
        const payload = await request('/simulator/api/games');
        const fresh = payload.games.find(item => item.id === game.id);
        const leaderboard = document.getElementById(`leaderboard-${game.id}`);
        if (!leaderboard || !fresh) return;
        leaderboard.innerHTML = fresh.leaderboard.length ? fresh.leaderboard.slice(0, 5).map((entry, index) => `
          <div class="leaderboard-row">
            <span>#${index + 1} ${entry.label}</span>
            <span>${percent(entry.returnPct)} · ${money(entry.equity)}</span>
          </div>
        `).join('') : '<p>No trades in this game yet.</p>';
      } catch {}
    });

    [...dom.gamesList.querySelectorAll('.join-game')].forEach(button => {
      button.addEventListener('click', async () => {
        try {
          const password = button.dataset.private === 'true'
            ? window.prompt('This is a private game. Enter the password:')
            : '';
          await request('/simulator/api/games/join', {
            method: 'POST',
            body: JSON.stringify({ gameId: button.dataset.id, password }),
          });
          toast('Joined game', 'A new game account context was added to your simulator.');
          await bootstrap(state.context);
        } catch (error) {
          toast('Join failed', error.message);
        }
      });
    });

    [...dom.gamesList.querySelectorAll('[data-context]')].forEach(button => {
      button.addEventListener('click', () => {
        state.context = button.dataset.context;
        bootstrap(state.context);
      });
    });
  }

  function updateTradeLens() {
    renderTradeLens();
    updateTicketPreview();
  }

  async function refreshAccount() {
    const payload = await request(`/simulator/api/account?context=${encodeURIComponent(state.context)}`);
    state.bootstrap.accountSnapshot = payload.account ? payload : state.bootstrap.accountSnapshot;
    if (payload.contexts && payload.contexts.length) {
      state.bootstrap.contexts = payload.contexts;
    }
    renderHero();
    renderPortfolio();
    renderContextSelect();
    updateTradeLens();
  }

  async function loadResearch(symbol = state.selectedSymbol) {
    state.selectedSymbol = symbol.trim().toUpperCase();
    dom.symbolInput.value = state.selectedSymbol;
    dom.tradeSymbolInput.value = state.selectedSymbol;
    const payload = await request(`/simulator/api/research?symbol=${encodeURIComponent(state.selectedSymbol)}&timeframe=${encodeURIComponent(state.timeframe)}`);
    state.research = payload;
    renderResearch();
    syncOrderActions();
    updateTradeLens();
  }

  async function bootstrap(context = 'personal') {
    const payload = await request(`/simulator/api/bootstrap?context=${encodeURIComponent(context)}`);
    state.bootstrap = payload;
    state.context = payload.selectedContext;
    renderProviderBadges();
    renderWatchlist();
    renderContextSelect();
    renderHero();
    renderPortfolio();
    renderGames();
    if (payload.screenerPreview) {
      renderScreener(payload.screenerPreview, false);
    }
    updateTicketPreview();
  }

  dom.tabs.forEach(tab => {
    tab.addEventListener('click', () => renderTabs(tab.dataset.tab));
  });

  dom.timeframes.forEach(button => {
    button.addEventListener('click', async () => {
      state.timeframe = button.dataset.timeframe;
      dom.timeframes.forEach(item => item.classList.toggle('is-active', item === button));
      await loadResearch(state.selectedSymbol);
    });
  });

  dom.loadSymbolBtn.addEventListener('click', async () => {
    try {
      await loadResearch(dom.symbolInput.value || state.selectedSymbol);
      renderTabs('research');
    } catch (error) {
      toast('Research failed', error.message);
    }
  });

  dom.toggleWatchlistBtn.addEventListener('click', async () => {
    try {
      const payload = await request('/simulator/api/watchlist', {
        method: 'POST',
        body: JSON.stringify({ symbol: state.selectedSymbol }),
      });
      state.bootstrap.profile.watchlist = payload.watchlist;
      await bootstrap(state.context);
      toast('Watchlist updated', `${state.selectedSymbol} was toggled in your saved watchlist.`);
    } catch (error) {
      toast('Watchlist failed', error.message);
    }
  });

  dom.contextSelect.addEventListener('change', async () => {
    try {
      state.context = dom.contextSelect.value;
      await bootstrap(state.context);
    } catch (error) {
      toast('Switch failed', error.message);
    }
  });

  let screenerSearchTimer = null;
  dom.screenerSearch.addEventListener('input', () => {
    clearTimeout(screenerSearchTimer);
    screenerSearchTimer = setTimeout(() => {
      loadScreener().catch(error => toast('Screener failed', error.message));
    }, 300);
  });

  [
    dom.screenerSector,
    dom.screenerExchange,
    dom.screenerCountry,
    dom.screenerAssetType,
    dom.screenerSort,
    dom.screenerDirection,
    dom.screenerOptionsOnly,
  ].forEach(control => {
    control.addEventListener('change', () => {
      loadScreener().catch(error => toast('Screener failed', error.message));
    });
  });

  dom.loadMoreScreenerBtn.addEventListener('click', () => {
    loadScreener({ append: true }).catch(error => toast('Load more failed', error.message));
  });

  dom.assetClassSelect.addEventListener('change', syncOrderActions);
  dom.tradeSymbolInput.addEventListener('input', updateTicketPreview);
  dom.qtyInput.addEventListener('input', updateTicketPreview);
  dom.optionContractSelect.addEventListener('change', updateTicketPreview);
  dom.actionSelect.addEventListener('change', updateTicketPreview);

  dom.refreshTradeResearchBtn.addEventListener('click', async () => {
    try {
      await loadResearch(dom.tradeSymbolInput.value || state.selectedSymbol);
      toast('Symbol refreshed', 'Trade lens and research were updated.');
    } catch (error) {
      toast('Refresh failed', error.message);
    }
  });

  dom.orderTypeSelect.addEventListener('change', () => {
    const type = dom.orderTypeSelect.value;
    dom.priceInputWrap.querySelector('label');
    dom.priceInput.placeholder = type === 'limit' ? 'Limit price' : type === 'stop' ? 'Stop price' : 'Unused for market';
    updateTicketPreview();
  });

  dom.orderForm.addEventListener('submit', async event => {
    event.preventDefault();
    const assetClass = dom.assetClassSelect.value;
    const orderType = dom.orderTypeSelect.value;
    const payload = {
      context: state.context,
      assetClass,
      symbol: (dom.tradeSymbolInput.value || state.selectedSymbol).trim().toUpperCase(),
      action: dom.actionSelect.value,
      orderType,
      qty: Number(dom.qtyInput.value || 0),
    };
    if (assetClass === 'option') {
      payload.contractSymbol = dom.optionContractSelect.value;
      payload.underlyingSymbol = payload.symbol;
      if (!payload.contractSymbol) {
        toast('Order failed', 'No option contract is available for this symbol.');
        return;
      }
    }
    if (orderType === 'limit') {
      payload.limitPrice = Number(dom.priceInput.value || 0);
    } else if (orderType === 'stop') {
      payload.stopPrice = Number(dom.priceInput.value || 0);
    }
    try {
      await request('/simulator/api/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast('Order submitted', 'The simulator updated your portfolio and order blotter.');
      await bootstrap(state.context);
      await loadResearch(payload.symbol);
    } catch (error) {
      toast('Order failed', error.message);
    }
  });

  dom.createGameForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(dom.createGameForm);
    const payload = {
      name: formData.get('name'),
      description: formData.get('description'),
      startingCash: Number(formData.get('startingCash')),
      commission: Number(formData.get('commission')),
      allowShort: formData.get('allowShort') === 'on',
      allowOptions: formData.get('allowOptions') === 'on',
      isPrivate: formData.get('isPrivate') === 'on',
      password: formData.get('password'),
    };
    try {
      await request('/simulator/api/games', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      dom.createGameForm.reset();
      toast('Game created', 'A dedicated paper-trading context was added for the new competition.');
      await bootstrap(state.context);
    } catch (error) {
      toast('Game failed', error.message);
    }
  });

  dom.resetAccountBtn.addEventListener('click', async () => {
    const value = window.prompt('Reset this account to a new starting balance. Enter USD amount:', '100000');
    if (!value) return;
    try {
      await request('/simulator/api/account/reset', {
        method: 'POST',
        body: JSON.stringify({ context: state.context, startingCash: Number(value) }),
      });
      toast('Account reset', 'The simulator cleared positions and restarted the account.');
      await bootstrap(state.context);
      await loadResearch(state.selectedSymbol);
    } catch (error) {
      toast('Reset failed', error.message);
    }
  });

  (async function init() {
    try {
      await bootstrap('personal');
      await loadResearch('AAPL');
      syncOrderActions();
    } catch (error) {
      toast('Simulator failed to load', error.message);
    }
  }());
}());
