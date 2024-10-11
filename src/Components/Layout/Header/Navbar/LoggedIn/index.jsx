import { Nav, Image } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { globalStates } from "../../../../../Hooks/GlobalStates";

function NavbarLoggedIn() {
  const logout = globalStates((state) => state.logout);
  const navigate = useNavigate();

  const logOut = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) {
      logout();
      navigate("/");
    }
  };

  const user = globalStates((state) => state.user);

  return (
    <Nav>
      <Dropdown align="end">
        <Dropdown.Toggle
          id="dropdown-basic"
          as="button"
          className="profile-dropdown"
        >
          <Image
            src={user.avatar.url}
            alt={user.avatar.alt}
            className="profile-image rounded-circle"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className="navbar-dropdown-menu text-align-start">
          <Dropdown.Item as={Link} to={`/user/${user.name}`}>
            My profile
          </Dropdown.Item>
          {user.venueManager && (
            <Dropdown.Item href="/venue_manager">My venues</Dropdown.Item>
          )}
          <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}

export default NavbarLoggedIn;
