import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: true,
    retries: process.env.CI ? 2 : 0,
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
            name: "api",
            testDir: "./tests/api",
        },
        {
            name: "chromium",
            testDir: "./tests/UI",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            testDir: "./tests/UI",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            testDir: "./tests/UI",
            use: { ...devices["Desktop Safari"] },
        },
    ],
});
