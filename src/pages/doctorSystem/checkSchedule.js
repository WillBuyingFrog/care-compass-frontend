import {Button,Layout,Menu, Breadcrumb,message} from 'antd'
import { useLocation, useNavigate,Link,Route } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import axios from 'axios';
import { useState ,useEffect} from 'react';

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

    useEffect(() => {

        axios.post('/treatment/getWorkShiftInfo/',JSON.stringify(
            {
                //doctorID需要从header获取
                doctorID:parseInt(localStorage.getItem("doctorID")),
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
                var temcards = shiftlist.map((item,index)=>{

                    return (
                        <Col span={6}>
                            <Card bordered={true} style={{borderRadius: 20, 'box-shadow': '4px 4px 15px 0 rgba(0,0,0,0.1)'}}>
                            <span style={{paddingTop:-110}}>{mixdate(item.date,item.time)}</span>
                            <br/>
                            <span style={{paddingTop:-110}}>当前患者人数： {item.num}人</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button size="large"
                                        shape={"round"}
                                        onClick={()=>nagivate('/doctorMain/patientAppointment',{state:{shiftlist:item,date:item.date,time:item.time}})}>查看详情</Button>
                            </div>
                            </Card>
                        </Col>
                    )
                })
                setcards(temcards)
            }
        })

    }, []);

    function mixdate(date,time){
        if(time == 0){
            return date+' 上午'
        }
        else{
            return date+' 下午'
        }
    }

    const [cards,setcards] = useState()


    return(
        <Layout style={{
            padding: '30px',
            // height: '100vh',
            backgroundColor: 'rgb(220,225,242)',
        }}>
            <div
                style={{
                    padding: '20px 30px',
                    background: 'linear-gradient(180deg,rgba(255,255,255,1.0), rgba(255,255,255,0.4))',
                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                    borderRadius: '20px',
                }}
            >
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>查看排班</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    {/* //医生姓名从header拿 */}
                    <span style={{fontSize:30}}>{localStorage.getItem('username')}</span><br />
                    <span style={{fontSize:12}}>最近两周排班</span>
                    <br/>
                </div>
                <Content
                style={{
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
            </div>
            </Layout>
    );
}

export default CheckSchedule
