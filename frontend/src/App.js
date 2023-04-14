import React from "react";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import Login from "./Pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_AUTH_CLIENT_ID}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Login />
      </MantineProvider>
    </GoogleOAuthProvider>
  );
}
export default App;
