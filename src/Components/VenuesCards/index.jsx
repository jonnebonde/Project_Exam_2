import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// finne ut av å sentre cards på mobil størrelse

function VenueCards(data) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} xxl={5} className="cards g-4">
      {data.data.map((venue) => (
        <Col key={venue.id} className="">
          <Card className="venue-card m-auto" key={venue.id}>
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
