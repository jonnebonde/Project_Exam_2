import { Nav, Image, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserDataStore } from "../../../../../Hooks/GlobalStates/UserData";
import { useQueryClient } from "@tanstack/react-query";

function NavbarLoggedIn() {
  const logout = UserDataStore((state) => state.logout);
  const user = UserDataStore((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOut = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) {
      queryClient.clear();
      logout();
      navigate("/");
    }
  };

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
            <Dropdown.Item as={Link} to={`/venue-manager/${user.name}`}>
              My venues
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}

export default NavbarLoggedIn;
