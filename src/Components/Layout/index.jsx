import { Outlet } from "react-router-dom";
import Footer from "../Layout/Footer";

function Header() {
  return (
    <div>
      <h1>Holidaze</h1>
    </div>
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
