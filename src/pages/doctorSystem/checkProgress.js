import {Button,Layout,Menu, Breadcrumb} from 'antd'
import { List, Avatar } from 'antd';
import { useLocation, useNavigate,Link,Route } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const data = [
    {
      title: '2023 6-8 周四',
      state:'审核中'
    },
    {
      title: '2023 6-8 周四',
      state:'审核中'
    },
    {
      title: '2023 6-8 周四',
      state:'已通过'
    },
    {
      title: '2023 6-8 周四',
      state:'审核中'
    },
  ];

function CheckProgress(){
    const nagivate = useNavigate()
    const location = useLocation()
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>医生系统</Breadcrumb.Item>
                <Breadcrumb.Item>查看请假进度</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                <span style={{fontSize:30}}>我的请假</span>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        style={{maxWidth:300}}
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={item.title}
                        description="本人由于当天家中有要事参加，不能进行照常就诊，特测请假…………"
                        />
                        <div>
                            {item.state}
                        </div>
                        <Button onClick={()=>{nagivate('/doctorMain/leaveDetail',{ state: { title:item.title,state:item.state ,description:"本人由于当天家中有要事参加，不能进行照常就诊，特测请假…………"}})}}>查看详情</Button>
                    </List.Item>
                    )}
                />
                </Content>
            </Layout>
    );
}

export default CheckProgress