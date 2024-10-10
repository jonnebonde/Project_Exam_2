import { Modal, Button, Image, Form, Alert } from "react-bootstrap";
import propTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useMutationDataAuth from "../../../Hooks/Api/Auth/PostPutDelete";
import { base_Url } from "../../../Constants/API";
import { globalStates } from "../../../Hooks/GlobalStates";

// Set up a PUT request and handle response

const schema = yup
  .object({
    bio: yup.string().optional(),
    avatar: yup
      .object({
        url: yup.string().url("Must be a valid URL").required(),
        alt: yup.string().optional(),
      })
      .required(),
    venueManager: yup.boolean().optional(),
  })
  .required();

function EditUserForm({ user, showModal, setShowModal }) {
  const putUserData = useMutationDataAuth(
    `${base_Url}holidaze/profiles/${user?.name}`,
    "PUT"
  );

  const { status } = putUserData;
  const updateUser = globalStates((state) => state.UpdateUser);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: {
        url: user?.avatar?.url || "",
        alt: user?.avatar?.alt || "",
      },
      bio: user?.bio || "",
      venueManager: user?.venueManager || false,
    },
    resolver: yupResolver(schema),
  });

  const watchAvatarUrl = watch("avatar.url");

  const onSubmit = (formData) => {
    console.log("Submitted data:", formData);
    putUserData.mutate(formData, {
      onSuccess: () => {
        updateUser({
          avatar: {
            url: formData.avatar.url,
            alt: formData.avatar.alt,
          },
          bio: formData.bio,
          venueManager: formData.venueManager,
        });
        setTimeout(() => {
          reset();
          setShowModal(false);
        }, 2000);
      },
    }); // Perform form submission actions here
  };

  // Close modal and reset form
  const handleClose = () => {
    setShowModal(false);
    reset();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <Image
          src={watchAvatarUrl}
          alt={user?.avatar?.alt}
          style={{
            width: "100px",
            maxHeight: "100px",
            height: "auto",
            objectFit: "cover",
          }}
        />
        <Form
          className="w-100 d-flex flex-column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter an image URL"
              {...register("avatar.url")}
              isInvalid={!!errors.avatar?.url}
            />
            {errors.avatar?.url && (
              <Form.Control.Feedback type="invalid">
                {errors.avatar.url.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAltText">
            <Form.Label>Avatar Alt Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the image"
              {...register("avatar.alt")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBioText">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Type your bio"
              {...register("bio")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Venue manager"
              defaultChecked={user?.venueManager}
              {...register("venueManager")}
            />
          </Form.Group>
          {status === "success" && (
            <Alert variant="success" className="w-100">
              Profile updated
            </Alert>
          )}
          {status === "error" && (
            <Alert variant="danger" className="w-100">
              Something went wrong
            </Alert>
          )}
          <Button
            variant="primary"
            type="submit"
            disabled={status === "pending"}
          >
            {status === "pending" ? "Updating..." : "Update profile"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

EditUserForm.propTypes = {
  user: propTypes.object,
  showModal: propTypes.bool,
  setShowModal: propTypes.func,
};

export default EditUserForm;
