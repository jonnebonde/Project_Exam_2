import { Modal, Button, Image, Form, Alert } from "react-bootstrap";
import propTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useMutationDataAuth from "../../../Hooks/Api/Auth/PostPutDelete";
import { base_Url } from "../../../Constants/API";
import { globalStates } from "../../../Hooks/GlobalStates";

// Set up a PUT request and handle response

const schema = yup
  .object({
    avatarUrl: yup.string().url("Must be a valid URL").required(),
    avatarAlt: yup.string().optional(),
    bio: yup.string().optional(),
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

  console.log(status);
  console.log(user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatarUrl: user?.avatar?.url || "",
      avatarAlt: user?.avatar?.alt || "",
      bio: user?.bio || "",
      venueManager: user?.venueManager || false,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    console.log(formData);
    putUserData.mutate(formData); // Perform form submission actions here
  };

  useEffect(() => {
    if (status === "success") {
      console.log("Data successfully submitted");
      updateUser({
        avatar: {
          url: user.avatar.url,
          alt: user.avatar.url,
        },
        bio: user.bio,
        venueManager: user.venueManager,
      });

      setTimeout(() => {
        reset();
        setShowModal(false);
      }, 2000);
    }
  }, [status, reset, setShowModal, updateUser, user]);

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
          src={user?.avatar?.url}
          alt={user?.avatar?.alt}
          style={{
            width: "100px",
            maxHeight: "100px",
            height: "auto",
            objectFit: "cover",
          }}
        />
        <Form
          className="w-100 d-flex flex-column "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter an image URL"
              {...register("avatarUrl")}
              isInvalid={!!errors.avatarUrl}
            />
            {errors.avatarUrl && (
              <Form.Control.Feedback type="invalid">
                {errors.avatarUrl.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAltText">
            <Form.Label>Avatar alt text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the image"
              {...register("avatarAlt")}
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
              SomeThing went wrong
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
