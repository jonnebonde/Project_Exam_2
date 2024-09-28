import Container from "react-bootstrap/Container";
import heroImage from "../../assets/Images/hero_section.jpg";
import PropTypes from "prop-types";
import SearchVenues from "./SearchVenues";
import Headline from "../HeroSection/Headline";

function HeroSection({ search, resetSearch, handleSearchFieldChange }) {
  return (
    <Container
      className="search-bar-container mb-5 d-flex justify-content-center align-items-center flex-column text-center"
      fluid
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <Headline level={1} className="text-white" text="Holidaze" />
      <Headline
        level={5}
        className="text-white"
        text="Find your Dream Venue."
      />

      <SearchVenues
        search={search}
        resetSearch={resetSearch}
        handleSearchFieldChange={handleSearchFieldChange}
      />
    </Container>
  );
}

HeroSection.propTypes = {
  search: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handleSearchFieldChange: PropTypes.func.isRequired,
};

export default HeroSection;
