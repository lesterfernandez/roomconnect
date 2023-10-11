import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { UserCredentials } from "../../types";
import { userCredentialsSchema } from "../../schemas";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginBody, setLoginBody] = useState<UserCredentials>({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    const parsedLoginBody = userCredentialsSchema.safeParse(loginBody);
    if (!parsedLoginBody.success) {
      alert("Login import failed!");
      return;
    }
    if (loginBody.username == "" || loginBody.password == "") {
      alert("Please enter a username and password!");
      return;
    }
    alert(JSON.stringify(parsedLoginBody.data));
  };

  return (
    <Box bg="#156087" display="flex" minH="100vh">
      <VStack w="md" maxW="2xl" textColor="white" padding="3rem" gap="5" m="auto">
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
        <HStack>
          <Text>Don&apos;t have an account? </Text>
          <Link to="/register">
            <Text textDecoration="underline">Create Account</Text>
          </Link>
        </HStack>
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
