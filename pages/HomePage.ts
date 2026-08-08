import { Locator, Page } from "@playwright/test";

import BasePage from "./BasePage";
import { BASE_URL } from "../configs/urls";
import { NavBarComponent } from "../components/NavBarComponent";
import { CategoryComponent } from "../components/CategoryComponent";
import {
  ProductCardComponent,
  ProductGridComponent,
} from "../components/ProductGridComponent";
import { LoginModalComponent } from "../components/LoginModalComponent";
export class HomePage extends BasePage {
  readonly navBar: NavBarComponent;
  readonly categoryComponent: CategoryComponent;
  readonly productGrid: ProductGridComponent;
  readonly nextButton: Locator;
  readonly loginModal: LoginModalComponent;
  constructor(page: Page) {
    super(page);
    this.navBar = new NavBarComponent(this.page.locator("#navbarExample"));
    this.categoryComponent = new CategoryComponent(
      this.page.locator(".list-group"),
    );
    this.productGrid = new ProductGridComponent(this.page.locator("#tbodyid"));
    this.nextButton = this.page.locator("#next2");
    this.loginModal = new LoginModalComponent(
      this.page.locator("[class='modal-content']:visible"),
    );
  }

  async goto() {
    return this.page.goto(BASE_URL);
  }

  async login(username: string, password: string) {
    await this.navBar.navMenu.getNavMenuItemByText("Log in").click();
    await this.loginModal.modalBody.userNameInput.fill(username);
    await this.loginModal.modalBody.passwordInput.fill(password);
    await this.loginModal.modalFooter.loginButton.click();
    await this.navBar.navMenu
      .getNavMenuItemByText(`Welcome ${username}`)
      .waitFor();
  }
}
