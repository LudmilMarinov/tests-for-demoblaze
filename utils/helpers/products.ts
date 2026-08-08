import { APIRequestContext } from "@playwright/test";
import { API_ENDPOINT } from "../../configs/urls";

export async function getProductEntities(context: APIRequestContext) {
    const apiCall = await context.get(`${API_ENDPOINT}/entries`);
    const productsResponse: ProductsResponse = await apiCall.json();
    return productsResponse;
}

export async function getProductResponseByCategory(category: string, context: APIRequestContext) {
    const getProductResponseCall = await context.post(`${API_ENDPOINT}/bycat`, {
        data: {
            cat: category,
        },
    });
    const productByCategoryResponse: ProductsResponse = await getProductResponseCall.json();
    return productByCategoryResponse;
}

export async function addProductsToCart(targetTitleIds: Item[], cartToken: string, context: APIRequestContext) {
    for (const title of targetTitleIds) {
        await context.post(`${API_ENDPOINT}/addtocart`, {
            data: {
                id: title.id,
                cookie: cartToken,
                prod_id: title.id,
                flag: true,
            },
        });
    }
}

export type Item = {
    id: number;
    cat: string;
    title: string;
    desc: string;
    price: number;
    img: string;
};

export type ProductsResponse = {
    Items: Item[];
};
