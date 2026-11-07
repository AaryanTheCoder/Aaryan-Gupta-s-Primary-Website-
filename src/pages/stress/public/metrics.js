/* Shared by the page and lightweight Node tests. No benchmark runs on import. */
(function (root) {
  'use strict';
  const VERSION = 'Stress Lab 1.0';
  const REFERENCES = { integer: 50e6, float: 10e6, memory: 2000e6, raymarch: 25, texture: 250 };
  function geometricMean(values) {
    if (!values.length || values.some(v => !Number.isFinite(v) || v <= 0)) return null;
    return Math.exp(values.reduce((sum, v) => sum + Math.log(v), 0) / values.length);
  }
  function cpuScore(rates) {
    return geometricMean(['integer', 'float', 'memory'].map(k => 1000 * rates[k] / REFERENCES[k]));
  }
  function percentile(values, fraction) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil(fraction * sorted.length) - 1))];
  }
  function summarize(values) {
    const data = values.filter(v => Number.isFinite(v) && v > 0);
    if (!data.length) return null;
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const deviation = Math.sqrt(data.reduce((s, v) => s + (v - mean) ** 2, 0) / data.length);
    const third = Math.max(1, Math.floor(data.length / 3));
    const average = a => a.reduce((s, v) => s + v, 0) / a.length;
    return { count: data.length, mean, min: Math.min(...data), max: Math.max(...data),
      p50: percentile(data, .5), p95: percentile(data, .95), cvPercent: 100 * deviation / mean,
      retentionPercent: data.length >= 6 ? 100 * average(data.slice(-third)) / average(data.slice(0, third)) : null };
  }
  const api = { VERSION, REFERENCES, geometricMean, cpuScore, percentile, summarize };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StressMetrics = api;
})(typeof globalThis === 'object' ? globalThis : this);
