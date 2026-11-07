import { test, expect } from '@playwright/test';
import { ShopApi, jsonResponse, type Product } from '../API/support';
// Use your own dedicated test account. Never clear or change the public shared cart.
test('POST add, GET verify, PUT quantity, DELETE remove', async ({ request }) => {
  test.skip(!process.env.API_CART_EMAIL || !process.env.API_CART_PASSWORD,
    'Set API_CART_EMAIL and API_CART_PASSWORD for your dedicated test account.');
  const api = new ShopApi(request);
  const email = process.env.API_CART_EMAIL!;
const password = process.env.API_CART_PASSWORD!;

console.log({
  emailPresent: Boolean(email),
  passwordPresent: Boolean(password),
  emailHasOuterSpaces: email !== email.trim(),
  passwordHasOuterSpaces: password !== password.trim(),
});

const loginResponse = await api.login(email, password);

console.log('Login status:', loginResponse.status());

if (loginResponse.status() !== 200) {
  const body = await loginResponse.json();

  console.log({
    error: body.error,
    message: body.message,
  });
}

await jsonResponse(loginResponse, 200);
  let productId: number | undefined;
  try {
    const list = await jsonResponse(await api.products(), 200);
    const before = await jsonResponse(await api.cart(), 200);
    const product: Product | undefined = list.products.find((p: Product) =>
      p.inStock && !before.items.some((item: { id: number }) => item.id === p.id));
    expect(product, 'Need an in-stock product absent from this dedicated cart').toBeDefined();
    productId = product!.id;
    await jsonResponse(await api.add(productId, 1), 200);
    const added = await jsonResponse(await api.cart(), 200);
    expect(added.items.find((p: { id: number }) => p.id === productId)).toMatchObject({
      id: productId, name: product!.name, price: product!.price, qty: 1,
    });
    expect(added.count).toBe(before.count + 1);
    expect(added.total).toBeCloseTo(before.total + product!.price, 2);
    await jsonResponse(await api.update(productId, 3), 200);
    const updated = await jsonResponse(await api.cart(), 200);
    expect(updated.items.find((p: { id: number }) => p.id === productId)?.qty).toBe(3);
    expect(updated.count).toBe(before.count + 3);
    expect(updated.total).toBeCloseTo(before.total + product!.price * 3, 2);
    await jsonResponse(await api.remove(productId), 200);
    const removed = await jsonResponse(await api.cart(), 200);
    expect(removed.items.some((p: { id: number }) => p.id === productId)).toBe(false);
    expect(removed.count).toBe(before.count);
    expect(removed.total).toBeCloseTo(before.total, 2);
  } finally {
  try {
    if (productId !== undefined) {
      const cleanupResponse = await api.remove(productId);

      // 200: removed now.
      // 404: already removed during the test.
      expect([200, 404]).toContain(cleanupResponse.status());
    }
  } finally {
    await jsonResponse(await api.logout(), 200);
  }
}
});
