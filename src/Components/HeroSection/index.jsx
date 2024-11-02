import Container from "react-bootstrap/Container";
import heroImage from "../../assets/Images/hero_section.jpg";
import PropTypes from "prop-types";
import Headline from "../HeroSection/Headline";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { CloseButton } from "react-bootstrap";

function HeroSection({
  inputSearch,
  resetSearch,
  handleSearch,
  setInputSearch,
}) {
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
        <Form.Control
          className="border-end-0"
          type="text"
          placeholder="Search by venue name"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        {inputSearch && (
          <CloseButton
            onClick={resetSearch}
            className="border-top border-bottom p-0 px-3"
            aria-label="reset search"
            variant=""
            style={{ cursor: "pointer", height: "37.33px" }}
          />
        )}
        <Button onClick={handleSearch}>Search</Button>{" "}
      </InputGroup>
    </Container>
  );
}

HeroSection.propTypes = {
  inputSearch: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  setInputSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
};

export default HeroSection;
