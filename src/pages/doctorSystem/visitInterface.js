import {Button,Layout,Menu, Breadcrumb,Select,Input,List,InputNumber,message} from 'antd'
import { useLocation, useNavigate ,Outlet } from 'react-router-dom';
import { Center} from '@chakra-ui/react';
import PrescriptionList from './list/prescriptionList'
import InspectList from './list/inspectList';
import axios from 'axios';
import React from 'react';

const { Option } = Select;
const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

let children1 = [];
let children2 = [];



let value1=''
let value2=''
let recordID=0

function VisitInterface(){
    const nagivate = useNavigate()
    const location = useLocation()

    let patientName = ''
    let data = [

      ];

    let data2 = [

    ]

    if(location.state !== null){
        patientName = location.state.patientName
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
        console.log(value)
        // 远程链接
        // if(value.length>=2){
        //     axios.post('/treatment/searchPrescription/',JSON.stringify({msg:value}))
        //     .then(res=>{
        //         console.log(res.data.data.prescriptionList)
        //         let templist=res.data.data.prescriptionList
        // children1=[]
        // for (let i =0; i < templist.length; i++) {
        //     children1.push(<Option key={templist[i].id}>{templist[i].name}</Option>);
        //   }
        //     })
        // }

        //测试数据
        children1=[]
        let templist=[{
            id:0,
            name:'h'
        },
        {
            id:2,
            name:'l'
        },
        ]
        for (let i =0; i < templist.length; i++) {
            children1.push(<Option key={templist[i].id}>{templist[i].name}</Option>);
        }
        console.log(children1)
    }

    function handleChange2(value) {
        console.log(`selected ${value}`);
    }
    function onChange(value) {
        console.log('changed', value);
    }

    const success = () => {
        console.log('data')
        console.log(data)
        console.log('data2')
        console.log(data2)
        axios.post('/treatment/createMedicalRecord/',JSON.stringify({
            appointID: location.state.appointID,
            description:value1,
            diagnose:value2
        }))
        .then(res=>{
            if(res.data.code === 0){
                recordID=res.data.data.recordID
                for(let i=0; i<data.length;i++){
                    axios.post('/treatment/createPrescriptionForm/',JSON.stringify({
                        recordID:recordID,
                        prescriptionID:data[i].id,
                        num:data[i].num,
                        description:data[i].description
                    }))
                }

                for(let i=0;i<data2.length;i++){
                    axios.post('/treatment/createInspectionForm/',JSON.stringify({
                        recordID:recordID,
                        inspectionID:data2[i].id,
                        description:data2[i].description
                    }))
                }
            }
            else{
                message.error(res.data.message)
            }
        }
        )
        message.success('病人就诊信息已成功保存！');
      };

    function deleteItem(id) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                let temporarydata = [...data]
                temporarydata.splice(i,1)
                data=temporarydata
            }
        }
        console.log('success')
        console.log(data)
    }

    function sendvalue(e){
        value1=e.target.value
    }

    function sendvalue2(e){
        value2=e.target.value
    }

    function sendPrescriptionData(temdata){
        console.log('get')
        data=temdata
    }

    function sendInspectData(temdata){
        console.log('get')
        data2=temdata
    }

    function getPrescription(temdata,id){
        if(temdata!==null){
            console.log('get it')
            data.push({
                id:id,
                name:temdata,
                description:'',
                num:1
            })
            console.log('now is not null')
            return (
                <PrescriptionList msg={data} senddata={sendPrescriptionData}/>
            )
        }
        else{
            console.log('now is not null')
            return (
                <PrescriptionList msg={data} senddata={sendPrescriptionData}/>
            )
        }
    }

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
                <Breadcrumb.Item>就诊</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <span style={{fontSize:30}}>{patientName}</span>
<<<<<<< HEAD
                    <Button style={{marginLeft:1200}} onClick={()=>{nagivate('/doctorMain/patientAppointment',{ state: { date:location.state.date ,time:location.state.time}})}}>返回预约界面</Button>
=======
                    <Button style={{marginLeft:'60vw'}}
                            size="large"
                            shape={"round"}
                            onClick={()=>{nagivate('/doctorMain/patientAppointment',{ state: { date:location.state.date }})}}>返回预约界面</Button>
>>>>>>> e33e9e49ab6f45d0d779fdf24b67d80b53333f5d
                </div>
                <Content
                style={{
                    padding: '24px 0',
                    margin: 0,
                    minHeight: 600,
                }}
                >
                    <span style={{fontSize: 16}}>本次就诊症状*：</span>
                    <br/>
                    <TextArea rows={6} placeholder='请输入症状' onChange={sendvalue}></TextArea>
                    <br/>
                    <br/>
                    {/* 处方单部分 */}
                    {/* <div>
                        <span>开具处方:</span>
                        <Select showSearch style={{ width: '50%' ,marginLeft:300}} placeholder="Tags Mode" onSearch={handleChange}>
                            {children1}
                        </Select>
                        <MySelect style={{ width: '50%' ,marginLeft:300}} senddata={getPrescription}/>
                        <br/>
                        <br/>
                        <List
                            bordered
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                style={{maxWidth:300}}
                                description={item.name}
                                />
                                <div style={{marginRight:510}}>
                                    <InputNumber min={1} max={10} defaultValue={1} onChange={onChange}/>
                                </div>
                                <Input style={{ width: 150 }}></Input>
                                <Button type="primary" shape="circle" onClick={()=>deleteItem(item.id)} >test</Button>
                            </List.Item>
                            )}
                        />
                        <PrescriptionList msg={data} senddata={sendPrescriptionData}/>
                        {getPrescription(null,null)}
                    </div> */}
                    <PrescriptionList msg={data} senddata={sendPrescriptionData}/>
                    <br/>
                    <br/>
                    {/* <div>
                        <span>开具检查:</span>
                        <Select mode="tags" style={{ width: '50%' ,marginLeft:300}} placeholder="Tags Mode" onChange={handleChange2}>
                            {children2}
                        </Select>
                        <br/>
                        <br/>
                        <List
                            bordered
                            itemLayout="horizontal"
                            dataSource={data2}
                            renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                style={{maxWidth:300}}
                                description={item.name}
                                />
                                <div style={{marginRight:510}}>
                                    <Input style={{ width: 150 }}></Input>
                                </div>
                                <Button type="primary" shape="circle" onClick={()=>deleteItem(item.id)} >test</Button>
                            </List.Item>
                            )}
                        />
                        <InspectList msg={data2} senddata={sendInspectData}/>
                    </div> */}
                    <InspectList msg={data2} senddata={sendInspectData}/>

                    <span style={{fontSize: 16}}>医嘱*：</span>
                    <br/>
                    <TextArea rows={6} placeholder='请输入医嘱' onChange={sendvalue2}></TextArea>
                    <div style={{textAlign:'center',marginTop:10}}>
                                <Button onClick={success}>提交</Button>
                            </div>
                </Content>
            </div>
            </Layout>
    )
}

export default VisitInterface
