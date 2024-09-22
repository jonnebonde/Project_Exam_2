import { create } from "zustand";

// Create Zustand store to manage user authentication and sync with localStorage
export const globalStates = create((set) => ({
  // Initialize the user state with localStorage value (if available)
  user: JSON.parse(localStorage.getItem("userData")) || null,

  // Action to log in the user, update Zustand state, and save to localStorage
  login: (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    set(() => ({ user: userData }));
  },

  // Action to log out the user, clear Zustand state, and remove from localStorage
  logout: () => {
    localStorage.removeItem("userData");
    set(() => ({ user: null }));
  },

  searchQuery: "", // Initial state for search query
  setSearchQuery: (query) => set(() => ({ searchQuery: query })), // Action to set the search query
  resetSearchQuery: () => set(() => ({ searchQuery: "" })), // Action to reset the search query
}));
