# Playwright UI and API Automation Framework

Automation framework built with Playwright and TypeScript for [Playwright Automation Practice](https://www.playwrightautomation.com/).

## Features

- Feature-specific Page Object Model classes and reusable fixtures.
- UI coverage for forms, tables, dialogs, mouse and keyboard interactions, browser windows, frames, calendars and file handling.
- UI execution across Chromium, Firefox and WebKit.
- API coverage for products, authentication, protected access and cart operations.
- Separate UI and API configurations.
- HTML reports and environment-based credentials.

## Project Structure

```text
Pages/                      UI page objects
fixtures/                   Shared fixtures
test_data/                  Test data and upload assets
tests/UI/                   UI tests
tests/API/                  API tests and shared request helpers
playwright.config.ts        UI configuration
playwright.api.config.ts    API configuration
tsconfig.api.json           API TypeScript configuration
```

## Installation

Install Node.js and Git, then run from the project root:

```sh
npm ci
npx playwright install
```

## Environment Setup

Create a `.env` file in the project root:

```env
USER_EMAIL=
USER_PASSWORD=
API_BASE_URL=https://www.playwrightautomation.com
API_CART_EMAIL=
API_CART_PASSWORD=
```

Enter credentials for your own test account. Use a dedicated account for cart tests and avoid concurrent activity on that account.

The cart test skips when its credentials are missing. Never commit `.env`, tokens or saved authentication state.

## Run UI Tests

```sh
npx playwright test --config=playwright.config.ts
```

Run a specific browser project:

```sh
npx playwright test --config=playwright.config.ts --project=chromium
```

## Run API Tests

```sh
npx playwright test --config=playwright.api.config.ts
```

## Check API TypeScript

```sh
npx tsc --noEmit -p tsconfig.api.json
```

## View Reports

UI report:

```sh
npx playwright show-report
```

API report:

```sh
npx playwright show-report api-report
```

## API Scenarios

- Validate catalogue fields, count and unique product IDs.
- Compare an individual product with its catalogue record.
- Verify a missing product returns 404.
- Verify anonymous access to protected endpoints is rejected.
- Verify invalid credentials are rejected.
- Verify login, session cookies, session identity and logout.
- Add, read, update and remove a cart item, checking quantities and totals.
- Clean up the cart item and log out after execution.

## Latest Local Verification

- UI tests passed across Chromium, Firefox and WebKit.
- All 8 API tests passed with dedicated cart-account credentials.
- API TypeScript checking passed.

Results depend on the availability and current behaviour of the external practice application. These tests do not represent exhaustive coverage.