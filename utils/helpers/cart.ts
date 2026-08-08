import { APIRequestContext } from "@playwright/test";
import { API_ENDPOINT } from "../../configs/urls";

export async function viewCart(context: APIRequestContext, cartToken: string) {
    const viewCartCall = await context.post(`${API_ENDPOINT}/viewcart`, {
        data: { cookie: cartToken, flag: true },
    });
    const viewCartResponse: cartResponse = await viewCartCall.json();
    return viewCartResponse;
}

export async function deleteItemsFromCart(context: APIRequestContext, productResponse: cartResponse) {
    for (const productInCart of productResponse.Items) {
        await context.post(`${API_ENDPOINT}/deleteitem`, {
            data: { id: productInCart.id },
        });
    }
}

type cartItem = {
    cookie: string;
    id: number;
    prod_id: number;
};

export type cartResponse = {
    Items: cartItem[];
};
