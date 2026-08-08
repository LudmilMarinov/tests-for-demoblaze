import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class NavBarComponent extends BaseComponent {
    readonly logo: Locator;
    readonly navMenu: NavMenuComponent;
    constructor(container: Locator) {
        super(container);
        this.logo = this.container.locator("#nava");
        this.navMenu = new NavMenuComponent(this.container.locator("ul"));
    }
}

class NavMenuComponent extends BaseComponent {
    readonly navItem: Locator;
    constructor(container: Locator) {
        super(container);
        this.navItem = this.container.locator("li");
    }

    public getNavMenuItemByText(text: string) {
        return this.navItem.getByText(text);
    }
}
