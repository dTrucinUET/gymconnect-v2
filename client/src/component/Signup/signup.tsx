'use client'
import React, { useState } from 'react';
import { Container, TextInput, PasswordInput, Button, Text, Group, Paper, Title, Checkbox, Anchor, px, Popover, Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import styles from './Signup.module.css';
import { DatePicker, DatePickerInput, DateTimePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import Logo from '../logo/logo';
import { useRouter } from 'next/navigation';
import LogoBlackGym from '../logo/logoblackgym';
import { log } from 'node:console';
const SignupForm = () => {
    const [date, setDate] = useState<Date | null>(null);  // Store selected date
    const [opened, setOpened] = useState(false);  // Control DatePicker visibility

    const Router = useRouter()

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            birthdate: '',
            address: '',
            detailedAddress: '',
            terms: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is invalid'),
            username: (value) => (value.length < 3 ? 'Username must have at least 3 characters' : null),
            password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
            confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
            detailedAddress: (value) => (value.length < 10 ? 'Address is too short' : null),
            terms: (value) => (value === false ? 'You must accept the terms and conditions' : null),
        },
    });

    const handleSubmit = async (values: any) => {
        try {

            console.log(values);

            const response = await fetch('/api/signup', {
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
                    message: 'Registration successful!',
                    color: 'green',
                });
            } else {
                showNotification({
                    title: 'Error',
                    message: data.message || 'Registration failed. Please try again.',
                    color: 'red',
                });
            }
        } catch (error) {
            console.error(error);
            showNotification({
                title: 'Error',
                message: 'Something went wrong. Please try again later.',
                color: 'red',
            });
        }
    };
    const handleClickButton = (path: string) => {
        Router.push(path)
    }
    return (

        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <Paper className={styles.paper}>
                    <Title className={styles.title} order={2} mb="md">
                        Chào mừng đến với <span className={styles.logoWrapper} style={{ marginLeft: '10px' }}><LogoBlackGym /></span>
                    </Title>
                    <Text className={styles.title} mb="md">
                        Đăng ký ngay để nhận thêm ưu đãi
                    </Text>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Group mb={0} >
                            <TextInput
                                className={styles.inputField}
                                label="Họ"
                                placeholder="Nhập họ"
                                {...form.getInputProps('lastName')}
                                style={{ width: '48%' }}
                            />
                            <TextInput
                                className={styles.inputField}
                                label="Tên"
                                placeholder="Nhập tên"
                                {...form.getInputProps('firstName')}
                                style={{ width: '48%' }}
                            />
                        </Group>
                        <TextInput
                            label="email"
                            placeholder="info@gymconnect.com"
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label="Tên Đăng nhập"
                            placeholder="info@gymconnect.com"
                            {...form.getInputProps('username')}
                        />
                        <Group >
                            <PasswordInput
                                style={{ width: '48%' }}
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu của bạn"
                                {...form.getInputProps('password')}
                            />
                            <PasswordInput
                                style={{ width: '48%' }}
                                label="Nhắc lại mật khẩu"
                                placeholder="Nhập lại mật khẩu của bạn"
                                {...form.getInputProps('confirmPassword')}
                            />
                        </Group>
                        <DatePickerInput
                            label="Pick date"
                            placeholder="Pick date"
                            value={date}
                            {...form.getInputProps('birthdate')}
                        />
                        <Group >
                            <PasswordInput
                                style={{ width: '30%' }}
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu của bạn"
                                {...form.getInputProps('password')}
                            />
                            <PasswordInput
                                style={{ width: '30%' }}
                                label="Nhắc lại mật khẩu"
                                placeholder="Nhập lại mật khẩu của bạn"
                                {...form.getInputProps('confirmPassword')}
                            />
                            <PasswordInput
                                style={{ width: '30%' }}
                                label="Nhắc lại mật khẩu"
                                placeholder="Nhập lại mật khẩu của bạn"
                                {...form.getInputProps('confirmPassword')}
                            />
                        </Group>
                        <TextInput
                            label="Địa chỉ chi tiết"
                            placeholder="29 Dich vong Cau Giay Ha Noi"
                            {...form.getInputProps('detailedAddress')}
                        />

                        <Checkbox
                            label="Tôi đồng ý với các điều khoản và điều kiện"
                            {...form.getInputProps('terms', { type: 'checkbox' })}
                            m={'sm'}
                        />

                        <Button fullWidth type="submit">
                            Đăng ký
                        </Button>
                    </form>

                    <Group p="center" >
                        <Text size="sm" color="gray">
                            Đã có tài khoản?{' '}
                            <Anchor size="sm" onClick={() => handleClickButton('/Signin')}>
                                Trở về trang đăng nhập
                            </Anchor>
                        </Text>
                    </Group>
                </Paper>
            </div>
        </div >

    );
};

export default SignupForm;
