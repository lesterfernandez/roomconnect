import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Avatar,
  RadioGroup,
  Radio,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";
import type { UserProfile } from "../types";
import { userProfileSchema } from "../schemas";
import { useProfileStore } from "../store";
import SegmentedControl from "./ui/SegmentedControl";

export default function EditProfile() {
  const user = useProfileStore();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    ...user,
  });
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const parsedUserProfile = userProfileSchema.safeParse(userProfile);
    if (!parsedUserProfile.success) {
      setError("Invalid form.");
      return;
    }
  };

  const handleChange =
    (name: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setUserProfile({ ...userProfile, [name]: e.target.value });

  return (
    <Container minH="100%">
      <Stack py="16" gap="12">
        <Avatar mx="auto" size="2xl" src={userProfile.profilePic} />

        <FormControl>
          <FormLabel>Profile Picture URL</FormLabel>
          <Input value={userProfile.profilePic} onChange={handleChange("profilePic")} />
        </FormControl>

        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input value={userProfile.displayName} onChange={handleChange("displayName")} />
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select value={userProfile.gender} onChange={handleChange("gender")}>
            <option value="" disabled />
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer Not To Say">Prefer Not To Say</option>
          </Select>
        </FormControl>

        <SegmentedControl
          activeIndex={userProfile.budget - 1}
          controlLabel="Budget"
          labels={["<1000", "1000-2000", "2000+"]}
          onChange={i =>
            setUserProfile({ ...userProfile, budget: (i + 1) as UserProfile["budget"] })
          }
        />

        <SegmentedControl
          activeIndex={userProfile.cleanliness - 1}
          controlLabel="Cleanliness"
          labels={["Messy", "Average", "Super Clean"]}
          onChange={i =>
            setUserProfile({ ...userProfile, cleanliness: (i + 1) as UserProfile["cleanliness"] })
          }
        />

        <SegmentedControl
          activeIndex={userProfile.loudness - 1}
          controlLabel="Loudness"
          labels={["Quiet", "Average", "Party Animal"]}
          onChange={i =>
            setUserProfile({ ...userProfile, loudness: (i + 1) as UserProfile["loudness"] })
          }
        />

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

        <Stack>
          <Text textColor="red">{error}</Text>
          <Button
            isLoading={editLoading}
            colorScheme="orange"
            onClick={() => {
              setEditLoading(true);
              handleSubmit().then(() => setEditLoading(false));
            }}
          >
            Save Profile
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
