# Stress Lab (`/stress`)

This page runs entirely in the visitor's browser. Your server only sends the files;
it does **not** run the heavy calculations. Nothing starts until the visitor checks
the workload acknowledgment and clicks Start.

## How the pieces work

- `routes.js`: serves only the seven allowed page files, including GET and HEAD.
- `public/index.html` and `stress.css`: page content and responsive layout.
- `public/stress.js`: controls the stages, charts, cancellation, results, and local history.
- `public/cpu-kernels.js`: three small, repeatable CPU jobs: integer hashing,
  floating-point math, and buffer copying with a checksum.
- `public/cpu-worker.js`: runs those jobs in Web Workers. Think of workers as
  helpers doing calculations while the main page remains free to handle Stop.
  Every block checks its answer, and each worker also has its own time limit.
- `public/gpu.js`: draws two fixed-size WebGL2 scenes. A GPU fence is a receipt
  telling us when submitted work has finished. Waiting asynchronously keeps the
  page responsive and prevents a long queue of GPU commands.
- `public/metrics.js`: converts raw measurements into points and calculates statistics.

The site-wide AI widget is omitted on this route to reduce background activity
during measurements. Other routes keep their existing widget behavior.

## What a score means

Each workload uses `points = 1000 × measured speed / reference speed`.
The reference speeds are fixed scale choices, **not** results from a reference PC.
For example, 100 million integer iterations/second earns 2,000 points because
the integer reference is 50 million iterations/second.

A geometric mean combines the workload points. For two results it is
`sqrt(first × second)`. This helps combine measurements with different units
without allowing a large raw number, such as bytes/second, to dominate.

CPU single and multi scores each combine all three CPU jobs. GPU combines both
graphics scenes. Overall combines those three scores, so an incomplete suite
cannot receive an overall score. Combined stress intentionally has no points:
running CPU and GPU together makes the separate results harder to compare.

The approach is inspired by normalized scores and workload geometric means in
[Geekbench 6's methodology](https://www.geekbench.com/doc/geekbench6-benchmark-internals.pdf).
These points cannot be compared to Geekbench, Cinebench, or 3DMark.

GPU score timing always measures completed frames against wall time, including
browser scheduling overhead. Optional GPU timer queries are extra diagnostics;
they do not change the scoring method between browsers. Invalid timer readings
are discarded. Pixel readback checks liveness, not visual correctness.

## Running and checking

Start the existing website with `npm start`, then visit `/stress`. Full, CPU-only,
GPU-only, and combined stress modes have bounded durations. Stop, hiding the tab,
or leaving the page cancels work. A driver may still need to finish the GPU frame
already submitted. CPU workers are terminated on every exit path.

`npm run test:stress` checks routes, score calculations, small known-answer blocks,
and simulated worker/GPU lifecycles. It does not run a real stress suite.
`npm test` also includes these checks. Real Chromium rendering, shader compilation,
driver behavior, and cross-platform performance still need manual verification.

For comparable runs, keep the version, worker count, duration, browser/driver,
and power settings the same. History stores the last five completed summaries
locally. Export JSON includes full measurements and samples. Results are not
uploaded. Browser code cannot read temperatures, power, or CPU/GPU utilization.

If you change the kernels, shader work, reference speeds, or timing method, bump
the benchmark version and history key so old and new scores are not mixed.
