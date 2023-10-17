import { Suspense } from "react";
import { Await, useLoaderData, Outlet, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@chakra-ui/react";

const Loading = () => {
  const data = useLoaderData() as { response: Promise<null> };

  return (
    <Suspense
      fallback={
        <Box bg="#156087" display="flex" minH="100vh">
          <CircularProgress isIndeterminate color="orange" m="auto" />
        </Box>
      }
    >
      <Await resolve={data.response} errorElement={<Navigate to="/login" />}>
        {() => <Outlet />}
      </Await>
    </Suspense>
  );
};

export default Loading;
