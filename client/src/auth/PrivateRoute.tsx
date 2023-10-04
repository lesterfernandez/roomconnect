import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const PrivateRoute = () => {
  const auth = useAuthStore(state => state.loggedIn);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
