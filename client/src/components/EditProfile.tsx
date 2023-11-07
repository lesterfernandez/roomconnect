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
import SegmentedControl from "./ui/SegmentedControl";
import { useProfileStore } from "../store/user";
import { editProfile } from "../api/profile";

export default function EditProfile() {
  const user = useProfileStore();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    ...user,
  });
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(userProfile);

  const handleEditProfile = () => {
    setError("");

    try {
      userProfileSchema.parse(userProfile);
    } catch (err) {
      setError("Invalid entries");
      return;
    }

    setEditLoading(true);
    editProfile(userProfile)
      .then(res => {
        useProfileStore.setState(res);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setEditLoading(false));
  };

  const handleChange =
    (name: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setUserProfile({ ...userProfile, [name]: e.target.value });

  return (
    <Container>
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
          <Button isLoading={editLoading} colorScheme="orange" onClick={handleEditProfile}>
            Save Profile
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
