import {Button,Layout,Menu, Breadcrumb,message} from 'antd'
import { List, Avatar } from 'antd';
import axios from 'axios';
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

    let leavelist=[]
    let shiftlist=[]

    const date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = (month > 9) ? month : ("0" + month);
    day = (day < 10) ? ("0" + day) : day;
    var today = year + "-" + month + "-" + day;
    
    axios.post('/treatment/getWorkShiftInfo/',JSON.stringify(
        {
            //doctorID需要从header获取
            doctorID:0,
            date:today
        }
    ))
    .then(res=>{
        console.log(res)
        if(res.data.code === 1){
            message.error(res.data.msg)
        }
        else if(res.data.code ==0 ){
            shiftlist = res.data.data.shiftList
        }
    })
    axios.post('/treatment/getDocAllLeave/',JSON.stringify({
      //从header拿
      doctorID:0
    }))
    .then(res=>{
      if(res.data.code == 0){
        leavelist = res.data.data.leeaveList
      }
      else{
        message.error(res.data.msg)
      }
    })

    function mixdate(date,time){
      if(time == 0){
          return date+' 上午'
      }
      else{
          return date+' 下午'
      }
    }

    function getdate(temshiftID){
      for(let i=0;i<shiftlist.length;i++){
        if(temshiftID == shiftlist[i].id){
          return mixdate(shiftlist[i].date,shiftlist[i].time)
        }
        else{
          return ''
        }
      }
    }

    function getstate(temstate){
      if(temstate == 0){
        return '待审核'
      }
      else if(temstate == 1){
        return '审核通过'
      }
      else{
        return '审核不通过'
      }
    }
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
                    dataSource={leavelist}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        style={{maxWidth:300}}
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={getdate(item.doctorShiftID)}
                        description={item.reason}
                        />
                        <div>
                            {getstate(item.state)}
                        </div>
                        <Button onClick={()=>{nagivate('/doctorMain/leaveDetail',{ state: { type:item.type,title:getdate(item.doctorShiftID),state:getstate(item.state) ,description:item.reason}})}}>查看详情</Button>
                    </List.Item>
                    )}
                />
                </Content>
            </Layout>
    );
}

export default CheckProgress