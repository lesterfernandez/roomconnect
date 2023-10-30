import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Stack,
  Container,
} from "@chakra-ui/react";
import { type default as React, useState } from "react";
import type { UserCredentials } from "../../types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api";
import { userCredentialsSchema } from "../../schemas";
import { setToken } from "../../token";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const parsedUserCredentials = userCredentialsSchema.safeParse(userCredentials);
    if (!parsedUserCredentials.success) {
      setError("Please enter a username and password.");
      return;
    }

    setLoginLoading(true);
    signIn(userCredentials)
      .then(res => {
        setToken(res);
        navigate("/");
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoginLoading(false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });

  return (
    <Container h="100vh" maxW="container.md" centerContent justifyContent="center">
      <Stack
        my="2"
        px={{ base: "6", sm: "24", md: "32" }}
        py={{ base: "6", sm: "16", md: "24" }}
        gap="12"
        borderWidth="thin"
        borderColor="gray.200"
        shadow="md"
        rounded="xl"
        w="100%"
      >
        <Heading textAlign="center">Login to Roommate Finder</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input name="username" value={userCredentials.username} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={userCredentials.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <Stack>
          <Text textColor="red">{error}</Text>
          <Button fontSize="lg" colorScheme="orange" isLoading={loginLoading} onClick={handleLogin}>
            Login
          </Button>
          <Stack justifyContent="center" rowGap="0" direction={{ base: "column", sm: "row" }}>
            <Text>Don&apos;t have an account? </Text>
            <Link to="/register">
              <Text textDecoration="underline">Create an Account</Text>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
export default Login;
