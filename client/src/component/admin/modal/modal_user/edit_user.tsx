'use client'

import React, { useEffect, useState } from 'react';
import { Modal, Button, TextInput, PasswordInput, Group, Select, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';

export interface UserEdit {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    dob: Date | null;
    phone_number: string;
    role_name: string;
    sex: string;
    address: string;
    location: string;
    balance: number;
}

interface AdminUserModalProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (userData: UserEdit) => void;
    dataEdit?: UserEdit;
}

const AdminUserEditModal: React.FC<AdminUserModalProps> = ({ opened, onClose, onSubmit, dataEdit }) => {
    const [date, setDate] = useState<Date | null>(null);
    const [location, setLocation] = useState({
        ward: '',
        district: '',
        province: '',
    });

    const form = useForm<UserEdit>({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            dob: null,
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
            password: (value) => (!dataEdit && value.length < 6 ? 'Password must have at least 6 characters' : null),
            address: (value) => (value.length < 10 ? 'Address is too short' : null),
        },
    });

    useEffect(() => {
        if (dataEdit) {
            form.setValues({
                ...dataEdit,
                password: '', // Clear password field for security
            });
            setDate(dataEdit.dob ? new Date(dataEdit.dob) : null);
            const [ward = '', district = '', province = ''] = (dataEdit.location || '').split(', ');
            setLocation({ ward, district, province });
        } else {
            form.reset();
            setDate(null);
            setLocation({ ward: '', district: '', province: '' });
        }
    }, [dataEdit, opened]);

    useEffect(() => {
        const fullLocation = `${location.ward}, ${location.district}, ${location.province}`;
        form.setFieldValue('location', fullLocation);
    }, [location]);

    const handleLocationChange = (field: keyof typeof location, value: string) => {
        setLocation((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (values: UserEdit) => {
        const fullLocation = `${location.ward}, ${location.district}, ${location.province}`;
        const submissionData = {
            ...values,
            location: fullLocation,
            dob: date,
        };
        onSubmit(submissionData);
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title={dataEdit ? "Edit User" : "Create New User"} size="lg">
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

                <PasswordInput
                    label="Password"
                    placeholder={dataEdit ? "Leave blank to keep current password" : "Enter password"}
                    {...form.getInputProps('password')}
                />

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

                <Group grow>
                    <TextInput
                        label="Ward"
                        placeholder="Ward"
                        value={location.ward}
                        onChange={(e) => handleLocationChange('ward', e.target.value)}
                    />
                    <TextInput
                        label="District"
                        placeholder="District"
                        value={location.district}
                        onChange={(e) => handleLocationChange('district', e.target.value)}
                    />
                    <TextInput
                        label="Province"
                        placeholder="Province"
                        value={location.province}
                        onChange={(e) => handleLocationChange('province', e.target.value)}
                    />
                </Group>

                <NumberInput
                    label="Balance"
                    placeholder="Enter balance"
                    {...form.getInputProps('balance')}
                    mb="md"
                />

                <Group p="right" mt="md">
                    <Button type="submit">{dataEdit ? "Update User" : "Create User"}</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default AdminUserEditModal;

