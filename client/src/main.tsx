import React from "react";
import ReactDOM from "react-dom/client";

// Import pages
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import EditProfile from "./components/pages/EditProfile";
import Search from "./components/pages/Search";
import NotFound from "./components/pages/NotFound";

import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import { Loading, handleImplicitLogin } from "./components/Loading";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => defer({ response: handleImplicitLogin() }),
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
