'use client'
import React, { useEffect, useState } from 'react';
import { Container, TextInput, PasswordInput, Button, Text, Group, Paper, Title, Checkbox, Anchor, px, Popover, Box, ComboboxHiddenInput, Select } from '@mantine/core';
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
    const [date, setDate] = useState<Date | null>();  // Store selected date
    const [opened, setOpened] = useState(false);  // Control DatePicker visibility

    const Router = useRouter()
    const [location, setLocation] = useState({
        ward: '',
        district: '',
        province: '',
    });
    const handleLocationChange = (field: any, value: any) => {
        setLocation((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    useEffect(() => {
        const fullLocation = `${location.ward}, ${location.district}, ${location.province}`;
        form.setFieldValue('location', fullLocation);
    }, [location]);

    const form = useForm({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            dob: '',
            location: '',
            terms: false,
            phone_number: 0,
            balance: 1000,
            role_name: 'user',
            sex: '',
            address: '',
            role_id: '1 ',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is invalid'),
            username: (value) => (value.length < 3 ? 'Username must have at least 3 characters' : null),
            password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
            confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
            address: (value) => (value.length < 5 ? 'Address is too short' : null),
            terms: (value) => (value === false ? 'You must accept the terms and conditions' : null),

        },
    });

    const handleSubmit = async (values: any) => {
        try {
            const fullLocation = `${location.ward}, ${location.district}, ${location.province}`;
            form.setFieldValue('location', fullLocation);
            console.log(values);

            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include'
            });
            console.log("response", response);

            const data = await response.json();

            if (response.status === 201) {
                showNotification({
                    title: 'Success',
                    message: 'Registration successful!',
                    color: 'green',
                });
                Router.push('/signin')
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
            // Router.push('/signin')

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
                        <input type="hidden" {...form.getInputProps('role_id')} value='2' />
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
                            placeholder="username"
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
                        <Group >
                            <TextInput
                                label="Số điện thoại"
                                placeholder="0123456789"
                                {...form.getInputProps('phone_number')}
                            />
                            <Select
                                label="Giới tính"
                                placeholder="Chọn giới tính"
                                data={[
                                    { value: '0', label: 'Nam' },
                                    { value: '1', label: 'Nữ' },
                                ]}
                                {...form.getInputProps('sex')}
                            />
                        </Group>

                        <DatePickerInput
                            label="Ngày Sinh"
                            placeholder="04/12/2004"
                            value={date}
                            {...form.getInputProps('dob')}
                        />

                        <Group>
                            <TextInput
                                style={{ width: '30%' }}
                                label="Xã/Phường"
                                placeholder="29 Dịch Vọng"
                                value={location.ward}
                                onChange={(e) => handleLocationChange('ward', e.target.value)}
                            />
                            <TextInput
                                style={{ width: '30%' }}
                                label="Quận/Huyện"
                                placeholder="Cầu Giấy"
                                value={location.district}
                                onChange={(e) => handleLocationChange('district', e.target.value)}
                            />
                            <TextInput
                                style={{ width: '30%' }}
                                label="Tỉnh/Thành"
                                placeholder="Hà Nội"
                                value={location.province}
                                onChange={(e) => handleLocationChange('province', e.target.value)}
                            />
                        </Group>


                        <TextInput
                            label="Địa chỉ chi tiết"
                            placeholder="29 Dich vong Cau Giay Ha Noi"
                            {...form.getInputProps('address')}
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
                            <Anchor size="sm" onClick={() => handleClickButton('/signin')}>
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
