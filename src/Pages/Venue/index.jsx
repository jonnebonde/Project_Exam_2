/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { base_Url } from "../../Constants/API";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import HeadLine from "../../Components/HeroSection/Headline";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UserDataStore } from "../../Hooks/GlobalStates/UserData"; // Assuming you have globalStates for accessToken
import useMutationDataAuth from "../../Hooks/Api/Auth/PostPutDelete";
import VenueDetails from "../../Components/SpecificVenue/VenueDetails";
import VenueBookingForm from "../../Components/SpecificVenue/VenueBookingForm";
import VenueConfirmationMOdal from "../../Components/SpecificVenue/BookingModal";
import ImageSlider from "../../Components/SpecificVenue/ImageSlider";

async function FetchVenueDetails(id) {
  const response = await fetch(
    `${base_Url}holidaze/venues/${id}?_owner=true&_bookings=true`
  );

  if (!response.ok) {
    throw new Error("There was an error fetching the venue details");
  }

  return response.json();
}

function VenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = UserDataStore((state) => state.user);
  const accessToken = user?.accessToken;

  const postBooking = accessToken
    ? useMutationDataAuth(base_Url + "holidaze/bookings", "POST")
    : null; // Set to null if no accessToken

  const {
    isPending,
    error,
    data: venue,
  } = useQuery({
    queryKey: ["venue", id],
    queryFn: () => FetchVenueDetails(id),
    staleTime: 1000 * 60 * 5,
  });

  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [guests, setGuests] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Handle form input changes for guests
  const handleGuestChange = (e) => {
    setGuests(e.target.value);
  };

  // Handle reservation button click (opens the modal)
  const handleReserveClick = () => {
    if (!accessToken) {
      // Show login/register alert when not logged in
      alert("Please login or register to make a booking.");
    } else {
      setShowModal(true);
    }
  };

  // Handle confirmation and booking submission
  const handleBookingConfirmation = () => {
    const bookingDetails = {
      dateFrom: new Date(selectedDates[0]),
      dateTo: new Date(selectedDates[1]),
      guests: Number(guests) || guests,
      venueId: id,
    };
    console.log(bookingDetails);

    postBooking.mutate(bookingDetails);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedDates([null, null]);
    setGuests(0);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <HeadLine
            level={1}
            className="text-black fw-semibold text-center mt-5 mb-2"
            text={venue?.data?.name}
          />
        </Col>
      </Row>
      <Row xs={1} sm={1} md={1} lg={2}>
        <Col className="venue-image-container">
          <ImageSlider images={venue?.data?.media} />
        </Col>
        <Col>
          <VenueDetails venue={venue} />
          {!accessToken ? (
            <Alert variant="warning" className="text-center">
              You must{" "}
              <Button variant="link" onClick={() => navigate("/login")}>
                login
              </Button>{" "}
              or{" "}
              <Button variant="link" onClick={() => navigate("/register")}>
                register
              </Button>{" "}
              to book this venue.
            </Alert>
          ) : user.name === venue.data.owner.name ? (
            <Alert variant="warning" className="text-center">
              You are the owner of this venue and cannot book it.
            </Alert>
          ) : (
            <VenueBookingForm
              venue={venue.data}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              guests={guests}
              handleGuestChange={handleGuestChange}
              onReserveClick={handleReserveClick}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <HeadLine level={5} className="text-black fw-semibold" text="Owner" />
          <p>{venue?.data?.owner?.name}</p>
        </Col>
      </Row>

      {accessToken && (
        <VenueConfirmationMOdal
          showModal={showModal}
          handleCancel={handleCancel}
          handleBookingConfirmation={handleBookingConfirmation}
          selectedDates={selectedDates}
          guests={guests}
        />
      )}
    </Container>
  );
}

export default VenuePage;
