# takeHome
Take Home assessment from Endpoint

# In order to run tests on your local

1. Clone the repo to your local

2. Install Playwright using npm:
   npm init playwright@latest

3. Run npx commands in VS Code for:
- running tests in browser: npx playwright test --ui
- running tests in headless mode: npx playwright test

If you notice some tests failed, please re-run one more time. Test flackiness was noticed when running in headless mode due to page loading time. 

NOTE: tests were placed in one spec file and separated by test blocks, since they depend on each other as listed in the technical assessment. 