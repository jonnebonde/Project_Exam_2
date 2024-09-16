import { Link, Outlet } from "react-router-dom";
import Footer from "../Layout/Footer";

// kan putte en if på om brukeren er logget inn eller ikke og som admin eller ikke.
// Hvis man er logget inn, skal man ikke kunne logge inn og da forandre menyen deretter.
// bruke Nav klassen som dynamisk meny etter hva som er logget inn eller ikke.

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
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
