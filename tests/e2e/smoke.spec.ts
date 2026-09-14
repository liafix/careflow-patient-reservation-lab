import { expect, test } from "@playwright/test";

test("Pass 0 smoke: the foundation page loads with its disclaimer", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "CareFlow" })).toBeVisible();
  await expect(page.getByText(/synthetic data only/i)).toBeVisible();
});
