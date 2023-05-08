import {
    Box,
    Button,
    Center, Checkbox, Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input, InputGroup, InputRightElement, Link,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react'
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Header from "../../components/header/header";

import loginImg from '../../assets/login_img.jpg'
import {useState} from "react";
import axios from "axios";

async function registerUser(username, password, email, verificationCode) {
    let status = "ERR";
    await axios.get('/user/register', {
        params: {
            username: username,
            password: password,
            email: email,
            verificationCode: verificationCode
        }

    })
        .then(res => {
            status = res.data.status
        })
    return status;
}

async function sendVerificationEmail(email) {
    await axios.get('/user/sendVerifyEmail',{
        params: {
            email: email
        }
    })
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


function Register(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifycode] = useState(0);
    const [countdown, setCountdown] = useState(0);

    const navigate = useNavigate();

    if(localStorage.getItem("userToken")) {
        navigate('/landing');
    }

    const handleSendVerifyEmail = e => {
        if (countdown === 0) {
            let result = sendVerificationEmail(email);
            setCountdown(1);
            setInterval(() => setCountdown(0), 60000);
        }
    }

    const handleRegister = async e => {
        if (username === "") {
            alert("用户名为空！");
            return -1;
        }
        if (username.length < 6) {
            alert("用户名长度至少为6！");
            return -1;
        }
        if (username.length > 20) {
            alert("用户名长度至多为20！");
            return -1;
        }
        if (password.length < 8) {
            alert("密码长度过短，至少需要8位字符");
            return -1;
        }
        if (password.length > 16) {
            alert("密码长度过长，至多16位字符");
            return -1;
        }
        if (email === "") {
            alert("请填写邮箱！");
            return -1;
        }
        if (!validateEmail(email)) {
            alert("请填写合法的邮箱！");
            return -1;
        }
        let status = await registerUser(username, password, email, verifyCode);
        if (status === "OK") {
            alert("注册成功！");
            navigate("/login");
        }else{
            alert("注册失败。请检查邮箱验证码是否正确。");
            return -1;
        }
        return 0;
    }

    return (
        <div>
            <Header textColor={'black'} />
            <Box
                height={'90vh'}
            >
                <Center
                    height={'100%'}
                >
                    <Box
                        width={'60vw'}
                        height={'70vh'}

                        borderRadius={"min(2vw, 18px)"}

                        boxShadow='base'
                    >
                        <SimpleGrid columns={2}>
                            <Box
                                width={'100%'}
                                height={'70vh'}

                                backgroundImage={loginImg}
                                backgroundSize={'fill'}
                                backgroundRepeat={'no-repeat'}
                                backgroundPosition={'center'}

                                borderRadius={"min(2vw, 18px)"}
                            >

                            </Box>
                            <Box>
                                <VStack
                                    spacing={'min(30px, 4vh)'}
                                    width={'74%'}
                                    height={'94%'}
                                    mx={'13%'}
                                >
                                    <Box height={'10px'}/>
                                    <VStack
                                        width={'100%'}
                                    >
                                        <Text fontSize={'32px'} fontWeight={'semibold'}>
                                            注册
                                        </Text>
                                    </VStack>
                                    <VStack
                                        width={'100%'}
                                        spacing={'min(10px, 1.7vh)'}
                                    >
                                        <FormControl id="username">
                                            <FormLabel fontSize={'15px'}>用户名</FormLabel>
                                            <Input type="text" onChange={e => setUsername(e.target.value)} />
                                        </FormControl>
                                        <FormControl id="password">
                                            <FormLabel fontSize={'15px'}>密码</FormLabel>
                                            <Input type="password" onChange={e => setPassword((e.target.value))} />
                                        </FormControl>
                                        <FormControl id="email">
                                            <FormLabel fontSize={'15px'}>邮箱</FormLabel>
                                            <InputGroup>
                                                <Input type="email" onChange={e => setEmail(e.target.value)}/>
                                                <InputRightElement  w={'110px'}>
                                                    <Button isDisabled={(countdown !== 0)} onClick={handleSendVerifyEmail}>
                                                        {"发送验证码"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>

                                        </FormControl>
                                        <FormControl id="emailVerifyCode">
                                            <FormLabel fontSize={'15px'}>邮箱验证码</FormLabel>
                                            <Input type="text" onChange={e => setVerifycode(e.target.value)}/>
                                        </FormControl>
                                    </VStack>
                                    <Button
                                        bg={'#0087FF'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'rgb(0, 160, 255)',
                                        }}
                                        width={'100%'}
                                        onClick={handleRegister}
                                    >
                                        注册
                                    </Button>
                                    <Link as={RouterLink} to={'/login'} color={'blue.400'}>去登录</Link>
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

export default Register;
