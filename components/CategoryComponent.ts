import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class CategoryComponent extends BaseComponent {
    readonly linkComponent: Locator;
    constructor(container: Locator) {
        super(container);
        this.linkComponent = this.container.locator("#itemc");
    }
    public getCategoryByText(text: string) {
        return this.linkComponent.getByText(text);
    }
}
