import { test, expect } from "@playwright/test";

test.describe("test suite for navigation", () => {
  test("navigate to the projects page", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await page.click("text=Projects");

    await expect(page).toHaveURL("http://localhost:3000/projects");

    await expect(page.locator("h1")).toContainText(
      "Here are some of my projects",
    );
  });

  test("navigate to the reach-me-out page", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await page.click("text=Reach me out");

    await expect(page).toHaveURL("http://localhost:3000/contacts");

    await expect(page.locator("h2")).toContainText(
      "You can find me on these platforms:",
    );
  });

  test("navigate to the blog posts page", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await page.click("text=Blog Posts");

    await expect(page).toHaveURL("http://localhost:3000/posts");

    const inputField = page.getByPlaceholder("Search for a post...");

    await expect(inputField).toBeVisible();
  });
});
