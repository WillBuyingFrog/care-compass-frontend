import {
    createBrowserRouter,
} from "react-router-dom";

// homepage
import Landing from '../pages/landing/landing.js'
import Homepage from "../pages/landing/homepage.js";

// login and register
import Login from "../pages/user/login";
import LoginAndRegister from "../pages/user/loginAndRegister";
import FindPassword from "../pages/user/findPassword";
import Register from "../pages/user/register";

const default_router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />
    },
    {
        path: '/landing',
        element: <Landing />
    },
    {
        path: '/homepage',
        element: <Homepage />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/loginAndRegister',
        element: <LoginAndRegister />
    },
    {
        path: '/findPassword',
        element: <FindPassword />
    },
    {
        path: '/register',
        element: <Register />
    },
])

export default default_router;


