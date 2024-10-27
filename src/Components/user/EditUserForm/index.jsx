import { Modal, Button, Image, Form, Alert } from "react-bootstrap";
import propTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useMutationDataAuth from "../../../Hooks/Api/Auth/PostPutDelete";
import { base_Url } from "../../../Constants/API";
import { UserDataStore } from "../../../Hooks/GlobalStates/UserData";
import { useEffect, useState } from "react";
import { isValidImageUrl } from "../../../Utilities/ValidateImage";

// Function to validate if a URL is an image

const schema = yup
  .object({
    avatar: yup
      .object({
        url: yup
          .string()
          .url("Must be a valid URL")
          .required("Avatar URL is required")
          .test(
            "is-image-url",
            "The URL must point to an image",
            async (value) => {
              return await isValidImageUrl(value);
            }
          ),
        alt: yup.string().optional(),
      })
      .required(),
    venueManager: yup.boolean().optional(),
  })
  .required();

function EditUserFormModal({ user, showModal, setShowModal }) {
  const [alertStatus, setAlertStatus] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.avatar?.url || "");

  const putUserData = useMutationDataAuth(
    `${base_Url}holidaze/profiles/${user?.name}`,
    "PUT"
  );

  const updateUser = UserDataStore((state) => state.UpdateUser);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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

  useEffect(() => {
    if (watchAvatarUrl) {
      setPreviewImage(watchAvatarUrl);
      setValue("avatar.alt", "");
    }
  }, [watchAvatarUrl, setValue]);

  useEffect(() => {
    if (showModal) {
      reset({
        avatar: {
          url: user?.avatar?.url || "",
          alt: user?.avatar?.alt || "",
        },
        bio: user?.bio || "",
        venueManager: user?.venueManager || false,
      });

      setPreviewImage(user?.avatar?.url || "");
    }
  }, [showModal, user, reset]);

  const onSubmit = (formData) => {
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

        setAlertStatus("success");
        reset();
        setShowModal(false);
        setAlertStatus(null);
      },
      onError: () => {
        setAlertStatus("error");
      },
    });
  };

  const handleClose = () => {
    reset();
    setAlertStatus(null);
    setPreviewImage(user?.avatar?.url || "");
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose} className="rounded-1">
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <Image
          src={previewImage || "https://via.placeholder.com/100"}
          alt={user?.avatar?.alt || "Preview image"}
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
                {errors.avatar?.url.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAltText">
            <Form.Label>Avatar Alt Text - Optional</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the image"
              {...register("avatar.alt")}
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
          {alertStatus === "success" && (
            <Alert variant="success" className="w-100">
              Profile updated
            </Alert>
          )}
          {alertStatus === "error" && (
            <Alert variant="danger" className="w-100">
              Something went wrong
            </Alert>
          )}
          <Button
            variant="primary"
            type="submit"
            disabled={putUserData.status === "pending" || !watchAvatarUrl}
          >
            {putUserData.status === "pending"
              ? "Updating..."
              : "Update profile"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

EditUserFormModal.propTypes = {
  user: propTypes.object,
  showModal: propTypes.bool,
  setShowModal: propTypes.func,
};

export default EditUserFormModal;
