import React, { useEffect } from 'react';
import { Modal, Button, TextInput, NumberInput, Stack } from '@mantine/core';
import { Service } from '../services.manager';

interface CreateServiceModalProps {
    openCreateService: boolean;
    setOpenCreateService: (open: boolean) => void;
    formServiceData: Service;
    setFormServiceData: React.Dispatch<React.SetStateAction<Service>>;
    handleSubmitCreate: (formData: Service) => void;
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
    openCreateService,
    setOpenCreateService,
    formServiceData,
    setFormServiceData,
    handleSubmitCreate,
}) => {
    const handleCloseModal = () => {
        setOpenCreateService(false);
        setFormServiceData({
            id: 0,
            name: '',
            description: '',
            amount: 0,
            balance: 0,
            rating: 0,
            room_id: formServiceData.room_id,
            type: '',
            createdAt: '',
            updatedAt: '',
        });
    };
    useEffect(() => {
        if (!openCreateService) {
            handleCloseModal();
        }
    }, [openCreateService]);
    const handleChange = (name: string, value: string | number) => {
        setFormServiceData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('hit');

        handleSubmitCreate(formServiceData);
    };

    return (
        <Modal
            opened={openCreateService}
            onClose={handleCloseModal}
            title="Create New Service"
            size="lg"
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <TextInput
                        label="Name"
                        name="name"
                        value={formServiceData.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />
                    <TextInput
                        label="Description"
                        name="description"
                        value={formServiceData.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                    />
                    <NumberInput
                        label="Amount"
                        name="amount"
                        value={formServiceData.amount || 0}
                        onChange={(value) => handleChange('amount', value || 0)}
                        min={0}
                        required
                    />
                    <NumberInput
                        label="Balance"
                        name="balance"
                        value={formServiceData.balance || 0}
                        onChange={(value) => handleChange('balance', value || 0)}
                        min={0}
                        required
                    />
                    <NumberInput
                        label="Rating"
                        name="rating"
                        value={formServiceData.rating || 0}
                        onChange={(value) => handleChange('rating', value || 0)}
                        min={0}
                        max={5}
                        step={0.1}
                        required
                    />
                    {/* <NumberInput
                        label="Room ID"
                        name="room_id"
                        value={formServiceData.room_id || 0}
                        onChange={(value) => handleChange('room_id', value || 0)}
                        min={0}
                        required
                    /> */}
                    <TextInput
                        label="Type"
                        name="type"
                        value={formServiceData.type || ''}
                        onChange={(e) => handleChange('type', e.target.value)}
                        required
                    />
                    <Button type="submit" fullWidth onClick={handleSubmit}>
                        Create Service
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default CreateServiceModal;

