import { HStack, FormControl, FormLabel, Button, Select, Container, Stack } from "@chakra-ui/react";
import { useState } from "react";
import UserCard from "./UserCard";
import type { UserProfile } from "../../types";
import { searchResultSchema } from "../../schemas";

export default function Search() {
  const [results, setResults] = useState<UserProfile[]>([]);
  const [budget, setBudget] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [loudness, setLoudness] = useState("");
  const [coed, setCoed] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    const query = `?budget=${budget}&cleanliness=${cleanliness}&loudness=${loudness}&coEd=${coed}`;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search${query}`);
      const data = await response.json();
      const dataResults = searchResultSchema.parse(data);
      setResults(dataResults);
      console.log(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Container maxW="container.xl" px="4">
      <HStack gap="20" py="16" alignItems="flex-end">
        <FormControl>
          <FormLabel>Budget</FormLabel>
          <Select
            placeholder="Select budget"
            value={budget}
            onChange={event => setBudget(event.target.value)}
          >
            <option label="1000" value="1" style={{ color: "black" }}></option>
            <option label="1000-2000" value="2" style={{ color: "black" }}></option>
            <option label="2000+" value="3" style={{ color: "black" }}></option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Cleanliness</FormLabel>
          <Select
            placeholder="Select cleanliness"
            value={cleanliness}
            onChange={event => setCleanliness(event.target.value)}
          >
            <option label="Messy" value="1" style={{ color: "black" }}></option>
            <option label="Average" value="2" style={{ color: "black" }}></option>
            <option label="Clean Freak" value="3" style={{ color: "black" }}></option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Loudness</FormLabel>
          <Select
            placeholder="Select loudness"
            value={loudness}
            onChange={event => setLoudness(event.target.value)}
          >
            <option label="Quiet" value="1" style={{ color: "black" }}></option>
            <option label="Average" value="2" style={{ color: "black" }}></option>
            <option label="Party Animal" value="3" style={{ color: "black" }}></option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Co-Ed</FormLabel>
          <Select placeholder="Select" value={coed} onChange={event => setCoed(event.target.value)}>
            <option label="Yes" value="true" style={{ color: "black" }}></option>
            <option label="No" value="false" style={{ color: "black" }}></option>
          </Select>
        </FormControl>

        <FormControl>
          <Button
            colorScheme="orange"
            width="100%"
            borderRadius="6px"
            onClick={async () => {
              setSearchLoading(true);
              handleSearch().then(() => setSearchLoading(false));
            }}
            isLoading={searchLoading}
          >
            Search
          </Button>
        </FormControl>
      </HStack>
      <Stack gap="6" pb="6">
        {results.map((result, i) => (
          <UserCard profile={result} key={`card-${i}`} />
        ))}
      </Stack>
    </Container>
  );
}
