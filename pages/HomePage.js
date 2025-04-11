import { expect } from '@playwright/test';
import { credentials } from '../data.json';

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
        await this.usernameInput.fill(credentials[0].username);
        await this.passwordInput.fill(credentials[0].password);
        expect(this.usernameInput).toHaveValue(credentials[0].username);
        await this.loginBtn.click();
    }

    async goto() {
        await this.page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin');
    }
}
