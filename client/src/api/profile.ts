import type { UserProfile } from "../types";
import { getToken } from "../token";
import { userProfileSchema } from "../schemas";

export const editProfile = async (profileBody: UserProfile): Promise<UserProfile> => {
  const token = getToken();
  console.log(profileBody.username);

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileBody),
  });

  if (!response.ok) throw new Error("Server error");

  const profileMessage = await response.json();
  const parsedProfileMessage = userProfileSchema.parse(profileMessage);
  if ("errorMessage" in parsedProfileMessage) throw new Error("Something went wrong");

  return parsedProfileMessage;
};
