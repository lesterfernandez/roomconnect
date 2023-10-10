import { create } from "zustand";
import { UserProfile } from "./types";

export const useProfileStore = create(set => ({
  profilePic: "",
  displayName: "",
  budget: 0,
  gender: "",
  cleanliness: 0,
  loudness: 0,
  coed: false,

  setProfile: (newProfile: UserProfile) =>
    set(() => ({
      ...newProfile,
    })),
}));
