import type { Page, Response } from "@playwright/test";

export default abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract goto(urlParams?: string): Promise<Response | null>;
}
