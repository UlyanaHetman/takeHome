import { expect } from '@playwright/test';

export class WatchlistPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.watchlistStatus0 = page.getByText('You have no items on your');
        this.viewRelevantChanges = page.getByRole('link', { name: 'View relevant changes' });
        this.viewAndEditWatchlist = page.getByRole('link', { name: 'View and edit watchlist' });
        this.editRawWatchlist = page.getByRole('link', { name: 'Edit raw watchlist' });
        this.clearTheWatchlist = page.getByRole('link', { name: 'Clear the watchlist' });
        this.clearTheWatchlistBtn = page.getByRole('button', { name: 'Clear the watchlist (This is' });
        this.clearedWatchlistConfirmation = page.getByText('Your watchlist has been cleared');
        this.watchlistStatus1 = page.getByText('Your watchlist has 1 page (');
        this.watchlistStatus2 = page.getByText('Your watchlist has 2 pages (');
        this.myWatchlistIcon = page.getByRole('link', { name: 'Watchlist' });
        this.searchInput = page.getByRole('searchbox', { name: 'Search Wikipedia' });
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.viewAndEditWatchlistTitle = page.getByText('Remove titles from watchlist');
        this.javascriptCheckbox = page.getByRole('checkbox', { name: 'JavaScript (talk | history)' });
        this.qaCheckbox = page.getByRole('checkbox', { name: 'Quality assurance (talk | history)' });
        this.qaWatchlistTitle = page.getByRole('link', { name: 'Quality assurance' });
        this.removeTitlesBtn = page.getByRole('button', { name: 'Remove titles' });
    }
};