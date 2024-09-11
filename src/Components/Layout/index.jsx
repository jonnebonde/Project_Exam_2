import { Link, Outlet } from "react-router-dom";
import Footer from "../Layout/Footer";

function Header() {
  return (
    <nav className="flex w-full justify-between bg-bg_cards mb-1 py-2 px-4 ">
      <Link className="font-poppins font-bold text-2xl">Holidaze</Link>
      <div className="flex gap-4 font-roboto font-medium items-center">
        <Link>
          <button className="border-2 rounded border-primary text-primary px-3.5 py-0 hover:underline focus:underline active:underline">
            Login
          </button>
        </Link>
        <Link>
          <button className="border-2 rounded border-primary bg-primary px-1 text-secondary_bg_color hover:underline focus:underline active:underline">
            Register
          </button>
        </Link>
      </div>
    </nav>
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
