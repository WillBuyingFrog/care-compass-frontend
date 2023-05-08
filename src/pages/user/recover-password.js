import {
    Box,
    Button,
    Center, Checkbox, Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input, Link,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react'
import Header from "../../components/header/header";

import loginImg from '../../assets/login_img.jpg'
import {useState} from "react";
import axios from "axios";

async function sendRecoverEmail(email){
    let ret = 0;
    await axios.get('/user/sendRecoverEmail', {
        params: {
            email: email
        }
    })
        .catch((error) => {
            ret = -1;
            console.error({ error });
        });
    console.log(ret)
    return ret;
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};



function RecoverPassword(){

    const [email, setEmail] = useState();

    const handleSendRecoverEmail = async e => {
        if (!validateEmail(email)) {
            alert("邮箱格式错误！");
            return -1;
        }
        let result = await sendRecoverEmail(email);
        if (result !== 0) {
            alert("发送邮件过程出现错误。")
            return -1;
        }
        alert("如果您输入的邮箱已经在AceGate注册过，那么我们将向该邮箱发送找回邮件。")
    }

    return (
        <div>
            <Header textColor={'black'} />
            <Box
                height={'80vh'}
            >
                <Center
                    height={'100%'}
                >
                    <Box
                        width={'50vw'}
                        height={'60vh'}

                        borderRadius={"min(2vw, 18px)"}

                        boxShadow='base'
                    >
                        <SimpleGrid columns={2}>
                            <Box
                                width={'100%'}
                                height={'60vh'}

                                backgroundImage={loginImg}
                                backgroundSize={'fill'}
                                backgroundRepeat={'no-repeat'}
                                backgroundPosition={'center'}

                                borderRadius={"min(2vw, 18px)"}
                            >

                            </Box>
                            <Box>
                                <VStack
                                    spacing={'min(60px, 8vh)'}
                                    width={'74%'}
                                    height={'94%'}
                                    mx={'13%'}
                                >
                                    <Box height={'30px'}/>
                                    <VStack
                                        width={'100%'}
                                    >
                                        <Text fontSize={'32px'} fontWeight={'semibold'}>
                                            找回密码
                                        </Text>
                                    </VStack>
                                    <VStack
                                        width={'100%'}
                                        spacing={'min(15px, 2vh)'}
                                    >
                                        <FormControl id="username">
                                            <FormLabel fontSize={'15px'}>注册账户时使用的邮箱</FormLabel>
                                            <Input type="email" onChange={e => setEmail(e.target.value)} />
                                        </FormControl>
                                    </VStack>
                                    <Button
                                        bg={'#0087FF'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'rgb(0, 160, 255)',
                                        }}
                                        width={'100%'}
                                        onClick={handleSendRecoverEmail}
                                    >
                                        发送找回邮件
                                    </Button>
                                </VStack>
                                <Center>
                                    <Text fontSize={'12px'} color={'darkgray'}>
                                        Your gate towards academia.
                                    </Text>
                                </Center>
                            </Box>

                        </SimpleGrid>
                    </Box>
                </Center>
            </Box>
        </div>

    )
}

export default RecoverPassword;
