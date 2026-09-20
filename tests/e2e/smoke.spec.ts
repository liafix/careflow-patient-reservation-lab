import { expect, test } from "@playwright/test";

test("Pass 0 / Pass 2 smoke: App Shell loads with identity and truthfulness disclaimer", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /CareFlow/i }).first()).toBeVisible();
  await expect(page.getByText(/Nezávislý kandidátsky projekt/i)).toBeVisible();
  await expect(page.getByText(/syntetické dáta/i)).toBeVisible();
});
