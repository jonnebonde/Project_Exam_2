import { Row, Col } from "react-bootstrap";
import HeadLine from "../../HeroSection/Headline";
import AmenitiesList from "../AmenitiesList";
import { propTypes } from "react-bootstrap/esm/Image";

function VenueDetails({ venue }) {
  return (
    <>
      <Row>
        <Col>
          <HeadLine
            level={1}
            className="text-black fw-semibold text-center mt-5 mb-2"
            text={venue?.data?.name}
          />
        </Col>
      </Row>
      <Row xs={1} sm={1} md={2}>
        <Col>
          <img
            src={
              venue?.data?.media && venue?.data?.media[0]?.url
                ? venue?.data?.media[0]?.url
                : "https://via.placeholder.com/150"
            }
            alt={
              venue?.data?.media && venue?.data?.media[0]?.alt_text
                ? venue?.data?.media[0]?.alt_text
                : "No alt text provided"
            }
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
        <Col>
          <p>{venue?.data?.description}</p>
          <HeadLine
            level={4}
            className="text-black fw-semibold"
            text="Amenities"
          />
          <AmenitiesList amenities={venue?.data?.meta} />
          <p>Max total guests: {venue?.data?.maxGuests}</p>
          <p>${venue?.data?.price}/night</p>
        </Col>
      </Row>
    </>
  );
}

VenueDetails.propTypes = {
  venue: propTypes.object,
};

export default VenueDetails;
