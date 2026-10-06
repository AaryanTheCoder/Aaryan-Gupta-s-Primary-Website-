const assert = require('assert');
const { Readable } = require('stream');
const { readJsonBody } = require('../src/shared/routeHelpers');

(async () => {
  const oversizedRequest = Readable.from([Buffer.alloc(17)]);
  await assert.rejects(
    readJsonBody(oversizedRequest, { maxBytes: 16 }),
    error => error.statusCode === 413 && error.message === 'Payload too large'
  );

  const invalidRequest = Readable.from(['{not-json}']);
  await assert.rejects(
    readJsonBody(invalidRequest),
    error => error.statusCode === 400 && error.message === 'Invalid JSON body'
  );

  console.log('Route helper tests passed.');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
