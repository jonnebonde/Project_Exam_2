import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { PropTypes } from "prop-types";
import placeHolder from "../../../assets/Images/placeholder.jpg";

function MyVenuesCards({ venues, onEditVenue, onViewBookings }) {
  if (!venues || venues.length === 0) {
    return <Container className="text-center mt-5">No venues found.</Container>;
  }

  return (
    <Row xs={1} sm={1} md={2} lg={3} xl={4}>
      {venues?.map((userVenue) => {
        const { city, country } = userVenue.location;

        const imageSrc = userVenue?.media?.[0]?.url ?? placeHolder;
        const altText =
          userVenue?.media?.[0]?.alt_text ?? "No alt text provided";
        let locationText = "";

        if (city && country) {
          locationText = `${city}, ${country}`;
        } else if (city) {
          locationText = city;
        } else if (country) {
          locationText = country;
        }

        return (
          <Col key={userVenue.id} className="my-4">
            <Card className="booking-card m-auto ">
              <Card.Img
                variant="top"
                src={imageSrc}
                alt={altText}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeHolder;
                }}
              />
              <Card.Body className="flex flex-row">
                <Card.Title className="text-start">{userVenue.name}</Card.Title>
                <Card.Text className="text-truncate text-start">
                  {locationText}
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
                className="w-100 mb-4 rounded-0"
                onClick={() => onEditVenue(userVenue)}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                onClick={() => onViewBookings(userVenue)}
                className="w-100 rounded-bottom rounded-0"
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
