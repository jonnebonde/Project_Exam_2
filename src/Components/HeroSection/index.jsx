import Container from "react-bootstrap/Container";
import heroImage from "../../assets/Images/hero_section.jpg";
import PropTypes from "prop-types";
import Headline from "../HeroSection/Headline";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function HeroSection({ search, resetSearch, handleSearchFieldChange }) {
  return (
    <Container
      className="search-bar-container mb-3 d-flex justify-content-center align-items-center flex-column text-center"
      fluid
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <Headline level={1} className="text-white" text="Holidaze" />
      <Headline
        level={3}
        className="text-white"
        text="Find your Dream Venue."
      />

      <InputGroup className="rounded-1">
        {" "}
        <Form.Control
          type="text"
          placeholder="Search by venue name or location"
          value={search}
          onChange={handleSearchFieldChange}
        />
        <Button onClick={resetSearch}>Reset</Button>
      </InputGroup>
    </Container>
  );
}

HeroSection.propTypes = {
  search: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handleSearchFieldChange: PropTypes.func.isRequired,
};

export default HeroSection;
