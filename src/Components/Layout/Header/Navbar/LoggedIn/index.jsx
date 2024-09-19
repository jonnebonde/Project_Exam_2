import { Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

function NavbarLoggedIn() {
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
          <Dropdown.Item href="#action/1">Action</Dropdown.Item>
          <Dropdown.Item href="#action/2">Another action</Dropdown.Item>
          <Dropdown.Item href="#action/3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}

export default NavbarLoggedIn;
