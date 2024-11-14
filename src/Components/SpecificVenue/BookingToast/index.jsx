import PropTypes from "prop-types";
import { Toast, ToastContainer } from "react-bootstrap";
import dayjs from "dayjs";

function UpcomingBookingToast({ show, onClose, booking }) {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        show={show}
        onClose={onClose}
        animation={true}
        className="rounded-1"
      >
        <Toast.Header
          className="bg-primary text-white"
          closeLabel="Close booking reminder"
          closeVariant="white"
        >
          <strong className="me-auto">Upcoming Booking</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>
          Dont forget your upcoming booking at this venue from{" "}
          {dayjs(booking.dateFrom).format("DD/MM/YYYY")} to{" "}
          {dayjs(booking.dateTo).format("DD/MM/YYYY")}.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

UpcomingBookingToast.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpcomingBookingToast;
