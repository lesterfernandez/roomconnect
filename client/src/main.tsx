import React from "react";
import ReactDOM from "react-dom/client";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EditProfile from "./components/EditProfile";
import Search from "./components/search/Search";
import NotFound from "./components/NotFound";
import ChatList from "./components/chat/ChatList";
import Chat from "./components/chat/Chat";

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
        path: "profile",
        element: <EditProfile />,
      },
      {
        index: true,
        element: <Search />,
      },
      {
        path: "chat",
        element: <ChatList />,
        children: [
          {
            path: ":username",
            element: <Chat />,
          },
        ],
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
