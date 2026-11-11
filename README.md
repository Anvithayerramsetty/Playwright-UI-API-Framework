# Playwright UI and API Automation Framework

[![Playwright Tests](https://github.com/Anvithayerramsetty/Playwright-UI-API-Framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Anvithayerramsetty/Playwright-UI-API-Framework/actions/workflows/playwright.yml)

A Playwright and TypeScript automation framework for [Playwright Automation Practice](https://www.playwrightautomation.com/), covering browser interactions, authentication and commerce APIs.

## Latest Verification

- Full local UI execution: **109 passed** across the configured browser projects.
- Local API execution: **8 passed**, including the authenticated cart workflow.
- API TypeScript checking: **passed**.
- Latest GitHub Actions workflow: **passed**.

[View the latest verified successful CI run](PASTE_LATEST_GREEN_RUN_URL_HERE)

These results describe completed runs, not a guarantee of future reliability. CI allows up to two retries; a green workflow can include tests that passed after retrying.

## Technology Stack

- Playwright Test
- TypeScript
- Node.js and npm
- Git and GitHub
- GitHub Actions

## Framework Structure

```text
.github/workflows/
  playwright.yml             CI workflow

Pages/                       Feature-specific UI page objects
fixtures/                    Reusable test fixtures
test_data/                   Synthetic test data and upload assets

tests/
  UI/                        UI tests and authentication setup
  API/
    products.spec.ts         Product API tests
    auth.spec.ts             Authentication API tests
    cart.spec.ts             Cart lifecycle test
    support.ts               API client and validation helpers

.env.example                 Environment-variable template
.gitignore                   Excludes credentials and generated files
playwright.config.ts         UI configuration
playwright.api.config.ts     API configuration
tsconfig.api.json            API TypeScript configuration
```

UI page objects encapsulate locators and reusable actions. API helpers encapsulate HTTP requests and common response checks. Specs contain scenarios and business assertions.

## UI Coverage

- Text inputs, radio buttons, checkboxes and toggles.
- Native and custom dropdowns.
- Visibility, tooltips and asynchronous content.
- File uploads and downloads.
- Static tables, dynamic tables and pagination.
- Demo flight booking.
- Alerts, confirmations and prompts.
- Hover, right-click, double-click, drag-and-drop and sliders.
- Keyboard interactions.
- Browser tabs and windows.
- Nested and dynamically loaded frames.
- Native date inputs and calendar widgets.
- Login and reuse of saved authentication state.

Browser projects cover **Chromium, Firefox and WebKit**.

## API Coverage

The API suite targets the same application.

| Area | Checks |
|---|---|
| Product catalogue | JSON response, field types, count consistency and unique IDs |
| Product details | Detail response matches the catalogue record |
| Missing product | 404 response with an error |
| Anonymous access | Protected session and cart endpoints reject unauthenticated requests |
| Invalid login | Incorrect credentials are rejected |
| Authentication lifecycle | Login, session cookie, identity verification and logout |
| Cart lifecycle | Add, read, update quantity, remove and verify cleanup |

Cart mutations are verified through separate GET requests. Assertions check item details, quantities and totals against the initial cart state.

## Installation

### Prerequisites

- Node.js 22
- npm
- Git
- Test accounts on the practice application

### Clone and Install

```sh
git clone https://github.com/Anvithayerramsetty/Playwright-UI-API-Framework.git
cd Playwright-UI-API-Framework
npm ci
npx playwright install --with-deps
```

The standalone API suite does not require a browser installation.

## Environment Configuration

Copy `.env.example` to `.env` in the project root.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Command Prompt:

```bat
copy .env.example .env
```

Configure the following values locally:

```env
USER_EMAIL=
USER_PASSWORD=
USER_DISPLAY_NAME=

API_BASE_URL=https://www.playwrightautomation.com
API_CART_EMAIL=
API_CART_PASSWORD=
```

- `USER_EMAIL` and `USER_PASSWORD`: account used by UI authentication tests.
- `USER_DISPLAY_NAME`: exact display name shown after login, when required by the authenticated-user test.
- `API_BASE_URL`: API target application.
- `API_CART_EMAIL` and `API_CART_PASSWORD`: dedicated account for cart mutations.

Use a dedicated cart account without concurrent manual or automated activity. The cart test skips when its credentials are missing.

**Never commit `.env`, passwords, tokens or saved authentication state.** `.env.example` should contain variable names and public configuration only.

## Run UI Tests

Run all configured UI projects:

```sh
npx playwright test --config=playwright.config.ts
```

Run one browser:

```sh
npx playwright test --config=playwright.config.ts --project=chromium
```

```sh
npx playwright test --config=playwright.config.ts --project=firefox
```

```sh
npx playwright test --config=playwright.config.ts --project=webkit
```

Run a specific scenario:

```sh
npx playwright test tests/UI/Practice.spec.ts --config=playwright.config.ts --grep "Verify job-title dropdown"
```

Run with a visible browser:

```sh
npx playwright test --config=playwright.config.ts --headed
```

UI execution currently uses one worker with full parallel execution disabled.

## Run API Tests

```sh
npx playwright test --config=playwright.api.config.ts
```

Run only the cart workflow:

```sh
npx playwright test tests/API/cart.spec.ts --config=playwright.api.config.ts
```

The API project uses Playwright's HTTP request fixture and runs independently of UI browser projects and saved UI login state.

## TypeScript Checking

```sh
npx tsc --noEmit -p tsconfig.api.json
```

This command checks the files included in the API TypeScript configuration. It is not a full UI type check.

## Reports and Debugging

Open the UI report:

```sh
npx playwright show-report
```

Open the API report:

```sh
npx playwright show-report api-report
```

Capture a UI trace:

```sh
npx playwright test --config=playwright.config.ts --trace=on
```

Open a downloaded or locally generated trace:

```sh
npx playwright show-trace path/to/trace.zip
```

Reports and traces can contain application data. Review them before sharing.

## GitHub Actions CI

The workflow runs on pushes and pull requests to the configured branches and can also be started manually.

It:

1. Checks out the repository.
2. Installs Node.js and project dependencies.
3. Installs Playwright browsers and system dependencies.
4. Checks API TypeScript.
5. Runs UI tests.
6. Runs API tests.
7. Uploads available HTML reports as workflow artifacts.

Configure repository secrets under:

**Settings → Secrets and variables → Actions**

| Secret | Purpose |
|---|---|
| `USER_EMAIL` | UI login email |
| `USER_PASSWORD` | UI login password |
| `USER_DISPLAY_NAME` | Expected display name, if required by the test |
| `API_CART_EMAIL` | Dedicated cart-account email |
| `API_CART_PASSWORD` | Dedicated cart-account password |

Each secret stores one value. The workflow must explicitly map each required secret into the corresponding test step's environment.

This project implements **continuous integration**. It does not deploy the external practice application.

## Reliability and Scope

- Tests depend on an externally hosted application and third-party popup destinations.
- Earlier intermittent WebKit crashes were investigated through isolated and sequential execution; their exact cause was not established.
- A passing run does not prove exhaustive functional, security or performance coverage.
- Product list/detail comparisons verify consistency, not independent correctness of every catalogue value.
- The cart workflow changes server-side account data and requires an isolated test account.
- Some file and embedded-content scenarios verify loading or navigation rather than complete content processing.

## Application References

- [Practice Playground](https://www.playwrightautomation.com/practice.html)
- [Commerce Shop](https://www.playwrightautomation.com/shop.html)
- [API Documentation](https://www.playwrightautomation.com/api-docs/)