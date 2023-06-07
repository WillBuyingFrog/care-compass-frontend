import {Button,Layout,Menu, Breadcrumb,Select,message, Divider} from 'antd'
import { useLocation, useNavigate ,Outlet} from 'react-router-dom';
import { Card, Col, Row ,Icon} from 'antd';
import { Center } from '@chakra-ui/react';
import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {CheckCircleOutlined} from "@ant-design/icons";

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

    // let shiftlist=[]
    let [shiftlist,setshiftlist] = useState([])
    //检查有无date和time
    // console.log(location.state)

    // console.log(splitdate('2023-05-21 上午'))
    var nowmixdate=''

    // const [nowmixdate,setnowmixdate] = useState('')
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
    let [options, setoptions] = useState([]);


    const date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = (month > 9) ? month : ("0" + month);
    day = (day < 10) ? ("0" + day) : day;
    var today = year + "-" + month + "-" + day;

    useEffect(() => {
        if(location.state !== null){
            console.log('location != null')
            console.log(location.state)
            // console.log()

            axios.post('/treatment/getWorkShiftInfo/',JSON.stringify(
                {
                    //doctorID需要从header获取
                    doctorID:parseInt(localStorage.getItem("doctorID")),
                    date:today
                }
            ))
            .then(res=>{
                if(res.data.code === 1){
                    error(res.data.msg)
                }
                else if(res.data.code ==0 ){
                    console.log(res.data)
                    setshiftlist(res.data.data.shiftList)
                    setoption2(res.data.data.shiftList)
                    var shiftlist2=res.data.data.shiftList
                    // setnowmixdate(mixdate(res.data.data.shiftList[0].date,res.data.data.shiftList[0].time))
                    console.log(nowmixdate)
                    console.log('2')

                }
            })

            axios.post('/treatment/getPatientList/',JSON.stringify({
                doctorID:parseInt(localStorage.getItem("doctorID")),
                date:location.state.date,
                time:location.state.time
            }))
            .then(res=>{
                console.log(res)
                if(res.data.code === 0){
                    patientlist=res.data.data.patientList
                    let temcards = patientlist.map((item,index)=>{
                        return (
                            <Col span={8} >
                            <Card bordered={true} key={item.patientID} style={{borderRadius: 20, 'box-shadow': '4px 4px 15px 0 rgba(0,0,0,0.1)'}}>
                            <span style={{paddingTop:-110, fontSize: 18, fontWeight: "bold"}}>{item.name}</span>
                            <Divider dashed />
                            <span style={{paddingTop:-110}}>预约时间：{gettime(index,location.state.time)}</span>
                            <span style={{fontSize:30 , paddingLeft:130}}>{index+1}</span>
                            <br/>
                            <span style={{paddingTop:-110}}>就诊状态：{getpatientstate(item.isEnd)}</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button
                                        size="large"
                                        shape={"round"}
                                        onClick={()=>{nagivate('/doctorMain/patientHistory',{state:{patientID:item.patientID,date:item.date,patientName:item.name,time:splitdate(nowmixdate).time}})}}>历史诊疗记录</Button>
                                <Button style={{marginLeft: 20}}
                                        type={"primary"}
                                        size="large"
                                        shape={"round"}
                                        disabled={item.isEnd === 1}
                                        onClick={()=>{nagivate('/doctorMain/visitInterface',{state:{appointmentID:item.appointmentID,date:item.date,patientName:item.name,time:splitdate(nowmixdate).time}})}}>开始诊断</Button>
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
                    console.log('1')
                    setshiftlist(res.data.data.shiftList)
                    let temoptions =  shiftlist.map((item,index)=>{
                        return (
                            <Option key={mixdate(item.date,item.time)} value={mixdate(item.date,item.time)}>{mixdate(item.date,item.time)}</Option>
                        )
                    })
                    setoptions(temoptions)
                }
            })

        }
        // console.log(typeof(parseInt(localStorage.getItem("userID"))))
        // console.log(parseInt(localStorage.getItem("userID")))
        else{
            axios.post('/treatment/getWorkShiftInfo/',JSON.stringify(
                {
                    //doctorID需要从header获取
                    doctorID:parseInt(localStorage.getItem("doctorID")),
                    date:today
                }
            ))
            .then(res=>{
                console.log('1')
                console.log(mixdate(res.data.data.shiftList[0].date,res.data.data.shiftList[0].time))
                nowmixdate=mixdate(res.data.data.shiftList[0].date,res.data.data.shiftList[0].time)
                // setnowmixdate2(nowmixdate)
                console.log(nowmixdate)
                if(res.data.code === 1){
                    error(res.data.msg)
                }
                else if(res.data.code ==0 ){
                    console.log(res.data)
                    setshiftlist(res.data.data.shiftList)
                    setoption2(res.data.data.shiftList)
                    var shiftlist2=res.data.data.shiftList
                    // setnowmixdate(mixdate(res.data.data.shiftList[0].date,res.data.data.shiftList[0].time))
                    console.log(nowmixdate)
                    console.log('2')
                    //初始化card
                    axios.post('/treatment/getPatientList/',JSON.stringify({
                        doctorID:parseInt(localStorage.getItem("doctorID")),
                        date:res.data.data.shiftList[0].date,
                        time:res.data.data.shiftList[0].time
                    }))
                    .then(res=>{
                        console.log(res)
                        console.log('start card')
                        if(res.data.code === 0){
                            patientlist=res.data.data.patientList
                            console.log(patientlist)
                            let temcards = patientlist.map((item,index)=>{
                                return (
                                    <Col span={8} >
                                        <Card bordered={true} key={item.patientID} style={{borderRadius: 20, 'box-shadow': '4px 4px 15px 0 rgba(0,0,0,0.1)'}}>
                                        <span style={{paddingTop:-110, fontSize: 18, fontWeight: "bold"}}>{item.name}</span>
                                        <Divider dashed />
                                        <span style={{paddingTop:-110}}>预约时间：{gettime(index,shiftlist2[0].time)}</span>
                                        <span style={{fontSize:30, paddingLeft:130}}>{index+1}</span>
                                        <br/>
                                        <span style={{paddingTop:-110}}>就诊状态：{getpatientstate(item.isEnd)}</span>
                                        <div style={{textAlign:'center',marginTop:10}}>
                                            <Button
                                                    size="large"
                                                    shape={"round"}
                                                    onClick={()=>{nagivate('/doctorMain/patientHistory',{state:{patientID:item.patientID,date:item.date,patientName:item.name,time:splitdate(nowmixdate).time}})}}>历史诊疗记录</Button>
                                            <Button style={{marginLeft: 20}}
                                                    type={"primary"}
                                                    size="large"
                                                    shape={"round"}
                                                    disabled={item.isEnd === 1}
                                                    onClick={()=>{nagivate('/doctorMain/visitInterface',{state:{appointmentID:item.appointmentID,date:item.date,patientName:item.name,time:splitdate(nowmixdate).time}})}}>开始诊断</Button>
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
            })
        }

    }, []);

    let [nowmixdate2,setnowmixdate2] = useState(`${nowmixdate}`)
    // console.log(nowmixdate2)

    async function setoption2 (temlist){
        console.log(temlist)
        let temoptions = temlist.map((item,index)=>{
            return (
                <Option key={mixdate(item.date,item.time)} value={mixdate(item.date,item.time)}>{mixdate(item.date,item.time)}</Option>
            )
        })
        console.log(temoptions)
        setoptions(temoptions)
    }

    const [cards,setcards] = useState([])

    if(location.state !== null){
        backdate = location.state.date
        nowmixdate=mixdate(location.state.date,location.state.time)
        //初始渲染时，获取对应时间病人信息
        console.log(localStorage)
        console.log('this is localstorage')
        axios.post('/treatment/getPatientList/',JSON.stringify({
            doctorID:parseInt(localStorage.getItem("doctorID")),
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

    function gettime(temindex,temtime){
        let i = parseInt(temindex/6)
        let j = temindex%6
        let backdata1
        let backdata2
        let i1

        if( temtime == 0){
             i1 = i + 8
        }
        else{
             i1 = i + 14
        }
        let j1 = j*10

        if(j == 0){
            backdata1 = i1.toString() + ':00'
            backdata2 =i1.toString() + ':10'
        }
        else if(j == 1){
            backdata1 = i1.toString() + ':10'
            backdata2 =i1.toString() + ':20'
        }
        else if(j == 2){
            backdata1 = i1.toString() + ':20'
            backdata2 =i1.toString() + ':30'
        }
        else if(j == 3){
            backdata1 = i1.toString() + ':30'
            backdata2 =(i1+1).toString() + ':40'
        }
        else if(j == 4){
            backdata1 = i1.toString() + ':40'
            backdata2 =(i1+1).toString() + ':50'
        }
        else if(j == 5){
            backdata1 = i1.toString() + ':50'
            backdata2 =(i1+1).toString() + ':00'
        }
        // backdata = i1.toString() + ':'+j1.toString()
        console.log(temindex)
        console.log(i,j)
        console.log(backdata1)
        return (backdata1+'-'+backdata2)
    }

    function handleChange(value) {
        // console.log(`selected ${value}`);
        nowmixdate=value
        console.log(nowmixdate)
        axios.post('/treatment/getPatientList/',JSON.stringify({
            doctorID:parseInt(localStorage.getItem("doctorID")),
            date:splitdate(nowmixdate).date,
            time:splitdate(nowmixdate).time
        }))
        .then(res=>{
            console.log(res)
            if(res.data.code === 0){
                patientlist=res.data.data.patientList
                let temcards = patientlist.map((item,index)=>{
                    return (
                        <Col span={8} >
                            <Card bordered={true} key={item.patientID} style={{borderRadius: 20, 'box-shadow': '4px 4px 15px 0 rgba(0,0,0,0.1)'}}>
                            <span style={{paddingTop:-110, fontSize: 18, fontWeight: "bold"}}>{item.name}</span>
                            <Divider dashed />
                            <span style={{paddingTop:-110}}>预约时间：{gettime(index,splitdate(value).time)}</span>
                            <span style={{fontSize:30 , paddingLeft:130}}>{index+1}</span>
                            <br/>
                            <span style={{paddingTop:-110}}>就诊状态：{getpatientstate(item.isEnd)}</span>
                            <div style={{textAlign:'center',marginTop:10}}>
                                <Button
                                        size="large"
                                        shape={"round"}
                                        onClick={()=>{nagivate('/doctorMain/patientHistory',{state:{patientID:item.patientID,date:item.date,patientName:item.name,time:splitdate(nowmixdate).time}})}}>历史诊疗记录</Button>
                                <Button style={{marginLeft: 20}}
                                        type={"primary"}
                                        size="large"
                                        shape={"round"}
                                        disabled={item.isEnd === 1}
                                        onClick={()=>{nagivate('/doctorMain/visitInterface',{state:{appointmentID:item.appointmentID,date:item.date,patientName:item.name,time:splitdate(nowmixdate).time}})}}>开始诊断</Button>
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
    console.log('return')
    console.log(nowmixdate)
    console.log(nowmixdate2)

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
                <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>预约患者</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                <span style={{margin: '10px 0'}}>请选择所要查看的时间段</span>
                    <Select defaultValue="近期患者" style={{ width: 200 ,margin:'0 0 2vh 50vw'}} onChange={handleChange}>
                        {/* <Option value="6-8 周四 上午">6-8 周四 上午</Option>
                        <Option value="6-8 周四 下午">6-8 周四 下午</Option>
                        <Option value="6-10 周六 上午">6-10 周六 上午</Option> */}
                        {options}
                    </Select>
                </div>
                <Content
                style={{
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
            </div>
            </Layout>
    );
}

export default PatientAppointment
