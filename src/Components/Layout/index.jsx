import { Link, Outlet } from "react-router-dom";
import Footer from "../Layout/Footer";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// kan putte en if på om brukeren er logget inn eller ikke og som admin eller ikke.
// Hvis man er logget inn, skal man ikke kunne logge inn og da forandre menyen deretter.
// bruke Nav klassen som dynamisk meny etter hva som er logget inn eller ikke.

function Header() {
  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Link className="navbar-brand fs-2" to="/">
          Holidaze
        </Link>
        <div className="col"></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="">
            <Link to="/Login" className="nav-link-login">
              Login
            </Link>
            <Link to="/Register" className="nav-link-register">
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Layout() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
