import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  ButtonGroup,
  Button,
  Select,
  Avatar,
  RadioGroup,
  Radio,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { UserProfile } from "../types";
import { userProfileSchema } from "../schemas";
import { useProfileStore } from "../store";

export default function EditProfile() {
  const user = useProfileStore();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    ...user,
  });
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = async () => {
    const parsedUserProfile = userProfileSchema.safeParse(userProfile);
    if (!parsedUserProfile.success) {
      setError("Invalid form.");
      return;
    }
  };

  return (
    <Box bg="#156087" display="flex" minH="100vh">
      <VStack w="md" maxW="2xl" textColor="white" padding="3rem" gap="5" m="auto">
        <Avatar size="2xl" src={userProfile.profilePic} />
        <FormControl>
          <FormLabel>Profile Picture URL</FormLabel>
          <Input
            type="text"
            value={userProfile.profilePic}
            onChange={event => setUserProfile({ ...userProfile, profilePic: event.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input
            type="text"
            value={userProfile.displayName}
            onChange={event => setUserProfile({ ...userProfile, displayName: event.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Budget</FormLabel>
          <ButtonGroup size="md" isAttached variant="outline" width="100%" display="flex">
            <Button
              onClick={() => setUserProfile({ ...userProfile, budget: 1 })}
              isActive={userProfile.budget === 1}
              flexBasis="100%"
              textColor={userProfile.budget === 1 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              &lt;1000
            </Button>
            <Button
              onClick={() => setUserProfile({ ...userProfile, budget: 2 })}
              isActive={userProfile.budget === 2}
              flexBasis="100%"
              textColor={userProfile.budget === 2 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              1000-2000
            </Button>
            <Button
              onClick={() => setUserProfile({ ...userProfile, budget: 3 })}
              isActive={userProfile.budget === 3}
              flexBasis="100%"
              textColor={userProfile.budget === 3 ? "black" : "white"}
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
            value={userProfile.gender}
            onChange={event => setUserProfile({ ...userProfile, gender: event.target.value })}
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
              onClick={() => setUserProfile({ ...userProfile, cleanliness: 1 })}
              isActive={userProfile.cleanliness === 1}
              flexBasis="100%"
              textColor={userProfile.cleanliness === 1 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Messy
            </Button>
            <Button
              onClick={() => setUserProfile({ ...userProfile, cleanliness: 2 })}
              isActive={userProfile.cleanliness === 2}
              flexBasis="100%"
              textColor={userProfile.cleanliness === 2 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Average
            </Button>
            <Button
              onClick={() => setUserProfile({ ...userProfile, cleanliness: 3 })}
              isActive={userProfile.cleanliness === 3}
              flexBasis="100%"
              textColor={userProfile.cleanliness === 3 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Clean Freak
            </Button>
          </ButtonGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Loudness</FormLabel>
          <ButtonGroup size="md" isAttached variant="outline" width="100%" display="flex">
            <Button
              onClick={() => setUserProfile({ ...userProfile, loudness: 1 })}
              isActive={userProfile.loudness === 1}
              flexBasis="100%"
              textColor={userProfile.loudness === 1 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Quiet
            </Button>
            <Button
              onClick={() => setUserProfile({ ...userProfile, loudness: 2 })}
              isActive={userProfile.loudness === 2}
              flexBasis="100%"
              textColor={userProfile.loudness === 2 ? "black" : "white"}
              _hover={{
                textColor: "black",
                background: "#e2e8f0",
              }}
            >
              Average
            </Button>
            <Button
              onClick={() => setUserProfile({ ...userProfile, loudness: 3 })}
              isActive={userProfile.loudness === 3}
              flexBasis="100%"
              textColor={userProfile.loudness === 3 ? "black" : "white"}
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
            value={userProfile.coed ? "Yes" : "No"}
            onChange={value => setUserProfile({ ...userProfile, coed: value === "Yes" })}
          >
            <Stack direction="row">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl display="flex" justifyContent="center">
          <Button
            isLoading={editLoading}
            colorScheme="orange"
            onClick={() => {
              setEditLoading(true);
              handleEdit().then(() => setEditLoading(false));
            }}
          >
            Save Profile
          </Button>
        </FormControl>
        <Box height="1rem">
          <Text textColor="red">{error}</Text>
        </Box>
      </VStack>
    </Box>
  );
}
