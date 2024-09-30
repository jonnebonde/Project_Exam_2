import { Container, Row, Col } from "react-bootstrap";
import { base_Url } from "../../Constants/API";
import { useParams } from "react-router-dom";
import HeadLine from "../../Components/HeroSection/Headline";
import { useQuery } from "@tanstack/react-query";
import AmenitiesList from "../../Components/venueDetails/AmenitiesList";
import VenueBookingPicker from "../../Components/venueDetails/DatePicker";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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
  const handleBookingConfirmation = async () => {
    const bookingDetails = {
      dateFrom: selectedDates[0],
      dateTo: selectedDates[1],
      guests: guests,
    };

    // API Call to send booking details
    try {
      const response = await fetch(`${base_Url}holidaze/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const data = await response.json();
      console.log("Booking successful:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    // Close the modal after booking
    setShowModal(false);
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
          <img
            src={
              venue?.data?.media && venue?.data?.media[0]?.url
                ? venue?.data?.media[0]?.url
                : "https://via.placeholder.com/150"
            }
            alt={
              venue?.data?.media && venue?.data?.media[0]?.alt_text
                ? venue?.data?.media[0]?.alt_text
                : "No alt text provided"
            }
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
        <Col>
          <p>{venue?.data?.description}</p>
          <HeadLine
            level={4}
            className="text-black fw-semibold"
            text="Amenities"
          />
          <AmenitiesList amenities={venue?.data?.meta} />
          <p>Max total guests: {venue?.data?.maxGuests}</p>
          <p>${venue?.data?.price}/night</p>
          {/* Booking Date Picker */}
          <VenueBookingPicker
            bookedDates={venue?.data?.bookings}
            setSelectedDates={setSelectedDates}
            selectedDates={selectedDates}
          />
          {/* Guest Selection */}

          <Form.Group controlId="guestInput">
            <Form.Label>Guests (Max: {venue?.data?.maxGuests})</Form.Label>
            <Form.Control
              type="number"
              value={guests}
              onChange={handleGuestChange}
              placeholder="Enter number of guests"
              max={venue?.data?.maxGuests}
            />
          </Form.Group>
          {/* Reserve Button */}
          <Button
            variant="primary"
            className="mt-3"
            onClick={handleReserveClick}
          >
            Reserve
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <HeadLine level={5} className="text-black fw-semibold" text="Owner" />
          <p>{venue?.data?.owner?.name}</p>
        </Col>
      </Row>

      {/* Modal for Booking Confirmation */}
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Selected Dates:</strong>{" "}
            {selectedDates[0]?.format("YYYY/MM/DD")} -{" "}
            {selectedDates[1]?.format("YYYY/MM/DD")}
          </p>
          <p>
            <strong>Number of Guests:</strong> {guests}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBookingConfirmation}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default VenuePage;
