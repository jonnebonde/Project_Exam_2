import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function NewVenueForm({ showModal, setShowModal }) {
  const handleClose = () => setShowModal(false);
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <Form className="w-100 d-flex flex-column">
          <Form.Group className="mb-3" controlId="formBasicNameText">
            <Form.Label>Venue name</Form.Label>
            <Form.Control type="text" placeholder="Enter an venue name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue description</Form.Label>
            <Form.Control type="text" placeholder="Describe the venue" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Price/Night</Form.Label>
            <Form.Control type="number" placeholder="Price per night" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Max Guests</Form.Label>
            <Form.Control type="number" placeholder="Max number of guests" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue Country</Form.Label>
            <Form.Control type="text" placeholder="Enter the venue country" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue city</Form.Label>
            <Form.Control type="text" placeholder="Enter the venue city" />
          </Form.Group>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Wifi" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Parking" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Breakfast" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Pets" />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

NewVenueForm.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  setShowModal: PropTypes.func,
};

export default NewVenueForm;
