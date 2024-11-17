import { describe, it } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';

describe('Server Test', () => {
  it('should return 200 status code', async () => {
    const response = await fetch('http://localhost:3000');
    assert.strictEqual(response.status, 200);
  });
});