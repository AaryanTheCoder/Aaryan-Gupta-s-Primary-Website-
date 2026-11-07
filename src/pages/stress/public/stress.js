'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const M = window.StressMetrics;
  const PRESETS = {
    quick: { cpu: 3000, gpu: 8000, combined: 15000 },
    standard: { cpu: 8000, gpu: 18000, combined: 60000 },
    sustained: { cpu: 20000, gpu: 45000, combined: 180000 }
  };
  const LABELS = { integer: 'Integer hashing', float: 'Floating-point math', memory: 'Buffer read + write',
    raymarch: 'GPU ray marching', texture: 'GPU texture sampling' };
  const logicalThreads = navigator.hardwareConcurrency || 1;
  const HISTORY_KEY = 'ag-stress-lab-v1';
  let controller = null;
  let lastReport = null;
  let trace = [];
  let stageName = '';
  let stageStart = 0;
  let stageDuration = 1;
  let stageIndex = 0;
  let stageCount = 1;
  let runStart = 0;
  let chartLastDraw = 0;

  const number = (value, digits = 0) => Number.isFinite(value)
    ? value.toLocaleString(undefined, { maximumFractionDigits: digits }) : '—';
  const percent = value => Number.isFinite(value) ? `${number(value, 1)}%` : '—';
  const clock = ms => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
  const score = value => Number.isFinite(value) ? number(Math.round(value)) : '—';

  $('threads').value = Math.min(logicalThreads, 16);
  $('thread-info').textContent = `${logicalThreads} logical processors reported. Default capped at 16; fewer workers leave more room for other apps. Workers are not pinned to cores.`;
  $('system-cpu').textContent = `${logicalThreads} logical processors · ${navigator.deviceMemory ? `~${navigator.deviceMemory} GB browser-reported memory` : 'Memory size hidden'}`;

  function settings() {
    const threads = $('mode').value === 'gpu' ? 1 : Number($('threads').value);
    if (!Number.isInteger(threads) || threads < 1 || threads > 64) throw new Error('Choose a whole worker count from 1 to 64.');
    return { mode: $('mode').value, preset: $('preset').value, threads };
  }
  function updateControls() {
    const gpuOnly = $('mode').value === 'gpu';
    $('threads').disabled = gpuOnly;
    $('start').disabled = !window.Worker && !gpuOnly || !$('consent').checked;
    $('start').firstChild.textContent = $('mode').value === 'combined' ? 'Start stress test ' : 'Start benchmark ';
    const config = PRESETS[$('preset').value];
    const cpuStages = $('mode').value === 'cpu' || $('mode').value === 'full' ? 6 : 0;
    const gpuStages = $('mode').value === 'gpu' || $('mode').value === 'full' ? 2 : 0;
    const seconds = $('mode').value === 'combined' ? config.combined / 1000
      : (cpuStages * (config.cpu + 450) + gpuStages * (config.gpu + 800)) / 1000;
    $('estimate').textContent = `About ${Math.ceil(seconds)} seconds plus device setup. ${$('mode').value === 'combined' ? 'CPU and GPU run together; no points assigned.' : 'Workloads run separately for cleaner measurements.'}`;
  }
  $('mode').addEventListener('change', updateControls);
  $('preset').addEventListener('change', updateControls);
  $('consent').addEventListener('change', updateControls);
  updateControls();

  function drawChart() {
    const canvas = $('chart');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#26343c'; ctx.lineWidth = 1;
    for (let y = 15; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    if (trace.length < 2) return;
    const max = Math.max(...trace) * 1.1;
    ctx.beginPath();
    trace.forEach((v, i) => {
      const x = i / (trace.length - 1) * w;
      const y = h - 10 - v / max * (h - 25);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#a9ef71'; ctx.lineWidth = 2.5; ctx.stroke();
  }
  drawChart();

  function beginStage(name, duration, index, count) {
    stageName = name; stageStart = performance.now(); stageDuration = duration;
    stageIndex = index; stageCount = count; trace = [];
    $('status').textContent = `${name} · warming up…`;
    $('chart-caption').textContent = `${name} · throughput over time; vertical scale adjusts to this workload.`;
    $('live-rate').textContent = '—';
    drawChart();
  }
  function measurementStarted() {
    stageStart = performance.now();
    $('status').textContent = `${stageName} · measuring`;
  }
  function live(rate, kind) {
    if (!Number.isFinite(rate) || rate <= 0) return;
    const now = performance.now();
    if (now - chartLastDraw < 400) return;
    chartLastDraw = now;
    trace.push(rate); if (trace.length > 400) trace.shift();
    const unit = kind === 'memory' ? 'MB/s' : kind === 'integer' || kind === 'float' ? 'M iter/s' : 'MPix/s';
    $('rate-label').textContent = `${kind === 'memory' ? 'BUFFER' : kind === 'integer' || kind === 'float' ? 'CPU' : 'GPU'} THROUGHPUT`;
    $('live-rate').textContent = `${number(kind === 'integer' || kind === 'float' || kind === 'memory' ? rate / 1e6 : rate, 1)} ${unit}`;
    drawChart();
  }

  function runCPU(kind, workers, duration, signal, onSample, onReady) {
    // Each group has its own cleanup: stop, errors, and normal completion all terminate workers.
    return new Promise((resolve, reject) => {
      const pool = [];
      const results = new Map();
      const rates = new Map();
      const samples = [];
      let ready = 0;
      let settled = false;
      let sampleAt = 0;
      let watchdog;
      const cleanup = () => {
        clearTimeout(watchdog);
        signal.removeEventListener('abort', abort);
        pool.forEach(w => w.terminate());
      };
      const fail = error => { if (!settled) { settled = true; cleanup(); reject(error); } };
      const abort = () => fail(signal.reason || new Error('Test stopped'));
      if (signal.aborted) { abort(); return; }
      signal.addEventListener('abort', abort, { once: true });
      watchdog = setTimeout(() => fail(new Error('CPU worker setup timed out. Try fewer workers.')), 15000);
      try {
        for (let i = 0; i < workers; i++) {
          const worker = new Worker('/stress/cpu-worker.js');
          pool.push(worker);
          worker.onerror = () => fail(new Error('A CPU worker failed. No final score was saved.'));
          worker.onmessageerror = () => fail(new Error('Could not read a CPU worker result.'));
          worker.onmessage = ({ data }) => {
            if (settled) return;
            if (data.type === 'error') { fail(new Error(data.message)); return; }
            if (data.type === 'ready') {
              ready++;
              if (ready === workers) {
                clearTimeout(watchdog);
                watchdog = setTimeout(() => fail(new Error('CPU workload timed out. No final score was saved.')), duration + 8000);
                // Common timestamp aligns all workers, without requiring SharedArrayBuffer/COOP headers.
                const startAt = performance.timeOrigin + performance.now() + 100;
                pool.forEach(w => w.postMessage({ type: 'start', duration, startAt }));
                onReady();
              }
            } else if (data.type === 'sample') {
              rates.set(i, data.rate);
              const now = performance.now();
              if (rates.size === workers && now - sampleAt >= 450) {
                const rate = [...rates.values()].reduce((sum, v) => sum + v, 0);
                samples.push({ elapsed: data.elapsed, rate }); sampleAt = now; onSample(rate);
              }
            } else if (data.type === 'done') {
              results.set(i, data);
              if (results.size === workers) {
                const all = [...results.values()];
                const errors = all.reduce((sum, r) => sum + r.errors, 0);
                if (errors) { $('errors').textContent = String(errors); fail(new Error('CPU calculation errors detected. Result discarded.')); return; }
                const elapsed = Math.max(...all.map(r => r.endedAt)) - Math.min(...all.map(r => r.startedAt));
                const units = all.reduce((sum, r) => sum + r.units, 0);
                const rate = units * 1000 / elapsed;
                if (!Number.isFinite(rate) || rate <= 0) { fail(new Error('Invalid CPU measurement.')); return; }
                settled = true; cleanup();
                resolve({ kind, workers, rate, units, elapsed, errors, samples,
                  workerResults: all, sampleStats: M.summarize(samples.map(s => s.rate)) });
              }
            }
          };
          worker.postMessage({ type: 'prepare', kind });
        }
      } catch (error) { fail(error); }
    });
  }

  function computeScores(report) {
    if (report.settings.mode === 'combined') return { single: null, multi: null, gpu: null, overall: null };
    const group = phase => Object.fromEntries(report.stages.filter(s => s.phase === phase).map(s => [s.kind, s.rate]));
    const single = M.cpuScore(group('single'));
    const multi = M.cpuScore(group('multi'));
    const graphics = group('gpu');
    const gpu = M.geometricMean(['raymarch', 'texture'].map(k => 1000 * graphics[k] / M.REFERENCES[k]));
    return { single, multi, gpu, overall: report.settings.mode === 'full' ? M.geometricMean([single, multi, gpu]) : null };
  }
  function displayScores(scores) {
    for (const key of ['overall', 'single', 'multi', 'gpu']) $(key + '-score').textContent = score(scores[key]);
  }
  function addRow(stage) {
    const row = document.createElement('tr');
    const gpu = stage.kind === 'raymarch' || stage.kind === 'texture';
    const stats = stage.sampleStats;
    const rate = `${number(gpu ? stage.rate : stage.rate / 1e6, 1)} ${gpu ? 'MPix/s' : stage.kind === 'memory' ? 'MB/s' : 'M iter/s'}`;
    const label = `${stage.phase === 'single' ? '1 worker · ' : stage.phase === 'multi' || stage.phase === 'stress-cpu' ? `${stage.workers} workers · ` : ''}${LABELS[stage.kind]}`;
    let details = `${number(stage.elapsed / 1000, 1)}s measured · ${stage.errors ?? 0} CPU errors`;
    if (gpu) {
      const frameStats = M.summarize(stage.frameTimes);
      const slow = [...stage.frameTimes].sort((a, b) => b - a).slice(0, Math.max(1, Math.ceil(stage.frames * .01)));
      const low = 1000 / (slow.reduce((a, b) => a + b, 0) / slow.length);
      stage.frameStats = frameStats;
      stage.onePercentLowFPS = low;
      stage.deviceTimeStats = M.summarize(stage.gpuTimes);
      stage.sampleStats = M.summarize(stage.samples.map(s => s.rate));
      details = `${stage.frames} frames · median ${number(frameStats?.p50, 1)} / p95 ${number(frameStats?.p95, 1)} ms · 1% low ${number(low, 1)} equiv. FPS`;
      details += stage.deviceTimeStats ? ` · device median ${number(stage.deviceTimeStats.p50, 2)} ms` : ' · device timer unavailable / no valid samples';
      if (stage.discardedTimers) details += ` · ${stage.discardedTimers} invalid timers discarded`;
    }
    const s = gpu ? stage.sampleStats : stats;
    for (const text of [label, rate, percent(s?.cvPercent), percent(s?.retentionPercent), details]) {
      const cell = document.createElement('td'); cell.textContent = text; row.appendChild(cell);
    }
    $('results-body').appendChild(row);
  }

  function readHistory() {
    try {
      const data = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      return Array.isArray(data) ? data.filter(r => r && typeof r.date === 'string' && r.settings && r.scores).slice(0, 5) : [];
    } catch { return []; }
  }
  function renderHistory() {
    const list = $('history-list'); list.replaceChildren();
    const history = readHistory();
    if (!history.length) { const p = document.createElement('p'); p.className = 'hint'; p.textContent = 'No saved runs yet.'; list.appendChild(p); }
    history.forEach(run => {
      const row = document.createElement('div'); row.className = 'history-item';
      for (const text of [new Date(run.date).toLocaleString(), `${run.settings.mode} / ${run.settings.preset} / ${run.settings.threads} workers`,
        `CPU ${score(run.scores.single)} / ${score(run.scores.multi)} · GPU ${score(run.scores.gpu)}`]) {
        const span = document.createElement('span'); span.textContent = text; row.appendChild(span);
      }
      const points = document.createElement('strong'); points.textContent = run.scores.overall ? `${score(run.scores.overall)} pts` : run.settings.mode === 'combined' ? 'Stress complete' : 'Partial suite';
      row.appendChild(points); list.appendChild(row);
    });
  }
  $('clear-history').addEventListener('click', () => {
    try { localStorage.removeItem(HISTORY_KEY); } catch { /* Storage may be disabled. */ }
    renderHistory();
  });
  renderHistory();

  $('start').addEventListener('click', async () => {
    if (controller || !$('consent').checked) return;
    let config;
    try { config = settings(); } catch (error) { $('status').textContent = error.message; return; }
    if (document.hidden) return;
    controller = new AbortController();
    const signal = controller.signal;
    const report = { version: M.VERSION, date: new Date().toISOString(), settings: config,
      references: M.REFERENCES, system: { userAgent: navigator.userAgent, logicalThreads,
        browserMemoryGiB: navigator.deviceMemory || null }, stages: [], scores: null };
    lastReport = null;
    $('download').disabled = true;
    $('settings').disabled = true;
    $('start').disabled = true; $('stop').disabled = false;
    $('status').classList.remove('error');
    $('run-state').textContent = 'RUNNING'; $('run-state').classList.add('running');
    $('errors').textContent = config.mode === 'gpu' ? 'N/A' : '0';
    $('worker-caption').textContent = `${config.threads} workers · integer + float + buffer`;
    $('progress').value = 0;
    $('results-body').replaceChildren();
    displayScores({});
    $('result-note').textContent = 'Running. Scores appear only after the selected suite finishes successfully.';
    runStart = performance.now();
    const ticker = setInterval(() => {
      $('elapsed').textContent = clock(performance.now() - runStart);
      const fraction = Math.min(.99, Math.max(0, (performance.now() - stageStart) / stageDuration));
      $('progress').value = (stageIndex + fraction) / stageCount * 100;
    }, 200);
    let gpu = null;
    try {
      const preset = PRESETS[config.preset];
      const needsGPU = config.mode !== 'cpu';
      const needsCPU = config.mode !== 'gpu';
      if (needsCPU && !window.Worker) throw new Error('Web Workers are unavailable. Try a current Chromium browser.');
      if (needsGPU) {
        // Replacing the canvas allows a fresh context after a stopped/completed run releases the old one.
        const canvas = document.createElement('canvas');
        canvas.id = 'render'; canvas.setAttribute('aria-label', 'Live GPU workload preview');
        $('render').replaceWith(canvas);
        gpu = new window.StressGPU(canvas);
        report.system.renderer = gpu.renderer;
        report.system.gpuTimerAvailable = Boolean(gpu.timer);
        $('system-gpu').textContent = `GPU: ${gpu.renderer}`;
        $('render-placeholder').hidden = true;
        // The CPU scores should not include GPU rendering load, so the context stays idle until its turn.
      } else {
        $('render-placeholder').hidden = false;
      }
      if (config.mode === 'combined') {
        beginStage('Combined stress · CPU + GPU', preset.combined, 0, 1);
        $('chart-caption').textContent = 'GPU MPix/s while CPU integer work runs in parallel. CPU aggregate is shown after completion.';
        const results = await Promise.all([
          runCPU('integer', config.threads, preset.combined, signal, () => {}, () => {}),
          gpu.run('raymarch', preset.combined, signal, rate => live(rate, 'raymarch'), measurementStarted)
        ]);
        results[0].phase = 'stress-cpu'; results[1].phase = 'stress-gpu';
        report.stages.push(...results);
        results.forEach(addRow);
      } else {
        const stages = [];
        if (needsCPU) for (const phase of ['single', 'multi']) for (const kind of ['integer', 'float', 'memory']) stages.push({ phase, kind });
        if (needsGPU) for (const kind of ['raymarch', 'texture']) stages.push({ phase: 'gpu', kind });
        for (let i = 0; i < stages.length; i++) {
          signal.throwIfAborted();
          const { phase, kind } = stages[i];
          const name = phase === 'gpu' ? LABELS[kind] : `${phase === 'single' ? 'Single' : 'Multi'} worker · ${LABELS[kind]}`;
          beginStage(name, phase === 'gpu' ? preset.gpu : preset.cpu, i, stages.length);
          const result = phase === 'gpu'
            ? await gpu.run(kind, preset.gpu, signal, rate => live(rate, kind), measurementStarted)
            : await runCPU(kind, phase === 'single' ? 1 : config.threads, preset.cpu, signal, rate => live(rate, kind), measurementStarted);
          result.phase = phase; report.stages.push(result); addRow(result);
        }
      }
      signal.throwIfAborted();
      report.scores = computeScores(report);
      report.totalElapsed = performance.now() - runStart;
      lastReport = report;
      displayScores(report.scores);
      $('progress').value = 100;
      $('run-state').textContent = 'COMPLETE';
      $('status').textContent = config.mode === 'combined' ? 'Stress test complete. All workloads released.' : 'Benchmark complete. All workloads released.';
      $('result-note').textContent = config.mode === 'combined'
        ? 'Combined stress completed. No calculation errors detected. This is not a guarantee of hardware stability.'
        : `Stress Lab v1 points · higher is faster. ${config.mode === 'full' ? 'Overall combines single-worker CPU, multi-worker CPU, and GPU.' : 'Overall is available only for a full CPU + GPU suite.'} Short runs are less reliable for sustained performance.`;
      $('download').disabled = false;
      try {
        const entry = { version: report.version, date: report.date, settings: config, scores: report.scores, system: report.system };
        localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...readHistory()].slice(0, 5)));
      } catch { $('result-note').textContent += ' History storage is unavailable; use Export to keep this run.'; }
      renderHistory();
    } catch (error) {
      // If either half of a combined run fails, cancel its sibling as well.
      if (!signal.aborted) controller.abort(error);
      displayScores({});
      $('run-state').textContent = 'INCOMPLETE';
      $('status').textContent = error.message || 'Test stopped. No final score saved.';
      $('status').classList.add('error');
      $('result-note').textContent = 'Incomplete run. Any rows shown are partial measurements; no final score or history entry was saved. GPU unavailable? Select CPU benchmark.';
      if (!$('results-body').children.length) {
        const row = document.createElement('tr'); const cell = document.createElement('td');
        cell.colSpan = 5; cell.className = 'empty'; cell.textContent = 'No completed workloads.';
        row.appendChild(cell); $('results-body').appendChild(row);
      }
    } finally {
      clearInterval(ticker);
      gpu?.dispose();
      $('render-placeholder').hidden = false;
      $('elapsed').textContent = clock(performance.now() - runStart);
      $('run-state').classList.remove('running');
      controller = null;
      $('settings').disabled = false;
      $('stop').disabled = true;
      updateControls();
    }
  });

  function stop(message) { controller?.abort(new Error(message)); }
  $('stop').addEventListener('click', () => stop('Stopped by you. No final score saved.'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop('Tab hidden: workload canceled. Keep this tab visible for a valid result.');
  });
  window.addEventListener('pagehide', () => stop('Page closed. Workload canceled.'));
  $('download').addEventListener('click', () => {
    if (!lastReport) return;
    const blob = new Blob([JSON.stringify(lastReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url;
    link.download = `stress-lab-${lastReport.date.replace(/[:.]/g, '-')}.json`;
    link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
