import React from 'react';
import { Modal, Button, TextInput, NumberInput, Stack } from '@mantine/core';
import { Service } from '../services.manager';

interface EditServiceModalProps {
    openEditService: boolean;
    setOpenEditService: (open: boolean) => void;
    formServiceData: Service;
    setFormServiceData: React.Dispatch<React.SetStateAction<Service>>;
    handleSubmitEdit: (formData: Service) => void;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
    openEditService,
    setOpenEditService,
    formServiceData,
    setFormServiceData,
    handleSubmitEdit,
}) => {
    const handleCloseModal = () => {
        setOpenEditService(false);
    };

    const handleChange = (name: string, value: string | number) => {
        setFormServiceData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmitEdit(formServiceData);
    };

    return (
        <Modal
            opened={openEditService}
            onClose={handleCloseModal}
            title="Edit Service"
            size="lg"
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="sm">
                    <TextInput
                        label="Name"
                        name="name"
                        value={formServiceData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />
                    <TextInput
                        label="Description"
                        name="description"
                        value={formServiceData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                    />
                    <NumberInput
                        label="Amount"
                        name="amount"
                        value={formServiceData.amount}
                        onChange={(value) => handleChange('amount', value || 0)}
                        min={0}
                        required
                    />
                    <NumberInput
                        label="Balance"
                        name="balance"
                        value={formServiceData.balance}
                        onChange={(value) => handleChange('balance', value || 0)}
                        min={0}
                        required
                    />
                    <NumberInput
                        label="Rating"
                        name="rating"
                        value={formServiceData.rating}
                        onChange={(value) => handleChange('rating', value || 0)}
                        min={0}
                        max={5}
                        step={0.1}
                        required
                    />
                    <NumberInput
                        label="Room ID"
                        name="room_id"
                        value={formServiceData.room_id || ''}
                        onChange={(value) => handleChange('room_id', value || 0)}
                        min={0}
                        required
                    />
                    <TextInput
                        label="Type"
                        name="type"
                        value={formServiceData.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                        required
                    />
                    <Button type="submit" fullWidth>
                        Update Service
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default EditServiceModal;

