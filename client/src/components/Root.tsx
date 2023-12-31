import { Suspense } from "react";
import { Await, useLoaderData, Outlet, Navigate, defer } from "react-router-dom";
import Layout from "./ui/Layout.tsx";
import { userProfileSchema } from "../schemas.ts";
import { getToken } from "../token.ts";
import { useProfileStore } from "../store/user.ts";
import Loading from "./ui/Loading.tsx";

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
  if ("errorMessage" in parsedResponse) {
    throw new Error(parsedResponse.errorMessage);
  }

  useProfileStore.setState(parsedResponse);
  return null;
};

export const loader = () => defer({ response: handleImplicitLogin() });

const Root = () => {
  const data = useLoaderData() as { response: ReturnType<typeof handleImplicitLogin> };

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data.response} errorElement={<Navigate to="/landing" />}>
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
