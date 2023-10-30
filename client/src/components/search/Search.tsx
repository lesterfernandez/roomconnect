import { HStack, FormControl, FormLabel, Button, Select, Container, Stack } from "@chakra-ui/react";
import { useState } from "react";
import UserCard from "./UserCard";
import { searchResultSchema } from "../../schemas";
import { useSearchStore } from "../../store";

export default function Search() {
  const searchStore = useSearchStore();
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    const query = `?budget=${searchStore.settings.budget}&cleanliness=${searchStore.settings.cleanliness}&loudness=${searchStore.settings.loudness}&coEd=${searchStore.settings.coed}`;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search${query}`);
      const data = await response.json();
      const dataResults = searchResultSchema.parse(data);
      console.log("results", dataResults);
      useSearchStore.setState(prev => ({ ...prev, results: dataResults }));
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
            value={searchStore.settings.budget}
            onChange={event =>
              useSearchStore.setState({
                settings: { ...searchStore.settings, budget: event.target.value },
              })
            }
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
            value={searchStore.settings.cleanliness}
            onChange={event =>
              useSearchStore.setState({
                settings: { ...searchStore.settings, cleanliness: event.target.value },
              })
            }
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
            value={searchStore.settings.loudness}
            onChange={event =>
              useSearchStore.setState({
                settings: { ...searchStore.settings, loudness: event.target.value },
              })
            }
          >
            <option label="Quiet" value="1" style={{ color: "black" }}></option>
            <option label="Average" value="2" style={{ color: "black" }}></option>
            <option label="Party Animal" value="3" style={{ color: "black" }}></option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Co-Ed</FormLabel>
          <Select
            placeholder="Select"
            value={searchStore.settings.coed}
            onChange={event =>
              useSearchStore.setState({
                settings: { ...searchStore.settings, coed: event.target.value },
              })
            }
          >
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
        {searchStore.results.map((result, i) => (
          <UserCard profile={result} key={`card-${i}`} />
        ))}
      </Stack>
    </Container>
  );
}
