import NavbarNotLoggedIn from "./Navbar/NotLoggedIn";
import NavbarLoggedIn from "./Navbar/LoggedIn";

// kan putte en if på om brukeren er logget inn eller ikke og som admin eller ikke.
// Hvis man er logget inn, skal man ikke kunne logge inn og da forandre menyen deretter.
// bruke Nav klassen som dynamisk meny etter hva som er logget inn eller ikke.

function Header() {
  return (
    <header>
      <NavbarNotLoggedIn />
      <NavbarLoggedIn />
    </header>
  );
}

export default Header;
