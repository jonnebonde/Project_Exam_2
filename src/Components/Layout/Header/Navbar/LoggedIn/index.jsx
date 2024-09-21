import { Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { globalState } from "../../../../../Hooks/GlobalStates";

function NavbarLoggedIn() {
  const logout = globalState((state) => state.logout);
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    navigate("/");
  };

  return (
    <Nav>
      <Dropdown align="end">
        <Dropdown.Toggle
          id="dropdown-basic"
          as="div"
          className="profile-dropdown"
        >
          <img
            src="https://picsum.photos/200/300"
            alt="Profile"
            className="profile-image rounded-circle"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={logOut}>logout</Dropdown.Item>
          <Dropdown.Item>Another action</Dropdown.Item>
          <Dropdown.Item>Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}

export default NavbarLoggedIn;
