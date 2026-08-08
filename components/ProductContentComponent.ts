import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class ProductContentComponent extends BaseComponent {
    readonly productImage: Locator;
    readonly productContentBody: ProductContentBody;
    constructor(container: Locator) {
        super(container);
        this.productImage = this.container.locator(".product-image");
        this.productContentBody = new ProductContentBody(this.container.locator("#tbodyid"));
    }
}

export class ProductContentBody extends BaseComponent {
    readonly title: Locator;
    readonly priceContainer: Locator;
    readonly description: Locator;
    readonly addToCartButton: Locator;
    constructor(container: Locator) {
        super(container);
        this.title = this.container.locator(".name");
        this.priceContainer = this.container.locator(".price-container");
        this.description = this.container.locator(".description");
        this.addToCartButton = this.container.getByText("Add to cart");
    }
}
