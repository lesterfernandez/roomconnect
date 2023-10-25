import { create } from "zustand";
import { Message, UserProfile } from "./types";

export const useProfileStore = create<UserProfile>(() => ({
  profilePic: "",
  displayName: "",
  budget: 0,
  gender: "",
  cleanliness: 0,
  loudness: 0,
  coed: false,
}));

export const useMessageStore = create<{[name: string]: Message[]}>(() => ({}))
