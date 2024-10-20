import PropTypes from "prop-types";
import { Carousel, Image } from "react-bootstrap";
import { useState } from "react";
import placeHolder from "../../../assets/Images/placeholder.jpg";
// sette opp en image slider fra bootstrap
function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  if (images.length === 1) {
    return (
      <Image
        src={images[0].url || placeHolder}
        alt="Place holder"
        fluid
        className="d-block w-100"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeHolder;
        }}
      />
    );
  } else if (images.length === 0) {
    return (
      <Image
        src={placeHolder}
        alt="No images available"
        fluid
        className="d-block w-100"
      />
    );
  } else {
    return (
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        keyboard={true}
        touch={true}
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <Image
              className="d-block w-100"
              src={image.url || placeHolder}
              alt={image.alt || "no alt text provided"}
              fluid
            />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}

ImageSlider.propTypes = {
  images: PropTypes.array,
};

export default ImageSlider;
