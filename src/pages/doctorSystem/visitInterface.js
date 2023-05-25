import {Button,Layout,Menu, Breadcrumb,Select,Input,List,InputNumber,message} from 'antd'
import { useLocation, useNavigate ,Outlet } from 'react-router-dom';
import { Center} from '@chakra-ui/react';
import PrescriptionList from './list/prescriptionList'
import InspectList from './list/inspectList';

const { Option } = Select;
const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


let value1=''

function VisitInterface(){
    const nagivate = useNavigate()
    const location = useLocation()

    let data = [
        {
            id:'1',
            name:'阿司匹林',
            description:'',
            num:1
        },
        {
            id:'2',
            name:'阿司匹林',
            description:'',
            num:1
        },
        {
            id:'3',
            name:'阿司匹林',
            description:'',
            num:1
        },
        {
            id:'4',
            name:'阿司匹林',
            description:'',
            num:1
        },
      ];

    let data2 = [
        {
            id:'1',
            name:'CT',
            description:''
        },
        {
            id:'2',
            name:'CT',
            description:''
        },
        {
            id:'3',
            name:'CT',
            description:''
        },
        {
            id:'4',
            name:'CT',
            description:''
        }
    ]

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    function onChange(value) {
        console.log('changed', value);
    }  

    const success = () => {
        message.success('病人就诊信息已成功保存！');
        console.log('data')
        console.log(data)
        console.log('data2')
        console.log(data2)
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

    function sendPrescriptionData(temdata){
        console.log('get')
        data=temdata
    }

    function sendInspectData(temdata){
        console.log('get')
        data2=temdata
    }

    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>就诊</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <span style={{fontSize:30}}>{location.state.patientName}</span> 
                    <Button style={{marginLeft:1200}} onClick={()=>{nagivate('/doctorMain/patientAppointment',{ state: { date:location.state.date }})}}>返回预约界面</Button>          
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
                    <TextArea rows={6} placeholder='请输入症状' onChange={sendvalue}></TextArea>
                    <br/>
                    <br/>
                    {/* 处方单部分 */}
                    <div>
                        <span>开具处方:</span>
                        <Select mode="tags" style={{ width: '50%' ,marginLeft:300}} placeholder="Tags Mode" onChange={handleChange}>
                            {children}
                        </Select>
                        <br/>
                        <br/>
                        {/* <List
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
                        /> */}
                        <PrescriptionList msg={data} senddata={sendPrescriptionData}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <span>开具检查:</span>
                        <Select mode="tags" style={{ width: '50%' ,marginLeft:300}} placeholder="Tags Mode" onChange={handleChange}>
                            {children}
                        </Select>
                        <br/>
                        <br/>
                        {/* <List
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
                        /> */}
                        <InspectList msg={data2} senddata={sendInspectData}/>
                    </div>

                    <span>医嘱*：</span>
                    <br/>
                    <TextArea rows={6} placeholder='请输入医嘱'></TextArea>
                    <div style={{textAlign:'center',marginTop:10}}>
                                <Button onClick={success}>提交</Button>
                            </div>
                </Content>
            </Layout>
    )
}

export default VisitInterface