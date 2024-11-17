import PropTypes from "prop-types";
import { Carousel, Image, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import placeHolder from "../../../assets/Images/placeholder.jpg";
import { v4 as uuidv4 } from "uuid";

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const imagesWithIds = images.map((image) => ({
    ...image,
    id: uuidv4(),
  }));

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  let sliderContent;

  if (images.length === 1) {
    sliderContent = (
      <Image
        src={images[0].url || placeHolder}
        alt={images[0].alt || "Place holder"}
        fluid
        className="d-block w-100 rounded-1"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeHolder;
        }}
      />
    );
  } else if (images.length === 0) {
    sliderContent = (
      <Image
        src={placeHolder}
        alt="No images available"
        fluid
        className="d-block w-100 rounded-1"
      />
    );
  } else {
    sliderContent = (
      <>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={null}
          keyboard={true}
          touch={true}
        >
          {imagesWithIds.map((image) => (
            <Carousel.Item key={image.id}>
              <Image
                className="d-block w-100 rounded-1"
                src={image.url || placeHolder}
                alt={image.alt || "No alt text provided"}
                fluid
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <Row xs="auto" className="mt-3 ms-auto">
          {imagesWithIds.map((image, idx) => (
            <Col key={image.id} className="w-auto p-0 rounded-1">
              <Button
                variant="link"
                onClick={() => setIndex(idx)}
                className={`thumbnail-button rounded-1 ${idx === index ? "selected-thumbnail" : ""}`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={image.url || placeHolder}
                  alt={image.alt || "Thumbnail image"}
                  className="thumbnail-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeHolder;
                  }}
                />
              </Button>
            </Col>
          ))}
        </Row>
      </>
    );
  }

  return <>{sliderContent}</>;
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
};

export default ImageSlider;
