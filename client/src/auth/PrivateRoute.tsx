import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../../store";

const PrivateRoute = () => {
  const auth = useStore((state: any) => state.loggedIn);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
