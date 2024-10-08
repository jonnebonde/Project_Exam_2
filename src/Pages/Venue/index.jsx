import { Container, Row, Col } from "react-bootstrap";
import { base_Url } from "../../Constants/API";
import { useParams } from "react-router-dom";
import HeadLine from "../../Components/HeroSection/Headline";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useMutationDataAuth from "../../Hooks/Api/Get/Auth/PostPutDelete";
import VenueDetails from "../../Components/venueDetails/VenueDetails";
import VenueBookingForm from "../../Components/venueDetails/VenueBookingForm";
import VenueConfirmationMOdal from "../../Components/venueDetails/BookingModal";
import ImageSlider from "../../Components/venueDetails/ImageSlider";

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
  const postBooking = useMutationDataAuth(
    base_Url + "holidaze/bookings",
    "POST"
  );
  const { id } = useParams();

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
    setShowModal(true);
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

  // Handle modal cancellation

  const handleCancel = () => {
    setShowModal(false);
    setSelectedDates([null, null]); // Clear the form
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
      <Row xs={1} sm={1} md={2}>
        <Col>
          <ImageSlider images={venue?.data?.media} />
        </Col>
        <Col>
          <VenueDetails venue={venue} />
          <VenueBookingForm
            venue={venue.data}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            guests={guests}
            handleGuestChange={handleGuestChange}
            onReserveClick={handleReserveClick}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <HeadLine level={5} className="text-black fw-semibold" text="Owner" />
          <p>{venue?.data?.owner?.name}</p>
        </Col>
      </Row>

      <VenueConfirmationMOdal
        showModal={showModal}
        handleCancel={handleCancel}
        handleBookingConfirmation={handleBookingConfirmation}
        selectedDates={selectedDates}
        guests={guests}
      />
    </Container>
  );
}

export default VenuePage;
