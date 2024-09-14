import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="venue" element={"Venue"} />
        <Route path="Register" element={"Register"} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="User" element={"User"} />
        <Route path="Venue_manager" element={"Venue manager"} />
      </Route>
    </Routes>
  );
}

export default App;
