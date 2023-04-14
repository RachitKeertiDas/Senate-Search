import React from 'react';
import './App.css';
import { MantineProvider } from '@mantine/core';
import Login from "./Pages/Login";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
       <Login />
    </MantineProvider>
  );
}
export default App;
