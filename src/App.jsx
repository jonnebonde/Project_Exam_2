import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import VenuePage from "./Pages/Venue";
import UserPage from "./Pages/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="venue/:id" element={<VenuePage />} />{" "}
        <Route path="Register" element={<RegisterPage />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="User" element={<UserPage />} />
        <Route path="Venue_manager" element={"Venue manager"} />
      </Route>
    </Routes>
  );
}

export default App;
