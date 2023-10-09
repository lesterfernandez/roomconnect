import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Select,
  Button,
  ButtonGroup,
  Heading,
  Box,
  VStack,
} 
from "@chakra-ui/react";
import { useState } from "react";
import { UserCredientials } from "../../types";
import { userCredentialsSchema } from "../../schemas";

type Action = { type: 'loginSuccess', payload: string }
| { type: 'loginFailed', payload: string };

const Login = () => {
  const [loginBody, setLoginBody] = useState<UserCredientials>({
    username: "",
    password: ""
  });

  const handleLogin = () => {
    const parsedLoginBody = userCredentialsSchema.safeParse(UserCredientials);
    if (!parsedLoginBody.success) {
      alert("Login import failed!");
      return;
    }
    if (loginBody.username == '' || loginBody.password !== '') {
      alert("Login failed!");
      return;
    }
    alert(JSON.stringify(parsedLoginBody.data));
  }

  return (
  
  );
};
export default Login;
