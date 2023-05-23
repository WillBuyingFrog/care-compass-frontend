import {Button,Layout,Menu, Breadcrumb,Select} from 'antd'
import { useLocation, useNavigate ,Outlet} from 'react-router-dom';
import { Card, Col, Row ,Icon} from 'antd';
import { Center } from '@chakra-ui/react';

const { SubMenu } = Menu;
const { Option } = Select;
const { Header, Content, Sider } = Layout;
function PatientAppointment(){
    const nagivate = useNavigate()
    function handleChange(value) {
        console.log(`selected ${value}`);
      }
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>预约患者</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                <span>请选择所要查看的时间段</span>           
                    <Select defaultValue="" style={{ width: 200 ,marginLeft:500}} onChange={handleChange}>
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
                        <Col span={6}>
                            <Card bordered={false}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button onClick={()=>{nagivate('/doctorMain/visitInterface')}}>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card  bordered={false}>
                            <span style={{paddingTop:-110}}>张三</span>
                            <br/>
                            <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>开始诊断</Button>
                            </div>
                            </Card>
                        </Col>
                        </Row>
                </Content>
            </Layout>
    );
}

export default PatientAppointment