import { create } from "zustand";
import type { SearchBody, UserProfile } from "../types";

type SearchStore = {
  settings: Partial<SearchBody>;
  results: UserProfile[];
};

export const useSearchStore = create<SearchStore>(() => ({
  settings: {},
  results: [],
}));
