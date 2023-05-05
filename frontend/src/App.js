import React from "react";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import Login from "./Pages/Login";
import Upload from "./Pages/Upload";
import Search from "./Pages/Search";
import Agenda from "./Pages/Agenda";
import Handbook from "./Pages/Handbook";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewMeetings from "./Pages/ViewMeeting";

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
  {
    path: "/agenda",
    element: <Agenda />,
  },
  {
    path: "/handbook",
    element: <Handbook />,
  },
  {
    path: "/view_minutes",
    element: <ViewMeetings />,
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
