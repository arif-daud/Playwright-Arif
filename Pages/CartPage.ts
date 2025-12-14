import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItemName: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemName = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async verifyItemInCart() {
    await expect(this.cartItemName).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
