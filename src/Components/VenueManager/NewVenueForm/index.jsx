import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
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
import { useState, useEffect } from "react";
import { isValidImageUrl } from "../../../Utilities/ValidateImage";

const schema = yup
  .object({
    name: yup
      .string()
      .max(30, "Name must be at most 30 characters")
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    description: yup
      .string()
      .max(200, "Description must be at most 200 characters")
      .min(15, "Description must be at least 15 characters")
      .required("Description is required"),
    price: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .max(18453, "Price is too high")
      .min(1, "Price is too low")
      .required("Price is required"),
    maxGuests: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .max(100, "Max Guests is too high")
      .min(1, "Max Guests is too low")
      .required("Max Guests is required"),
    location: yup.object({
      country: yup
        .string()
        .max(40, "Country must be at most 40 characters")
        .min(2, "Country must be at least 2 characters")
        .required("Country is required"),
      city: yup
        .string()
        .max(40, "City must be at most 40 characters")
        .min(2, "City must be at least 2 characters")
        .required("City is required"),
    }),
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
      .of(
        yup.object({
          url: yup
            .string()
            .url("Must be a valid URL")
            .required("Media URL is required")
            .test(
              "is-image-url",
              "The URL must point to an image",
              async (value) => await isValidImageUrl(value)
            ),
          alt: yup.string().optional(),
        })
      )
      .min(1, "At least one image is required.")
      .max(8, "You can add up to 8 images."),
  })
  .required();

function NewVenueForm({ showModal, setShowModal, venue }) {
  const [createEditStatus, setCreateEditStatus] = useState(null);
  const [imageInput, setImageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [newVenueId, setNewVenueId] = useState(null);

  const postNewVenue = useMutationDataAuth(
    base_Url + (venue ? `holidaze/venues/${venue.id}` : "holidaze/venues"),
    venue ? "PUT" : "POST"
  );

  const deleteVenueMutation = useMutationDataAuth(
    base_Url + `holidaze/venues/${venue?.id}`,
    "DELETE"
  );

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      maxGuests: "",
      location: {
        country: "",
        city: "",
      },
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
    setLoading(true);
    postNewVenue.mutate(data, {
      onSuccess: (responseData) => {
        setNewVenueId(responseData.data.id);
        setLoading(false);
        setCreateEditStatus("success");
      },
      onError: () => {
        setCreateEditStatus("error");
        setLoading(false);
      },
    });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  useEffect(() => {
    if (venue === null) {
      reset({
        name: "",
        description: "",
        price: "",
        maxGuests: "",
        location: {
          country: "",
          city: "",
        },
        meta: {
          wifi: false,
          breakfast: false,
          parking: false,
          pets: false,
        },
        media: [],
      });
    }
  }, [venue, reset]);

  useEffect(() => {
    if (venue !== null) {
      reset({
        name: venue.name || "",
        description: venue.description || "",
        price: venue.price || "",
        maxGuests: venue.maxGuests || "",
        location: venue.location || {
          country: venue.location?.country || "",
          city: venue.location?.city || "",
        },
        meta: venue.meta || {
          wifi: false,
          breakfast: false,
          parking: false,
          pets: false,
        },
        media: venue.media || [],
      });
    }
  }, [venue, reset]);

  const handleAddImage = async () => {
    const isValid = await isValidImageUrl(imageInput);

    if (!isValid) {
      setCreateEditStatus("invalid-image");
    } else if (fields.length >= 8) {
      setCreateEditStatus("limit");
    } else {
      append({ url: imageInput, alt: "Venue image" });
      setImageInput("");
      clearErrors("media");
      setCreateEditStatus(null);
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (confirmed) {
      deleteVenueMutation.mutate(null, {
        onSuccess: () => {
          setCreateEditStatus("deleted");
          setShowModal(false);
        },
        onError: () => {
          setCreateEditStatus("delete-error");
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    setCreateEditStatus(null);
    setShowModal(false);
    setImageInput("");
    setNewVenueId(null);
  };

  const visitNewVenue = () => {
    window.location.href = base_Url + `holidaze/venues/${newVenueId}`;
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      className="new-venue-modal-form"
    >
      <Modal.Header closeButton>
        <Modal.Title>{venue ? "Edit Venue" : "New Venue"}</Modal.Title>
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
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the venue"
              {...register("description")}
              isInvalid={errors.description}
            />
            {errors.description && (
              <Form.Control.Feedback type="invalid">
                {errors.description.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Price/Night</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price per night"
              inputMode="numeric"
              {...register("price")}
              isInvalid={errors.price}
            />
            {errors.price && (
              <Form.Control.Feedback type="invalid">
                {errors.price.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Max Guests</Form.Label>
            <Form.Control
              type="number"
              inputMode="numeric"
              placeholder="Max number of guests"
              {...register("maxGuests")}
              isInvalid={errors.maxGuests}
            />
            {errors.maxGuests && (
              <Form.Control.Feedback type="invalid">
                {errors.maxGuests.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the venue country"
              {...register("location.country")}
              isInvalid={!!errors.location?.country}
            />
            {errors.location?.country && (
              <Form.Control.Feedback type="invalid">
                {errors.location.country.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Venue City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the venue city"
              {...register("location.city")}
              isInvalid={!!errors.location?.city}
            />
            {errors.location?.city && (
              <Form.Control.Feedback type="invalid">
                {errors.location.city.message}
              </Form.Control.Feedback>
            )}
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
            {createEditStatus === "limit" && (
              <Alert variant="warning" className="w-100">
                You cannot add more than 8 images.
              </Alert>
            )}
            {createEditStatus === "no-images" && (
              <Alert variant="warning" className="w-100">
                Please add at least one image.
              </Alert>
            )}
            {createEditStatus === "invalid-image" && (
              <Alert variant="warning" className="w-100">
                The URL does not point to a valid image.
              </Alert>
            )}
            {createEditStatus === "limit" && (
              <Alert variant="warning" className="w-100">
                You cannot add more than 8 images.
              </Alert>
            )}
            <Row xs="auto" className="mb-5 mx-auto justify-content-center">
              {fields.map((image, index) => (
                <Col key={image.id} className="w-auto p-0 rounded-1 me-2 my-1">
                  <Card className="position-relative w-100 rounded-1 ">
                    <Card.Img
                      variant="top"
                      src={image.url}
                      alt={image.alt || "No alt text"}
                      className="d-block w-100 rounded-1"
                    />
                    <Card.ImgOverlay className="">
                      <Button
                        variant="danger"
                        size="xs"
                        className="position-absolute top-0 end-0"
                        onClick={() => remove(index)}
                      >
                        X
                      </Button>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          {createEditStatus === "success" ? (
            <>
              <Button variant="primary" onClick={visitNewVenue}>
                Visit New Venue
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              type="submit"
              disabled={loading || postNewVenue.status === "loading"}
            >
              {loading || postNewVenue.status === "loading"
                ? "Loading..."
                : "Submit"}
            </Button>
          )}

          {venue && createEditStatus !== "deleted" && (
            <Button
              variant="danger"
              className="mt-5 w-50 m-auto"
              onClick={handleDelete}
              disabled={deleteVenueMutation.status === "loading"}
            >
              {deleteVenueMutation.status === "loading"
                ? "Deleting..."
                : "Delete Venue"}
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

NewVenueForm.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  setShowModal: PropTypes.func,
  venue: PropTypes.object,
};

export default NewVenueForm;
