import {Button,Layout,Menu, Breadcrumb ,Select ,Input} from 'antd'
import { Upload, Icon, Modal ,message ,Radio} from 'antd';
import { useLocation, useNavigate,Outlet} from 'react-router-dom';

import axios from 'axios'

import PicturesWall from './pictureWall';
import MyRadio from './myradio';
import { useState } from 'react';

const { SubMenu } = Menu;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content, Sider } = Layout;

function ApplyVacation(){
    const nagivate = useNavigate()
    const location = useLocation()

    let type=0
    let reason=''
    const [shiftlist,setshiftlist] = useState()
    const [shiftID,setshiftID] = useState()


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
            doctorID:1,
            date:today
        }
    ))
    .then(res=>{
        // console.log(res)
        if(res.data.code === 1){
            error(res.data.msg)
        }
        else if(res.data.code == 0 ){
            setshiftlist(res.data.data.shiftList)
            var temoptions =  res.data.data.shiftList.map((item,index)=>{
                return (
                    <Option value={mixdate(item.date,item.time)}>{mixdate(item.date,item.time)}</Option>
                )
            })
            setoptions(temoptions)
        }
    })

    const success = () => {
        message.success('您的申请已成功提交，管理员会在24小时内进行审批！');
        console.log(type)

        //尝试部分：成功
        let senddata=JSON.stringify(
            {
                shiftID:shiftID,
                type:type,
                reason:reason
            }
        )
        console.log(senddata)
        axios.post('/treatment/applyLeave/',senddata)
        .then(res=>{
            console.log(success)
            console.log(res)
        })
      };
      
    const error = (msg) => {
        message.error(msg);
      };

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

    function handleChange(value) {
        console.log(`selected ${value}`);
        let temdate=splitdate(value).date
        console.log(shiftlist)
        console.log(typeof(temdate))
        for(let i=0;i<shiftlist.length;i++){
            if(temdate == shiftlist[i].date){
                setshiftID(shiftlist[i].id)
            }
        }
      }

    function onChange(value) {
        reason=value.target.value
        console.log(reason) 
    };

    function sendType(temtype){
        if(temtype == '病假'){
            type=0
        }
        else{
            type=1
        }
    }

    const [options,setoptions] = useState()


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
                        {/* <Option value="6-8 周四 上午">6-8 周四 上午</Option>
                        <Option value="6-8 周四 下午">6-8 周四 下午</Option>
                        <Option value="6-10 周六 上午">6-10 周六 上午</Option> */}
                        {options}
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
                <TextArea rows={6} placeholder='请输入理由' onChange={onChange}></TextArea>
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