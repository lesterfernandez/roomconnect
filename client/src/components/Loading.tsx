import { Box, CircularProgress } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box bg="#156087" display="flex" minH="calc(100vh)">
      <CircularProgress isIndeterminate color="white" m="auto" />
    </Box>
  );
};

export default Loading;
