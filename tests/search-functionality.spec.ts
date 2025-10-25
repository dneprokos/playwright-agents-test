// spec: search-test-plan.md

import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
  test("Search for a Game by Full Title", async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto("http://localhost:9000/");

    // 2. Focus on the search textbox and type "Contra"
    const searchBox = page.getByPlaceholder("Search games...");
    await searchBox.click();
    await searchBox.fill("Contra");

    // 3. Verify filtered results
    await expect(page.getByText("Contra")).toBeVisible();

    // 4. Verify other games are not visible
    await expect(page.getByText("Super Mario")).not.toBeVisible();

    // 5. Verify pagination update
    const paginationInfo = page.getByText(/Showing \d+ of \d+ games/);
    await expect(paginationInfo).toBeVisible();
  });
});

// Integration tests
test.describe("Search API Integration", () => {
  test("Search for a Game by Full Title - API", async ({ request }) => {
    const response = await request.get(
      "http://localhost:9000/api/games?search=Contra"
    );
    expect(response.ok()).toBeTruthy();

    const responseData = await response.json();
    expect(responseData).toBeTruthy();
    expect(responseData.games).toBeTruthy();
    expect(responseData.games[0]).toEqual(
      expect.objectContaining({
        name: expect.stringContaining("Contra"),
      })
    );
  });

  test("Search with No Results - API", async ({ request }) => {
    const response = await request.get(
      "http://localhost:9000/api/games?search=nonexistent"
    );
    expect(response.ok()).toBeTruthy();

    const responseData = await response.json();
    expect(responseData).toBeTruthy();
    expect(responseData.games).toBeTruthy();
    expect(responseData.games.length).toBe(0);
  });
});
