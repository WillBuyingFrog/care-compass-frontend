import {Button,Layout,Menu, Breadcrumb ,Select ,Input} from 'antd'
import { Upload, Icon, Modal ,message ,Radio} from 'antd';
import { useLocation, useNavigate,Outlet} from 'react-router-dom';

import PicturesWall from './pictureWall';
import MyRadio from './myradio';

const { SubMenu } = Menu;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content, Sider } = Layout;

function ApplyVacation(){
    const nagivate = useNavigate()
    const location = useLocation()

    let type=''

    const success = () => {
        message.success('您的申请已成功提交，管理员会在24小时内进行审批！');
        console.log(type)
      };
      
    const error = () => {
        message.error('This is an error message');
      };

    function handleChange(value) {
        console.log(`selected ${value}`);
      }

    function onChange(value) {
        console.log(value.target.value);
        type=value.target.value
    };

    function sendType(temtype){
        type=temtype
    }
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
                <span>请选择请假时间*：</span>           
                    <Select defaultValue="" style={{ width: 200 ,marginLeft:500}} onChange={handleChange}>
                        <Option value="6-8 周四 上午">6-8 周四 上午</Option>
                        <Option value="6-8 周四 下午">6-8 周四 下午</Option>
                        <Option value="6-10 周六 上午">6-10 周六 上午</Option>
                    </Select>
                </div>
                <br/>
                <br/>
                <span>请选择请假类型*：</span>   
                {/* <Radio.Group onChange={(e)=>onChange(e)} value={type} buttonStyle='solid'>
                    <Radio value={'1'}>事假</Radio>
                    <Radio value={'2'}>病假</Radio>
                </Radio.Group> */}
                <MyRadio senddata={sendType}/>
                <br/>
                <br/>
                <span>请说明请假理由*：</span>
                <TextArea rows={6} placeholder='请输入理由'></TextArea>
                <br/>
                <br/>
                <span>点击添加图片：</span>
                <PicturesWall/>
                <br/>
                <br/>
                <br/>
                <div style={{textAlign:'center',marginTop:10}}>
                                <Button onClick={success}>提交</Button>
                            </div>
                </Content>
            </Layout>
    );
}

export default ApplyVacation