import { APIRequestContext, expect } from '@playwright/test';

export class GamesApiClient {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async searchGames(searchTerm: string) {
        const response = await this.request.get(`/api/games?search=${searchTerm}`);
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async verifyGameInResults(responseData: any, expectedGameName: string) {
        expect(responseData).toBeTruthy();
        expect(responseData.games).toBeTruthy();
        expect(responseData.games[0]).toEqual(
            expect.objectContaining({
                name: expect.stringContaining(expectedGameName),
            })
        );
    }

    async verifyNoResults(responseData: any) {
        expect(responseData.games).toHaveLength(0);
    }
}