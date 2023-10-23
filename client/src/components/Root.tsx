import { Suspense } from "react";
import { Await, useLoaderData, Outlet, Navigate, defer } from "react-router-dom";
import { Box, CircularProgress } from "@chakra-ui/react";
import { userProfileSchema } from "../schemas.ts";
import { useProfileStore } from "../store.ts";
import { getToken } from "../token.ts";

export const loader = () => defer({ response: handleImplicitLogin() });

const handleImplicitLogin = async (): Promise<null> => {
  const profile = useProfileStore.getState();
  if (profile.displayName !== "") return null;

  const token = getToken();
  if (!token) throw new Error("Token doesn't exist");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/implicit_login`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const parsedResponse = userProfileSchema.parse(await response.json());
  if ("errorMessage" in parsedResponse) throw new Error("Error");

  useProfileStore.setState(parsedResponse);
  return null;
};

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
        {() => <Outlet />}
      </Await>
    </Suspense>
  );
};

export { Root, handleImplicitLogin };
