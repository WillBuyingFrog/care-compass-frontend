import {
    createBrowserRouter,
} from "react-router-dom";

// homepage
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


