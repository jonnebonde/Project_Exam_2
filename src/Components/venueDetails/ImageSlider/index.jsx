import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
// sette opp en image slider fra bootstrap
function ImageSlider({ images }) {
  console.log(images);
  return (
    <>
      <Image
        src={
          images && images[0]?.url
            ? images[0]?.url
            : "https://via.placeholder.com/150"
        }
        alt={
          images && images[0]?.alt_text
            ? images[0]?.alt_text
            : "No alt text provided"
        }
      />
    </>
  );
}

ImageSlider.propTypes = {
  images: PropTypes.array,
};

export default ImageSlider;
