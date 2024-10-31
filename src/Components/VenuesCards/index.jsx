import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import placeHolder from "../../assets/Images/placeholder.jpg";

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
                    : placeHolder
                }
                alt={
                  venue.media && venue.media[0] && venue.media[0].alt_text
                    ? venue.media[0].alt_text
                    : "No alt text provided"
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeHolder;
                }}
              />
              <Card.Body>
                <Card.Title className="text-truncate text-capitalize">
                  {venue.name}
                </Card.Title>
                <Card.Text
                  className={`text-truncate ${!venue.location.city && !venue.location.country ? "empty-location" : ""}`}
                >
                  {venue.location.city || venue.location.country
                    ? `${venue.location.city ? venue.location.city : ""}${venue.location.country ? `, ${venue.location.country}` : ""}`
                    : ""}
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
