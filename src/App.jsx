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
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="venue_manager" element={"Venue manager"} />
      </Route>
    </Routes>
  );
}

export default App;
