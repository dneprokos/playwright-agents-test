// spec: search-test-plan.md

import { test, expect } from "@playwright/test";

test.describe("Search Functionality - Partial Title", () => {
  test("Search for a Game by Partial Title", async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto("http://localhost:9000/");

    // 2-3. Focus and type partial name
    const searchBox = page.getByPlaceholder("Search games...");
    await searchBox.click();
    await searchBox.fill("Man");

    // 4. Verify matching games are displayed - check for specific games
    await expect(
      page.getByRole("heading", { name: "Mega Man 2" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pac-Man" })).toBeVisible();

    // 5. Verify non-matching games are hidden
    await expect(page.getByText("Contra")).not.toBeVisible();
  });
});

// Integration test
test.describe("Search API Integration - Partial Title", () => {
  test("Search for Games by Partial Title - API", async ({ request }) => {
    const response = await request.get(
      "http://localhost:9000/api/games?search=Man"
    );
    expect(response.ok()).toBeTruthy();

    const responseData = await response.json();
    expect(responseData).toBeTruthy();
    expect(responseData.games).toBeTruthy();
    expect(responseData.games.length).toBeGreaterThan(0);
    expect(
      responseData.games.some((game: { name: string }) =>
        game.name.includes("Man")
      )
    ).toBeTruthy();
  });
});
