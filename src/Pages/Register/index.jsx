import { Button, Form, Container } from "react-bootstrap";
import backgroundImage from "../../assets/Images/beach_with_sunset.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSubmitForm } from "../../Hooks/Api/NoAuth/Post/LoginRegisterForm";
import { base_Url } from "../../Constants/API";

// Define validation schema for registration
const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be at most 30 characters")
      .required("Please enter your name."),
    email: yup
      .string()
      .email("The email must be a valid email")
      .required("Please enter your email address."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Please enter your password."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password."),
    venueManager: yup.boolean().optional(),
  })
  .required();

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isError, status } = useSubmitForm();

  const onSubmit = (formData) => {
    const url = base_Url + "auth/register";
    mutate({ url, formData, isRegistration: true });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      fluid
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Form
        className="register-form bg-white p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="register-title mb-3 text-center">Register</h1>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register("name")}
            isInvalid={errors.name}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid">
              {errors.name.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
            isInvalid={errors.email}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
            isInvalid={errors.password}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            isInvalid={errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Set me as a venue manager"
            {...register("venueManager")}
          />
        </Form.Group>
        <Button
          type="submit"
          className="w-100 mt-3"
          disabled={status === "pending"}
        >
          {status === "pending" ? "Registering..." : "Register"}
        </Button>
        {isError && (
          <div className="text-danger mt-2">
            {"An error occurred, please try again."}
          </div>
        )}
        <div className="text-center mt-5">
          <p>Already have an account?</p>
          <Link to="/login" className="change-form-button m-auto">
            Login
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default RegisterPage;
