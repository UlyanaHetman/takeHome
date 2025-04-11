# takeHome
Take Home assessment for Endpoint

# In order to run tests on your local

1. Clone the repo to your local

2. Install Playwright using npm:
   npm init playwright@latest

3. Run npx commands in VS Code for:
- running tests in browser: `npx playwright test --ui`
- running tests in headless mode: `npx playwright test`

If you notice some tests failed, please re-run one more time. Test flackiness was noticed when running in headless mode due to page loading time. 

# NOTE: 
1. Tests were placed in one spec file and separated by test blocks, since they depend on each other based on details in technical assessment. 
2. Github Actions was connected to the repo so that tests can automatically run on Push and Pull Requests. Test results can be viewed under Actions tab in Github.
