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
} from "@chakra-ui/react";
import { useState } from "react";
import { RegisterBody } from "../../types";
import { registerBodySchema } from "../../schemas";

const Register = () => {
  const [registerBody, setRegisterBody] = useState<RegisterBody>({
    username: "",
    password: "",
    displayName: "",
    budget: 1,
    gender: "",
    cleanliness: 1,
    loudness: 1,
    coed: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    const parsedRegisterBody = registerBodySchema.safeParse(registerBody);
    if (parsedRegisterBody.success) {
      alert(JSON.stringify(parsedRegisterBody.data));
    } else {
      alert("Invalid form.");
    }
  };

  return (
    <Box bg="#156087">
      <VStack maxW="2xl" textColor="white" padding="3rem" gap="4" marginInline="auto">
        <Heading textAlign="center">Create Account</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={registerBody.username}
            onChange={event => setRegisterBody({ ...registerBody, username: event.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={registerBody.password}
            onChange={event => setRegisterBody({ ...registerBody, password: event.target.value })}
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
          <FormLabel>Display Name</FormLabel>
          <Input
            type="text"
            value={registerBody.displayName}
            onChange={event =>
              setRegisterBody({ ...registerBody, displayName: event.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Budget</FormLabel>
          <ButtonGroup size="md" isAttached variant="outline" width="100%" display="flex">
            <Button
              onClick={() => setRegisterBody({ ...registerBody, budget: 1 })}
              isActive={registerBody.budget === 1}
              flexBasis="100%"
              textColor={registerBody.budget === 1 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              &lt;1000
            </Button>
            <Button
              onClick={() => setRegisterBody({ ...registerBody, budget: 2 })}
              isActive={registerBody.budget === 2}
              flexBasis="100%"
              textColor={registerBody.budget === 2 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              1000-2000
            </Button>
            <Button
              onClick={() => setRegisterBody({ ...registerBody, budget: 3 })}
              isActive={registerBody.budget === 3}
              flexBasis="100%"
              textColor={registerBody.budget === 3 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              2000+
            </Button>
          </ButtonGroup>
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
        <FormControl>
          <FormLabel>Cleanliness</FormLabel>
          <ButtonGroup size="md" isAttached variant="outline" width="100%" display="flex">
            <Button
              onClick={() => setRegisterBody({ ...registerBody, cleanliness: 1 })}
              isActive={registerBody.cleanliness === 1}
              flexBasis="100%"
              textColor={registerBody.cleanliness === 1 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Messy
            </Button>
            <Button
              onClick={() => setRegisterBody({ ...registerBody, cleanliness: 2 })}
              isActive={registerBody.cleanliness === 2}
              flexBasis="100%"
              textColor={registerBody.cleanliness === 2 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Average
            </Button>
            <Button
              onClick={() => setRegisterBody({ ...registerBody, cleanliness: 3 })}
              isActive={registerBody.cleanliness === 3}
              flexBasis="100%"
              textColor={registerBody.cleanliness === 3 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Mr. Clean
            </Button>
          </ButtonGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Loudness</FormLabel>
          <ButtonGroup size="md" isAttached variant="outline" width="100%" display="flex">
            <Button
              onClick={() => setRegisterBody({ ...registerBody, loudness: 1 })}
              isActive={registerBody.loudness === 1}
              flexBasis="100%"
              textColor={registerBody.loudness === 1 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Quiet
            </Button>
            <Button
              onClick={() => setRegisterBody({ ...registerBody, loudness: 2 })}
              isActive={registerBody.loudness === 2}
              flexBasis="100%"
              textColor={registerBody.loudness === 2 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Normal
            </Button>
            <Button
              onClick={() => setRegisterBody({ ...registerBody, loudness: 3 })}
              isActive={registerBody.loudness === 3}
              flexBasis="100%"
              textColor={registerBody.loudness === 3 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Party Animal
            </Button>
          </ButtonGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Co-Ed</FormLabel>
          <RadioGroup
            value={registerBody.coed ? "Yes" : "No"}
            onChange={value => setRegisterBody({ ...registerBody, coed: value === "Yes" })}
          >
            <Stack direction="row">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl display="flex" justifyContent="center">
          <Button colorScheme="orange" onClick={handleRegister}>
            Register
          </Button>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default Register;