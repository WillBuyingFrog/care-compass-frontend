import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from "@chakra-ui/react";
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { extendTheme } from "@chakra-ui/react"
import {
    RouterProvider,
} from "react-router-dom";
import default_router from "./routes/default_router";
import App from "./App";
