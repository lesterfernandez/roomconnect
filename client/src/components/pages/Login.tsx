import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store";

const Login = () => {
  const login = useStore((state: any) => state.signIn);
  const navigate = useNavigate();

  const handleSubmit = () => {
    login("user", "pass");
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
