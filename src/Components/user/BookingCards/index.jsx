import { Row, Col, Card, Button } from "react-bootstrap";
import formatDate from "../../../Utilities/DateFormat/index";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import calculateDaysBetween from "../../../Utilities/DateRange";
import placeHolder from "../../../assets/Images/placeholder.jpg";

function BookingCards({ booking, handleDelete }) {
  const sortedBooking = booking?.sort((a, b) => {
    return new Date(a.dateFrom) - new Date(b.dateFrom);
  });

  return (
    <Row xs={1} sm={2} md={2} lg={3} xl={4}>
      {sortedBooking?.map((bookingItem) => {
        const formattedDateFrom = formatDate(bookingItem?.dateFrom);
        const formattedDateTo = formatDate(bookingItem?.dateTo);

        const daysBetween = calculateDaysBetween(
          bookingItem?.dateFrom,
          bookingItem?.dateTo
        );

        return (
          <Col key={bookingItem.id} className="text-center my-4">
            <Card className="m-auto booking-card ">
              <Card.Img
                variant="top"
                src={
                  bookingItem.venue.media &&
                  bookingItem.venue.media[0] &&
                  bookingItem.venue.media[0].url
                    ? bookingItem.venue.media[0].url
                    : placeHolder
                }
                alt={
                  bookingItem.venue.media &&
                  bookingItem.venue.media[0] &&
                  bookingItem.venue.media[0].alt_text
                    ? bookingItem.venue.media[0].alt_text
                    : "No alt text provided"
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeHolder;
                }}
              />
              <Card.Body className="flex flex-row">
                <Card.Title className="text-truncate">
                  {bookingItem.venue.name}
                </Card.Title>

                <Card.Text
                  className={`text-truncate ${!bookingItem.venue.location.city && !bookingItem.venue.location.country ? "empty-location" : ""}`}
                >
                  {bookingItem.venue.location.city ||
                  bookingItem.venue.location.country
                    ? `${bookingItem.venue.location.city ? bookingItem.venue.location.city : ""}${bookingItem.venue.location.country ? `, ${bookingItem.venue.location.country}` : ""}`
                    : ""}
                </Card.Text>
                <Card.Text className="text-start">
                  Checkin: {formattedDateFrom}{" "}
                </Card.Text>
                <Card.Text className="text-start">
                  Checkout: {formattedDateTo}{" "}
                </Card.Text>
                <Card.Text className="text-start">
                  Total days: {daysBetween}
                </Card.Text>
                <Card.Text className="text-start">
                  Guests: {bookingItem.guests}
                </Card.Text>
                <Card.Text className="text-start">
                  Total price: £{bookingItem.venue.price * daysBetween}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  {" "}
                  <Link
                    className="btn btn-primary d-flex align-items-center justify-content-center w-50"
                    to={`/venue/${bookingItem.venue.id}`}
                    variant="primary"
                  >
                    View
                  </Link>
                  <Button
                    className="btn btn-secondary border-2 border-primary text-primary"
                    onClick={() => {
                      handleDelete(bookingItem.id);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

BookingCards.propTypes = {
  booking: PropTypes.array,
  handleDelete: PropTypes.func,
};

export default BookingCards;
