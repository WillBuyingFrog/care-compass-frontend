
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {RouterProvider} from "react-router-dom";
import default_router from "./routes/default_router";
import {tokenContext} from "./contexts/tokenContext";
import React, {useState} from "react";
import axios from "axios";
import {ConfigProvider} from "antd";

const theme = extendTheme({
  colors: {
    frog: {
      400: '#7551FF',
      500: "#422afb",
      600: "#3311DB",
    },
    navy:{
      50: '#d0dcfb',
      100: '#aac0fe',
      200: '#a3b9f8',
      300: '#728fea',
      400: '#3652ba',
      500: '#1b3bbb',
      600: '#24388a'
    },
    sg:{
      100:'#E0E5F2',
      200:'#E1E9F8',
      400:'#E9EDF7',
      500:'#8F9BBA',
      600:'#A3AED0'
    }
  },
})

ConfigProvider.config({
  theme: {
    primaryColor: '#3a3af1',
    successColor: '#50af78',
  },
});

function App() {

  return (
      // <React.StrictMode>
      <ChakraProvider theme={theme}>
        <RouterProvider router={default_router} />
      </ChakraProvider>
      // </React.StrictMode>
  );
}

export default App;
