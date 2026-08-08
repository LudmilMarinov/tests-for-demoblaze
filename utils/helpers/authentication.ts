import { request } from "@playwright/test";
import { API_ENDPOINT } from "../../configs/urls";
export async function createUser(username: string, password: string) {
    const context = await request.newContext();
    const createUserCall = await context.post(`${API_ENDPOINT}/signup`, {
        data: {
            username: username,
            password: Buffer.from(password).toString("base64"),
        },
    });
    const createUserBody = await createUserCall.json();
    if (createUserBody !== "") {
        throw new Error(await createUserBody.errorMessage);
    }
}

export async function authenticate(username: string, password: string) {
    const context = await request.newContext();
    const loginTokenCall = await context.post(`${API_ENDPOINT}/login`, {
        data: {
            username: username,
            password: Buffer.from(password).toString("base64"),
        },
    });
    const loginTokenResponse = await loginTokenCall.json();
    const cartToken = (loginTokenResponse as string).split(" ").pop();
    if (!cartToken) {
        throw new Error(`Failed to parse auth token from login response for "${username}": ${loginTokenResponse}`);
    }
    return { cartToken, context };
}
