import {Button,Layout,Menu, Breadcrumb} from 'antd'
import { useLocation, useNavigate,Link,Route } from 'react-router-dom';
import { Card, Col, Row } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
function CheckSchedule(){
    const nagivate = useNavigate()
    const location = useLocation()
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>查看排班</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <span style={{fontSize:30}}>医生姓名</span>
                    <br/>
                    <br/>
                    <br/>
                    <span style={{fontSize:10}}>最近两周排班</span>
                    <br/>
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
                            <span style={{paddingTop:-110}}>6-8 周四 上午</span>
                            <br/>
                            <span style={{paddingTop:-110}}>当前患者人数： 9人</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>查看详情</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                            <span style={{paddingTop:-110}}>6-8 周四 下午</span>
                            <br/>
                            <span style={{paddingTop:-110}}>当前患者人数： 9人</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>查看详情</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                            <span style={{paddingTop:-110}}>6-10 周六 上午</span>
                            <br/>
                            <span style={{paddingTop:-110}}>当前患者人数： 9人</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>查看详情</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card  bordered={false}>
                            <span style={{paddingTop:-110}}>6-10 周六 下午</span>
                            <br/>
                            <span style={{paddingTop:-110}}>当前患者人数： 9人</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>查看详情</Button>
                            </div>
                            </Card>
                        </Col>
                        </Row>
                        <br/>
                        <Row gutter={16}>
                        <Col span={6}>
                            <Card bordered={false}>
                            <span style={{paddingTop:-110}}>6-8 周四 上午</span>
                            <br/>
                            <span style={{paddingTop:-110}}>当前患者人数： 9人</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>查看详情</Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                            <span style={{paddingTop:-110}}>6-8 周四 下午</span>
                            <br/>
                            <span style={{paddingTop:-110}}>当前患者人数： 9人</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button>查看详情</Button>
                            </div>
                            </Card>
                        </Col>
                        </Row>
                </Content>
            </Layout>
    );
}

export default CheckSchedule