import {Button,Layout,Menu, Breadcrumb,Select,Input,List,InputNumber,message} from 'antd'
import { useLocation, useNavigate ,Outlet } from 'react-router-dom';
import { Center} from '@chakra-ui/react';

const { Option } = Select;
const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

let data = [
    {
        id:'1',
        name:'阿司匹林'
    },
    // {
    //     id:'2',
    //     name:'阿司匹林'
    // },
    // {
    //     id:'3',
    //     name:'阿司匹林'
    // },
    // {
    //     id:'4',
    //     name:'阿司匹林'
    // },
  ];

let data2 = [
    {
        id:'1',
        name:'CT'
    }
]

let value1=''

function VisitInterface(){
    const nagivate = useNavigate()
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    function onChange(value) {
        console.log('changed', value);
    }  

    const success = () => {
        message.success('您的申请已成功提交，管理员会在24小时内进行审批！');
        console.log(value1)
      };

    function deleteItem(id) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data.splice(i,1)
                let data1 = data
                data=data1
            }
        }
        console.log('success')
        console.log(data)
    }

    function sendvalue(e){
        value1=e.target.value
    }
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>就诊</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <span style={{fontSize:30}}>患者姓名</span>           
                </div>
                <Content
                style={{
                    background: 'white',
                    padding: 24,
                    margin: 0,
                    minHeight: 600,
                }}
                >
                    <span>本次就诊症状：</span>
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
                                    <span>盒</span>
                                </div>
                                <Button type="primary" shape="circle" onClick={()=>deleteItem(item.id)} >test</Button>
                            </List.Item>
                            )}
                        />
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
                                    <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                                    <span>次</span>
                                </div>
                                <Button type="primary" shape="circle" onClick={()=>deleteItem(item.id)} >test</Button>
                            </List.Item>
                            )}
                        />
                    </div>

                    <span>医嘱：</span>
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