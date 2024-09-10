import { create } from "zustand";

export const useUser = create((set) => ({
  userInfo: {
    jwt: null,
    username: null,
    email: null,
  },
  setUserInfo: (newUserInfo) => set(() => newUserInfo),
}));
