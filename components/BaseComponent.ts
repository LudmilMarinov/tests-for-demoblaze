import { expect, type Locator } from "@playwright/test";

export default abstract class BaseComponent {
    constructor(protected readonly container: Locator) {}

    public async assertIsVisible(options?: { timeout?: number }): Promise<void> {
        await this.container.scrollIntoViewIfNeeded();
        await expect(this.container).toBeVisible(options);
    }

    public async assertIsNotVisible(options?: { timeout?: number }): Promise<void> {
        await this.container.scrollIntoViewIfNeeded();
        await expect(this.container).not.toBeVisible(options);
    }
}
