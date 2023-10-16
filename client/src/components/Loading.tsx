import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Box, CircularProgress } from "@chakra-ui/react";
import { Login } from "./pages";

const Loading = () => {
  const data = useLoaderData() as { response: null };

  return (
    <Suspense
      fallback={
        <Box bg="#156087" display="flex" minH="calc(100vh)">
          <CircularProgress isIndeterminate color="white" m="auto" />
        </Box>
      }
    >
      <Await resolve={data.response} errorElement={<Login />}>
        {() => <p>Hello</p>}
      </Await>
    </Suspense>
  );
};

export default Loading;
