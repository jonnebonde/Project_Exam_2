import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavbarNotLoggedIn from "./Navbar/NotLoggedIn";
import NavbarLoggedIn from "./Navbar/LoggedIn";
import { UserDataStore } from "../../../Hooks/GlobalStates/UserData";

function Header() {
  const user = UserDataStore((state) => state.user);

  return (
    <Navbar className="bg-body-tertiary">
      <Container className="navbar-container">
        <Link className="navbar-brand fs-2" to="/">
          Holidaze
        </Link>
        {user ? <NavbarLoggedIn /> : <NavbarNotLoggedIn />}
      </Container>
    </Navbar>
  );
}

export default Header;
