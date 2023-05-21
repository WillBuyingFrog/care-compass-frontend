import {Box, Text} from "@chakra-ui/react";
import {Link as ChakraLink} from "@chakra-ui/react";
import {useState} from "react";

function DoctorName(props) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const linkStyle = {
        color: '#161616',
        fontSize: '30px',
        textDecoration: isHover ? 'underline' : 'none'
    }

    return (
        <Box ml={1}>
            <ChakraLink href={'/'}
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
            >


                <Text noOfLines={1} pt={'30px'} pl={'30px'}>
                    {props.name},{props.title}
                </Text>
            </ChakraLink>
        </Box>
    )

}

function DoctorInfo(props) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleClick = () => {
        window.open('/paperDetails?PID=' + props.PID)
    }

    const linkStyle = {
        color: '#a0a0a0',
        fontSize: '14px',
        cursor: 'pointer',
        textDecoration: isHover ? 'underline' : 'none'
    }
    return(
        <Box ml={1}>
            <ChakraLink
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <Text noOfLines={3} wordBreak={'break-word'} marginRight={'50px'} fontWeight={500}>
                    剩余号源{props.available}
                </Text>
            </ChakraLink>
        </Box>
    )
}

function DoctorCard(props){

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
            <DoctorName name={props.doctor.doctorName} title={props.doctor.doctorTitle}/>
            <DoctorInfo available={props.doctor.available}/>

        </Box>
    )
}

export default DoctorCard;
