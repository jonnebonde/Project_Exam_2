import { useQuery } from "@tanstack/react-query";
import { base_Url } from "../../Constants/API";
import VenueCards from "../../Components/VenuesCards";

import Container from "react-bootstrap/Container";

async function FetchAllProducts() {
  const response = await fetch(base_Url + "?_owner=true&_bookings=true");

  if (!response.ok) {
    throw new Error("There was an error fetching the listings");
  }

  return response.json();
}

function Home() {
  const {
    isPending,
    error,
    data: data,
  } = useQuery({
    queryKey: ["venues"],
    queryFn: FetchAllProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred:" + error.message;

  console.log(data);

  return (
    <Container className="text-center">
      <h1>Holidaze venues</h1>
      <p>Find your holiday destination</p>
      <VenueCards data={data.data} />
    </Container>
  );
}

export default Home;
