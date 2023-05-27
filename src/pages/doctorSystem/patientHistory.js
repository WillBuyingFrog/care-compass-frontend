import {Button,Layout,Menu, Breadcrumb,Select,Input,List,InputNumber,message} from 'antd'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const { Header, Content, Sider } = Layout;

function PatientHistory(){
    const location = useLocation()
    const nagivate = useNavigate()

    let data = [{
        date:'2023-06-10',
        description:'this is a description',
        doctorname:'张三'
    },
    {
        date:'2023-06-10',
        description:'this is a description',
        doctorname:'张三'
    },
    {
        date:'2023-06-10',
        description:'this is a description',
        doctorname:'张三'
    }]
    let recordlist=[]

    axios.post('/treatment/getHistoryRecord/',JSON.stringify({
        patientID:location.state.patientID
    }))
    .then(res=>{
        if(res.data.code == 0){
            recordlist = res.data.data.recordList
        }
        else{
            message.error(res.data.msg)
        }
    })
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>历史诊疗记录</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                {/* //调试使用，记得改回 */}
                {/* <span style={{fontSize:30}}>{location.state.patientName}</span>            */}
                <span style={{fontSize:30}}>张三</span>
                </div>
                <Content
                style={{
                    background: 'white',
                    padding: 24,
                    margin: 0,
                    minHeight: 600,
                }}
                >
                    <List
                        bordered
                        itemLayout="horizontal"
                        dataSource={recordlist}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                style={{maxWidth:300}}
                                description={item.date}
                                />
                                <span>{item.description}</span>
                                <span>{item.departmentName+':'+item.doctorName}</span>
                                {/* 查看详情 */}
                                <Button type="primary" shape="circle" onClick={()=>{nagivate('/doctorMain/historicalRecord',{state:{patientName:location.state.patientName,patientID:location.state.patientID,item:item}})}} >test</Button>
                        </List.Item>
                        )}
                    />,
                        
                        
                </Content>
            </Layout>
    )
}

export default PatientHistory