import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class ProductGridComponent extends BaseComponent {
    public getProductCardByCardTitle(text: string) {
        const productCard = new ProductCardComponent(this.container.locator(".col-lg-4", { hasText: text }));
        return productCard;
    }

    public async getAllProductCards(): Promise<ProductCardComponent[]> {
        const cardLocators = await this.container.locator(".col-lg-4").all();
        return cardLocators.map((locator) => new ProductCardComponent(locator));
    }
}

class ProductCardComponent extends BaseComponent {
    readonly productCardImage: Locator;
    readonly productCardInfoBlock: ProductCardBlockComponent;
    constructor(container: Locator) {
        super(container);
        this.productCardImage = this.container.getByRole("img");
        this.productCardInfoBlock = new ProductCardBlockComponent(this.container.locator(".card-block"));
    }
}

class ProductCardBlockComponent extends BaseComponent {
    readonly title: Locator;
    readonly priceTag: Locator;
    readonly infoParagraph: Locator;
    constructor(container: Locator) {
        super(container);
        this.title = this.container.locator(".card-title");
        this.priceTag = this.container.locator("h5");
        this.infoParagraph = this.container.locator("#article");
    }
}
