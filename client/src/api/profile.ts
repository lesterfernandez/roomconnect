import type { UserProfile } from "../types";
import { getToken } from "../token";

export const editProfile = async (profileBody: UserProfile) => {
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

  return await response.json();
};
