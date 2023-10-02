import { Navigate, Outlet } from "react-router-dom";
import { AuthData } from "./useAuth";

const PrivateRoute = () => {
  const auth = AuthData();
  return auth?.user.loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
