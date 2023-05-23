import {
    createBrowserRouter,
} from "react-router-dom";

// homepage
import Homepage from "../pages/landing/homepage.js";

// login and register
import LoginAndRegister from "../pages/user/loginAndRegister";
import FindPassword from "../pages/user/findPassword";
import MakeAppointment from "../pages/patient/makeAppointment";

// manage
import Manage from "../pages/manage/left.js";
import Info from "../pages/manage/info.js";
import Checked from "../pages/manage/checked.js";
import UnCheck from "../pages/manage/uncheck.js";
import Patient from "../pages/patient/patient";
import SelectDepartment from "../pages/patient/steps/selectDepartment";
import SelectDoctor from "../pages/patient/steps/selectDoctor";
import PayBill, {singleBillLoader} from "../pages/patient/payBill";
import DoctorSchedule from "../pages/manage/doctorSchedule.js";
import DoctorLeave from "../pages/manage/doctorLeave.js";
import Department from "../pages/manage/department.js";
import Medicine from "../pages/manage/medicine.js";
import Portal from "../pages/manage/Portal";
import EditPortal from "../pages/manage/EditPortal";
import MyAppointments from "../pages/patient/myAppointments";
import MyMedicalRecords from "../pages/patient/myMedicalRecords";
import MyBills from "../pages/patient/myBills";

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
    {
        path: '/patient',
        element: <Patient />,
        children: [
            {
                path: 'makeAppointment',
                element: <MakeAppointment />,
            },
            {
                path: 'payBill/:billID',
                element: <PayBill />,
                loader: singleBillLoader
            },
            {
                path: 'myBills',
                element: <MyBills />
            },
            {
                path: 'myAppointments',
                element: <MyAppointments />
            },
            {
                path: 'myMedicalRecords',
                element: <MyMedicalRecords />
            }
        ]
    }
])

export default default_router;


