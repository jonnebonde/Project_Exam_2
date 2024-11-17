import { Button, Form } from "react-bootstrap";
import VenueBookingPicker from "../DatePicker";
import PropTypes from "prop-types";
import { useState } from "react";

function VenueBookingForm({
  venue,
  selectedDates,
  setSelectedDates,
  guests,
  handleGuestChange,
  onReserveClick,
}) {
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);

  const handleValidityChange = (isValid) => {
    setIsDateRangeValid(isValid);
  };

  return (
    <Form className="d-flex flex-column venue-booking-form">
      <VenueBookingPicker
        bookedDates={venue?.bookings}
        onDateChange={(dates) => setSelectedDates(dates)}
        value={selectedDates}
        onValidityChange={handleValidityChange}
      />
      <Form.Group controlId="guestInput">
        <Form.Label>Guests (Max: {venue?.maxGuests})</Form.Label>
        <Form.Control
          type="number"
          min={1}
          inputMode="numeric"
          value={guests || ""}
          onChange={handleGuestChange}
          placeholder="Number of guests"
          max={venue?.maxGuests}
        />
      </Form.Group>
      <Button
        variant="primary"
        className="mt-3"
        onClick={onReserveClick}
        disabled={
          !selectedDates[0] ||
          !selectedDates[1] ||
          guests < 1 ||
          guests > venue?.maxGuests ||
          !isDateRangeValid
        }
      >
        Reserve
      </Button>
    </Form>
  );
}

VenueBookingForm.propTypes = {
  venue: PropTypes.object,
  selectedDates: PropTypes.array,
  setSelectedDates: PropTypes.func,
  guests: PropTypes.number,
  handleGuestChange: PropTypes.func,
  onReserveClick: PropTypes.func,
};

export default VenueBookingForm;
