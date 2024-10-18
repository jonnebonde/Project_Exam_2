import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function VenueConfirmationMOdal({
  showModal,
  handleCancel,
  handleBookingConfirmation,
  selectedDates,
  guests,
}) {
  return (
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
  );
}

VenueConfirmationMOdal.propTypes = {
  showModal: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleBookingConfirmation: PropTypes.func,
  selectedDates: PropTypes.array,
  guests: PropTypes.number,
};

export default VenueConfirmationMOdal;
