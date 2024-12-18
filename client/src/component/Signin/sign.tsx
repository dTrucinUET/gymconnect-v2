'use client'


import React, { useState } from 'react';
import { Container, TextInput, PasswordInput, Button, Text, Anchor, Group, Paper, Title, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import styles from './login.module.css';  // Import the CSS module
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import Logo from '../logo/logo';
import LogoBlackGym from '../logo/logoblackgym';
import { stringify } from 'querystring';
import { getToken } from '../utils/cookie_action';
import { UserContext } from '../userContext/userContext';
interface DataUserSignup {
    username: string;
    password: string;

}
const Login = () => {

    const { loginContext } = React.useContext(UserContext);
    const { user } = React.useContext(UserContext);
    const Router = useRouter()
    const form = useForm<DataUserSignup>({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {

            password: (value: string | any[]) => (
                value.length < 6 ? 'Password must have at least 6 characters' : null
            ),
        },
    });

    const handleSubmit = async (values: DataUserSignup) => {
        try {
            console.log(values);

            console.log(`${process.env.NEXT_PUBLIC_SERVER_API}/login`);

            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include', //dme lần sau đừng quên cái này nhé, 
            });
            console.log(response);




            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                console.log('hit here 1');

                const token = await getToken();
                console.log('token in cookie', token);
                console.log('token', token?.value);

                const dataContext = {
                    token: token?.value,
                    username: data.user_data.username,
                    email: data.user_data.email,
                    isAuthenticate: true,
                    first_name: data.user_data.first_name,
                    id: data.user_data.id,
                    last_name: data.user_data.last_name,
                    role_name: data.user_data.role_name

                }

                console.log('data context', dataContext);

                localStorage.setItem('user', JSON.stringify(dataContext));
                loginContext(dataContext)
                showNotification({
                    title: 'Success',
                    message: 'Logged in successfully!',
                    color: 'green',
                    position: 'bottom-right'

                });


                if (dataContext.role_name === 'admin') {
                    Router.push('/admin/user')
                }
                else if (dataContext.role_name === 'manager') {
                    Router.push('/manager/user')
                }
                else {
                    Router.push('/')

                }
            } else {
                showNotification({
                    title: 'Error',
                    message: 'Login failed. Please check your credentials.',
                    color: 'red',
                    position: 'bottom-right'
                });
            }
        } catch (error) {
            console.error(error);
            showNotification({
                title: 'Error',
                message: 'Something went wrong. Please try again later.',
                color: 'red',
                position: 'bottom-right'

            });
        }
    };

    const handleClickButton = (path: string) => {
        Router.push(path)
    }

    return (
        <div className={styles.container}>
            <video className={styles.backgroundVideo} autoPlay loop muted>
                <source src="/vid.mp4" type="video/mp4" />
            </video>

            <div className={styles.formWrapper}>
                <Container size="xs">
                    <Paper className={styles.paper}>
                        <Title className={styles.title} order={2} mb="md">
                            Chào mừng đến với <span className={styles.logoWrapper}><LogoBlackGym /></span>
                        </Title>
                        <Text className={styles.text} size="lg" mb="lg">
                            Đăng nhập ngay để nhận thêm ưu đãi
                        </Text>
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                label="Tên Đăng nhập "
                                placeholder="username"
                                {...form.getInputProps('username')}
                                mb="md"
                            />
                            <PasswordInput
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu của bạn"
                                {...form.getInputProps('password')}
                                mb="md"
                            />

                            <Group p="apart" mt="md">
                                <Anchor onClick={() => handleClickButton('/forgotpassword')} size="sm">
                                    Quên mật khẩu?
                                </Anchor>
                            </Group>

                            <Button fullWidth mt="xl" type="submit">
                                Đăng nhập
                            </Button>
                        </form>

                        <Group p="center" mt="md">
                            <Text size="sm" color="gray">
                                Chưa có tài khoản?{' '}
                                <Anchor size="sm" onClick={() => handleClickButton('/Signup')}>
                                    Đăng ký ngay
                                </Anchor>
                            </Text>
                        </Group>
                    </Paper>
                </Container>
            </div>

        </div>
    );
}

export default Login;
