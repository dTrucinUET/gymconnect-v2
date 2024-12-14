'use client'
import React, { useState } from 'react';
import { Container, TextInput, PasswordInput, Button, Text, Anchor, Group, Paper, Title, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import styles from './login.module.css';  // Import the CSS module
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import Logo from '../logo/logo';
import LogoBlackGym from '../logo/logoblackgym';

const Login = () => {
    const Router = useRouter()
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Email is invalid'),
            password: (value: string | any[]) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
        },
    });

    const handleSubmit = async (values: any) => {
        try {
            console.log(values);

            const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (data.success) {
                showNotification({
                    title: 'Success',
                    message: 'Logged in successfully!',
                    color: 'green',
                    position: 'bottom-right'

                });
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
                                placeholder="info@gymconnect.com"
                                {...form.getInputProps('email')}
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
