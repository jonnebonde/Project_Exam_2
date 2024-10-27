import { Modal, Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import formatDate from "../../../Utilities/DateFormat";
import calculateDaysBetween from "../../../Utilities/DateRange";

function MyVenuesBookings({ showModal, setShowModal, venueBookings }) {
  const handleClose = () => setShowModal(false);

  if (!venueBookings?.bookings?.length) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bookings for </Modal.Title>
        </Modal.Header>
        <Modal.Body>No bookings available for this venue.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Bookings for </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Guests</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {venueBookings?.bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.customer.name}</td>
                <td>{booking.guests}</td>
                <td>{formatDate(booking.dateFrom)}</td>
                <td>{formatDate(booking.dateTo)}</td>
                <td>
                  {calculateDaysBetween(booking.dateFrom, booking.dateTo)}
                </td>
                <td>
                  £
                  {venueBookings.price *
                    calculateDaysBetween(booking.dateFrom, booking.dateTo)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

MyVenuesBookings.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  venueBookings: PropTypes.object,
};

export default MyVenuesBookings;
