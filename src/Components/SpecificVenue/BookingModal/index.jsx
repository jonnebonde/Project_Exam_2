import { Modal, Button, Image, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import HeadLine from "../../HeroSection/Headline";
import calculateDaysBetween from "../../../Utilities/DateRange";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMutationDataAuth from "../../../Hooks/Api/Auth/PostPutDelete";
import { base_Url } from "../../../Constants/API";

function VenueConfirmationModal({
  showModal,
  handleCancel,
  selectedDates,
  guests,
  data,
  resetBookingForm,
  user,
}) {
  const navigate = useNavigate();
  const [bookingMessage, setBookingMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const postBooking = useMutationDataAuth(
    base_Url + "holidaze/bookings",
    "POST"
  );

  const resetBookingMessage = () => {
    setBookingMessage(null);
    resetBookingForm();
  };

  const handleBookingConfirmation = () => {
    setLoading(true);
    const bookingDetails = {
      dateFrom: new Date(selectedDates[0]),
      dateTo: new Date(selectedDates[1]),
      guests: Number(guests) || guests,
      venueId: data?.data?.id,
    };

    postBooking.mutate(bookingDetails, {
      onSuccess: () => {
        setBookingMessage("success");
        setLoading(false);
      },
      onError: () => {
        setBookingMessage("error");
        setLoading(false);
      },
    });
  };

  const goToProfile = () => navigate(`/user/${user?.name}`);

  return (
    <Modal
      show={showModal}
      onHide={handleCancel}
      onExited={resetBookingMessage}
      className="venue-booking-confirmation-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          src={data?.data?.media[0]?.url}
          alt={data?.name}
          fluid
          className="rounded-1 d-block w-100"
        />
        <HeadLine level={3} text={data?.data?.name} />
        <p>
          <strong>Number of Guests:</strong> {guests}
        </p>
        <p>
          <strong>Total Days:</strong>{" "}
          {calculateDaysBetween(selectedDates[0], selectedDates[1])}
        </p>
        <p>
          <strong>Checkin Date:</strong>{" "}
          {selectedDates[0]?.format("YYYY/MM/DD")}
        </p>
        <p>
          <strong>Checkout Date:</strong>{" "}
          {selectedDates[1]?.format("YYYY/MM/DD")}
        </p>
        <p>
          <strong>Total Price: </strong>$
          {calculateDaysBetween(selectedDates[0], selectedDates[1]) *
            data?.data?.price}
        </p>
        {bookingMessage === "success" && (
          <p className="text-success">Your booking was successfull!</p>
        )}
        {bookingMessage === "error" && (
          <p className="text-danger">Booking failed. Please try again.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {bookingMessage === "success" ? (
              ""
            ) : (
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            )}

            {bookingMessage === "success" ? (
              <Button variant="primary" onClick={goToProfile}>
                view booking
              </Button>
            ) : bookingMessage === "error" ? (
              <Button variant="danger" onClick={handleBookingConfirmation}>
                Try Again
              </Button>
            ) : (
              <Button variant="primary" onClick={handleBookingConfirmation}>
                Confirm Booking
              </Button>
            )}
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

VenueConfirmationModal.propTypes = {
  showModal: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleBookingConfirmation: PropTypes.func,
  selectedDates: PropTypes.array,
  guests: PropTypes.number,
  data: PropTypes.object,
  resetBookingForm: PropTypes.func,
  user: PropTypes.object,
};

export default VenueConfirmationModal;
