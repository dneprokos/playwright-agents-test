import { test, expect } from "@playwright/test";

test.describe("Test group", () => {
  test("seed", async ({ page, request }) => {
    await page.goto("http://localhost:9000/");

    // Wait for initial data load
    await page.waitForSelector('div[data-testid="game-card"]');

    // Verify seed data through API
    const response = await request.get("http://localhost:9000/api/games");
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data.games)).toBeTruthy();
    expect(data.games.length).toBeGreaterThan(0);
  });
});
