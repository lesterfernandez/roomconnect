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


const Login = () => {
  const [loginBody, setLoginBody] = useState<UserCredientials>({
    username: "",
    password: ""
  });
};
export default Login;
