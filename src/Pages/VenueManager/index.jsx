import { useParams } from "react-router-dom";
import { base_Url } from "../../Constants/API";
import { Col, Container, Row, Button } from "react-bootstrap";
import useGetDataAuth from "../../Hooks/Api/Auth/Get";
import MyVenuesCards from "../../Components/VenueManager/MyVenuesCards";
import HeadLine from "../../Components/HeroSection/Headline";
import NewVenueForm from "../../Components/VenueManager/NewVenueForm";
import { useState } from "react";
import MyVenuesBookings from "../../Components/VenueManager/MyVenuesBookings";
import { Helmet } from "react-helmet-async";
import Loader from "../../Components/Shared/Loader";

function VenueManagerPage() {
  const { name } = useParams();

  const [showNewVenueModal, setShowNewVenueModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const [showBookings, setShowBookings] = useState(false);
  const [venueBookings, setVenueBookings] = useState(null);

  const {
    isPending,
    error,
    data: myVenues,
    refetch,
  } = useGetDataAuth(
    `${base_Url}holidaze/profiles/${name}/venues?_bookings=true`,
    "myVenues"
  );

  const handleEditVenue = (venue) => {
    setEditingVenue(venue);
    setShowNewVenueModal(true);
  };

  const handleCreateVenue = () => {
    setEditingVenue(null);
    setShowNewVenueModal(true);
  };

  const handleViewBookings = (bookings) => {
    setVenueBookings(bookings);
    setShowBookings(true);
  };

  if (isPending) {
    return (
      <Container className="text-center">
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center">
        Something went wrong, please try again
      </Container>
    );
  }

  return (
    <Container>
      <Helmet>
        <title>My Venues | Holidaze</title>
        <meta
          name="description"
          content="Seamlessly organize venues and bookings all in one place."
        />
      </Helmet>
      <Row>
        <Col>
          <HeadLine level={1} text="My Venues" className="text-center mt-5" />
        </Col>
      </Row>
      <Row>
        <Col className="text-center text-lg-start">
          <Button onClick={handleCreateVenue} className="primary">
            Create Venue
          </Button>
        </Col>
      </Row>
      <MyVenuesCards
        venues={myVenues?.data}
        onEditVenue={handleEditVenue}
        onViewBookings={handleViewBookings}
      />

      <NewVenueForm
        showModal={showNewVenueModal}
        setShowModal={setShowNewVenueModal}
        venue={editingVenue}
        refetchVenues={refetch}
      />

      <MyVenuesBookings
        showModal={showBookings}
        setShowModal={setShowBookings}
        venueBookings={venueBookings}
      />
    </Container>
  );
}

export default VenueManagerPage;
