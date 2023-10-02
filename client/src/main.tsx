import React from "react";
import ReactDOM from "react-dom/client";

import { Login, Register, Test } from "./components/pages";
import { AuthWrapper } from "./auth/useAuth.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
