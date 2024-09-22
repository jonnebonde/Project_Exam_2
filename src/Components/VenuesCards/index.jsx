import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

// finne ut av å sentre cards på mobil størrelse

function VenueCards(data) {
  console.log(data);

  return (
    <Row xs={1} sm={2} md={3} lg={4} xxl={5} className="cards g-4">
      {data.data.map((venue) => (
        <Col key={venue.id} className="">
          <Link to={`/venue/${venue.id}`} className="venue-card">
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
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default VenueCards;
