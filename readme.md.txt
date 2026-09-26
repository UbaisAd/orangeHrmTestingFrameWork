# OrangeHRM Playwright Automation Framework

A UI automation framework built using **Playwright with JavaScript** for testing the OrangeHRM web application.

The project follows the **Page Object Model (POM)** design pattern to keep page locators, page actions, and test verification separated.

## Tech Stack

* Playwright
* JavaScript
* Node.js
* Page Object Model (POM)
* Playwright Test Runner

## Project Structure

```text
Automation/
│
├── pages/
│   ├── LoginPage.js
│   └── DashBoard.js
│
├── tests/
│   ├── login.spec.js
│   ├── dashBoardAdminPanelCount.spec.js
│   ├── verifyDashBoardAdminPanelOption.spec.js
│   └── verifyDashBoardSearch.spec.js
│
├── playwright.config.js
├── package.json
└── package-lock.json
```

## Framework Design

The framework separates the application interaction from test verification.

### Page Objects

Page classes contain:

* Page locators
* Page actions
* Methods for retrieving page information

Example:

```javascript
await loginPage.login("Admin", "admin123");
```

### Test Scripts

Test files contain:

* Test scenarios
* Expected behavior
* Playwright assertions

Example:

```javascript
const result = await dashBoard.getVisibleAdminPanelOptions();

expect(result).toHaveLength(1);
expect(result[0]).toBe("PIM");
```

This keeps the **page object responsible for interacting with the application** while the **test script is responsible for verification**.

## Automated Scenarios

### Login

* Navigate to the OrangeHRM login page
* Enter username and password
* Perform login
* Verify the expected application behavior

### Dashboard Admin Panel

* Verify the number of dashboard menu options
* Retrieve dashboard menu options
* Check that menu options are unique

### Dashboard Search

The search test validates the sidebar search functionality.

For each available dashboard option:

1. Enter the option into the search field.
2. Identify the currently visible menu options.
3. Verify that exactly one result is displayed.
4. Verify that the displayed result matches the searched option.

Example:

```text
Search: PIM
Expected visible results: 1
Expected result: PIM
```

## Running the Tests

Install the project dependencies:

```bash
npm install
```

Run all Playwright tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/verifyDashBoardSearch.spec.js
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

## Configuration

The Playwright configuration is maintained in:

```text
playwright.config.js
```

Current configuration uses Chromium with headed execution for local test development.

## Learning Objectives

This project is also used to practice and understand:

* Playwright locators
* Locator reusability
* Locator count and text retrieval
* Auto-waiting
* Page Object Model
* Asynchronous JavaScript
* Test and assertion separation
* Dynamic element handling
* Search/filter validation

## Application Under Test

**OrangeHRM Demo Application**

https://opensource-demo.orangehrmlive.com/

## Project Status

This is an evolving automation framework. Additional pages, reusable utilities, test data management, fixtures, and other framework components may be added as the project develops.
