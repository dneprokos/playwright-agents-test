import { test } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';
import { GamesApiClient } from './api/GamesApiClient';

test.describe('Search Functionality - Partial Title', () => {
    let searchPage: SearchPage;
    let apiClient: GamesApiClient;

    test.beforeEach(async ({ page, request }) => {
        searchPage = new SearchPage(page);
        apiClient = new GamesApiClient(request);
    });

    test('Search for a Game by Partial Title', async () => {
        // 1. Navigate to homepage
        await searchPage.navigateToHome();

        // 2-3. Focus and type partial name
        await searchPage.searchForGame('Man');

        // 4. Verify matching games are displayed
        await searchPage.verifyMultipleGamesVisible(['Mega Man 2', 'Pac-Man']);

        // 5. Verify non-matching games are hidden
        await searchPage.verifyGameNotVisible('Contra');
    });
});

test.describe('Search API Integration - Partial Title', () => {
    let apiClient: GamesApiClient;

    test.beforeEach(async ({ request }) => {
        apiClient = new GamesApiClient(request);
    });

    test('Search for Games by Partial Title - API', async () => {
        const responseData = await apiClient.searchGames('Man');
        await apiClient.verifyGameInResults(responseData, 'Man');
    });
});