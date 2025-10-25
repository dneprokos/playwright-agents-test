# Playwright Test Automation with AI Agents

This project demonstrates the power of AI-driven test automation using Playwright test framework. It showcases how different AI agents can work together to plan, generate, and maintain automated tests for a retro video games portal application.

## Project Overview

The project tests the search functionality of a retro video games portal application, which allows users to:

- Search for games by full title
- Search using partial title matches
- Handle special characters in search queries

Both End-to-End (E2E) UI tests and API integration tests are implemented to ensure comprehensive test coverage.

## Project Structure

```
├── tests/
│   ├── pages/
│   │   └── SearchPage.ts             # Page Object for search functionality
│   ├── api/
│   │   └── GamesApiClient.ts         # API client for games endpoints
│   ├── search-functionality.spec.ts   # Full title search tests
│   ├── search-partial-title.spec.ts   # Partial title search tests
│   ├── search-special-chars.spec.ts   # Special characters tests
│   └── seed.spec.ts                   # Test data seeding
├── playwright.config.ts               # Playwright configuration
└── search-test-plan.md               # Generated test plan
```

## Design Patterns

### Page Object Model

The project implements the Page Object Model (POM) design pattern to improve test maintenance and reduce code duplication. Key components include:

#### SearchPage Class

```typescript
// tests/pages/SearchPage.ts
export class SearchPage {
  // Handles all UI interactions for the search functionality
  async searchForGame(gameName: string);
  async verifyGameVisible(gameName: string);
  async verifyGameNotVisible(gameName: string);
  // ... other methods
}
```

#### GamesApiClient Class

```typescript
// tests/api/GamesApiClient.ts
export class GamesApiClient {
  // Handles all API interactions for the games endpoint
  async searchGames(searchTerm: string);
  async verifyGameInResults(responseData: any, expectedGameName: string);
  // ... other methods
}
```

## Configuration

The project uses Playwright's configuration file to manage environment-specific settings:

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    baseURL: "http://localhost:9000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
```

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

## Running Tests

To run all tests:

```bash
npx playwright test
```

To run with UI:

```bash
npx playwright test --ui
```

To run a specific test file:

```bash
npx playwright test tests/search-functionality.spec.ts
```

## Requirements

- Node.js 14 or higher
- Playwright Test Framework
- Local instance of retro-video-games-portal running on port 9000

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dneprokos/playwright-agents-test.git
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Best Practices Implemented

1. Page Object Model for better maintainability
2. Centralized configuration in playwright.config.ts
3. Separation of UI and API tests
4. Reusable components and methods
5. Clean and readable test structure
6. Proper error handling and assertions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
