import { test, expect } from "@playwright/test"

test("get h1 text in main page", async ({ page }) => {
  await page.goto("http://localhost:3000/shop/main")
  await expect(page.locator("h1")).toContainText("Welcome")
  // await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible()
})
