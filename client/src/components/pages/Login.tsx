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
  async function callLogin(data: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      const result = await response.json();
      console.log(result.tokenMessage);
    } catch (error) {
      console.error(error);
    }
  }
  const [loginBody, setLoginBody] = useState<UserCredentials>({
    username: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const parsedLoginBody = userCredentialsSchema.safeParse(loginBody);
    if (!parsedLoginBody.success) {
      setError("Login import failed!");
      return;
    }
    if (loginBody.username == "" || loginBody.password == "") {
      setError("Please enter a username and password!");
      return;
    }
    callLogin(JSON.stringify(parsedLoginBody.data));
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
          <Button
            isLoading={loginLoading}
            colorScheme="orange"
            onClick={() => {
              setLoginLoading(true);
              handleLogin().then(() => setLoginLoading(false));
            }}
          >
            Login
          </Button>
        </FormControl>
        <Box height="1rem">
          <Text textColor="red">{error}</Text>
        </Box>
      </VStack>
    </Box>
  );
};
export default Login;
