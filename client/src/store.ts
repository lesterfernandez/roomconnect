import { create } from "zustand";

type UserProfile = {
  username: string;
  loggedIn: boolean;
};

export const useAuthStore = create<UserProfile>(() => ({
  username: "",
  loggedIn: false,
}));
