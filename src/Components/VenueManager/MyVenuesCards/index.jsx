import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { PropTypes } from "prop-types";

function MyVenuesCards({ venues, onEditVenue, onViewBookings }) {
  if (!venues || venues.length === 0) {
    return <Container className="text-center mt-5">No venues found.</Container>;
  }

  return (
    <Row xs={1} sm={2} md={2} lg={3} className="cards g-4 ">
      {venues?.map((userVenue, index) => {
        const venueId = userVenue.id || `temp-${index}`;

        return (
          <Col key={venueId} className="my-4 ">
            <Card className=" booking-card ">
              <Card.Img
                variant="top"
                src={userVenue.media[0]?.url || "path/to/placeholder-image.jpg"}
                alt={userVenue.media[0]?.alt_text || "No image available"}
              />
              <Card.Body className="flex flex-row">
                <Card.Title className="text-start">{userVenue.name}</Card.Title>
                <Card.Text className="text-truncate text-start">
                  {userVenue.location.city || userVenue.location.country
                    ? `${userVenue.location.city ? userVenue.location.city : ""}${userVenue.location.country ? `, ${userVenue.location.country}` : ""}`
                    : "Location not available "}
                </Card.Text>
                <Card.Text className="text-start">
                  Max guests: {userVenue.maxGuests}
                </Card.Text>
                <Card.Text className="text-start">
                  £{userVenue.price}/night
                </Card.Text>
              </Card.Body>
              <Button
                variant="primary"
                className="w-100 mb-4"
                onClick={() => onEditVenue(userVenue)}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                onClick={() => onViewBookings(userVenue)}
              >
                View Bookings
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

MyVenuesCards.propTypes = {
  venues: PropTypes.array,
  onEditVenue: PropTypes.func,
  onViewBookings: PropTypes.func,
};

export default MyVenuesCards;
