import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";
import { type default as React, useState } from "react";
import type { RegisterBody } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { registerBodySchema } from "../../schemas";
import { setToken } from "../../token";
import SegmentedControl from "../ui/SegmentedControl";

const Register = () => {
  const [registerBody, setRegisterBody] = useState<RegisterBody>({
    username: "",
    password: "",
    displayName: "",
    budget: 0,
    gender: "",
    cleanliness: 0,
    loudness: 0,
    coed: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const parsedRegisterBody = registerBodySchema.safeParse(registerBody);

    if (!parsedRegisterBody.success) {
      setError("Invalid form");
      return;
    }

    if (registerBody.password !== confirmPassword) {
      setError("The passwords you entered do not match");
      return;
    }

    setRegisterLoading(true);
    registerUser(registerBody)
      .then(res => {
        setToken(res);
        navigate("/");
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setRegisterLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterBody({ ...registerBody, [e.target.name]: e.target.value });

  return (
    <Container minH="100vh" maxW="container.lg">
      <Stack
        px={{ base: "4", md: "24" }}
        py={{ base: "4", md: "16" }}
        my="10"
        gap="12"
        borderWidth="thin"
        borderColor="gray.200"
        shadow="md"
        rounded="xl"
        w="100%"
      >
        <VStack gap="2">
          <Heading textAlign="center">Create an Account</Heading>
          <Text fontSize="sm">
            Your lifestyle information will be used to match you with compatible roommates
          </Text>
        </VStack>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input name="username" value={registerBody.username} onChange={handleInputChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input name="displayName" value={registerBody.displayName} onChange={handleInputChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={registerBody.password}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Re-type Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            value={registerBody.gender}
            onChange={event => setRegisterBody({ ...registerBody, gender: event.target.value })}
          >
            <option value="" disabled />
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer Not To Say">Prefer Not To Say</option>
          </Select>
        </FormControl>

        <SegmentedControl
          controlLabel="Budget"
          labels={["<1000", "1000-2000", "2000+"]}
          activeIndex={registerBody.budget - 1}
          onChange={i =>
            setRegisterBody({ ...registerBody, budget: (i + 1) as RegisterBody["budget"] })
          }
        />

        <SegmentedControl
          controlLabel="Cleanliness"
          labels={["Messy", "Average", "Super Clean"]}
          activeIndex={registerBody.cleanliness - 1}
          onChange={i =>
            setRegisterBody({
              ...registerBody,
              cleanliness: (i + 1) as RegisterBody["cleanliness"],
            })
          }
        />

        <SegmentedControl
          controlLabel="Loudness"
          labels={["Quiet", "Average", "Party Animal"]}
          activeIndex={registerBody.loudness - 1}
          onChange={i =>
            setRegisterBody({ ...registerBody, loudness: (i + 1) as RegisterBody["loudness"] })
          }
        />

        <FormControl>
          <FormLabel>Co-Ed</FormLabel>
          <RadioGroup
            value={registerBody.coed ? "Yes" : "No"}
            onChange={value => setRegisterBody({ ...registerBody, coed: value === "Yes" })}
          >
            <HStack>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <Stack>
          <Button isLoading={registerLoading} colorScheme="orange" onClick={handleRegister}>
            Register
          </Button>
          <HStack>
            <Text>Already have an account? </Text>
            <Link to="/login">
              <Text textDecoration="underline">Login</Text>
            </Link>
          </HStack>
        </Stack>
        <Text textColor="red">{error}</Text>
      </Stack>
    </Container>
  );
};

export default Register;
