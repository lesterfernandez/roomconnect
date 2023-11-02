import { create } from "zustand";
import type { Message, SearchBody, UserAttributes, UserProfile } from "./types";

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

type MessageStore = {
  [name: string]: Message[] | undefined;
};

export const useMessageStore = create<MessageStore>(() => ({}));

type SearchStore = {
  settings: Partial<SearchBody>;
  results: UserAttributes[];
};

export const useSearchStore = create<SearchStore>(() => ({
  settings: {},
  results: [],
}));
