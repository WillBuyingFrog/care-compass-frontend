/**
 * 后台管理/平台概况
 */
import './info.css';
import { Avatar } from '@chakra-ui/react'
import { Card, Row, Col } from 'antd';
import * as echarts from 'echarts'
import { Component, useEffect, useState } from 'react';
import { TeamOutlined, RiseOutlined, BookOutlined, HomeOutlined, PieChartOutlined, VerifiedOutlined } from '@ant-design/icons'
import axios from 'axios';
const { Meta } = Card;

function separator(numb) {
    if(numb == 0) return "0"
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

class Cards extends Component{
    render(){
        return (
            <Card style={{width: 330}} className={this.props.class}>
            <Meta
                avatar={<Avatar size="md" bg={this.props.color} icon={this.props.icon}/>}
                title={this.props.title}
                description={this.props.num != undefined && this.props.num != null && separator(this.props.num)}
                />
            </Card>
        )
    }

}
function Info(){
    const [num, setNum] = useState({});

   //  useEffect(() => {
   //
   {/* const getNum = ()=>{*/}
   //      axios({
   //          method: "post",
   //          url:"/manage/info"
   //        })
   //        .then(res => {
   //            console.log(res.data)
   //            setNum(res.data.data)
   //          }
   //        )
   //  }
   //  getNum();
   // }, []);

    return(
        <div className='info'>
            <div className='totalTitle'>平台基本信息</div>
            <Row>
                <Col span={16}>
                    <Row gutter={15} wrap={true}>
                        <Col span={12}>
                            <Cards title="注册用户数量" color="#422AFB"
                            num={0} icon={<TeamOutlined/>} class="user"/>
                        </Col>
                        <Col span={12}>
                            <Cards title="领域总数" color="#805AD5"
                            num={0} icon={<PieChartOutlined />} class="field"/>
                        </Col>
                    </Row>
                    <Row gutter={15} wrap={true}>
                        <Col span={12}>
                            <Cards title="学者总数" color="#56C3FF"
                            num={0} icon={<RiseOutlined />} class="sch"/>
                        </Col>
                        <Col span={12}>
                            <Cards title="已入驻学者数" color="#00B5D8"
                            num={0} icon={<VerifiedOutlined />} class="ident"/>
                        </Col>
                    </Row>
                    <Row gutter={15} wrap={true}>
                        <Col span={12}>
                            <Cards title="文献总数" color="#01B574"
                            num={0} icon={<BookOutlined />} class="paper"/>
                        </Col>
                        <Col span={12}>
                            <Cards title="机构总数" color="#319795"
                            num={0} icon={<HomeOutlined/>} class="search"/>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <div style={{marginTop:200}}><img src={require('../../assets/doctors.png')}></img></div>
                </Col>
            </Row>

        </div>
    )
}

export default Info;
