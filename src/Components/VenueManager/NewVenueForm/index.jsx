import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
  Image,
  InputGroup,
  Container,
  Card,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useMutationDataAuth from "../../../Hooks/Api/Auth/PostPutDelete";
import { base_Url } from "../../../Constants/API";
import { useVenueManagerStore } from "../../../Hooks/GlobalStates/VenueManagerVenues";
import { useState } from "react";
import { isValidImageUrl } from "../../../Utilities/ValidateImage";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required"),
    maxGuests: yup.number().required("Max Guests is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    meta: yup
      .object({
        wifi: yup.boolean().optional(),
        parking: yup.boolean().optional(),
        breakfast: yup.boolean().optional(),
        pets: yup.boolean().optional(),
      })
      .optional(),
    media: yup
      .array()
      .min(1, "At least one image is required.")
      .max(8, "You can add up to 8 images."), // No need to validate individual images here anymore
  })
  .required();

function NewVenueForm({ showModal, setShowModal }) {
  const [alertStatus, setAlertStatus] = useState(null);
  const [imageInput, setImageInput] = useState("");

  const postNewVenue = useMutationDataAuth(
    base_Url + "holidaze/venues",
    "POST"
  );
  const addNewVenue = useVenueManagerStore((state) => state.addVenue);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      maxGuests: "",
      country: "",
      city: "",
      meta: {
        wifi: false,
        breakfast: false,
        parking: false,
        pets: false,
      },
      media: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (data.media.length === 0) {
      setAlertStatus("no-images");
      return;
    }
    console.log("Submitting data:", data);

    postNewVenue.mutate(data, {
      onSuccess: () => {
        addNewVenue(data);
        setAlertStatus("success");
        handleClose();
      },
      onError: () => {
        setAlertStatus("error");
      },
    });
  };

  console.log(errors, "Errors");
  /*   const watchMediaUrl = watch("newImageUrl"); */

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media", // This corresponds to the media array in the form
  });

  const handleClose = () => {
    reset(); // Reset the form
    setAlertStatus(null);
    setShowModal(false); // Close the modal
    setImageInput(""); // Reset the image input field
  };

  // Function to handle adding new image URL
  const handleAddImage = async () => {
    const imageSchema = yup
      .string()
      .url("Must be a valid URL")
      .required("Media URL is required")
      .test(
        "is-image-url",
        "The URL must point to an image",
        async (value) => await isValidImageUrl(value)
      );

    try {
      // Validate the image input before adding
      await imageSchema.validate(imageInput);
      if (fields.length >= 8) {
        setAlertStatus("limit");
      } else {
        append({ url: imageInput, alt: "Venue image" });
        setImageInput(""); // Clear input field
        clearErrors("media"); // Clear previous media validation errors
      }
    } catch (error) {
      setError("media", { type: "manual", message: error.message });
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <Form
          className="w-100 d-flex flex-column venue-manager-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3" controlId="formBasicNameText">
            <Form.Label>Venue name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter an venue name"
              {...register("name")}
              isInvalid={errors.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the venue"
              {...register("description")}
              isInvalid={errors.description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Price/Night</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price per night"
              {...register("price")}
              isInvalid={errors.price}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Max Guests</Form.Label>
            <Form.Control
              type="number"
              placeholder="Max number of guests"
              {...register("maxGuests")}
              isInvalid={errors.maxGuests}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the venue country"
              {...register("country")}
              isInvalid={errors.country}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue city</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the venue city"
              {...register("city")}
              isInvalid={errors.city}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Wifi"
                {...register("meta.wifi")}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Parking"
                {...register("meta.parking")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Breakfast"
                {...register("meta.breakfast")}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Pets"
                {...register("meta.pets")}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Venue Image URL</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter an image URL"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                isInvalid={!!errors.media}
                disabled={fields.length >= 8}
              />
              <Button
                variant="primary"
                onClick={handleAddImage}
                disabled={fields.length >= 8}
              >
                Add Image
              </Button>
              {errors.media && (
                <Form.Control.Feedback type="invalid">
                  {errors.media.message}
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>

          <Container className="mt-4">
            <Row className="g-2" xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
              {fields.map((image, index) => (
                <Col key={image.id} className="mb-4">
                  <Card className="position-relative ">
                    <Image src={image.url} thumbnail />
                    <Button
                      variant="danger"
                      size="xs"
                      className="position-absolute top-0 end-0"
                      onClick={() => remove(index)} // Remove image
                    >
                      X
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>

          {alertStatus === "limit" && (
            <Alert variant="warning" className="w-100">
              You cannot add more than 8 images.
            </Alert>
          )}
          {alertStatus === "no-images" && (
            <Alert variant="warning" className="w-100">
              Please add at least one image.
            </Alert>
          )}

          {/* General Alert Messages */}
          {alertStatus === "success" && (
            <Alert variant="success" className="w-100">
              Venue successfully added.
            </Alert>
          )}
          {alertStatus === "error" && (
            <Alert variant="danger" className="w-100">
              Something went wrong while adding the venue.
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            disabled={postNewVenue.status === "loading"}
          >
            {postNewVenue.status === "loading" ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

// finne ut av hvorfor image url ikke trigger feilmelding eller submit button.

NewVenueForm.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  setShowModal: PropTypes.func,
};

export default NewVenueForm;
