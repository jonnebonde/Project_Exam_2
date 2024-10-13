import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import VenuePage from "./Pages/Venue";
import UserPage from "./Pages/User";
import VenueManagerPage from "./Pages/VenueManager";
import { ProtectedRoute } from "./Utilities/Routes/ProtectedRoutes";
import { PublicRoute } from "./Utilities/Routes/PublicRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Public route for venue pages */}
        <Route path="venue/:id" element={<VenuePage />} />

        {/* Prevent logged-in users from accessing Register and Login pages */}
        <Route
          path="register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Protected route for user profile page (requires authentication) */}
        <Route
          path="user/:name"
          element={
            <ProtectedRoute isAuthRequired={true}>
              <UserPage />
            </ProtectedRoute>
          }
        />

        {/* Protected route for venue manager page (requires authentication and venue manager role) */}
        <Route
          path="venue-manager/:name"
          element={
            <ProtectedRoute isAuthRequired={true} isVenueManagerRequired={true}>
              <VenueManagerPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
