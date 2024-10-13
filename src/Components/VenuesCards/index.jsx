import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

// If time leftover make so that its showing 2 smaller venue cards on mobile view

function VenueCards(data) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} xxl={5} className="cards g-4">
      {data.data.map((venue) => (
        <Col key={venue.id} className="mb-4">
          <Card className="venue-card m-auto" key={venue.id}>
            <Link
              to={`/venue/${venue.id}`}
              className=" text-decoration-none link-dark "
            >
              <Card.Img
                variant="top"
                src={
                  venue.media && venue.media[0] && venue.media[0].url
                    ? venue.media[0].url
                    : "https://via.placeholder.com/150"
                }
                alt={
                  venue.media && venue.media[0] && venue.media[0].alt_text
                    ? venue.media[0].alt_text
                    : "No alt text provided"
                }
              />
              <Card.Body>
                <Card.Title className="text-truncate">{venue.name}</Card.Title>
                <Card.Text className="text-truncate">
                  {venue.location.city || venue.location.country
                    ? `${venue.location.city ? venue.location.city : ""}${venue.location.country ? `, ${venue.location.country}` : ""}`
                    : "Location not available "}
                </Card.Text>

                <Card.Text>£{venue.price}/night</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default VenueCards;
