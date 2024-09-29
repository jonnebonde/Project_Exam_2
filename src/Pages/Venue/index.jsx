import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { base_Url } from "../../Constants/API";
import useFetchData from "../../Hooks/Api/Get/NoAuth";
import { useParams } from "react-router-dom";
import HeadLine from "../../Components/HeroSection/Headline";

function VenuePage() {
  const { id } = useParams();

  const url = `${base_Url}holidaze/venues/${id}?_owner=true&_bookings=true`;

  const { isPending, error, data: venue } = useFetchData(url, "venue");

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(venue);

  return (
    <Container>
      <Row>
        <Col>
          <HeadLine
            level={1}
            className="text-black fw-semibold text-center m-5"
            text={venue.data.name}
          ></HeadLine>
        </Col>
      </Row>
      <Row xs={1} sm={1} md={2}>
        <Col>
          <img
            src={
              venue.data.media && venue.data.media[0] && venue.data.media[0].url
                ? venue.data.media[0].url
                : "https://via.placeholder.com/150"
            }
            alt={
              venue.data.media &&
              venue.data.media[0] &&
              venue.data.media[0].alt_text
                ? venue.data.media[0].alt_text
                : "No alt text provided"
            }
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
        <Col>
          <p>{venue.data.description}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <HeadLine
            level={5}
            className="text-black fw-semibold"
            text="Owner"
          ></HeadLine>
          <p>{venue.data.owner.name}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default VenuePage;
