import { Row, Col, Card } from "react-bootstrap";
import formatDate from "../../../Utilities/DateFormat/index";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

function BookingCards({ booking }) {
  return (
    <Row xs={1} sm={2} md={2} lg={3} className="cards g-4">
      {booking?.map((bookingItem) => {
        const formattedDateFrom = formatDate(bookingItem?.dateFrom);
        const formattedDateTo = formatDate(bookingItem?.dateTo);

        return (
          <Col key={bookingItem.id} className="text-center my-4">
            <Card className="m-auto">
              <Card.Img
                src={
                  bookingItem.venue.media[0]?.url ||
                  "https://via.placeholder.com/150"
                }
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
                  Check in: {formattedDateFrom}{" "}
                </Card.Text>
                <Card.Text className="text-start">
                  Check: {formattedDateTo}{" "}
                </Card.Text>
                <Card.Text className="text-start">
                  Guests: {bookingItem.guests}
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
