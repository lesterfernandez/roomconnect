import type { RegisterBody, UserCredentials } from "../types.ts";
import { tokenMessageSchema } from "../schemas.ts";

export const registerUser = async (registerBody: RegisterBody) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerBody),
  });

  if (response.status === 409) throw new Error("Username conflict");
  if (!response.ok) throw new Error("Server error");

  const tokenMessage = await response.json();
  const parsedTokenMessage = tokenMessageSchema.safeParse(tokenMessage);
  if (!parsedTokenMessage.success) throw new Error("Something went wrong");

  return parsedTokenMessage.data.token;
};

export const signIn = async (userCredentials: UserCredentials) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });

  if (response.status === 401) throw new Error("Invalid username or password");
  if (!response.ok) throw new Error("Server error.");

  const tokenMessage = await response.json();
  const parsedTokenMessage = tokenMessageSchema.safeParse(tokenMessage);
  if (!parsedTokenMessage.success) throw new Error("Something went wrong");

  return parsedTokenMessage.data.token;
};
