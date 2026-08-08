import { request } from "@playwright/test";
import { API_ENDPOINT, BASE_URL } from "../../configs/urls";
export async function createUser(username: string, password: string) {
  const context = await request.newContext();
  const createUserCall = await context.post(`${API_ENDPOINT}/signup`, {
    data: {
      username: username,
      password: Buffer.from(password).toString("base64"),
    },
  });
  const createUserResponse = await createUserCall.json();
  return createUserResponse;
}

export async function authenticate(username: string, password: string) {
  const context = await request.newContext();
  const loginTokenCall = await context.post(`${API_ENDPOINT}/login`, {
    data: {
      username: username,
      password: Buffer.from(password).toString("base64"),
    },
  });
  const loginTokenResponse: string = await loginTokenCall.json();
  const cartToken = loginTokenResponse.split(" ").pop();
  return { cartToken, context };
}
