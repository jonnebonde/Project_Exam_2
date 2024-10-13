import { create } from "zustand";

// Create Zustand store to manage venue state
export const useVenueManagerStore = create((set) => ({
  venues: [],

  setVenues: (venues) => set({ venues }),

  addVenue: (newVenue) =>
    set((state) => ({ venues: [...state.venues, newVenue] })),

  updateVenue: (updatedVenue) =>
    set((state) => ({
      venues: state.venues.map((venue) =>
        venue.id === updatedVenue.id ? updatedVenue : venue
      ),
    })),

  removeVenue: (venueId) =>
    set((state) => ({
      venues: state.venues.filter((venue) => venue.id !== venueId),
    })),

  clearVenues: () => set({ venues: [] }),
}));
