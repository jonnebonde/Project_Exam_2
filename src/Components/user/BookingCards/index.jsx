import { Row, Col, Card } from "react-bootstrap";
import formatDate from "../../../Utilities/DateFormat/index";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import calculateDaysBetween from "../../../Utilities/DateRange";

function BookingCards({ booking }) {
  return (
    <Row xs={1} sm={2} md={2} lg={3} className="cards g-4">
      {booking?.map((bookingItem) => {
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
                src={bookingItem.venue.media[0].url}
                alt={bookingItem.venue.media[0].alt_text}
              />
              <Card.Body className="flex flex-row">
                <Card.Title>{bookingItem.venue.name}</Card.Title>

                <Card.Text className="text-truncate text-start">
                  {bookingItem.venue.location.city ||
                  bookingItem.venue.location.country
                    ? `${
                        bookingItem.venue.location.city
                          ? bookingItem.venue.location.city
                          : ""
                      }${
                        bookingItem.venue.location.country
                          ? `, ${bookingItem.venue.location.country}`
                          : ""
                      }`
                    : "Location not available"}
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
                <Link
                  className="btn btn-primary"
                  to={`/venue/${bookingItem.venue.id}`}
                  variant="primary"
                >
                  View
                </Link>
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
};

export default BookingCards;
