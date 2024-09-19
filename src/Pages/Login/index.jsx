import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import backgroundImage from "../../assets/Images/beach_with_sunset.jpg";
import { Link } from "react-router-dom";

//style form og fikse container width på mindre skjerm størrelse

function LoginPage() {
  return (
    <Container
      className="d-grid justify-content-center align-items-center"
      fluid
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Form className="login-form bg-white p-4">
        <h1 className="login-title mb-3 text-center">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button type="submit" className="w-100 mt-3 login-form-submit-button">
          Login
        </Button>
        <div className="text-center mt-5">
          <p>Already have an account?</p>
          <Link to="/register" className="nav-link-login">
            Register
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default LoginPage;
