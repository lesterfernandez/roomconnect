import { userProfileSchema } from "./schemas.ts";
import { useProfileStore } from "./store.ts";
import { RegisterBody, UserCredentials } from "./types";
import { tokenMessageSchema } from "./schemas.ts";
import { getToken } from "./token.ts";

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
  if (!parsedTokenMessage.success) throw new Error("Server error");

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

  if (response.status === 401) throw new Error("Invalid username or password.");

  if (!response.ok) throw new Error("Server error.");

  const tokenMessage = await response.json();
  const parsedTokenMessage = tokenMessageSchema.safeParse(tokenMessage);
  if (!parsedTokenMessage.success) throw new Error("Server error.");

  return parsedTokenMessage.data.token;
};

export const handleImplicitLogin = async (): Promise<null> => {
  const profile = useProfileStore.getState();
  if (profile.displayName !== "") return null;

  const token = getToken();
  if (!token) throw new Error("Token doesn't exist");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/implicit_login`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const parsedResponse = userProfileSchema.parse(await response.json());
  if ("errorMessage" in parsedResponse) throw new Error("Error");

  useProfileStore.setState(parsedResponse);
  return null;
};
