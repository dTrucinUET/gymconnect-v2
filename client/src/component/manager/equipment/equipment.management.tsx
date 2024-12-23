'use client'

import { Table, Button, Group, Pagination, Select, Container, Title, Modal } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import styles from './equipment.module.css';
import { UserContext } from '@/component/userContext/userContext';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import DeleteEquipmentModal from './modal/modal_equipment_delete';
import EditEquipmentModal from './modal/modal_equipment_edit';
import CreateEquipmentModalManager from './modal/modal_equipment_create';

export interface Equipment {
    id: number;
    name: string;
    room_id: number | null;
    description: string;
    amount: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

const fakeEquipments: Equipment[] = [
    {
        id: 1,
        name: 'Sleek Steel Keyboard',
        room_id: null,
        description: 'Sit facere voluptatem praesentium hic velit.',
        amount: 9,
        rating: 3.5,
        createdAt: '2024-12-22T04:15:56.000Z',
        updatedAt: '2024-12-22T04:15:56.000Z',
    },
];

const EquipmentManagerment = () => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [equipments, setEquipments] = useState<Equipment[]>(fakeEquipments);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const fetchData = async () => {
        try {
            console.log('Fetching equipment list');

            if (user.isAuthenticate === false || !user.token) {
                router.push('/'); // Redirect if the user is not authenticated
                return;
            }

            const response = await fetch(`http://localhost:8080/api/v1/equipments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                credentials: 'include',
            });


            if (response.status === 200) {
                const data = await response.json();
                setEquipments(data); // Update state with the fetched data
            } else {
                showNotification({
                    title: 'Error',
                    message: 'Cannot load equipment data!',
                    color: 'red',
                    position: 'bottom-right',
                });
            }
        } catch (error) {
            console.error(error);
            showNotification({
                title: 'Error',
                message: 'Cannot load equipment data!',
                color: 'red',
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        fetchData();

        if (user) {
            if (user.isAuthenticate === false || user.role_name !== 'manager') {
                showNotification({
                    title: 'Warning',
                    message: 'You do not have permission to access this action!',
                    color: 'yellow',
                    position: 'bottom-right',
                });
                router.push('/');
            } else {
                fetchData();
            }
        }
    }, [user, router]);

    const displayedEquipments = equipments.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const [openedConfirmDelete, setOpenedConfirmDelete] = useState(false);
    const [equipmentIdDelete, setEquipmentIdDelete] = useState<number | null>(null);

    const handleDeleteEquipment = (id_delete: number) => {
        setEquipmentIdDelete(id_delete);
        setOpenedConfirmDelete(true);
    };

    const cancelDelete = () => {
        setOpenedConfirmDelete(false);
    };

    const confirmDelete = async () => {
        if (equipmentIdDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/equipments/${equipmentIdDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.status === 200) {
                    fetchData();
                    showNotification({
                        title: 'Success',
                        message: `Successfully deleted equipment with ID ${equipmentIdDelete}`,
                        color: 'green',
                        position: 'bottom-right'
                    });
                } else {
                    showNotification({
                        title: 'Error',
                        message: `Failed to delete equipment with ID ${equipmentIdDelete}`,
                        color: 'red',
                        position: 'bottom-right'
                    });
                }
            } catch (error) {
                showNotification({
                    title: 'Server Error',
                    message: 'Something went wrong with the server.',
                    color: 'red',
                    position: 'bottom-right'
                });
            }
        }
        setOpenedConfirmDelete(false);
    };

    const [modalCreateOpen, setModalCreateOpened] = useState(false);

    const handleCreateEquipment = () => {
        setModalCreateOpened(true);
    };

    const handleSubmitCreateEquipment = async (newEquipment: any) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/equipments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newEquipment),
                credentials: 'include'
            });

            if (response.status === 200) {
                setModalCreateOpened(false);
                showNotification({
                    title: 'Success',
                    message: 'Equipment successfully created!',
                    color: 'green',
                });
                fetchData();
            } else {
                const data = await response.json();
                showNotification({
                    title: 'Error',
                    message: data.message || 'Failed to create equipment. Please try again.',
                    color: 'red',
                });
            }
        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'Failed to create equipment. Please try again.',
                color: 'red',
            });
        }
    };



    const [openEditEquipment, setOpenEditEquipment] = useState(false);
    const [formEquipmentData, setFormEquipmentData] = useState<Equipment>({
        id: 0,
        name: '',
        room_id: null,
        description: '',
        amount: 0,
        rating: 0,
        createdAt: '',
        updatedAt: ''
    });
    const handleEditEquipment = (equipment: Equipment) => {
        setFormEquipmentData(equipment);
        setOpenEditEquipment(true);
    };

    const handleSubmitEditEquipment = async (updatedData: Equipment) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/equipments/${updatedData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedData),
                credentials: 'include',
            });

            if (response.status === 200) {
                showNotification({
                    title: 'Success',
                    message: 'Equipment updated successfully!',
                    color: 'green',
                    position: 'bottom-right',
                });
                fetchData(); // Refresh the list after update
                setOpenEditEquipment(false); // Close the modal
            } else {
                const data = await response.json();
                showNotification({
                    title: 'Error',
                    message: data.message || 'Failed to update equipment.',
                    color: 'red',
                    position: 'bottom-right',
                });
            }
        } catch (error) {
            console.error(error);
            showNotification({
                title: 'Server Error',
                message: 'Something went wrong with the server.',
                color: 'red',
                position: 'bottom-right',
            });
        }
    };
    return (
        <Container size="lg">
            <Title className={styles.title}>Equipment Management</Title>

            <Table highlightOnHover className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Room</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Rating</th>
                        <th>
                            <div className={styles.actionHeader}>
                                Actions
                                <Button size="xs" color="blue" onClick={handleCreateEquipment}>
                                    Add New Equipment
                                </Button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayedEquipments.length > 0 ? (
                        displayedEquipments.map((equipment) => (
                            <tr key={equipment.id}>
                                <td>{equipment.id}</td>
                                <td>{equipment.name}</td>
                                <td>{equipment.room_id || 'N/A'}</td>
                                <td>{equipment.description}</td>
                                <td>{equipment.amount}</td>
                                <td>{equipment.rating}</td>
                                <td>
                                    <Group gap="xs">
                                        <Button size="xs" color="green" onClick={() => handleEditEquipment(equipment)}>
                                            Edit
                                        </Button>
                                        <Button size="xs" color="red" onClick={() => handleDeleteEquipment(equipment.id)}>
                                            Delete
                                        </Button>
                                    </Group>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                                No equipment found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Group mt="md" className={styles.paginationGroup} justify="center">
                <Pagination
                    value={page}
                    onChange={setPage}
                    total={Math.ceil(equipments.length / rowsPerPage)}
                    className={styles.paginationGroup}
                />
                <Select
                    value={rowsPerPage.toString()}
                    onChange={(value) => setRowsPerPage(Number(value))}
                    data={['10', '20', '50']}
                    placeholder="Rows per page"
                    style={{ width: 100 }}
                />
            </Group>

            <CreateEquipmentModalManager
                openCreateEquipment={modalCreateOpen}
                setOpenCreateEquipment={setModalCreateOpened}
                formEquipmentData={formEquipmentData}
                setFormEquipmentData={setFormEquipmentData}
                handleSubmitCreate={handleSubmitCreateEquipment}
            />
            <EditEquipmentModal
                openEditEquipment={openEditEquipment}
                setOpenEditEquipment={setOpenEditEquipment}
                formEquipmentData={formEquipmentData}
                setFormEquipmentData={setFormEquipmentData}
                handleSubmitEdit={handleSubmitEditEquipment}
            />
            <DeleteEquipmentModal opened={openedConfirmDelete} onClose={cancelDelete} onConfirm={confirmDelete} />

        </Container>
    )
}
export default EquipmentManagerment;