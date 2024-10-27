import { NavLink, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function NavbarNotLoggedIn() {
  const location = useLocation();
  return (
    <Nav activeKey={location.pathname}>
      <NavLink to="/Login" className="nav-link-login rounded-1">
        Login
      </NavLink>
      <NavLink to="/Register" className="nav-link-register rounded-1">
        Register
      </NavLink>
    </Nav>
  );
}

export default NavbarNotLoggedIn;
