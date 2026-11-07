import { expect, type Locator } from '@playwright/test';
export function numberCell(text: string): number {
  const clean = text.trim();
  if (!/^\d+(?:\.\d+)?$/.test(clean)) throw new Error(`Invalid numeric cell: ${text}`);
  const value = Number(clean);
  if (!Number.isFinite(value)) throw new Error(`Non-finite cell: ${text}`);
  return value;
}
/** Simple one-row headers only; colspan/rowspan tables need a different adapter. */
export class TableComponent {
  constructor(readonly root: Locator) {}
  get rows() { return this.root.locator('tbody tr'); }
  async records(): Promise<Record<string, string>[]> {
    await expect(this.rows.first()).toBeVisible();
    const headers = (await this.root.locator('thead th').allInnerTexts()).map(h => h.trim().toLowerCase());
    if (!headers.length || new Set(headers).size !== headers.length || headers.some(h => !h))
      throw new Error(`Missing/duplicate table headers: ${headers}`);
    return Promise.all((await this.rows.all()).map(async row => {
      const cells = (await row.locator('td').allInnerTexts()).map(t => t.trim());
      if (cells.length !== headers.length) throw new Error('Table row/header length mismatch');
      return Object.fromEntries(headers.map((h, i) => [h, cells[i]!]));
    }));
  }
  async record(key: string, value: string) {
    const matches = (await this.records()).filter(r => r[key] === value);
    if (matches.length !== 1) throw new Error(`Expected one ${key}=${value}; got ${matches.length}`);
    return matches[0]!;
  }
}
