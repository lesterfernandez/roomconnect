import React from "react";
import ReactDOM from "react-dom/client";

import { Login, Register, Loading, NotFound, EditProfile, Search } from "./components/pages";

import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { userProfileSchema } from "./schemas.ts";
import { useProfileStore } from "./store.ts";
import { getToken } from "./token.ts";

const implicitLogin = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const profile = useProfileStore.getState();
        if (profile.displayName !== "") resolve("Logged in");

        const token = getToken();
        if (!token) throw new Error("No such token");

        const response = await fetch("localhost:8080/implicit_login", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const parsedResponse = userProfileSchema.safeParse(response.json());
        if (!parsedResponse.success) throw new Error("Unable to make implicit login");

        if ("errorMessage" in parsedResponse.data) throw new Error("Error");

        useProfileStore.setState(parsedResponse.data);
        resolve("Implicit login completed");
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const implicitLoginPromise = implicitLogin();
      return defer({
        response: implicitLoginPromise,
      });
    },
    element: <Loading />,
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
  {
    path: "/profile",
    element: <EditProfile />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
