/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavbarNotLoggedIn from "./Navbar/NotLoggedIn";
import NavbarLoggedIn from "./Navbar/LoggedIn";

// kan putte en if på om brukeren er logget inn eller ikke og som admin eller ikke.
// Hvis man er logget inn, skal man ikke kunne logge inn og da forandre menyen deretter.
// bruke Nav klassen som dynamisk meny etter hva som er logget inn eller ikke.

function Header() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container className="navbar-container">
        <Link className="navbar-brand fs-2" to="/">
          Holidaze
        </Link>
        <NavbarNotLoggedIn />
        {/* <NavbarLoggedIn /> */}
      </Container>
    </Navbar>
  );
}

export default Header;
