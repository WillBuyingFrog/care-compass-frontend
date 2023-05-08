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
import {useLocation, useNavigate, useParams} from "react-router-dom";

async function resetPassword(email, newPassword, key){
    let ret = 0;
    await axios.get('/user/resetPassword', {
        params: {
            email: email,
            newPassword: newPassword,
            key: key
        }
    })
        .catch((error) => {
            ret = -1;
            console.error({ error });
        });
    return ret;
}


function ResetPassword(){

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const navigate = useNavigate();

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    const email = params.email
    const key = params.key


    const handleResetPassword = async e => {
        if (newPassword.length < 8) {
            alert("新密码长度不得小于6！");
            return -1;
        }
        if(newPassword.length > 16) {
            alert("新密码长度不得高于16！");
            return -1;
        }
        if (newPassword !== confirmNewPassword) {
            alert("两次输入的密码不一致！")
            return -1;
        }
        let result = await resetPassword(email, newPassword, key);
        if (result !== 0) {
            alert("重置密码过程中出现错误。请联系网站管理员。")
            return -1;
        }
        alert("重置密码成功！即将跳转至登录页面。");
        navigate('/login');
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
                                            重新设置密码
                                        </Text>
                                    </VStack>
                                    <VStack
                                        width={'100%'}
                                        spacing={'min(15px, 2vh)'}
                                    >
                                        <FormControl id="newPassword">
                                            <FormLabel fontSize={'15px'}>新密码</FormLabel>
                                            <Input type="password" onChange={e => setNewPassword(e.target.value)} />
                                        </FormControl>
                                        <FormControl id="confirmPassword">
                                            <FormLabel fontSize={'15px'}>确认新密码</FormLabel>
                                            <Input type="password" onChange={e => setConfirmNewPassword(e.target.value)} />
                                        </FormControl>
                                    </VStack>
                                    <Button
                                        bg={'#0087FF'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'rgb(0, 160, 255)',
                                        }}
                                        width={'100%'}
                                        onClick={handleResetPassword}
                                    >
                                        设置新密码
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

export default ResetPassword;
