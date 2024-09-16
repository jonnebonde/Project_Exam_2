import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function VenueCards(data) {
  return (
    <Row sm={1} md={3} lg={4} xxl={5} className="cards g-4">
      {data.data.map((venue) => (
        <Col key={venue.id}>
          <Card className="venue-card" key={venue.id}>
            <Card.Img
              variant="top"
              src={
                venue.media && venue.media[0] && venue.media[0].url
                  ? venue.media[0].url
                  : "https://via.placeholder.com/150"
              }
            />
            <Card.Body>
              <Card.Title>{venue.name}</Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default VenueCards;
