import { Page, expect, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('.complete-header');
  }

  async fillCheckoutInfo() {
    await this.firstNameInput.fill('Arif');
    await this.lastNameInput.fill('Daud');
    await this.postalCodeInput.fill('54200');
    await this.continueButton.click();
  }

  async finishPurchase() {
    await this.finishButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toHaveText('Thank you for your order!');
  }
}
