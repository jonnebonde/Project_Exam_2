import { Nav, Image, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserDataStore } from "../../../../../Hooks/GlobalStates/UserData";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmModal from "../../../../Shared/ConfirmModal";

function NavbarLoggedIn() {
  const logout = UserDataStore((state) => state.logout);
  const user = UserDataStore((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const logOut = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    logout();
    queryClient.invalidateQueries();
    navigate("/");
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <Nav>
      <Dropdown align="end">
        <span className="profile-name me-2 text-capitalize">{user.name}</span>
        <Dropdown.Toggle
          id="dropdown-basic"
          as="button"
          className="profile-dropdown rounded-1"
        >
          <Image
            src={user.avatar.url}
            alt={user.avatar.alt}
            className="profile-image rounded-1"
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
      <ConfirmModal
        show={showConfirmModal}
        onHide={handleCancel}
        onConfirm={handleConfirm}
        message="Are you sure you want to log out?"
      />
    </Nav>
  );
}

export default NavbarLoggedIn;
