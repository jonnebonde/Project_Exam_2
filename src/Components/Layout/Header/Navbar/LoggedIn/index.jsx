import { Nav, Image, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { globalStates } from "../../../../../Hooks/GlobalStates";
import { useQueryClient } from "@tanstack/react-query";

function NavbarLoggedIn() {
  const logout = globalStates((state) => state.logout);
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
          <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}

export default NavbarLoggedIn;
