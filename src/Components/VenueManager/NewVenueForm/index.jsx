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
import { Link } from "react-router-dom";
import ConfirmModal from "../../Shared/ConfirmModal";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";

// I used DND for drag and drop functionality with some help from chatGPT to get it working.

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
          lat: venue.location?.lat || "",
          lng: venue.location?.lng || "",
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

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "media",
  });

  const [mediaItems, setMediaItems] = useState(fields.map((field) => field.id));

  useEffect(() => {
    setMediaItems(fields.map((field) => field.id));
  }, [fields]);

  const handleAddImage = async () => {
    const isValid = await isValidImageUrl(imageInput);

    if (!isValid) {
      setCreateEditStatus("invalid-image");
    } else if (fields.length >= 8) {
      setCreateEditStatus("limit");
    } else {
      append({ id: uuidv4(), url: imageInput, alt: "Venue image" });
      setImageInput("");
      clearErrors("media");
      setCreateEditStatus(null);
    }
  };

  const handleDelete = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    deleteVenueMutation.mutate(null, {
      onSuccess: () => {
        setCreateEditStatus("deleted");
        setShowModal(false);
      },
      onError: () => {
        setCreateEditStatus("delete-error");
      },
    });
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleClose = () => {
    reset();
    setCreateEditStatus(null);
    setShowModal(false);
    setImageInput("");
    setNewVenueId(null);
    setShowConfirmModal(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over.id);

      move(oldIndex, newIndex);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      className={`new-venue-modal-form ${showConfirmModal === true ? "darken" : ""}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>{venue ? "Edit Venue" : "New Venue"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <Form
          className="w-100 d-flex flex-column venue-manager-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3" controlId="formBasicVenueName">
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
          <Form.Group className="mb-3" controlId="formBasicVenueDescription">
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
          <Form.Group className="mb-3" controlId="formBasicVenuePrice">
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
          <Form.Group className="mb-3" controlId="formBasicMaxGuests">
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
          <Form.Group className="mb-3" controlId="formBasicCountry">
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

          <Form.Group className="mb-3" controlId="formBasicCity">
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
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formBasicCheckboxWifi"
            >
              <Form.Check
                type="checkbox"
                label="Wifi"
                {...register("meta.wifi")}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formBasicCheckboxParking"
            >
              <Form.Check
                type="checkbox"
                label="Parking"
                {...register("meta.parking")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formBasicCheckboxBreakfast"
            >
              <Form.Check
                type="checkbox"
                label="Breakfast"
                {...register("meta.breakfast")}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formBasicCheckboxPets"
            >
              <Form.Check
                type="checkbox"
                label="Pets"
                {...register("meta.pets")}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicVenueImage">
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
                {fields.length <= 0 ? "Add an image" : "Add image"}
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

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToParentElement]}
            >
              <small className="text-muted">
                Drag and drop to reorder images
              </small>
              <SortableContext
                items={mediaItems}
                strategy={rectSortingStrategy}
              >
                <Row xs="auto" className="mb-5 mx-auto justify-content-center">
                  {fields.map((image, index) => (
                    <SortableItem
                      key={image.id}
                      id={image.id}
                      index={index}
                      image={image}
                      remove={remove}
                    />
                  ))}
                </Row>
              </SortableContext>
            </DndContext>
          </Container>
          {createEditStatus === "success" ? (
            <>
              <Button
                variant="primary"
                type="submit"
                disabled={loading || postNewVenue.status === "loading"}
              >
                {loading || postNewVenue.status === "loading"
                  ? "Loading..."
                  : "Submit"}
              </Button>

              <Button
                variant="secondary"
                onClick={handleClose}
                className="my-2 w-25 m-auto"
              >
                Close
              </Button>
              <Button variant="primary" as={Link} to={`/venue/${newVenueId}`}>
                Visit New Venue
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
              className="mt-5 w-50 m-auto text-white"
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
      <ConfirmModal
        show={showConfirmModal}
        onConfirm={handleConfirm}
        onHide={handleCancel}
        message="Are you sure you want to delete this venue?"
      />
    </Modal>
  );
}

function SortableItem({ id, index, image, remove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : "auto",
  };

  return (
    <Col
      ref={setNodeRef}
      style={style}
      className="w-auto p-0 rounded-1 me-2 my-1 draggable-item"
    >
      <div {...attributes} {...listeners}>
        <Card className="position-relative w-100 rounded-1">
          <Card.Img
            variant="top"
            src={image.url}
            alt={image.alt || "No alt text"}
            className="d-block w-100 rounded-1"
          />
          <Card.ImgOverlay>
            <Button
              variant="danger"
              size="xs"
              className="position-absolute top-0 end-0 text-white"
              onClick={(e) => {
                e.stopPropagation();
                remove(index);
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              X
            </Button>
          </Card.ImgOverlay>
        </Card>
      </div>
    </Col>
  );
}

NewVenueForm.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  setShowModal: PropTypes.func,
  venue: PropTypes.object,
};

SortableItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default NewVenueForm;
