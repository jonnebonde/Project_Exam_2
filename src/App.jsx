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
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./Pages/NotFound404";

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venue/:id" element={<VenuePage />} />
          <Route path="*" element={<NotFound />} />

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
          <Route
            path="user/:name"
            element={
              <ProtectedRoute isAuthRequired={true}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="venue-manager/:name"
            element={
              <ProtectedRoute
                isAuthRequired={true}
                isVenueManagerRequired={true}
              >
                <VenueManagerPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
