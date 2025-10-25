# Playwright Test Automation with AI Agents

This project demonstrates the power of AI-driven test automation using Playwright test framework. It showcases how different AI agents can work together to plan, generate, and maintain automated tests for a retro video games portal application.

## Project Overview

The project tests the search functionality of a retro video games portal application, which allows users to:

- Search for games by full title
- Search using partial title matches
- Handle special characters in search queries

Both End-to-End (E2E) UI tests and API integration tests are implemented to ensure comprehensive test coverage.

## AI Agents Used

### 1. Test Planner Agent

```
Prompt: Generate test plan for search functionality of the website http://localhost:9000/
```

This agent analyzed the application and created a detailed test plan (`search-test-plan.md`) covering:

- Test scenarios
- Test cases
- Test data requirements
- Test priorities

### 2. Test Generator Agent

```
Prompt: Generate tests E2E and Integration (API) tests based on search-test-plan.md test plan.
Local website: http://localhost:9000
API: http://localhost:9000/api/
```

This agent:

- Generated Playwright test scripts based on the test plan
- Created both UI and API tests
- Implemented proper test structure and assertions
- Generated test data

### 3. Test Healer Agent

```
Prompt: Heal all the tests.
Local website: http://localhost:9000
API: http://localhost:9000/api/
```

This agent:

- Identified failing tests
- Diagnosed test failures
- Fixed test issues
- Updated tests to match actual application behavior
- Ensured all tests pass successfully

## Project Structure

```
├── tests/
│   ├── search-functionality.spec.ts   # Full title search tests
│   ├── search-partial-title.spec.ts   # Partial title search tests
│   ├── search-special-chars.spec.ts   # Special characters tests
│   └── seed.spec.ts                   # Test data seeding
├── playwright.config.ts               # Playwright configuration
└── search-test-plan.md               # Generated test plan
```

## Running Tests

To run the tests:

```bash
npx playwright test
```

To run with UI:

```bash
npx playwright test --ui
```

## Requirements

- Node.js
- Playwright Test Framework
- Local instance of retro-video-games-portal running on port 9000
