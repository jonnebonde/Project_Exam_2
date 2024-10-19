import { base_Url } from "../../Constants/API";
import useFetchData from "../../Hooks/Api/NoAuth/Get";
import Container from "react-bootstrap/Container";
import HeroSection from "../../Components/HeroSection";
import { useState } from "react";
import VenueCards from "../../Components/VenuesCards";
import HeadLine from "../../Components/HeroSection/Headline";

function Home() {
  const [search, setSearch] = useState("");
  const url =
    base_Url + "holidaze/venues?_owner=true&_bookings=true&sortOrder=asc";

  const { isPending, error, data: venues } = useFetchData(url, "venues");

  const handleSearchFieldChange = (event) => {
    setSearch(event.target.value);
  };

  const resetSearch = () => {
    setSearch("");
  };

  const filteredVenues = search
    ? venues?.data?.filter((venue) => {
        const query = search.toLowerCase();
        const venueTitle = venue.name.toLowerCase().includes(query);
        const venueCity =
          venue.location?.city?.toLowerCase().includes(query) || false;
        const venueCountry =
          venue.location?.country?.toLowerCase().includes(query) || false;

        return venueTitle || venueCity || venueCountry;
      })
    : venues?.data;

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        an error has occurred, please try again
      </Container>
    );
  }

  return (
    <>
      <HeroSection
        search={search}
        resetSearch={resetSearch}
        handleSearchFieldChange={handleSearchFieldChange}
      />
      <HeadLine
        level={1}
        text="Explore our venues"
        className="text-center fw-bold mb-4"
      />
      <Container>
        {filteredVenues.length === 0 ? (
          <p className="text-center">No venues matched your search.</p>
        ) : (
          <VenueCards data={filteredVenues} />
        )}
      </Container>
    </>
  );
}

export default Home;
