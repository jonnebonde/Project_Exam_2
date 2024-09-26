import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function VenueCards(data) {
  console.log(data.data);

  return (
    <Row xs={1} sm={2} md={3} lg={4} xxl={5} className="cards g-4">
      {data.data.map((venue) => (
        <Col key={venue.id} className="">
          <Link to={`/venue/${venue.id}`} className="venue-card">
            <Card claName="venue-card m-auto mb-4" key={venue.id}>
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
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>
                  {venue.location.city || venue.location.country
                    ? `${venue.location.city ? venue.location.city : ""}${
                        venue.location.country
                          ? `, ${venue.location.country}`
                          : ""
                      }`
                    : "Not available"}
                </Card.Text>
                <Card.Text>{venue.price}£ per night</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default VenueCards;
