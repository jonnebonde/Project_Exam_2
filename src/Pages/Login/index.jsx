/* eslint-disable react/no-unescaped-entities */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import backgroundImage from "../../assets/Images/beach_with_sunset.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSubmitForm } from "../../Hooks/Api/NoAuth/Post/LoginRegisterForm";
import { base_Url } from "../../Constants/API";

const schema = yup
  .object({
    email: yup
      .string()
      .email("The email must be a valid email")
      .required("Please enter your email address."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Please enter your password."),
  })
  .required();

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isError, status } = useSubmitForm();

  const onSubmit = (formData) => {
    const url = base_Url + "auth/login";
    mutate({ url, formData, isRegistration: false });
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
        className="login-form bg-white p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="login-title mb-3 text-center">Login</h1>

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

        <Button
          type="submit"
          className="w-100 mt-3 login-form-submit-button"
          disabled={status === "pending"}
        >
          {status === "pending" ? "Logging in..." : "Login"}
        </Button>

        {isError && (
          <div className="text-danger mt-2">
            {"An error occurred, please try again"}
          </div>
        )}

        <div className="text-center mt-5 d-grid">
          <p>Don't have an account?</p>

          <Link to="/register" className="change-form-button m-auto">
            Register
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default LoginPage;
