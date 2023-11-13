import type { UserProfile } from "../types";
import { userProfileSchema } from "../schemas";
import { getToken } from "../token";

export const editProfile = async (userProfile: UserProfile) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(userProfile),
  });

  if (!response.ok) throw new Error("Server error");
  const parsedUserProfile = userProfileSchema.safeParse(await response.json());

  if (!parsedUserProfile.success) {
    throw new Error("Server error");
  }

  if ("errorMessage" in parsedUserProfile.data) {
    throw new Error(parsedUserProfile.data.errorMessage);
  }

  return parsedUserProfile.data;
};
