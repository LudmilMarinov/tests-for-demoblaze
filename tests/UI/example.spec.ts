import { test, expect } from "../../configs/fixtures";
import { createUser } from "../../utils/helpers/authentication";

const categoriesCount = 3;
const expectedCategoriesTexts = ["Phones", "Laptops", "Monitors"];
const addProductTestData = {
  productName: "Nokia lumia 1520",
  expectedResult: "Product added.",
};
const createUserData = {
  username: Math.random()
    .toString(36)
    .substring(2, 2 + 5) as string,
  password: Math.random()
    .toString(36)
    .substring(2, 2 + 5) as string,
};
test.beforeEach(async ({ homePage }) => {
  await createUser(createUserData.username, createUserData.password);
  await homePage.goto();
});

//if there was a delete test user endpoint i would use it here with after each
// test.afterEach(async () => {
//   await deleteUser()
// })

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

test("Verify logged user can add product to cart and product added alert is present", async ({
  homePage,
  productPage,
}) => {
  await homePage.login(createUserData.username, createUserData.password);
  await homePage.productGrid
    .getProductCardByCardTitle(addProductTestData.productName)
    .productCardInfoBlock.title.click();
  const [dialog] = await Promise.all([
    productPage.page.waitForEvent("dialog"),
    productPage.productContentComponent.productContentBody.addToCartButton.click(),
  ]);
  expect(dialog.message()).toBe(addProductTestData.expectedResult);
  await dialog.accept();
  //to check if dialog is actually dismissed we can use
  // await expect(
  //   productPage.productContentComponent.productContentBody.title,
  // ).toBeVisible();
});
