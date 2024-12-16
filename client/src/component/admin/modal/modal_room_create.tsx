import React, { useState } from 'react';
import { Modal, Box, Button, TextInput, NumberInput, Stack } from '@mantine/core';

interface CreateRoomProps {
    openCreateRoom: boolean;
    setOpenCreateRoom: (openCreateRoom: boolean) => void;
    formRoomData: any;
    setFormRoomData: (formRoomData: any) => void;
    handleSubmitCreate: (formData: any) => void;
}

const CreateRoomModal = (props: CreateRoomProps) => {
    const { openCreateRoom, setOpenCreateRoom, formRoomData, setFormRoomData, handleSubmitCreate } = props;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormRoomData({
            ...formRoomData,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setOpenCreateRoom(false);
        resetFormData()
    };

    const resetFormData = () => {
        setFormRoomData({
            owner_id: 0,
            name: '',
            description: '',
            location: '{}', // JSON string for location
            rating: 0,
        });
    };

    const handleSubmitCreateRoom = async (e: any) => {
        e.preventDefault();
        console.log(formRoomData);
        handleSubmitCreate(formRoomData);
        resetFormData()// Pass the form data to the parent component for submission
    };

    return (
        <Modal
            opened={openCreateRoom}
            onClose={handleCloseModal}
            title="Create New Room"
            size="lg"
        >
            <form onSubmit={handleSubmitCreateRoom}>
                <Stack gap="md">
                    <TextInput
                        label="Owner ID"
                        name="owner_id"
                        type="number"
                        value={formRoomData.owner_id}
                        onChange={handleChange}
                        required
                    />

                    <TextInput
                        label="Name"
                        name="name"
                        value={formRoomData.name}
                        onChange={handleChange}
                        required
                    />

                    <TextInput
                        label="Description"
                        name="description"
                        value={formRoomData.description}
                        onChange={handleChange}
                        required
                    />

                    <TextInput
                        label="Location (JSON)"
                        name="location"
                        value={formRoomData.location}
                        onChange={handleChange}
                        placeholder='{"latitude": 0, "longitude": 0}' // Example format for location
                        required
                    />

                    <NumberInput
                        label="Rating"
                        name="rating"
                        value={formRoomData.rating}
                        onChange={(value) => setFormRoomData((prev: any) => ({ ...prev, rating: value || 0 }))}
                        min={0}
                        max={5}
                        step={0.1}
                        required
                    />

                    <Button type="submit" fullWidth>
                        Create Room
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default CreateRoomModal;
