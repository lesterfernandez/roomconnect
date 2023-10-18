import React from "react";
import ReactDOM from "react-dom/client";
import { Login, Register, NotFound, EditProfile, Search } from "./components/pages";
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
