import React from "react";
import ReactDOM from "react-dom/client";

import { Login, Register, Test, Loading } from "./components/pages";

import { createBrowserRouter, RouterProvider, redirect, Outlet } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { userProfileSchema } from "./schemas.ts";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      try {
        const response = await fetch("localhost:8080/implicit_login", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${"TOKEN WILL GO HERE"}`,
          },
        });

        const parsedResponse = userProfileSchema.safeParse(response.json());
        if (!parsedResponse.success) {
          console.log("Unable to make implicit login");
          return redirect("/login");
        }
        return <Outlet />;
      } catch (error) {
        console.log("Unexpected error");
        return redirect("/login");
      }
    },
    element: <Loading />,
    children: [
      {
        index: true,
        element: <Test />,
      },
    ],
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
