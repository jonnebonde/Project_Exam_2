import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import placeHolder from "../../assets/Images/placeholder.jpg";

function VenueCards(data) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} xxl={5} className="cards g-4">
      {data.data.map((venue) => {
        const { city, country } = venue.location;

        const imageSrc = venue?.media?.[0]?.url ?? placeHolder;
        const altText = venue?.media?.[0]?.alt_text ?? "No alt text provided";
        let locationText = "";

        if (city && country) {
          locationText = `${city}, ${country}`;
        } else if (city) {
          locationText = city;
        } else if (country) {
          locationText = country;
        }

        return (
          <Col key={venue.id} className="mb-4">
            <Card className="venue-card m-auto" key={venue.id}>
              <Link
                to={`/venue/${venue.id}`}
                className=" text-decoration-none link-dark "
              >
                <Card.Img
                  variant="top"
                  src={imageSrc}
                  alt={altText}
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
                    {locationText}
                  </Card.Text>
                  <Card.Text>£{venue.price}/night</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default VenueCards;
