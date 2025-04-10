import { expect } from '@playwright/test';

export class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });
        this.userPageLink = page.getByRole('link', { name: 'UlyanaH' });
        this.myWatchlistIcon = page.getByRole('link', { name: 'Watchlist' });

    }

    async login() {
        const username = 'UlyanaH';
        const password = '214210Test';
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        expect(this.usernameInput).toHaveValue(username);
        await this.loginBtn.click();
    }

    async goto() {
        await this.page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin');
    }
}
