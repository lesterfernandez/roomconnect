import { userProfileSchema } from "./schemas.ts";
import { useProfileStore } from "./store.ts";
import { RegisterBody } from "./types";
import { registerBodySchema, tokenMessageSchema } from "./schemas.ts";
import { getToken, setToken } from "./token.ts";

export const handleRegister = async (registerBody: RegisterBody, confirmPassword: string) => {
  const parsedRegisterBody = registerBodySchema.safeParse(registerBody);
  if (!parsedRegisterBody.success) throw new Error("Invalid form");

  if (registerBody.password !== confirmPassword)
    throw new Error("The passwords you entered do not match");

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

  setToken(parsedTokenMessage.data.token);
  return null;
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
