import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class LoginModalComponent extends BaseComponent {
    readonly modalHeader: LoginModalHeader;
    readonly modalBody: LoginModalBody;
    readonly modalFooter: LoginModalFooter;
    constructor(container: Locator) {
        super(container);

        this.modalHeader = new LoginModalHeader(this.container.locator(".modal-header"));
        this.modalBody = new LoginModalBody(this.container.locator(".modal-body"));
        this.modalFooter = new LoginModalFooter(this.container.locator(".modal-footer"));
    }
}

class LoginModalHeader extends BaseComponent {
    readonly title: Locator;
    readonly closeButton: Locator;
    constructor(container: Locator) {
        super(container);
        this.title = this.container.locator("#logInModalLabel");
        this.closeButton = this.container.getByRole("button");
    }
}

class LoginModalBody extends BaseComponent {
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    constructor(container: Locator) {
        super(container);
        this.userNameInput = this.container.locator("#loginusername");
        this.passwordInput = this.container.locator("#loginpassword");
    }
}

class LoginModalFooter extends BaseComponent {
    readonly closeButton: Locator;
    readonly loginButton: Locator;
    constructor(container: Locator) {
        super(container);
        this.closeButton = this.container.getByRole("button", { name: "Close" });
        this.loginButton = this.container.getByRole("button", { name: "Log in" });
    }
}
