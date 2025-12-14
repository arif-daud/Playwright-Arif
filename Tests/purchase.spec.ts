import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 120 * 1000, // increase total test timeout since each step is very slow

  expect: {
    timeout: 60000,
  },

  reporter: [
    ['html', { open: 'never' }]
  ],

  use: {
    headless: false, // show browser
    video: 'on', // record video
    screenshot: 'only-on-failure', // screenshot on failure
    trace: 'on-first-retry', // trace for debugging

    launchOptions: {
      slowMo: 50000, // 50,000 ms = 50 seconds per action
    },
  },
});


test('Complete purchase flow in Swag Labs', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifyLoginSuccess();

  await productsPage.verifyProductsPageLoaded();
  await productsPage.addProductToCart();
  await productsPage.openCart();

  await cartPage.verifyItemInCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillCheckoutInfo();
  await checkoutPage.finishPurchase();
  await checkoutPage.verifySuccessMessage();
});
