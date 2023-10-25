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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../api";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
              handleLogin(userCredentials)
                .then(() => navigate("/"))
                .catch(error => {
                  setLoginLoading(false);
                  setError(error.message);
                });
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
