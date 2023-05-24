import './board.css';
import './manage.css';
import { Avatar } from '@chakra-ui/react'
import { Card, Row, Col } from 'antd';
import * as echarts from 'echarts'
import { Component, useEffect, useState } from 'react';
import { TeamOutlined, RiseOutlined, HomeOutlined, DatabaseOutlined, StockOutlined, IdcardOutlined } from '@ant-design/icons'
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
function Board(){
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
            <div className='totalTitle'>医院基本信息</div>
            <Row>
                <Col span={16}>
                    <Row gutter={15} wrap={true}>
                        <Col span={12}>
                            <Cards title="注册患者数量" color="#422AFB"
                                   num={0} icon={<TeamOutlined/>} class="user"/>
                        </Col>
                        <Col span={12}>
                            <Cards title="科室总数" color="#805AD5"
                                   num={0} icon={<HomeOutlined />} class="field"/>
                        </Col>
                    </Row>
                    <Row gutter={15} wrap={true}>
                        <Col span={12}>
                            <Cards title="医生总数" color="#56C3FF"
                                   num={0} icon={<IdcardOutlined />} class="sch"/>
                        </Col>
                        <Col span={12}>
                            <Cards title="药品总数" color="#00B5D8"
                                   num={0} icon={<DatabaseOutlined />} class="ident"/>
                        </Col>
                    </Row>
                    <Row gutter={15} wrap={true}>
                        <Col span={12}>
                            <Cards title="可提供检查总数" color="#01B574"
                                   num={0} icon={<StockOutlined />} class="paper"/>
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

export default Board;
