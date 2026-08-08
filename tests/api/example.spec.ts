import { APIRequestContext, request } from "@playwright/test";
import { test, expect } from "../../configs/fixtures";
import { authenticate, createUser } from "../../utils/helpers/authentication";
import {
  cartResponse,
  deleteItemsFromCart,
  viewCart,
} from "../../utils/helpers/cart";
import {
  addProductsToCart,
  getProductEntities,
  getProductResponseByCategory,
  Item,
  ProductsResponse,
} from "../../utils/helpers/products";

test.describe("No auth needed tasks", () => {
  let context: APIRequestContext;
  let productsResponse: ProductsResponse;
  const testData = {
    phone: { name: "phone", expectedResult: 7 },
    notebook: { name: "notebook", expectedResult: 6 },
    monitor: { name: "monitor", expectedResult: 2 },
  };
  const expectedEntriesLength = 9;
  test.beforeEach(async () => {
    context = await request.newContext({
      extraHTTPHeaders: {
        Accept: "application/json",
      },
    });
    productsResponse = await getProductEntities(context);
  });

  test(`Assert entities product quantity is ${expectedEntriesLength}`, async () => {
    expect(productsResponse.Items.length).toBe(expectedEntriesLength);
  });

  for (const category of Object.values(testData)) {
    test(`Assert ${category.name} quantity when calling by category endpoint`, async () => {
      const productByCategory = await getProductResponseByCategory(
        category.name,
        context,
      );
      expect(productByCategory.Items.length).toBe(category.expectedResult);
    });
  }
});

test.describe("Auth needed task", () => {
  let context: APIRequestContext;
  let cartToken: string;
  let targetTitleIds: Item[];
  let viewCartResponse: cartResponse;
  const testData = {
    username: Math.random()
      .toString(36)
      .substring(2, 2 + 5),
    password: Math.random()
      .toString(36)
      .substring(2, 2 + 5),
  };
  test.beforeEach(async () => {
    await createUser(testData.username, testData.password);
    ({ cartToken, context } = await authenticate(
      testData.username,
      testData.password,
    ));

    const targetTitles = ["Samsung galaxy s6", "HTC One M9"];
    const listProductsBody = await getProductEntities(context);

    targetTitleIds = targetTitles.map((title) =>
      listProductsBody.Items.find((item) => item.title === title),
    );
  });

  test.afterEach(async () => {
    await deleteItemsFromCart(context, viewCartResponse);
  });

  test("Assert two products are added to cart with the viewcart api response", async () => {
    await addProductsToCart(targetTitleIds, cartToken, context);
    viewCartResponse = await viewCart(context, cartToken);

    for (const [index, productInCart] of viewCartResponse.Items.entries()) {
      expect(productInCart.prod_id).toBe(targetTitleIds[index].id);
    }
  });
});
