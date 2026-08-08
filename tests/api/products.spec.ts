import { APIRequestContext, request } from "@playwright/test";
import { test, expect } from "../../configs/fixtures";
import { getProductEntities, getProductResponseByCategory, ProductsResponse } from "../../utils/helpers/products";

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
        const productByCategory = await getProductResponseByCategory(category.name, context);
        expect(productByCategory.Items.length).toBe(category.expectedResult);
    });
}
