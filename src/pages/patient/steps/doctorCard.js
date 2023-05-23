import {Box, Center, Text} from "@chakra-ui/react";
import {Link as ChakraLink} from "@chakra-ui/react";
import {useState} from "react";
import {Button, Col, Row} from "antd";

function DoctorInfo(props) {

    const nameStyle = {
        color: '#161616',
        fontSize: '28px',
        marginRight: '5px'
    }

    const titleStyle = {
        color: '#a0a0a0',
        fontSize: '16px',
    }

    return (
        <Box ml={1} mt={5} mb={3}>
            <span style={nameStyle}>
                {props.name}
            </span>
            <span style={titleStyle}>
                {props.title}
            </span>
        </Box>
    )
}

function DoctorAppointment(props){

    const appointmentLabelStyle = {
        color: '#a0a0a0',
        fontSize: '14px',
        verticalAlign: 'baseline'
    }

    const appointmentAvailableStyle = {
        marginLeft: '10px',
        // 设置文字颜色为橙色
        color: '#ff8c00',
        fontWeight: 'bold',
        fontSize: '20px',
        verticalAlign: 'baseline'
    }

    return (
        <div>
            <Row>
                <Col span={3} />
                <Col span={18}>
                    {
                        props.doctor.morningAvailable !== -1 ? (
                            <Row>
                                <Col span={12}>
                                    <span style={appointmentLabelStyle}>
                                        上午
                                    </span>
                                    <span style={appointmentAvailableStyle}>
                                        余 {props.doctor.morningAvailable}
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <div style={{float: 'right'}}>
                                        <Center>
                                            <span style={appointmentAvailableStyle}>
                                                ¥ {props.doctor.morningPrice}
                                            </span>
                                            <Button
                                                type="primary" shape="round" size='small'
                                                style={{'marginLeft': '10px'}}
                                                onClick={() => {
                                                    props.handleClickAppointment(props.doctor, props.periodKey, 0)
                                                }}
                                            >
                                                预约
                                            </Button>
                                        </Center>
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            <div>

                            </div>
                        )
                    }
                </Col>
                <Col span={3} />
                <Col span={3} />
                <Col span={18}>
                    {
                        props.doctor.afternoonAvailable !== -1 ? (
                            <Row>
                                <Col span={12}>
                                    <span style={appointmentLabelStyle}>
                                        下午
                                    </span>
                                    <span style={appointmentAvailableStyle}>
                                        余 {props.doctor.afternoonAvailable}
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <div style={{float: 'right'}}>
                                        <Center>
                                            <span style={appointmentAvailableStyle}>
                                                ¥ {props.doctor.afternoonPrice}
                                            </span>
                                            <Button
                                                type="primary" shape="round" size='small'
                                                style={{'marginLeft': '10px'}}
                                                onClick={() => {
                                                    props.handleClickAppointment(props.doctor, props.periodKey, 1)
                                                }}
                                            >
                                                预约
                                            </Button>
                                        </Center>
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            <div>

                            </div>
                        )
                    }
                </Col>
            </Row>
        </div>
    )
}


function DoctorCard(props){

    const handleClickAppointment = (doctor, periodKey, isAfternoon) => {
        props.setSelectedDoctor(doctor);
        props.setSelectedPeriod((periodKey - 1) * 2 + (isAfternoon ? 2 : 1));
        props.showConfirmDrawer();
    }


    return (
        <Box
            width={'100%'}
            borderWidth={'5'}
            borderRadius={'7'}
            borderStyle={'solid'}
            color={'#E2E8F0'}
            boxShadow={'4px 4px 15px 0 rgba(0,0,0,0.1)'}
            backgroundColor={'#ffffff'}
            pl={3} pr={3} pt={2} pb={2} mt={4}
        >
            <DoctorInfo name={props.doctor.doctorName} title={props.doctor.doctorTitle} />
            <DoctorAppointment
                doctor={props.doctor}
                periodKey={props.periodKey}
                handleClickAppointment={handleClickAppointment}
            />
        </Box>
    )
}

export default DoctorCard;
