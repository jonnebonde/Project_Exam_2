import PropTypes from "prop-types";

function HeadLine(props) {
  const Tag = `h${Math.min(Math.max(props.level, 1), 6)}`;
  return <Tag className={props.className}>{props.text}</Tag>;
}

HeadLine.propTypes = {
  level: PropTypes.number.isRequired, // Heading level (1-6)
  className: PropTypes.string, // Custom CSS class names
  text: PropTypes.string.isRequired, // Heading text content
};

// Default props in case they're not provided

export default HeadLine;
