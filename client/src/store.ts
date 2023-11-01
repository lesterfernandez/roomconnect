import { create } from "zustand";
import { type Message, type SearchBody, type UserProfile } from "./types";

export const useProfileStore = create<UserProfile>(() => ({
  profilePic: "",
  displayName: "",
  gender: "",
  budget: 0,
  cleanliness: 0,
  loudness: 0,
  coed: false,
}));

export const useMessageStore = create<{ [name: string]: Message[] }>(() => ({}));

type SearchStore = {
  settings: Partial<SearchBody>;
  results: UserProfile[];
};

export const useSearchStore = create<SearchStore>(() => ({
  settings: {},
  results: [],
}));
