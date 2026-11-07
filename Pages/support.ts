import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
export interface Product {
  id: number; name: string; category: string; categoryLabel: string;
  price: number; description: string; inStock: boolean; image: string;
}
export class ShopApi {
  constructor(readonly request: APIRequestContext) {}
  products() { return this.request.get('/api/products.json'); }
  product(id: number) { return this.request.get(`/api/products/${id}`); }
  login(email: string, password: string) {
    return this.request.post('/api/auth/login', { data: { email, password } });
  }
  verify() { return this.request.get('/api/auth/verify'); }
  logout() { return this.request.delete('/api/auth/logout'); }
  cart() { return this.request.get('/api/cart'); }
  add(id: number, qty: number) { return this.request.post('/api/cart', { data: { productId: id, qty } }); }
  update(id: number, qty: number) { return this.request.put(`/api/cart/${id}`, { data: { qty } }); }
  remove(id: number) { return this.request.delete(`/api/cart/${id}`); }
}
export async function jsonResponse(response: APIResponse, status: number) {
  // Include only method-independent status/URL diagnostics, never login tokens or cookies.
  expect(response.status(), `Unexpected status for ${response.url()}`).toBe(status);
  expect(response.headers()['content-type']).toContain('application/json');
  return response.json();
}
export function assertProduct(product: unknown): asserts product is Product {
  expect(product).toEqual(expect.objectContaining({
    id: expect.any(Number), name: expect.any(String), category: expect.any(String),
    categoryLabel: expect.any(String), price: expect.any(Number), description: expect.any(String),
    inStock: expect.any(Boolean), image: expect.any(String),
  }));
  const p = product as Product;
  expect(Number.isInteger(p.id)).toBe(true);
  expect(p.id).toBeGreaterThan(0);
  expect(p.name.trim().length).toBeGreaterThan(0);
  expect(Number.isFinite(p.price)).toBe(true);
}
