import React from "react";
import ReactDOM from "react-dom/client";

import { Login, Register, Loading, NotFound, EditProfile, Search } from "./components/pages";

import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { userProfileSchema } from "./schemas.ts";
import { useProfileStore } from "./store.ts";
import { getToken } from "./token.ts";

const implicitLogin = async () => {
  const profile = useProfileStore.getState();
  if (profile.displayName !== "") return null;

  const token = getToken();
  if (!token) throw new Error("Token doesn't exist");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/implicit_login`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const parsedResponse = userProfileSchema.parse(response.json());

  if ("errorMessage" in parsedResponse) throw new Error("Error");

  useProfileStore.setState(parsedResponse);
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => defer({ response: implicitLogin() }),
    element: <Loading />,
    children: [
      {
        path: "/profile",
        element: <EditProfile />,
      },
      {
        path: "/search",
        index: true,
        element: <Search />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
