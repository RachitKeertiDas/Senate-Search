import React from "react";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import Login from "./Pages/Login";
import Upload from "./Pages/Upload";
import Search from "./Pages/Search";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_AUTH_CLIENT_ID}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </GoogleOAuthProvider>
  );
}
export default App;
