import {Button,Layout,Menu, Breadcrumb,Select,message} from 'antd'
import { useLocation, useNavigate ,Outlet} from 'react-router-dom';
import { Card, Col, Row ,Icon} from 'antd';
import { Center } from '@chakra-ui/react';
import { useState , useEffect} from 'react';
import axios from 'axios';

const { SubMenu } = Menu;
const { Option } = Select;
const { Header, Content, Sider } = Layout;

function mixdate(date,time){
    if(time == 0){
        return date+' 上午'
    }
    else{
        return date+' 下午'
    }
}

function splitdate(temmixdate){
    let temdate=''
    let temtime=null
    temdate=temmixdate.substr(0,10)
    if( temmixdate.substr(11,2) == '上午'){
        temtime=0
    }
    else{
        temtime=1
    }
    return {
        date:temdate,
        time:temtime
    }
}
function PatientAppointment(){
    const nagivate = useNavigate()
    const location = useLocation()
    // const useEffect = useEffect()

    let shiftlist=[]
    //检查有无date和time
    // console.log(location.state)
    if(location.state !== null){
        shiftlist = location.state.shiftlist
    }

    // console.log(splitdate('2023-05-21 上午'))
    let nowmixdate=''
    let backdate=''
    let patientlist=[
        // {
        //     appointmentID:0,
        //     name:'张三',
        //     gender:'男',
        //     date:'2023-06-02',
        //     isEnd:0
        // },
        // {
        //     appointmentID:0,
        //     name:'张三',
        //     gender:'男',
        //     date:'2023-06-02',
        //     isEnd:0
        // },
        // {
        //     appointmentID:0,
        //     name:'张三',
        //     gender:'男',
        //     date:'2023-06-02',
        //     isEnd:0
        // }
    ]
    const [options, setoptions] = useState([]);


    const date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = (month > 9) ? month : ("0" + month);
    day = (day < 10) ? ("0" + day) : day;
    var today = year + "-" + month + "-" + day;

    useEffect(() => {

        axios.post('/treatment/getWorkShiftInfo/',JSON.stringify(
            {
                //doctorID需要从header获取
                doctorID:1,
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
                let temoptions =  shiftlist.map((item,index)=>{
                    return (
                        <Option value={mixdate(item.date,item.time)}>{mixdate(item.date,item.time)}</Option>
                    )
                })
                setoptions(temoptions)
            }
        })

    }, []);


    const [cards,setcards] = useState([])
    
    if(location.state !== null){
        backdate = location.state.date
        nowmixdate=mixdate(location.state.date,location.state.time)
        //初始渲染时，获取对应时间病人信息
        axios.post('/treatment/getPatientList/',JSON.stringify({
            doctorID:1,
            date:splitdate(nowmixdate).date,
            time:splitdate(nowmixdate).time
        }))
        .then(res=>{
            if(res.data.code === 0){
                patientlist=res.data.data.patientList
            }
            else{
                error(res.data.msg)
            }
        })
    }

    const error = (msg) => {
        message.error(msg);
      };

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
        nowmixdate=value
        console.log(nowmixdate)
        axios.post('/treatment/getPatientList/',JSON.stringify({
            doctorID:1,
            date:splitdate(nowmixdate).date,
            time:splitdate(nowmixdate).time
        }))
        .then(res=>{
            console.log(res)
            if(res.data.code === 0){
                patientlist=res.data.data.patientList
                let temcards = patientlist.map((item,index)=>{
                    return (
                        <Col span={6} >
                                        <Card bordered={true}>
                                        <span style={{paddingTop:-110}}>{item.name}</span>
                                        <Button style={{marginLeft:180}} onClick={()=>{nagivate('/doctorMain/patientHistory',{state:{patientID:item.patientID,date:item.date,patientName:item.name}})}}>历史诊疗记录</Button>
                                        <br/>
                                        <span style={{paddingTop:-110}}>预约时间:8:30-8:50</span>
                                        <span style={{fontSize:30 , paddingLeft:190}}>{index+1}</span>
                                        <br/>
                                        <span style={{paddingTop:-110}}>就诊状态：{getpatientstate(item.isEnd)}</span>
                                        <div style={{textAlign:'center',marginTop:10}}>
                                            <Button onClick={()=>{nagivate('/doctorMain/visitInterface',{state:{appointmentID:item.appointmentID,date:item.date,patientName:item.name}})}}>开始诊断</Button>
                                        </div>
                                        </Card>
                                    </Col>
                    )
                })
                setcards(temcards)
            }
            else{
                error(res.data.msg)
            }
        })
        
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
                    <Select defaultValue={nowmixdate} style={{ width: 200 ,marginLeft:500}} onChange={handleChange}>
                        {/* <Option value="6-8 周四 上午">6-8 周四 上午</Option>
                        <Option value="6-8 周四 下午">6-8 周四 下午</Option>
                        <Option value="6-10 周六 上午">6-10 周六 上午</Option> */}
                        {options}
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