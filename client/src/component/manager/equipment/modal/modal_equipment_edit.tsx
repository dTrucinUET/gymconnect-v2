import React, { useState, useEffect } from 'react';
import { Modal, Button, TextInput, NumberInput, Stack, Select } from '@mantine/core';

interface EditEquipmentProps {
    openEditEquipment: boolean;
    setOpenEditEquipment: (openEditEquipment: boolean) => void;
    formEquipmentData: any;
    setFormEquipmentData: (formEquipmentData: any) => void;
    handleSubmitEdit: (formData: any) => void;
}

const EditEquipmentModal = (props: EditEquipmentProps) => {
    const { openEditEquipment, setOpenEditEquipment, formEquipmentData, setFormEquipmentData, handleSubmitEdit } = props;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormEquipmentData({
            ...formEquipmentData,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setOpenEditEquipment(false);
    };

    const resetFormData = () => {
        setFormEquipmentData({
            name: '',
            description: '',
            amount: 0,
            rating: 0,
            room_id: formEquipmentData.room_id,
        });
    };

    useEffect(() => {
        if (!openEditEquipment) {
            resetFormData();
        }
    }, [openEditEquipment]);

    const handleSubmitUpdate = async (e: any) => {
        e.preventDefault();
        console.log(formEquipmentData);
        handleSubmitEdit(formEquipmentData);
    };

    return (
        <Modal
            opened={openEditEquipment}
            onClose={handleCloseModal}
            title="Edit Equipment"
            size="lg"
        >
            <form onSubmit={handleSubmitUpdate}>
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



                    <Button type="submit" fullWidth>
                        Update Equipment
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default EditEquipmentModal;
