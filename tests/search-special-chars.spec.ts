// spec: search-test-plan.md

import { test, expect } from "@playwright/test";

test.describe("Search Functionality - Special Characters", () => {
  test("Search with Special Characters", async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto("http://localhost:9000/");

    // 2-3. Test various special characters
    const searchBox = page.getByPlaceholder("Search games...");
    const specialCharTests = [
      { input: "&", expectedStatus: 200 },
      { input: "$", expectedStatus: 200 },
      { input: "@", expectedStatus: 200 },
      { input: "#", expectedStatus: 200 },
    ];

    for (const test of specialCharTests) {
      await searchBox.click();
      await searchBox.fill(test.input);

      // 4. Verify the page doesn't crash and handles input gracefully
      await expect(searchBox).toBeVisible();
      await expect(searchBox).toHaveValue(test.input);
    }
  });
});

// Integration tests
test.describe("Search API Integration - Special Characters", () => {
  test("Search with Special Characters - API", async ({ request }) => {
    const specialChars = ["&", "-", "!", "@#$%"];

    for (const char of specialChars) {
      const response = await request.get(
        `http://localhost:9000/api/games?search=${encodeURIComponent(char)}`
      );
      expect(response.ok()).toBeTruthy();

      const responseData = await response.json();
      // Verify response structure is valid regardless of input
      expect(responseData).toBeTruthy();
      expect(responseData.games).toBeTruthy();
      expect(Array.isArray(responseData.games)).toBeTruthy();
    }
  });
});
