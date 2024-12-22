import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextInput, NumberInput, Stack, FileInput, FileButton, Group } from '@mantine/core';
import { Text } from '@mantine/core';

interface CreateEquipmentProps {
    openCreateEquipment: boolean;
    setOpenCreateEquipment: (openCreateEquipment: boolean) => void;
    formEquipmentData: any;
    setFormEquipmentData: (formEquipmentData: any) => void;
    handleSubmitCreate: (formData: any, file: File | null) => void;
}

const CreateEquipmentModalManager = (props: CreateEquipmentProps) => {
    const { openCreateEquipment, setOpenCreateEquipment, formEquipmentData, setFormEquipmentData, handleSubmitCreate } = props;
    const [file, setFile] = useState<File | null>(null);

    const handleCloseModal = () => {
        setOpenCreateEquipment(false);
        resetFormData();
    };

    useEffect(() => {
        if (!openCreateEquipment) {
            resetFormData();
        }
    }, [openCreateEquipment]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormEquipmentData({
            ...formEquipmentData,
            [name]: value,
        });
    };

    const resetFormData = () => {
        setFormEquipmentData({
            name: '',
            description: '',
            amount: 0,
            rating: 0,
            room_id: formEquipmentData.room_id, // If needed for the equipment
        });
    };

    const handleSubmitCreateEquipment = async (e: any) => {
        e.preventDefault();
        console.log(formEquipmentData);
        handleSubmitCreate(formEquipmentData, file); // Pass the form data to the parent component for submission
    };

    return (
        <Modal
            opened={openCreateEquipment}
            onClose={handleCloseModal}
            title="Create New Equipment"
            size="lg"
        >
            <form onSubmit={handleSubmitCreateEquipment}>
                <Stack gap="md">
                    <TextInput
                        label="Name"
                        name="name"
                        value={formEquipmentData.name}
                        onChange={handleChange}
                        required
                    />

                    <TextInput
                        label="Description"
                        name="description"
                        value={formEquipmentData.description}
                        onChange={handleChange}
                        required
                    />

                    <NumberInput
                        label="Amount"
                        name="amount"
                        value={formEquipmentData.amount}
                        onChange={(value) => setFormEquipmentData((prev: any) => ({ ...prev, amount: value || 0 }))}
                        min={0}
                        required
                    />

                    <NumberInput
                        label="Rating"
                        name="rating"
                        value={formEquipmentData.rating}
                        onChange={(value) => setFormEquipmentData((prev: any) => ({ ...prev, rating: value || 0 }))}
                        min={0}
                        max={5}
                        step={0.1}
                        required
                    />

                    {/* Optional: Room ID if needed */}
                    {/* <NumberInput
                        label="Room ID"
                        name="room_id"
                        value={formEquipmentData.room_id}
                        onChange={(value) => setFormEquipmentData((prev: any) => ({ ...prev, room_id: value || null }))}
                    /> */}

                    <Group justify="flex-start">
                        <FileButton onChange={setFile} accept="image/png,image/jpeg">
                            {(props) => <Button {...props}>Upload Image</Button>}
                        </FileButton>
                        {file && (
                            <Text>
                                Picked file: {file.name}
                            </Text>
                        )}
                    </Group>

                    <Button type="submit" fullWidth>
                        Create Equipment
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default CreateEquipmentModalManager;
