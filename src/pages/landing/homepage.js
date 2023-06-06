import React, { useEffect } from "react"
import "./homepage.css"
import { Row, Col } from 'antd';
import { Input, Text, Link ,Box} from "@chakra-ui/react";
import Conferences from "./conferences";
import Papers from "./paper";
import MyHeader from "../../components/header/header";

function Homepage(){
    useEffect(()=>{
        let bg = document.querySelector('#bg')
        let moon = document.querySelector('#moon')
        let mountain = document.querySelector('#mountain')
        let road = document.querySelector('#road')
        let middle = document.querySelector('#middle')
        window.addEventListener('scroll', () => {
            var value = window.scrollY;
            bg.style.top = value * 0.5 + 'px';
            moon.style.left = -value * 0.5 + 'px';
            mountain.style.top = -value * 0.15 + 'px';
            road.style.top = value * 0.15 + 'px';
            middle.style.top = value * 1 + 'px';
        })
    }, [])
    return(
        <Box>
        <MyHeader></MyHeader>
        <div className="homepage">
            <section>
                <img
                    src={require("../../assets/bg.jpg")}
                    id="bg"
                />
                <img
                    src={require("../../assets/moon.png")}
                    id="moon"
                />
                <img
                    src={require("../../assets/mountain.png")}
                    id="mountain"
                />
                <img
                    src={require("../../assets/road.png")}
                    id="road"
                />
                <div id="middle">
                    <Text className="text1" fontWeight={'extrabold'}>
                        CareCompass
                    </Text>
                    <Text className="text2" fontWeight={'extrabold'}>
                        Your Compass Towards Health Care.
                    </Text>
                </div>
            </section>
            <div className="recomand">
                {/*<Header1></Header1>*/}
                <Row style={{marginTop:30}}>
                    <Text fontWeight={"extrabold"} color="#ffffff" fontSize="55px">公告栏</Text>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={16}><Papers  title="就医须知" type={0}></Papers></Col>
                    <Col span={8}><img src={require("../../assets/doctors.png")} style={{marginTop:90}}></img></Col>
                </Row>
                <Row gutter={30} style={{marginTop:30}}>
                    <Col span={8}><img src={require("../../assets/doctors.png")} style={{marginTop:90}}></img></Col>
                    <Col span={16}><Papers  title="健康科普" type={1}></Papers></Col>
                </Row>
                {/*<Row gutter={30} style={{marginTop:30}}>*/}
                {/*    <Col span={16}><Conferences url="/frogRecommendConferences" title="热门会议"></Conferences> </Col>*/}
                {/*    <Col span={8}><img src={require("../../assets/homepage2.png")} style={{marginTop:90}}></img></Col>*/}
                {/*</Row>*/}
            </div>
        </div>
        </Box>
    )
}

export default Homepage
