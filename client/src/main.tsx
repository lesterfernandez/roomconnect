import React from "react";
import ReactDOM from "react-dom/client";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EditProfile from "./components/EditProfile";
import Search from "./components/search/Search";
import NotFound from "./components/NotFound";
import Chat from "./components/chat/Chat";
import Conversations from "./components/chat/Conversations";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as rootLoader } from "./components/Root";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./components/ui/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <Root />,
    shouldRevalidate: () => false,
    errorElement: <NotFound />,
    children: [
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "chat",
        element: <Chat />,
        children: [
          {
            path: ":username",
            element: <Conversations />,
          },
        ],
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
  {
    path: "/landing",
    element: <LandingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
