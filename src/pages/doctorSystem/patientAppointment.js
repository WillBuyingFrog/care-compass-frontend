import {Button,Layout,Menu, Breadcrumb,Select} from 'antd'
import { useLocation, useNavigate ,Outlet} from 'react-router-dom';
import { Card, Col, Row ,Icon} from 'antd';
import { Center } from '@chakra-ui/react';
import { useState } from 'react';

const { SubMenu } = Menu;
const { Option } = Select;
const { Header, Content, Sider } = Layout;
function PatientAppointment(){
    const nagivate = useNavigate()
    const location = useLocation()

    let date=''
    let backdate=''
    let patientlist=[
        {
            appointmentID:0,
            name:'张三',
            gender:'男',
            date:'2023-06-02',
            isEnd:0
        },
        {
            appointmentID:0,
            name:'张三',
            gender:'男',
            date:'2023-06-02',
            isEnd:0
        },
        {
            appointmentID:0,
            name:'张三',
            gender:'男',
            date:'2023-06-02',
            isEnd:0
        }
    ]

    var cards = patientlist.map((item,index)=>{
        return (
            <Col span={6} >
                            <Card bordered={true}>
                            <span style={{paddingTop:-110}}>{item.name}</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <span style={{fontSize:30 , paddingLeft:190}}>{index+1}</span>
                            <br/>
                            <span style={{paddingTop:-110}}>就诊状态：{getpatientstate(item.isEnd)}</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button onClick={()=>{nagivate('/doctorMain/visitInterface',{state:{date:date,patientName:item.name}})}}>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
        )
    })
    if(location.state !== null){
        backdate = location.state.date
    }

    function getpatientstate(isend){
        if(isend === 0){
            return '未就诊'
        }
        else{
            return '已就诊'
        }
    }
    function handleChange(value) {
        // console.log(`selected ${value}`);
        date=value
        console.log(date)
      }
    console.log(location.state)
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>预约患者</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                <span>请选择所要查看的时间段</span>           
                    <Select defaultValue={backdate} style={{ width: 200 ,marginLeft:500}} onChange={handleChange}>
                        <Option value="6-8 周四 上午">6-8 周四 上午</Option>
                        <Option value="6-8 周四 下午">6-8 周四 下午</Option>
                        <Option value="6-10 周六 上午">6-10 周六 上午</Option>
                    </Select>
                </div>
                <Content
                style={{
                    background: '#ECECEC',
                    padding: 24,
                    margin: 0,
                    minHeight: 600,
                }}
                >
                        <Row gutter={16}>
                        {/* <Col span={6} >
                            <Card bordered={true}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <span style={{fontSize:30 , paddingLeft:190}}>1</span>
                            <br/>
                            <span style={{paddingTop:-110}}>状态：已就诊</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button onClick={()=>{nagivate('/doctorMain/visitInterface',{state:{date:date}})}}>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card  bordered={true}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <span style={{fontSize:30 , paddingLeft:190}}>2</span>
                            <br/>
                            <span style={{paddingTop:-110}}>状态：已失约</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card  bordered={true}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <span style={{fontSize:30 , paddingLeft:190}}>3</span>
                            <br/>
                            <span style={{paddingTop:-110}}>状态：待就诊</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card  bordered={true}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <span style={{fontSize:30 , paddingLeft:190}}>4</span>
                            <br/>
                            <span style={{paddingTop:-110}}>状态：待就诊</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card  bordered={true}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <span style={{fontSize:30 , paddingLeft:190}}>5</span>
                            <br/>
                            <span style={{paddingTop:-110}}>状态：待就诊</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>开始诊断</Button>
                            </div>
                            </Card>
                        </Col> */}
                        {cards}
                        </Row>
                        
                        
                </Content>
            </Layout>
    );
}

export default PatientAppointment