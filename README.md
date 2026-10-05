# OrangeHRM Playwright Test Automation Framework

An end-to-end UI automation testing framework built using **Playwright** and **JavaScript**, adhering to industry-standard design patterns including the **Page Object Model (POM)**, **Custom Fixtures**, and **Data-Driven Testing (DDT)**. The framework automates core flows of the OrangeHRM Open Source demo web application.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Framework Architecture & Design Patterns](#framework-architecture--design-patterns)
  - [1. Page Object Model (POM)](#1-page-object-model-pom)
  - [2. Custom Playwright Fixtures](#2-custom-playwright-fixtures)
  - [3. Data-Driven Testing (DDT)](#3-data-driven-testing-ddt)
- [Automated Test Scenarios](#automated-test-scenarios)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Test Execution Guide](#test-execution-guide)
- [Configuration](#configuration)
- [Test Reporting & Failure Artifacts](#test-reporting--failure-artifacts)
- [Guidelines for Extending the Framework](#guidelines-for-extending-the-framework)

---

## Overview

- **Application Under Test (AUT):** [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com/)
- **Default Credentials:**
  - Username: `Admin`
  - Password: `admin123`
- **Framework Goal:** Ensure reliability, maintainability, and clean separation of concerns across locators, business actions, and test assertions.

---

## Key Features

- **Page Object Model (POM):** Decouples UI element selectors and interactions from test logic.
- **Custom Test Fixtures:** Centralizes base URL navigation (`beforeEach`) and automatic full-page failure screenshot capture (`auto: true`).
- **Data-Driven Testing:** Parameterizes test cases with valid and invalid data sets using external modules.
- **Dynamic Search & UI Verification:** Programmatically inspects sidebar items, triggers real-time search inputs, and validates filtered visibility.
- **Robust Locators:** Combines standard CSS selectors with targeted XPath expressions and Playwright `:visible` pseudo-classes.
- **Dual Execution Modes:** Ready for local interactive execution (headed) and CI/CD pipelines (headless).

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| [Playwright Test](https://playwright.dev/) (`^1.62.1`) | Core test runner, browser automation, and assertions |
| [JavaScript (CommonJS)](https://nodejs.org/) | Programming language and module format |
| [Node.js](https://nodejs.org/) (v18+) | JavaScript runtime environment |
| Chromium | Primary browser engine for test execution |

---

## Project Directory Structure

```text
orangeHrmTestingFrameWork/
├── fixtures/
│   └── test.js                           # Extended Playwright test runner with hooks & auto-screenshot fixture
├── pages/
│   ├── LoginPage.js                      # POM class for Authentication & Logout operations
│   └── DashBoard.js                      # POM class for Dashboard navigation, menu checks, & search validation
├── test-data/
│   └── loginData.js                      # Parameterized dataset for positive and negative login tests
├── tests/
│   ├── login.spec.js                     # Data-driven test spec verifying login/logout and error messages
│   ├── dashBoardAdminPanelCount.spec.js  # Verifies the total count of sidebar menu items (12 items)
│   ├── verifyDashBoardAdminPanelOption.spec.js # Verifies uniqueness of menu items (no duplicate options)
│   └── verifyDashBoardSearch.spec.js     # Validates dynamic search filtering for all sidebar menu items
├── playwright.config.js                  # Playwright configuration (browser, headless mode, test directories)
├── package.json                          # Project dependencies and metadata
├── package-lock.json                     # Dependency lock file
├── .gitignore                            # Git ignore configuration for reports, cache, and screenshots
├── README.md                             # Original README documentation
└── readMeUpdate.md                       # Comprehensive updated framework documentation
```

---

## Framework Architecture & Design Patterns

### 1. Page Object Model (POM)

Page objects encapsulate element selectors and operations specific to each page, eliminating hardcoded locators in test specs.

- **`LoginPage` (`pages/LoginPage.js`):**
  - Locators: Username, password, submit button, error alert (`.oxd-alert-content-text`), user dropdown, and logout button.
  - Actions:
    - `login(username, password)`: Fills credentials and clicks the login button.
    - `logout()`: Opens the user profile dropdown and clicks logout.
    - `isLogOutVisible()`: Returns the logout element locator.
    - `loginError()`: Returns the error message locator.
- **`DashBoard` (`pages/DashBoard.js`):**
  - Locators: Sidebar menu items (`.oxd-main-menu-item-wrapper`), visible menu items (`:visible`), header breadcrumb, and sidebar search input.
  - Actions:
    - `isDashBoardVisible()`: Validates that the topbar breadcrumb is displayed.
    - `checkDashBoardAdminPanelCount()`: Waits for menu elements and retrieves the total item count.
    - `checkDashBoardAdminPanelOptions()`: Extracts all menu labels and checks uniqueness using JavaScript `Set`.
    - `dashBoardSearchFunction()`: Dynamically extracts each sidebar menu item, enters it into the search box, and verifies that exactly 1 result is visible and matches the query.

### 2. Custom Playwright Fixtures

Custom fixtures are located in `fixtures/test.js` to ensure consistent test lifecycle management:

```javascript
// fixtures/test.js
const base = require('@playwright/test');

// Pre-test hook: Automatically opens the OrangeHRM login page before every test
base.test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

// Extends base test with an automatic failure screenshot capture fixture
exports.test = base.test.extend({
    screenshotOnFailure: [async ({ page }, use, testInfo) => {
        await use();
        if (testInfo.status !== testInfo.expectedStatus) {
            await page.screenshot({
                path: `screenshots/${testInfo.title}.png`,
                fullPage: true
            });
        }
    }, { auto: true }]
});

exports.expect = base.expect;
```

> **Note:** Tests import `{ test, expect }` from `../fixtures/test` instead of `@playwright/test` to inherit automated navigation and failure screenshots.

### 3. Data-Driven Testing (DDT)

Test input data is isolated in `test-data/loginData.js`, enabling parameterization without code duplication:

```javascript
// test-data/loginData.js
const loginData = [
    { username: "admin",     password: "admin123", expected: "success" },
    { username: "Admin",     password: "wrong123", expected: "failure" },
    { username: "wrongUser", password: "admin123", expected: "failure" }
];
```

The test runner iterates through these datasets in `tests/login.spec.js`, asserting valid profile logout visibility on `"success"` and alert presence on `"failure"`.

---

## Automated Test Scenarios

| Test File | Description | Assertions & Verifications |
| :--- | :--- | :--- |
| `tests/login.spec.js` | Parameterized login verification with valid and invalid credentials | Verifies successful session establishment & logout for valid credentials; validates alert text visibility for invalid credentials. |
| `tests/dashBoardAdminPanelCount.spec.js` | Validates sidebar navigation completeness | Asserts that exactly **12** menu items exist in the main navigation menu. |
| `tests/verifyDashBoardAdminPanelOption.spec.js` | Validates sidebar integrity and menu naming | Extracts all menu item names and asserts there are no duplicate entries. |
| `tests/verifyDashBoardSearch.spec.js` | Tests dynamic sidebar menu search filter | Dynamically iterates through each menu item, inputs name into search bar, verifies exactly 1 item remains visible, and confirms text match. |

---

## Prerequisites

Ensure the following tools are installed on your machine:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- [Git](https://git-scm.com/)

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd orangeHrmTestingFrameWork
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install required Playwright browser binaries:**
   ```bash
   npx playwright install chromium
   ```

---

## Test Execution Guide

### Run All Tests
Executes all test specifications inside the `tests/` directory:
```bash
npx playwright test
```

### Run Tests in Headed Mode
Opens the browser window during test execution (configured as default in `playwright.config.js`):
```bash
npx playwright test --headed
```

### Run Tests in Headless Mode
Executes tests in the background (ideal for CI/CD environments):
```bash
npx playwright test --headless
```

### Run a Specific Test File
```bash
# Run Login scenario
npx playwright test tests/login.spec.js

# Run Dashboard count scenario
npx playwright test tests/dashBoardAdminPanelCount.spec.js

# Run Dashboard menu uniqueness scenario
npx playwright test tests/verifyDashBoardAdminPanelOption.spec.js

# Run Dashboard search validation scenario
npx playwright test tests/verifyDashBoardSearch.spec.js
```

### Run Tests with Interactive UI Mode
Opens Playwright's interactive test runner for step-by-step inspection and time travel debugging:
```bash
npx playwright test --ui
```

### Run Tests in Debug Mode (Playwright Inspector)
Steps through test execution with breakpoints and locator picker:
```bash
npx playwright test --debug
```

---

## Configuration

The main framework settings are configured in `playwright.config.js`:

```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    use: {
        browserName: 'chromium',
        headless: false,
    }
});
```

To configure additional browsers (Firefox, WebKit), adjust timeouts, or enable tracing, modify the `use` and `projects` properties in this configuration file.

---

## Test Reporting & Failure Artifacts

### 1. Failure Screenshots
When any test fails, the custom fixture automatically captures a full-page screenshot and saves it to:
```text
screenshots/<test-title>.png
```

### 2. Playwright HTML Report
Generate and view rich HTML test execution reports:
```bash
npx playwright test --reporter=html
npx playwright show-report
```

---

## Guidelines for Extending the Framework

### Adding a New Page Object
1. Create a new JavaScript file in `pages/` (e.g., `pages/PimPage.js`).
2. Define a class with a constructor accepting `page`.
3. Define locators in the constructor and business methods below.
4. Export the class using `module.exports`.

### Adding New Test Data
1. Add or extend datasets in `test-data/` (e.g., `test-data/employeeData.js`).
2. Export JSON arrays or objects for test parameterization.

### Writing a New Test Spec
1. Create a new file in `tests/` with the `.spec.js` extension (e.g., `tests/pim.spec.js`).
2. Import `test` and `expect` from `../fixtures/test`.
3. Instantiate the relevant Page Objects inside the test body.
4. Perform actions and write explicit assertions.
