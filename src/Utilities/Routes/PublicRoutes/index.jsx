import { Navigate } from "react-router-dom";
import { UserDataStore } from "../../../Hooks/GlobalStates/UserData";
import PropTypes from "prop-types";

export const PublicRoute = ({ children }) => {
  const user = UserDataStore((state) => state.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
