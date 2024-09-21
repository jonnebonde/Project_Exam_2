import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function NavbarNotLoggedIn() {
  return (
    <Nav>
      <Link to="/Login" className="nav-link-login">
        Login
      </Link>
      <Link to="/Register" className="nav-link-register">
        Register
      </Link>
    </Nav>
  );
}

export default NavbarNotLoggedIn;
