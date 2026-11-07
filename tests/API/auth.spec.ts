import { test, expect } from '@playwright/test';
import { ShopApi, jsonResponse } from '../API/support';
// Public demo credentials documented by this practice application.
const email = process.env.API_EMAIL ?? 'student@playwrightautomation.com';
const password = process.env.API_PASSWORD ?? 'Password123';
test('GET verify rejects an anonymous client', async ({ request }) => {
  const body = await jsonResponse(await new ShopApi(request).verify(), 401);
  expect(body.error).toEqual(expect.any(String));
});
test('GET cart rejects an anonymous client', async ({ request }) => {
  const body = await jsonResponse(await new ShopApi(request).cart(), 401);
  expect(body.error).toEqual(expect.any(String));
});
test('POST login rejects an incorrect password', async ({ request }) => {
  const body = await jsonResponse(await new ShopApi(request).login(email, 'Incorrect-Password-938271!'), 401);
  expect(body.error).toEqual(expect.any(String));
});
test('POST login creates a cookie session; DELETE logout removes access', async ({ request }) => {
  const api = new ShopApi(request);
  const login = await jsonResponse(await api.login(email, password), 200);
  expect(login.token).toEqual(expect.any(String));
  expect(login.token.length).toBeGreaterThan(0);
  expect(login.user.email).toBe(email);
  try {
    const state = await request.storageState();
    const cookie = state.cookies.find(c => c.name === 'pw_session_token');
    expect(cookie).toBeDefined();
    expect(cookie?.httpOnly).toBe(true);
    const session = await jsonResponse(await api.verify(), 200);
    expect(session.valid).toBe(true);
    expect(session.user.email).toBe(email);
  } finally {
    await jsonResponse(await api.logout(), 200);
  }
  await jsonResponse(await api.verify(), 401);
});
