import { Button, Form } from "react-bootstrap";
import VenueBookingPicker from "../DatePicker";
import propTypes from "prop-types";

function VenueBookingForm({
  venue,
  selectedDates,
  setSelectedDates,
  guests,
  handleGuestChange,
  onReserveClick,
}) {
  console.log(venue);

  return (
    <>
      <VenueBookingPicker
        bookedDates={venue?.bookings}
        onDateChange={(dates) => setSelectedDates(dates)}
        value={selectedDates}
      />
      {/* Guest Selection */}

      <Form.Group controlId="guestInput">
        <Form.Label>Guests (Max: {venue?.maxGuests})</Form.Label>
        <Form.Control
          type="number"
          value={guests}
          onChange={handleGuestChange}
          placeholder="Enter number of guests"
          max={venue?.maxGuests}
        />
      </Form.Group>
      {/* Reserve Button */}
      <Button
        variant="primary"
        className="mt-3"
        onClick={onReserveClick}
        disabled={
          !selectedDates[0] ||
          !selectedDates[1] ||
          guests < 1 ||
          guests > venue?.maxGuests
        }
      >
        Reserve
      </Button>
    </>
  );
}

VenueBookingForm.propTypes = {
  venue: propTypes.object,
  selectedDates: propTypes.array,
  setSelectedDates: propTypes.func,
  guests: propTypes.number,
  handleGuestChange: propTypes.func,
  onReserveClick: propTypes.func,
};

export default VenueBookingForm;
