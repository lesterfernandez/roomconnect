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
import { UserCredentials } from "../types";
import { userCredentialsSchema, tokenMessageSchema } from "../schemas";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setToken } from "../token";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const parsedUserCredentials = userCredentialsSchema.safeParse(userCredentials);
    if (!parsedUserCredentials.success) {
      setError("Please enter a username and password.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedUserCredentials.data),
      });

      if (response.status === 401) {
        setError("Invalid username or password.");
      }

      if (!response.ok) {
        setError("Server Error.");
        return;
      }

      const tokenMessage = await response.json();
      const parsedTokenMessage = tokenMessageSchema.safeParse(tokenMessage);
      if (!parsedTokenMessage.success) {
        setError("Server Error.");
        return;
      }

      setToken(parsedTokenMessage.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg="#156087" display="flex" minH="100vh">
      <VStack w="md" maxW="2xl" textColor="white" padding="3rem" gap="5" m="auto">
        <Heading textAlign="center">Login</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={userCredentials.username}
            onChange={event =>
              setUserCredentials({ ...userCredentials, username: event.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={userCredentials.password}
            onChange={event =>
              setUserCredentials({ ...userCredentials, password: event.target.value })
            }
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
