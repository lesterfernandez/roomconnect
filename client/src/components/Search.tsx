import { Box, HStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import UserCard from "./UserCard";

export default function Search() {
  const [budget, setBudget] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [loudness, setLoudness] = useState("");
  const [coed, setCoed] = useState("");

  return (
    <Box bg="#156087" minH="100vh">
      <HStack textColor="white" gap="60px" mx="70px" p="30px" alignItems="flex-end">
        <FormControl>
          <FormLabel>Budget</FormLabel>
          <Input type="text" value={budget} onChange={event => setBudget(event.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Cleanliness</FormLabel>
          <Input
            type="text"
            value={cleanliness}
            onChange={event => setCleanliness(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Loudness</FormLabel>
          <Input type="text" value={loudness} onChange={event => setLoudness(event.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Co-Ed</FormLabel>
          <Input type="text" value={coed} onChange={event => setCoed(event.target.value)} />
        </FormControl>
        <FormControl>
          <Button colorScheme="orange" width="100%" borderRadius="6px">
            Search
          </Button>
        </FormControl>
      </HStack>
      <UserCard />
    </Box>
  );
}
