import React, { useState } from 'react';
import { Modal, Box, Button, TextInput, Select, Stack, NumberInput } from '@mantine/core';


interface EditUserProps {
    openEditUser: boolean;
    setOpenEditUser: (openEditUser: boolean) => void;
    formUserData: any;
    setFormUserData: (formUserData: any) => void;
    handleSubmitEdit: (FormData: any) => void;
}

const EditUserModal = (props: EditUserProps) => {
    const { openEditUser, setOpenEditUser, formUserData, setFormUserData, handleSubmitEdit } = props;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormUserData({
            ...formUserData,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setOpenEditUser(false);
    };

    const resetFormData = () => {
        setFormUserData({
            name: '',
            description: '',
            rating: 0,
            location: ''
        })
    }

    const handleSubmitUpdate = async (e: any) => {
        e.preventDefault();
        console.log(formUserData);
        handleSubmitEdit(formUserData);
    };

    return (
        <Modal
            opened={openEditUser}
            onClose={handleCloseModal}
            title="Edit User"
            size="lg"
        >
            <form onSubmit={handleSubmitUpdate}>
                <Stack gap="md">
                    <TextInput
                        label="Name"
                        name="name"
                        value={formUserData.name}
                        onChange={handleChange}
                        required
                    />

                    <TextInput
                        label="Description"
                        name="description"
                        value={formUserData.description}
                        onChange={handleChange}
                        required
                    />

                    <NumberInput
                        label="Rating"
                        name="rating"
                        value={formUserData.rating}
                        onChange={(value) => setFormUserData((prev: any) => ({ ...prev, rating: value || 0 }))}
                        min={0}
                        max={5}
                        step={0.1}
                        required
                    />

                    <TextInput
                        label="Location"
                        name="location"
                        value={formUserData.location}
                        onChange={handleChange}
                        required
                    />


                    <Button type="submit" fullWidth>
                        Update
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default EditUserModal;
