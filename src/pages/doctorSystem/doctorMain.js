import {Button,Layout,Menu, Breadcrumb} from 'antd'
import { useLocation, useNavigate,Link,Route,Outlet } from 'react-router-dom';
import PatientAppointment from './patientAppointment';
import MyHeader from '../../components/header/header';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function DoctorMain(){
    const nagivate = useNavigate()
    return(
        <Layout>
            {/* <Header className="header">
            <MyHeader></MyHeader>
            </Header> */}
            <MyHeader/>
            <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
                <Menu.Item key="1" onClick={()=>{nagivate('/doctorMain/patientAppointment')}}>
                    <span>预约患者</span>
                </Menu.Item>

                <Menu.Item key="2" onClick={()=>{nagivate('/doctorMain/checkSchedule')}}>
                    <span>查看排班</span>
                </Menu.Item>
                <SubMenu
                    key="sub3"
                    title={
                    <span>
                        申请请假
                    </span>
                    }
                >
                    <Menu.Item key="3" onClick={()=>{nagivate('/doctorMain/applyVacation')}}>请假</Menu.Item>
                    <Menu.Item key="4" onClick={()=>{nagivate('/doctorMain/checkProgress')}}>查看请假进度</Menu.Item>
                </SubMenu>
                </Menu>
            </Sider>
            <Outlet/>
            </Layout>
        </Layout>
    );
}

export default DoctorMain;