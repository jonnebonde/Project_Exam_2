import { useQuery } from "@tanstack/react-query";
import { base_Url } from "../../Constants/API";
import VenueCards from "../../Components/VenuesCards";
import { useState } from "react";
import heroImage from "../../assets/Images/hero_section.jpg";

import Container from "react-bootstrap/Container";
import { Button, InputGroup, Form } from "react-bootstrap";

async function FetchAllVenues() {
  const response = await fetch(
    base_Url + "holidaze/venues?_owner=true&_bookings=true&sortOrder=asc"
  );

  if (!response.ok) {
    throw new Error("There was an error fetching the listings");
  }

  return response.json();
}

function Home() {
  const {
    isPending,
    error,
    data: venues,
  } = useQuery({
    queryKey: ["venues"],
    queryFn: FetchAllVenues,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const [search, setSearch] = useState("");

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

  if (isPending)
    return <Container className="text-center my-5">Loading...</Container>;

  if (error) return "An error has occurred:" + error.message;

  console.log(filteredVenues);

  return (
    <Container>
      <Container
        className="search-bar-container mb-5 d-flex justify-content-center align-items-center flex-column text-center"
        fluid
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          color: "white",
        }}
      >
        <h1 className="text-white">Holidaze</h1>
        <h3 className="text-white">Your Destination for Dream Venues.</h3>
        <InputGroup>
          {" "}
          <Form.Control
            type="text"
            placeholder="Search by venue name or location"
            value={search}
            onChange={handleSearchFieldChange}
          />
          <Button onClick={resetSearch}>Reset Filter</Button>
        </InputGroup>
      </Container>
      {filteredVenues.length === 0 ? (
        <p>No venues found...</p>
      ) : (
        <VenueCards data={filteredVenues} />
      )}
    </Container>
  );
}

export default Home;
