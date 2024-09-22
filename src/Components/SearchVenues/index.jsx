import { globalStates } from "../../Hooks/GlobalStates"; // Import Zustand store

function SearchVenues() {
  // Access the Zustand state and actions
  const searchQuery = globalStates((state) => state.searchQuery);
  const setSearchQuery = globalStates((state) => state.setSearchQuery);
  const resetSearchQuery = globalStates((state) => state.resetSearchQuery);

  // Handle search input change
  const lookForSearchFieldChange = (e) => {
    setSearchQuery(e.target.value); // Update search query in Zustand
  };

  // Handle reset search query
  const lookForResetChange = () => {
    resetSearchQuery(); // Reset the search query in Zustand
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by venue name or location"
        value={searchQuery}
        onChange={lookForSearchFieldChange}
      />
      <button onClick={lookForResetChange}>Reset Filter</button>
    </div>
  );
}

export default SearchVenues;
