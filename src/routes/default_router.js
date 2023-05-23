import {
    createBrowserRouter,
} from "react-router-dom";

// homepage
import Homepage from "../pages/landing/homepage.js";

// login and register
import LoginAndRegister from "../pages/user/loginAndRegister";
import FindPassword from "../pages/user/findPassword";

// manage
import Manage from "../pages/manage/left.js";
import Info from "../pages/manage/info.js";
import Checked from "../pages/manage/checked.js";
import UnCheck from "../pages/manage/uncheck.js";
import DoctorSchedule from "../pages/manage/doctorSchedule.js";
import DoctorLeave from "../pages/manage/doctorLeave.js";
import Department from "../pages/manage/department.js";
import Medicine from "../pages/manage/medicine.js";
import Portal from "../pages/manage/Portal";
import EditPortal from "../pages/manage/EditPortal";

const default_router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />
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
        path: '/doctorPortal',
        element: <Portal />
    },
    {
        path: 'editDoctorPortal',
        element: <EditPortal />
    },
    {
        path: '/manage',
        element: <Manage />,
        children: [
            {
                path: 'info',
                element: <Info />
            },
            {
                path: 'checked',
                element: <Checked />
            },
            {
                path: 'uncheck',
                element: <UnCheck />
            },
            {
                path: 'doctorSchedule',
                element: <DoctorSchedule />
            },
            {
                path: 'doctorLeave',
                element: <DoctorLeave />
            },
            {
                path: 'department',
                element: <Department />
            },
            {
                path: 'medicine',
                element: <Medicine />
            },
        ]
    },
])

export default default_router;


