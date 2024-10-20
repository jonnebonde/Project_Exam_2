import { create } from "zustand";

// Create Zustand store to manage user authentication and sync with localStorage
export const UserDataStore = create((set) => ({
  // Initialize the user state with localStorage value (if available)
  user: JSON.parse(localStorage.getItem("userData")) || null,

  // Action to log in the user, update Zustand state, and save to localStorage
  login: (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    set(() => ({ user: userData }));
  },

  UpdateUser: (updatedFields) => {
    set((state) => {
      // Merge existing user data with the updated fields
      const updatedUser = { ...state.user, ...updatedFields };

      // Update localStorage with the new data
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  },

  // Action to log out the user, clear Zustand state, and remove from localStorage

  logout: () => {
    localStorage.removeItem("userData");
    set(() => ({ user: null }));
  },
}));
