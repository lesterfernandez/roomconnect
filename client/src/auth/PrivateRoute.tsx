import { AuthData } from './useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = AuthData();
    return auth?.user.loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;