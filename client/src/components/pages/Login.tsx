import { useProfileStore } from "../../store";

const Login = () => {
  const setProfile = useProfileStore(state => state.setProfile);
  const profileTest = useProfileStore(state => state.profilePic);

  const handleLogin = () => {
    setProfile({
      profilePic: "test",
      displayName: "test",
      budget: 1,
      gender: "hi",
      cleanliness: 1,
      loudness: 1,
      coed: false,
    });

    console.log(profileTest);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button>Change values</button>
    </div>
  );
};

export default Login;
