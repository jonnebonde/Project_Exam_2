import { useParams } from "react-router-dom";
import { base_Url } from "../../Constants/API";
import { Col, Container, Row, Button } from "react-bootstrap";
import useGetDataAuth from "../../Hooks/Api/Auth/Get";
import { useVenueManagerStore } from "../../Hooks/GlobalStates/VenueManagerVenues";
import MyVenuesCards from "../../Components/VenueManager/MyVenuesCards";
import HeadLine from "../../Components/HeroSection/Headline";

function VenueManagerPage() {
  const { name } = useParams();
  const setManagerVenues = useVenueManagerStore((state) => state.setVenues);

  const {
    isPending,
    error,
    data: myVenues,
  } = useGetDataAuth(
    `${base_Url}holidaze/profiles/${name}/venues?_bookings=true`,
    "myVenues"
  );

  if (isPending) {
    return <Container className="text-center">Loading...</Container>;
  }

  if (error) {
    return (
      <Container className="text-center">
        Something went wrong, please try again
      </Container>
    );
  }
  setManagerVenues(myVenues?.data);

  return (
    <Container>
      <Row>
        <Col>
          <HeadLine level={1} text="My Venues" className="text-center mt-5" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button>Create Venue</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <MyVenuesCards />
        </Col>
      </Row>
    </Container>
  );
}

export default VenueManagerPage;
