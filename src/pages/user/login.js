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
import {useContext, useState} from "react";
import axios from "axios";
import {tokenContext} from "../../contexts/tokenContext";
import {Link as RouterLink, useNavigate} from "react-router-dom";


async function loginUser(username, password) {
    let ret = ""
    let status = ""
    await axios.post('/user/login', {
        username: username,
        password: password
    })
        .then(res => {
            console.log(res.data)
            status = res.data.status
            ret = res.data.token
        })
    return {
        token: ret,
        status: status
    };
}


function Login(){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    if(localStorage.getItem("userToken")) {
        navigate('/landing');
    }

    const handleLogin = async e => {
        e.preventDefault();
        let data = await loginUser(username, password);
        console.log(data.token);
        console.log(data.status);
        if (data.token !== "" && data.status === 1) {
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("username", username);
            alert("登录成功！");
            navigate("/landing");
        }
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
                        width={'40vw'}
                        height={'50vh'}
                        borderRadius='10px'
                        boxShadow='4px 4px 15px 0 rgba(0,0,0,0.1)'
                    >
                        <SimpleGrid columns={2}>
                            <Box
                                width={'100%'}
                                height={'50vh'}
                                backgroundImage={loginImg}
                                backgroundSize={'fill'}
                                backgroundRepeat={'no-repeat'}
                                backgroundPosition={'center'}
                                borderRadius='10px'
                            >
                            </Box>
                            <Box>
                                <VStack
                                    spacing={'min(30px, 4vh)'}
                                    width={'74%'}
                                    height={'94%'}
                                    mx={'13%'}
                                >
                                    <Box height={'30px'}/>
                                    <VStack
                                        width={'100%'}
                                    >
                                        <Text fontSize={'32px'} fontWeight={'semibold'}>
                                            欢迎回来
                                        </Text>
                                    </VStack>
                                    <VStack
                                        width={'100%'}
                                        spacing={'min(15px, 2vh)'}
                                    >
                                        <FormControl id="username">
                                            <FormLabel fontSize={'15px'}>用户名</FormLabel>
                                            <Input type="text" onChange={e => setUsername(e.target.value)} />
                                        </FormControl>
                                        <FormControl id="password">
                                            <FormLabel fontSize={'15px'}>密码</FormLabel>
                                            <Input type="password" onChange={e => setPassword(e.target.value)} />
                                        </FormControl>
                                    </VStack>
                                    <Flex
                                        w={'100%'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                    >
                                        <Checkbox>记住登录</Checkbox>
                                        <Link color={'blue.400'}>忘记密码?</Link>
                                    </Flex>
                                    <Button
                                        bg={'#0087FF'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'rgb(0, 160, 255)',
                                        }}
                                        width={'100%'}
                                        onClick={handleLogin}
                                    >
                                        登录
                                    </Button>
                                    <Link as={RouterLink} to={'/register'} color={'blue.400'}>没有账号？去注册</Link>
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

export default Login
