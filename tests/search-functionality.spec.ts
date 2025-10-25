import { test } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';
import { GamesApiClient } from './api/GamesApiClient';

test.describe('Search Functionality', () => {
    let searchPage: SearchPage;
    let apiClient: GamesApiClient;

    test.beforeEach(async ({ page, request }) => {
        searchPage = new SearchPage(page);
        apiClient = new GamesApiClient(request);
    });

    test('Search for a Game by Full Title', async () => {
        // 1. Navigate to homepage
        await searchPage.navigateToHome();

        // 2. Search for game
        await searchPage.searchForGame('Contra');

        // 3. Verify filtered results
        await searchPage.verifyGameVisible('Contra');

        // 4. Verify other games are not visible
        await searchPage.verifyGameNotVisible('Super Mario');

        // 5. Verify pagination update
        await searchPage.verifyPaginationVisible();
    });
});

test.describe('Search API Integration', () => {
    let apiClient: GamesApiClient;

    test.beforeEach(async ({ request }) => {
        apiClient = new GamesApiClient(request);
    });

    test('Search for a Game by Full Title - API', async () => {
        const responseData = await apiClient.searchGames('Contra');
        await apiClient.verifyGameInResults(responseData, 'Contra');
    });

    test('Search with No Results - API', async () => {
        const responseData = await apiClient.searchGames('nonexistent');
        await apiClient.verifyNoResults(responseData);
    });
});