'use client'

import React, { useEffect, useState } from 'react';
import { Modal, Button, TextInput, PasswordInput, Group, Checkbox, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';

interface AdminUserCreationModalProps {
    opened: boolean;
    onClose: () => void;
    onCreateUser: (userData: any) => void;
}

const AdminUserCreationModal: React.FC<AdminUserCreationModalProps> = ({ opened, onClose, onCreateUser }) => {
    const [date, setDate] = useState<Date | null>(null);
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
    useEffect(() => {
        form.reset();

    }, [opened]);
    const form = useForm({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            dob: null as Date | null,
            phone_number: '',
            role_name: 'user',
            sex: '',
            address: '',
            location: '',
            balance: 1000,
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is invalid'),
            username: (value) => (value.length < 3 ? 'Username must have at least 3 characters' : null),
            password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
            address: (value) => (value.length < 10 ? 'Address is too short' : null),
        },
    });

    const handleSubmit = (values: any) => {
        const fullLocation = `${location.ward}, ${location.district}, ${location.province}`;
        form.setFieldValue('location', fullLocation)
        form.setFieldValue('balance', 1000);
        console.log("values in modal Create", values);

        onCreateUser(values);

    };

    return (
        <Modal opened={opened} onClose={onClose} title="Create New User" size="lg">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Group grow mb="md">
                    <TextInput label="First Name" placeholder="Enter first name" {...form.getInputProps('first_name')} />
                    <TextInput label="Last Name" placeholder="Enter last name" {...form.getInputProps('last_name')} />
                </Group>

                <TextInput label="Email" placeholder="info@example.com" {...form.getInputProps('email')} />
                <TextInput label="Username" placeholder="username" {...form.getInputProps('username')} />

                <Group grow mb="md">
                    <TextInput label="Phone Number" placeholder="0123456789" {...form.getInputProps('phone_number')} />
                    <Select
                        label="Gender"
                        placeholder="Select gender"
                        data={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]}
                        {...form.getInputProps('sex')}
                    />
                </Group>

                <PasswordInput label="Password" placeholder="Enter password" {...form.getInputProps('password')} />

                <DatePickerInput
                    label="Date of Birth"
                    placeholder="Select date"
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                        form.setFieldValue('dob', newDate);
                    }}
                    mb="md"
                />

                <TextInput label="Address" placeholder="Enter full address" {...form.getInputProps('address')} />

                <Select
                    label="Role"
                    placeholder="Select role"
                    data={[
                        { value: 'user', label: 'User' },
                        { value: 'admin', label: 'Admin' },
                        { value: 'manager', label: 'Manager' },
                    ]}
                    {...form.getInputProps('role_name')}
                    mb="md"
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
                <Group p="right" mt="md">
                    <Button type="submit">Create User</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default AdminUserCreationModal;

