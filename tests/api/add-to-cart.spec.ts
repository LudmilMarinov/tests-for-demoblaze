import { APIRequestContext } from "@playwright/test";
import { test, expect } from "../../configs/fixtures";
import { createUser, authenticate } from "../../utils/helpers/authentication";
import { cartResponse, deleteItemsFromCart, viewCart } from "../../utils/helpers/cart";
import { Item, getProductEntities, addProductsToCart } from "../../utils/helpers/products";

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
    ({ cartToken, context } = await authenticate(testData.username, testData.password));

    const targetTitles = ["Samsung galaxy s6", "HTC One M9"];
    const listProductsBody = await getProductEntities(context);

    targetTitleIds = targetTitles.map((title) => listProductsBody.Items.find((item) => item.title === title));
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
