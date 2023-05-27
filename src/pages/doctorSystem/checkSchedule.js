import {Button,Layout,Menu, Breadcrumb,message} from 'antd'
import { useLocation, useNavigate,Link,Route } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import axios from 'axios';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
function CheckSchedule(){
    const nagivate = useNavigate()
    const location = useLocation()

    let shiftlist=[]

    const error = (msg) => {
        message.error(msg);
      };

    //获取标准日期格式
    const date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = (month > 9) ? month : ("0" + month);
    day = (day < 10) ? ("0" + day) : day;
    var today = year + "-" + month + "-" + day;
    console.log(typeof(today))
    axios.post('/treatment/getWorkShiftInfo/',JSON.stringify(
        {
            //doctorID需要从header获取
            doctorID:0,
            date:today
        }
    ))
    .then(res=>{
        console.log(res)
        if(res.data.code === 1){
            error(res.data.msg)
        }
        else if(res.data.code ==0 ){
            shiftlist = res.data.data.shiftList
        }
    })

    function mixdate(date,time){
        if(time == 0){
            return date+' 上午'
        }
        else{
            return date+' 下午'
        }
    }

    var cards = shiftlist.map((item,index)=>{

        return (
            <Col span={6}>
                            <Card bordered={true}>
                            <span style={{paddingTop:-110}}>{mixdate(item.date,item.time)}</span>
                            <br/>
                            <span style={{paddingTop:-110}}>当前患者人数： {item.num}人</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button onClick={nagivate('/doctorMain/patientAppointment',{state:{shiftlist:item,date:item.date,time:item.time}})}>查看详情</Button>
                            </div>
                            </Card>
                        </Col>
        )
    })


    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>查看排班</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    {/* //医生姓名从header拿 */}
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
                        {/* <Col span={6}>
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
                        </Col> */}
                        {cards}
                        </Row>
                </Content>
            </Layout>
    );
}

export default CheckSchedule