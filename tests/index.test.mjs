import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('one tile no joints', () => {
  assert.equal(api.groutVolume(1, 1, 1, 1, 0.1, 0.1).volume, 0);
});
test('two tile joint', () => {
  assert.ok(Math.abs(api.groutVolume(2, 1, 1, 1, 0.1, 0.1).volume - 0.01) < 1e-14);
});
test('crossing area', () => {
  assert.ok(Math.abs(api.groutVolume(2, 2, 1, 1, 0.1, 1).jointArea - 0.41) < 1e-14);
});
test('zero joint', () => {
  assert.equal(api.groutVolume(3, 4, 1, 1, 0, 1).volume, 0);
});
test('independent area subtraction moderate values', () => {
  for (let c = 1; c <= 10; c++)
    for (let r = 1; r <= 10; r++) {
      const p = api.groutVolume(c, r, 2, 3, 0.1, 0.2),
        a = p.fieldWidth * p.fieldHeight - c * r * 6;
      assert.ok(Math.abs(p.jointArea - a) < 1e-12);
    }
});
test('invalid dimensions', () => {
  assert.throws(() => api.groutVolume(0, 1, 1, 1, 0.1, 0.1));
  assert.throws(() => api.groutVolume(1, 1, 1, 1, -1, 0.1));
  assert.throws(() => api.groutVolume(1, 1, 1, 1, 0.1, 0));
});
