import { useParams } from "react-router-dom";
import { base_Url } from "../../Constants/API";
import { Col, Container, Row, Button } from "react-bootstrap";
import useGetDataAuth from "../../Hooks/Api/Auth/Get";
import { useVenueManagerStore } from "../../Hooks/GlobalStates/VenueManagerVenues";
import MyVenuesCards from "../../Components/VenueManager/MyVenuesCards";
import HeadLine from "../../Components/HeroSection/Headline";
import NewVenueForm from "../../Components/VenueManager/NewVenueForm";
import { useState } from "react";

function VenueManagerPage() {
  const { name } = useParams();
  const setManagerVenues = useVenueManagerStore((state) => state.setVenues);
  const [showNewVenueModal, setShowNewVenueModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);

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
  console.log(myVenues);

  const handleEditVenue = (venue) => {
    setEditingVenue(venue); // Set the venue to edit
    setShowNewVenueModal(true); // Open the modal
  };

  const handleCreateVenue = () => {
    setEditingVenue(null); // No venue means creating a new one
    setShowNewVenueModal(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <HeadLine level={1} text="My Venues" className="text-center mt-5" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleCreateVenue}>Create Venue</Button>
        </Col>
      </Row>
      <Row>
        <MyVenuesCards onEditVenue={handleEditVenue} />
      </Row>

      <NewVenueForm
        showModal={showNewVenueModal}
        setShowModal={setShowNewVenueModal}
        venue={editingVenue} //
      />
    </Container>
  );
}

export default VenueManagerPage;
