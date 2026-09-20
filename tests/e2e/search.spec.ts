import { expect, test } from "@playwright/test";

test.describe("Pass 2 — App Shell & Search UI", () => {
  test("Golden path: Landing -> Navigation to Search (Idle) -> Enter Criteria -> Submit -> View Results", async ({
    page,
  }) => {
    // 1. Visit landing page
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Rezervácie zdravotnej starostlivosti");

    // 2. Click CTA to navigate to Search
    await page.getByRole("link", { name: "Vyhľadať poskytovateľa" }).click();
    await expect(page).toHaveURL("/search");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Vyhľadávanie poskytovateľov");

    // 3. Verify clean /search starts in idle state
    await expect(page.getByText("Zadajte vyhľadávacie kritériá")).toBeVisible();

    // 4. Fill search criteria
    await page.getByLabel("Kľúčové slovo").fill("Central");
    await page.getByLabel("Mesto").selectOption("Bratislava");

    // 5. Submit form
    await page.getByRole("button", { name: "Vyhľadať" }).click();

    // 6. Verify URL reflects parameters
    await expect(page).toHaveURL(/\/search\?q=Central&city=Bratislava/);

    // 7. Verify result list renders matching provider
    await expect(page.getByText("Central Care Clinic")).toBeVisible();
    await expect(page.getByRole("status")).toContainText("Nájdení poskytovatelia: 1");

    // 8. Verify persistent disclaimer is visible on /search
    await expect(page.getByText("Nezávislý kandidátsky projekt")).toBeVisible();
  });

  test("Direct URL-backed search execution", async ({ page }) => {
    await page.goto("/search?city=Ko%C5%A1ice");

    await expect(page.getByText("Northside Medical Centre")).toBeVisible();
    await expect(page.getByRole("status")).toContainText("Nájdení poskytovatelia: 1");
  });

  test("Empty search result flow", async ({ page }) => {
    await page.goto("/search");
    await expect(page.getByText("Zadajte vyhľadávacie kritériá")).toBeVisible();

    await page.getByLabel("Kľúčové slovo").fill("neexistujuci_poskytovatel_123");
    await page.getByRole("button", { name: "Vyhľadať" }).click();

    await expect(page).toHaveURL(/\/search\?q=neexistujuci_poskytovatel_123/);
    await expect(page.getByText("Žiadni poskytovatelia neboli nájdení")).toBeVisible();
  });
});
