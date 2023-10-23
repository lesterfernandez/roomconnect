import React from "react";
import ReactDOM from "react-dom/client";

// Import pages
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as rootLoader } from "./components/Root";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <Root />,
    shouldRevalidate: () => false,
    children: [
      {
        path: "/profile",
        element: <EditProfile />,
      },
      {
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
