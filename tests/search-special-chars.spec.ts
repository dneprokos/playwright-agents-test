import { test, expect } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';
import { GamesApiClient } from './api/GamesApiClient';

test.describe('Search Functionality - Special Characters', () => {
    let searchPage: SearchPage;
    let apiClient: GamesApiClient;

    test.beforeEach(async ({ page, request }) => {
        searchPage = new SearchPage(page);
        apiClient = new GamesApiClient(request);
    });

    test('Search with Special Characters', async () => {
        // 1. Navigate to homepage
        await searchPage.navigateToHome();

        // 2-3. Test various special characters
        const specialCharTests = [
            { input: '&', expectedStatus: 200 },
            { input: '$', expectedStatus: 200 },
            { input: '@', expectedStatus: 200 },
            { input: '#', expectedStatus: 200 },
        ];

        for (const test of specialCharTests) {
            await searchPage.searchForGame(test.input);

            // 4. Verify the page doesn't crash and handles input gracefully
            await expect(searchPage.searchBox).toBeVisible();
            await expect(searchPage.searchBox).toHaveValue(test.input);

            // Additional API verification
            const responseData = await apiClient.searchGames(test.input);
            expect(responseData).toBeTruthy();
        }
    });
});