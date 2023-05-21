import {Button,Layout,Menu, Breadcrumb ,Select ,Input} from 'antd'
import { Upload, Icon, Modal } from 'antd';
import { useLocation, useNavigate,Outlet,useSearchParams} from 'react-router-dom';

import PicturesWall from './pictureWall';

const { SubMenu } = Menu;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content, Sider } = Layout;

function LeaveDetail(){
    const nagivate = useNavigate()
    const location = useLocation()
    function handleChange(value) {
        console.log(`selected ${value}`);
      }
    console.log(location.state)
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>请假</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                <span style={{fontSize:20}}>原则上仅允许提前三天以上请假，若有特殊情况，请联系管理员进行紧急处理！</span>
                <br/>
                <br/>
                <div>
                <span>请选择请假时间：</span>           
                    <Select defaultValue={location.state.title} style={{ width: 200 ,marginLeft:500}} onChange={handleChange}>
                        <Option value="6-8 周四 上午">6-8 周四 上午</Option>
                        <Option value="6-8 周四 下午">6-8 周四 下午</Option>
                        <Option value="6-10 周六 上午">6-10 周六 上午</Option>
                    </Select>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <span>请说明请假理由：</span>
                <TextArea rows={6} defaultValue={location.state.description} ></TextArea>
                <br/>
                <br/>
                <span>点击添加图片：</span>
                <PicturesWall/>
                <br/>
                <br/>
                <br/>
                <div style={{textAlign:'center',marginTop:10}}>
                                {location.state.state}
                            </div>
                </Content>
            </Layout>
    );
}

export default LeaveDetail