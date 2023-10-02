import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../../store";

const PrivateRoute = () => {
  const auth = useStore((state) => state.loggedIn);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
