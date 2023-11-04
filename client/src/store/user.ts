import { create } from "zustand";
import type { UserProfile } from "../types";

export const useProfileStore = create<UserProfile>(() => ({
  username: "",
  profilePic: "",
  displayName: "",
  gender: "",
  budget: 0,
  cleanliness: 0,
  loudness: 0,
  coed: false,
}));
