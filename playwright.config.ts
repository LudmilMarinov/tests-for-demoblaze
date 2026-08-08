import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: true,
    retries: 2,
    workers: 2,
    reporter: [["list"], ["allure-playwright"]],
    use: {
        trace: "on-first-retry",

        baseURL: process.env.BASE_URL || "https://demoblaze.com",
        video: {
            mode: "retain-on-failure",
            size: { width: 1920, height: 1080 },
        },
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],
});
