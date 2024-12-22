// src/components/modals/DeleteEquipmentModal.tsx

import { Modal, Group, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

interface Props {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteEquipmentModal = ({ opened, onClose, onConfirm }: Props) => {
    return (
        <Modal opened={opened} onClose={onClose} title="Confirm Deletion">
            <p>Are you sure you want to delete this equiapment?</p>
            <Group p="right" mt="md">
                <Button color="gray" onClick={onClose}>
                    Cancel
                </Button>
                <Button color="red" onClick={onConfirm}>
                    Delete
                </Button>
            </Group>
        </Modal>
    );
};

export default DeleteEquipmentModal;
