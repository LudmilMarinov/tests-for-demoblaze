import { test, expect } from "../../../configs/fixtures";
import { createUser } from "../../../utils/helpers/authentication";

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
