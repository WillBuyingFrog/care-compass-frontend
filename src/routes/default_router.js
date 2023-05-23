import {
    createBrowserRouter,
} from "react-router-dom";

// homepage
import Homepage from "../pages/landing/homepage.js";

// login and register
import LoginAndRegister from "../pages/user/loginAndRegister";
import FindPassword from "../pages/user/findPassword";
import DoctorMain from "../pages/doctorSystem/doctorMain.js";
import PatientAppointment from "../pages/doctorSystem/patientAppointment.js";
import CheckSchedule from "../pages/doctorSystem/checkSchedule.js";
import CheckProgress from "../pages/doctorSystem/checkProgress.js";
import ApplyVacation from "../pages/doctorSystem/applyVacation.js";
import PicturesWall  from "../pages/doctorSystem/pictureWall.js";
import VisitInterface from "../pages/doctorSystem/visitInterface.js";
import LeaveDetail from "../pages/doctorSystem/leaveDetail.js";

const default_router = createBrowserRouter([
    {
        //临时修改主页面方便调试，记得改回
        path: '/',
        // element: <Homepage />
        element:<DoctorMain/>
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
        path:'/doctorMain',
        element:<DoctorMain/>,
        children:[
            {
                path:'patientAppointment',
                element:<PatientAppointment/>  
            },
            {
                path:'checkSchedule',
                element:<CheckSchedule/>
            },
            {
                path:'applyVacation',
                element:<ApplyVacation/>,
            },
            {
                path:'checkProgress',
                element:<CheckProgress/>
            },
            {
                path:'visitInterface',
                element:<VisitInterface/>
            },
            {
                path:'leaveDetail',
                element:<LeaveDetail/>
            }
        ]
    },

])

export default default_router;


