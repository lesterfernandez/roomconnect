import { AuthData } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = AuthData();
  const navigate = useNavigate();

  const handleSubmit = () => {
    auth?.signIn("user", "pass");
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
