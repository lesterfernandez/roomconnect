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

  const handleLogin = () => {
    const parsedLoginBody = userCredentialsSchema.safeParse(UserCredientials);
    if (!parsedLoginBody.success) {
      alert("Login import failed!");
      return;
    }
    if (loginBody.username == '' || loginBody.password == '') {
      alert("Please enter a username and password!");
      return;
    }
    alert(JSON.stringify(parsedLoginBody.data));
  }

  return (
    <Box bg="#156087">
      <VStack maxW="2xl" textColor="white" padding="3rem" gap="4" marginInline="auto">
        <Heading textAlign="center">Login</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={loginBody.username}
            onChange={event => setLoginBody({ ...loginBody, username: event.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={loginBody.password}
            onChange={event => setLoginBody({ ...loginBody, password: event.target.value })}
          />
        </FormControl>
        <FormControl display="flex" justifyContent="center">
          <Button colorScheme="orange" onClick={handleLogin}>
            Login
          </Button>
        </FormControl>
      </VStack>
    </Box>
  );
};
export default Login;
