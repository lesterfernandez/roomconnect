import {
  FormControl,
  FormLabel,
  Button,
  Select,
  Container,
  Stack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { searchUsers } from "../../api/search";
import type { SearchBody } from "../../types";
import { useSearchStore } from "../../store/search";
import attributes from "../../attribute-text";

const handleSearch = async (settings: Partial<SearchBody>) => {
  try {
    const results = await searchUsers(settings);
    useSearchStore.setState({ results });
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

const handleChange = (name: keyof SearchBody) => (e: React.ChangeEvent<HTMLSelectElement>) => {
  useSearchStore.setState(prev => ({
    settings: { ...prev.settings, [name]: e.target.value },
  }));
};

export default function Search() {
  const { settings, results } = useSearchStore();
  const [searchLoading, setSearchLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(results.length === 0);

  useEffect(() => {
    if (useSearchStore.getState().results.length === 0) {
      handleSearch({}).finally(() => setInitialLoading(false));
    }
  }, []);

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
            {attributes.budget.map((option, i) => {
              return <option label={option} value={i + 1} key={`select-budget-${i}`} />;
            })}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Cleanliness</FormLabel>
          <Select
            placeholder="Select cleanliness"
            value={settings.cleanliness}
            onChange={handleChange("cleanliness")}
          >
            {attributes.cleanliness.map((option, i) => {
              return <option label={option} value={i + 1} key={`select-cleanliness-${i}`} />;
            })}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Loudness</FormLabel>
          <Select
            placeholder="Select loudness"
            value={settings.loudness}
            onChange={handleChange("loudness")}
          >
            {attributes.loudness.map((option, i) => {
              return <option label={option} value={i + 1} key={`select-loudness-${i}`} />;
            })}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Co-Ed</FormLabel>
          <Select placeholder="Select" value={settings.coed} onChange={handleChange("coed")}>
            <option label={attributes.coed[1]} value="true" />
            <option label={attributes.coed[0]} value="false" />
          </Select>
        </FormControl>

        <FormControl>
          <Button
            colorScheme="orange"
            width="100%"
            borderRadius="6px"
            onClick={async () => {
              setSearchLoading(true);
              await handleSearch(settings);
              setSearchLoading(false);
            }}
            isDisabled={searchLoading}
            isLoading={searchLoading}
          >
            Search
          </Button>
        </FormControl>
      </Flex>

      {initialLoading ? (
        <Flex justify="center">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Stack gap="6" pb="6">
          {results.map((result, i) => (
            <UserCard profile={result} key={`card-${i}`} />
          ))}
        </Stack>
      )}
    </Container>
  );
}
