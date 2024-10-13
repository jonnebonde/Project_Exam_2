import { Navigate } from "react-router-dom";
import { UserDataStore } from "../../../Hooks/GlobalStates/UserData";
import PropTypes from "prop-types";

export const ProtectedRoute = ({
  children,
  isAuthRequired,
  isVenueManagerRequired,
}) => {
  const user = UserDataStore((state) => state.user);

  if (isAuthRequired && !user) {
    return <Navigate to="/login" />;
  }

  if (isVenueManagerRequired && user && !user.venueManager) {
    return <Navigate to={`/user/${user.name}`} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthRequired: PropTypes.bool.isRequired,
  isVenueManagerRequired: PropTypes.bool,
};
