import { Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

function SearchVenues({ search, resetSearch, handleSearchFieldChange }) {
  return (
    <InputGroup>
      {" "}
      <Form.Control
        type="text"
        placeholder="Search by venue name or location"
        value={search}
        onChange={handleSearchFieldChange}
      />
      <Button onClick={resetSearch}>Reset</Button>
    </InputGroup>
  );
}

SearchVenues.propTypes = {
  search: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handleSearchFieldChange: PropTypes.func.isRequired,
};

export default SearchVenues;
