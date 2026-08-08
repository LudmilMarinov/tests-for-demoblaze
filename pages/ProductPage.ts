import { Page } from "@playwright/test";
import { expect } from "../configs/fixtures";

import BasePage from "./BasePage";
import { BASE_URL } from "../configs/urls";
import { ProductContentComponent } from "../components/ProductContentComponent";

export class ProductPage extends BasePage {
  readonly productContentComponent: ProductContentComponent;
  constructor(page: Page) {
    super(page);
    this.productContentComponent = new ProductContentComponent(
      this.page.locator(".product-content"),
    );
  }

  async goto(productId: string) {
    return this.page.goto(`${BASE_URL}/prod.html?idp_=${productId}`);
  }
}
