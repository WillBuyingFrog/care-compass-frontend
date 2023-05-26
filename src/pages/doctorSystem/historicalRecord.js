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

function HistoricalRecord(){
    const location = useLocation()
    const nagivate = useNavigate()

    function mixdate(date,time){
        if(time == 0){
            return date+' 上午'
        }
        else{
            return date+' 下午'
        }
    }

    function getPrescriptionList(templist){
        let endlist = []
        for(let i=0;i<templist.length;i++){
            let temdata = {
                name:templist[i].inspectionName,
                id:i,
                description:templist[i].description
            }
            endlist.push(temdata)
        }
        return endlist
    }

    function getInspectionList(templist){
        let endlist = []
        for(let i=0;i<templist.length;i++){
            let temdata = {
                name:templist[i].prescriptionName,
                id:i,
                num:templist[i].prescriptionNum,
                description:templist[i].description
            }
            endlist.push(temdata)
        }
        return endlist
    }
    
    let item = location.state.item
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>历史病历</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <span style={{fontSize:30}}>{location.state.patientName+"      "+mixdate(location.state.item.date,location.state.item.time)}</span> 
                    <Button style={{marginLeft:1200}} onClick={()=>{nagivate('/doctorMain/patientHistory',{ state: { patientID:location.state.patientID }})}}>返回历史病历界面</Button>          
                </div>
                <Content
                style={{
                    background: 'white',
                    padding: 24,
                    margin: 0,
                    minHeight: 600,
                }}
                >


                    <span>本次就诊症状*：</span>
                    <br/>
                    <TextArea rows={6} defaultValue={location.state.item.description} disabled></TextArea>
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
                    <PrescriptionList msg={getPrescriptionList(item.prescriptionList)} disabled/>
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
                    <InspectList msg={getInspectionList(item.inspectionList)} disabled/>

                    <span>医嘱*：</span>
                    <br/>
                    <TextArea rows={6} defaultValue={item.diagnose} disabled></TextArea>
                    <div style={{textAlign:'center',marginTop:10}}>
                                <span>{'就诊医生：'+item.doctorName}</span>
                            </div>
                </Content>
            </Layout>
    )
}

export default HistoricalRecord