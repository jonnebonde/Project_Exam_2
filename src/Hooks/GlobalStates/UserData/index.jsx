import { create } from "zustand";

export const UserDataStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("userData")) || null,

  login: (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    set(() => ({ user: userData }));
  },

  UpdateUser: (updatedFields) => {
    set((state) => {
      const updatedUser = { ...state.user, ...updatedFields };

      localStorage.setItem("userData", JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  },

  logout: () => {
    localStorage.removeItem("userData");
    set(() => ({ user: null }));
  },
}));
