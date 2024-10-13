/* import { Button, Card, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";

function MyVenuesCards() {
  return (
    <Row xs={1} sm={2} md={2} lg={3} className="cards g-4">
      {venues?.map((userVenue) => {
        return (
          <Col key={userVenue.id} className="text-center my-4">
            <Card className="m-auto booking-card ">
              <Card.Img
                variant="top"
                src={userVenue.media[0].url}
                alt={userVenue.media[0].alt_text}
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
              <Button variant="primary" className="w-100">
                Edit
              </Button>
              <Button>View Bookings</Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

MyVenuesCards.propTypes = {
  venues: PropTypes.array,
};

export default MyVenuesCards; */
