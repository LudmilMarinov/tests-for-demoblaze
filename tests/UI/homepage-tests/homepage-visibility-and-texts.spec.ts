import { test, expect } from "../../../configs/fixtures";

const categoriesCount = 3;
const expectedCategoriesTexts = ["Phones", "Laptops", "Monitors"];

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

test("Verify homepage categories count, texts and visibility", async ({
  homePage,
}) => {
  const allCategoriesLocators =
    await homePage.categoryComponent.linkComponent.all();

  const allCategoriesTexts = await Promise.all(
    allCategoriesLocators.map((locator) => locator.innerText()),
  );
  expect(allCategoriesLocators.length).toBe(categoriesCount);
  for (const category of allCategoriesLocators) {
    await expect(category).toBeVisible();
  }
  //strict equality, order of expectedCategoriesTexts and allCategoriesTexts has to be the same
  expect(allCategoriesTexts).toEqual(expectedCategoriesTexts);
  //cycles trough the allCategoriesTexts array and checks if expectedCategoriesText array contains the category
  //can be merged with above for of cycle, decided to do it separate for readability
  for (const category of allCategoriesTexts) {
    expect(expectedCategoriesTexts).toContain(category);
  }
});

test("Verify each product card has a price tag visible", async ({
  homePage,
}) => {
  await homePage.productGrid.assertIsVisible();

  let pageCount = 0;
  const maxPages = 10;
  while (pageCount < maxPages) {
    const productCards = await homePage.productGrid.getAllProductCards();
    expect(productCards.length).toBeGreaterThan(0);
    for (const card of productCards) {
      await expect(card.productCardInfoBlock.priceTag).toBeVisible();
    }
    pageCount++;
    if (!(await homePage.nextButton.isVisible())) break;
    await homePage.nextButton.click();
    await homePage.page.waitForResponse(/pagination/);
  }
});
