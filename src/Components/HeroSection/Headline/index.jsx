import PropTypes from "prop-types";

function HeadLine(props) {
  const Tag = `h${Math.min(Math.max(props.level, 1), 6)}`;
  return <Tag className={props.className}>{props.text}</Tag>;
}

HeadLine.propTypes = {
  level: PropTypes.number.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default HeadLine;
