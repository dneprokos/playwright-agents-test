import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly paginationInfo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByPlaceholder('Search games...');
        this.paginationInfo = page.getByText(/Showing \d+ of \d+ games/);
    }

    async navigateToHome() {
        await this.page.goto('/');
    }

    async searchForGame(gameName: string) {
        await this.searchBox.click();
        await this.searchBox.fill(gameName);
    }

    async verifyGameVisible(gameName: string) {
        await expect(this.page.getByText(gameName)).toBeVisible();
    }

    async verifyGameNotVisible(gameName: string) {
        await expect(this.page.getByText(gameName)).not.toBeVisible();
    }

    async verifyPaginationVisible() {
        await expect(this.paginationInfo).toBeVisible();
    }

    getGameHeading(gameName: string) {
        return this.page.getByRole('heading', { name: gameName });
    }

    async verifyMultipleGamesVisible(gameNames: string[]) {
        for (const gameName of gameNames) {
            await this.verifyGameVisible(gameName);
        }
    }

    async verifyMultipleGamesNotVisible(gameNames: string[]) {
        for (const gameName of gameNames) {
            await this.verifyGameNotVisible(gameName);
        }
    }
}