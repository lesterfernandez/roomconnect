import { Suspense } from "react";
import { Await, useLoaderData, Outlet, Navigate, defer } from "react-router-dom";
import { Box, CircularProgress } from "@chakra-ui/react";
import { handleImplicitLogin } from "../api";
import Layout from "./ui/Layout.tsx";

export const loader = () => defer({ response: handleImplicitLogin() });

const Root = () => {
  const data = useLoaderData() as { response: ReturnType<typeof handleImplicitLogin> };

  return (
    <Suspense
      fallback={
        <Box bg="#156087" display="flex" minH="100vh">
          <CircularProgress isIndeterminate color="orange" m="auto" />
        </Box>
      }
    >
      <Await resolve={data.response} errorElement={<Navigate to="/login" />}>
        {() => (
          <Layout>
            <Outlet />
          </Layout>
        )}
      </Await>
    </Suspense>
  );
};

export { Root, handleImplicitLogin };
