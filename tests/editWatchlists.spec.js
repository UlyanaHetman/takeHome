const {test, expect} = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { WatchlistPage } = require('../pages/WatchlistPage');

test.beforeEach(async ({ page }) => {
    // Pre-requirement: user Logs into Wikipedia existing account
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.login();

    // Verify user is redirected to the Home Page
    await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Main_Page');
    await page.reload();
    await expect(page.getByText('You are centrally logged in')).toBeVisible();

    // Reload and verify user is logged in
    await page.reload(); // according to recommendation on the website
    await expect(homePage.userPageLink).toBeVisible();
  }); 

test.describe.serial('An existing user is able to add and remove article/page from the watchlist', () => {

    test('When user navigates to empty watchlist', async ({ page }) => {
        const homePage = new HomePage(page);
        const watchlistPage = new WatchlistPage(page);

        // navigate to watchlist by clicking watchlist icon
        await page.reload();
        await homePage.myWatchlistIcon.click();
        await page.reload();

        // verify user is redirected to correct page
        await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Special:Watchlist');
        await expect(watchlistPage.viewRelevantChanges).toBeVisible();
        await expect(watchlistPage.viewAndEditWatchlist).toBeVisible();
        await expect(watchlistPage.editRawWatchlist).toBeVisible();
        await expect(watchlistPage.clearTheWatchlist).toBeVisible();

        // verify the watchlist is empty, if not empty clear the watchlist
        if (await watchlistPage.watchlistStatus0.isVisible()) {
            console.log('The watchlist is empty');
        } else {
            await watchlistPage.clearTheWatchlist.click();
            await watchlistPage.clearTheWatchlistBtn.click();
            await expect(watchlistPage.clearedWatchlistConfirmation).toBeVisible();
        };
    });

      test('And adds two pages to the watchlist', async ({ page }) => {
        const watchlistPage = new WatchlistPage(page);
        const starIcon = page.getByRole('link', { name: 'Watch', exact: true });
        const searchTextArticle1 = "Quality assurance";
        const searchTextArticle2 = "Javascript";

        // Search for Quality Assurance article
        await page.reload(); // according to recommendation on the website
        await watchlistPage.searchInput.fill(searchTextArticle1);
        await watchlistPage.searchBtn.click();

        // Add the article to the Watchlist
        await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Quality_assurance');
        await starIcon.click();

        // Verify the Quality Assurance Article was added to the watchlist
        await watchlistPage.myWatchlistIcon.click();
        await page.reload(); 
        await expect(watchlistPage.watchlistStatus1).toBeVisible();

        // Search for JavaScript article
        await page.reload(); // according to recommendation on the website
        await watchlistPage.searchInput.fill(searchTextArticle2);
        await watchlistPage.searchBtn.click();

        // Add the article to the Watchlist
        await expect(page).toHaveURL('https://en.wikipedia.org/wiki/JavaScript');
        await starIcon.click();
    }); 

    test('Then 2 articles are displayed in the watchlist', async ({ page }) => {
        const watchlistPage = new WatchlistPage(page);
        // Verify the JavaScript Article was added to the watchlist and there are 2 articles in the watchlist
        await watchlistPage.myWatchlistIcon.click();
        await expect(watchlistPage.watchlistStatus2).toBeVisible();
    });

    test('When user removes one article from the watchlist of 2', async ({ page }) => {
        const watchlistPage = new WatchlistPage(page);
        const qaArticleTitle = page.getByRole('heading', { name: 'Quality assurance' }).locator('span');

        // Verify there are 2 articles in the watchlist
        await watchlistPage.myWatchlistIcon.click();
        await expect(watchlistPage.watchlistStatus2).toBeVisible();

        // Remove the Javascript article
        await watchlistPage.viewAndEditWatchlist.click();
        await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Special:EditWatchlist');
        await expect(watchlistPage.viewAndEditWatchlistTitle).toBeVisible();
        await watchlistPage.javascriptCheckbox.click();
        await watchlistPage.removeTitlesBtn.click();

        // Verify the Javascript article has been successfully removed and QA article is still displayed
        page.reload(); // according to recommendation on the website
        await watchlistPage.viewAndEditWatchlist.click();
        await expect(watchlistPage.javascriptCheckbox).toHaveCount(0);
        await expect(watchlistPage.qaCheckbox).toBeVisible();

        // Navigate to View Relevant changes tab and verify only 1 page/article remained
        await watchlistPage.viewRelevantChanges.click();
        await expect(watchlistPage.watchlistStatus1).toBeVisible();

        // Verify remaining article title matches with the title next to the checkbox
        await watchlistPage.viewAndEditWatchlist.click();
        await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Special:EditWatchlist');
        const title1 = await watchlistPage.qaWatchlistTitle.textContent();
        await expect(title1).toEqual('Quality assurance');
        await watchlistPage.qaWatchlistTitle.click();
        await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Quality_assurance');
        const title2 = await qaArticleTitle.textContent();
        //page.reload();
        await expect(title2).toEqual('Quality assurance');
    });
});