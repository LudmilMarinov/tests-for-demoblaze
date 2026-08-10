# demoblaze-tests

Automated UI and API test suite for [demoblaze.com](https://demoblaze.com), built with [Playwright](https://playwright.dev/) and TypeScript, using the Page Object / Component Object pattern. Test results are reported with [Allure](https://allurereport.org/).

## Tech stack

- **Playwright Test** (`@playwright/test`) — test runner, browser automation (Chromium, Firefox, WebKit)
- **TypeScript**
- **allure-playwright** — Allure reporter integration
- **dotenv** — loads environment variables from a `.env` file

## Project structure

```
configs/        Global config: base URL / API endpoint, custom Playwright fixtures
pages/           Page Object classes (BasePage, HomePage, ProductPage)
components/      Reusable UI component objects (nav bar, category list, product grid, login modal, etc.)
utils/helpers/   API helper functions used by tests (authentication, cart, products)
tests/UI/        UI test specs
tests/api/       API test specs
playwright.config.ts   Playwright configuration (projects, reporters, retries, etc.)
```

## Prerequisites

Before you can run the tests you need:

1. **Node.js** (LTS version recommended) and **npm** installed.
2. Project dependencies installed:
    ```bash
    npm install
    ```
3. **Playwright browsers** downloaded (Playwright doesn't reuse your system browsers):
    ```bash
    npx playwright install
    ```
4. An **environment file**. Copy the example file and fill in the values:

    ```bash
    cp .env.example .env
    ```

    Currently the only variable is:
    - `BASE_URL` — base URL for the site under test. If left empty, `playwright.config.ts` falls back to `https://demoblaze.com`.

    The API test endpoint (`https://api.demoblaze.com`) is hardcoded in [configs/urls.ts](configs/urls.ts).

No login/credentials are required up front — the tests create their own throwaway users at runtime via the API (see `utils/helpers/authentication.ts`).

## Running the tests

Run the full suite (all projects: Chromium, Firefox, WebKit) headless:

```bash
npm test
```

A `pretest` hook (via `rimraf`) clears out `allure-results/` before every run, so each report only reflects the latest run and doesn't mix in stale results from a previous one. This is cross-platform and requires no shell-specific commands.

Once the run finishes, view the Allure report with:

```bash
npm run report
```

This runs `allure serve allure-results`, which builds the report and opens it in your browser. Press `Ctrl+C` to stop the local report server when you're done viewing it.

Run tests with the Playwright UI mode (interactive, useful for debugging):

```bash
npm run test:ui
```

### Other useful Playwright commands

Run only UI or only API tests:

```bash
npx playwright test tests/UI
npx playwright test tests/api
```

Run a single browser project:

```bash
npx playwright test --project=chromium
```

Run in headed mode:

```bash
npx playwright test --headed
```

View the last HTML/trace report Playwright generated, if present, this is saved only when there is a failure:

```bash
npx playwright show-report
```

## Reporting

Test runs produce two kinds of artifacts (both git-ignored):

- `test-results/` — Playwright's own run artifacts (traces on first retry, videos retained on failure)
- `allure-results/` — raw Allure results, cleared automatically before each `npm test` run, turned into a viewable report via `npm run report` (or `allure generate allure-results` to build a static report)

## Issues

There where two issues noticed that listed bellow:

- Most of the API calls fail silently, they return status code OK and 200, but in the response there is {"errorMessage": .....}.
- When you press next on the product component on home page, and then go back with previous button a phone Samsung galaxy s6 disappears from the list

## Notes on configuration

- `fullyParallel: true`, `workers: 2`, `retries: 2` — see [playwright.config.ts](playwright.config.ts) to adjust parallelism/retries.
- Videos are retained only on failure, recorded at 1920x1080.
- Traces are captured on first retry only.

## Github Workflows
- A pipeline was set to run the tests once at 02:00 UTC time
- The workflow can be ran manually. And provides a report even when the tests are passing check "Actions" section above, the run setup is named "Nightly Playwright Tests"
