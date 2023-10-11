import { Box, CircularProgress } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box bg="#156087" display="flex" minH="100vh">
      <CircularProgress isIndeterminate color="orange" m="auto" />
    </Box>
  );
};

export default Loading;
