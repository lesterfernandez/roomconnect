import { FormControl, FormLabel, Button, Select, Container, Stack, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import UserCard from "./UserCard";
import { useSearchStore } from "../../store";
import { searchUsers } from "../../api/search";
import type { SearchBody } from "../../types";

export default function Search() {
  const { settings, results } = useSearchStore();
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const results = await searchUsers(settings);
      useSearchStore.setState({ results });
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleChange = (name: keyof SearchBody) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    useSearchStore.setState({
      settings: { [name]: e.target.value },
    });
  };

  return (
    <Container maxW="container.lg" px="4">
      <Flex
        direction={{ base: "column", md: "row" }}
        gap="6"
        py={{ base: "4", md: "16" }}
        alignItems="flex-end"
      >
        <FormControl>
          <FormLabel>Budget</FormLabel>
          <Select
            placeholder="Select budget"
            value={settings.budget}
            onChange={handleChange("budget")}
          >
            <option label="1000" value="1"></option>
            <option label="1000-2000" value="2"></option>
            <option label="2000+" value="3"></option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Cleanliness</FormLabel>
          <Select
            placeholder="Select cleanliness"
            value={settings.cleanliness}
            onChange={handleChange("cleanliness")}
          >
            <option label="Messy" value="1"></option>
            <option label="Average" value="2"></option>
            <option label="Clean Freak" value="3"></option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Loudness</FormLabel>
          <Select
            placeholder="Select loudness"
            value={settings.loudness}
            onChange={handleChange("loudness")}
          >
            <option label="Quiet" value="1" />
            <option label="Average" value="2" />
            <option label="Party Animal" value="3" />
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Co-Ed</FormLabel>
          <Select placeholder="Select" value={settings.coed} onChange={handleChange("coed")}>
            <option label="Yes" value="true" />
            <option label="No" value="false" />
          </Select>
        </FormControl>

        <FormControl>
          <Button
            colorScheme="orange"
            width="100%"
            borderRadius="6px"
            onClick={handleSearch}
            isLoading={searchLoading}
          >
            Search
          </Button>
        </FormControl>
      </Flex>
      <Stack gap="6" pb="6">
        {results.map((result, i) => (
          <UserCard profile={result} key={`card-${i}`} />
        ))}
      </Stack>
    </Container>
  );
}
