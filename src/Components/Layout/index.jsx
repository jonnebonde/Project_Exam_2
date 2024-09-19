import { Outlet } from "react-router-dom";
import Footer from "../Layout/Footer";
import Header from "./Header";

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
