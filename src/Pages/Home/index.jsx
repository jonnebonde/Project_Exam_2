import { useQuery } from "@tanstack/react-query";
import { base_Url } from "../../Constants/API";
import VenueCards from "../../Components/VenuesCards";
import SearchVenues from "../../Components/SearchVenues";
import { globalStates } from "../../Hooks/GlobalStates";

import Container from "react-bootstrap/Container";

async function FetchAllVenues() {
  const response = await fetch(
    base_Url + "holidaze/venues?_owner=true&_bookings=true"
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

  const searchQuery = globalStates((state) => state.searchQuery);

  // Filter venues based on search query (by name or location)
  const filteredVenues = venues?.data?.filter((venue) => {
    const query = searchQuery.toLowerCase();
    return venue.name.toLowerCase().includes(query);
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred:" + error.message;

  console.log(filteredVenues);

  return (
    <Container>
      <SearchVenues />
      <VenueCards data={filteredVenues} />
    </Container>
  );
}

export default Home;
