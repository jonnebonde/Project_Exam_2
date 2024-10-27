import PropTypes from "prop-types";
import { Carousel, Image, Row, Col } from "react-bootstrap";
import { useState } from "react";
import placeHolder from "../../../assets/Images/placeholder.jpg";

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {images.length === 1 ? (
        <Image
          src={images[0].url || placeHolder}
          alt="Place holder"
          fluid
          className="d-block w-100 rounded-1"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeHolder;
          }}
        />
      ) : images.length === 0 ? (
        <Image
          src={placeHolder}
          alt="No images available"
          fluid
          className="d-block w-100 rounded-1"
        />
      ) : (
        <>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
            keyboard={true}
            touch={true}
          >
            {images.map((image, idx) => (
              <Carousel.Item key={idx}>
                <Image
                  className="d-block w-100 rounded-1"
                  src={image.url || placeHolder}
                  alt={image.alt || "No alt text provided"}
                  fluid
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Row xs="auto" className="thumbnail-row mt-3 ms-auto">
            {images.map((image, idx) => (
              <Col key={idx} className="w-auto p-0 rounded-1">
                <Image
                  src={image.url || placeHolder}
                  alt={image.alt || "Thumbnail image"}
                  className={`thumbnail-image rounded-1  ${idx === index ? "selected-thumbnail" : ""}`}
                  onClick={() => setIndex(idx)}
                  onKeyPress={(e) => e.key === "Enter" && setIndex(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View image ${idx + 1}`}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageSlider;
