import { test, expect } from '@playwright/test';
import { ShopApi, jsonResponse, assertProduct, type Product } from "./support";
test('GET catalogue validates structure, types, count and unique IDs', async ({ request }) => {
  const body = await jsonResponse(await new ShopApi(request).products(), 200);
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
  expect(body.count).toBe(body.products.length);
  expect(body.message).toBe('Products fetched successfully');
  for (const product of body.products) assertProduct(product);
  const ids = body.products.map((p: Product) => p.id);
  expect(new Set(ids).size).toBe(ids.length);
});
test('GET one product matches its catalogue record', async ({ request }) => {
  const api = new ShopApi(request);
  const list = await jsonResponse(await api.products(), 200);
  expect(list.products.length).toBeGreaterThan(0);
  const expected: Product = list.products[0];
  const actual = await jsonResponse(await api.product(expected.id), 200);
  assertProduct(actual);
  expect(actual).toMatchObject({ ...expected });
});
test('GET missing product returns 404 and a meaningful error', async ({ request }) => {
  const api = new ShopApi(request);
  const list = await jsonResponse(await api.products(), 200);
  const missing = Math.max(0, ...list.products.map((p: Product) => p.id)) + 1_000_000;
  const body = await jsonResponse(await api.product(missing), 404);
  expect(body.error).toEqual(expect.any(String));
  expect(body.error.trim().length).toBeGreaterThan(0);
});
