import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavbarNotLoggedIn() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container className="navbar-container">
        <Link className="navbar-brand fs-2" to="/">
          Holidaze
        </Link>
        <Nav>
          <Link to="/Login" className="nav-link-login">
            Login
          </Link>
          <Link to="/Register" className="nav-link-register">
            Register
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarNotLoggedIn;
