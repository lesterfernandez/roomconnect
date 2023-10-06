import { create } from "zustand";
import { UserProfile } from "./types";

export const useProfileStore = create(set => ({
  profilePic: "",
  displayName: "",
  budget: 1,
  gender: "",
  cleanliness: 1,
  loudness: 1,
  coed: false,

  setProfile: (newProfile: UserProfile) =>
    set(() => ({
      ...newProfile,
    })),
}));
