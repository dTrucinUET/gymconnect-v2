'use client'

import { Table, Button, Group, Pagination, Select, Container, Title, Modal } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/component/userContext/userContext';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import styles from './services.module.css';
import DeleteServiceModal from './modal/modal_service_delete';
import EditServiceModal from './modal/modal_service_edit';
import CreateServiceModal from './modal/modal_service_create';

export interface Service {
    id: number;
    name: string;
    room_id: number | null;
    description: string;
    amount: number;
    balance: number;
    rating: number;
    type: string;
    createdAt: string;
    updatedAt: string;
}
const fakeServices: Service[] = [
    {
        id: 1,
        name: "Intelligent Metal Shoes",
        room_id: 6,
        description: "Voluptate expedita dolores perferendis voluptatem aut nobis minima mollitia.",
        amount: 2,
        balance: 976.75,
        rating: 4.5,
        type: "trainer",
        createdAt: "2024-12-22T04:15:56.000Z",
        updatedAt: "2024-12-22T04:15:56.000Z"
    },
];

const ServiceManagement = () => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [services, setServices] = useState<Service[]>(fakeServices);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchData = async () => {
        try {
            console.log('Fetching service list');

            if (user.isAuthenticate === false || !user.token) {
                router.push('/');
                return;
            }

            const response = await fetch(`http://localhost:8080/api/v1/service`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setServices(data);
            } else {
                showNotification({
                    title: 'Error',
                    message: 'Cannot load service data!',
                    color: 'red',
                    position: 'bottom-right',
                });
            }
        } catch (error) {
            console.error(error);
            showNotification({
                title: 'Error',
                message: 'Cannot load service data!',
                color: 'red',
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
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

    const displayedServices = services.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const [openedConfirmDelete, setOpenedConfirmDelete] = useState(false);
    const [serviceIdDelete, setServiceIdDelete] = useState<number | null>(null);

    const handleDeleteService = (id_delete: number) => {
        setServiceIdDelete(id_delete);
        setOpenedConfirmDelete(true);
    };

    const cancelDelete = () => {
        setOpenedConfirmDelete(false);
    };

    const confirmDelete = async () => {
        if (serviceIdDelete) {
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
                        message: `Successfully deleted service with ID ${serviceIdDelete}`,
                        color: 'green',
                        position: 'bottom-right'
                    });
                } else {
                    showNotification({
                        title: 'Error',
                        message: `Failed to delete service with ID ${serviceIdDelete}`,
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

    const handleCreateService = () => {
        setModalCreateOpened(true);
    };

    const handleSubmitCreateService = async (newService: any) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/equipments', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newService),
                credentials: 'include'
            });

            if (response.status === 200) {
                setModalCreateOpened(false);
                showNotification({
                    title: 'Success',
                    message: 'Service successfully created!',
                    color: 'green',
                });
                fetchData();
            } else {
                const data = await response.json();
                showNotification({
                    title: 'Error',
                    message: data.message || 'Failed to create service. Please try again.',
                    color: 'red',
                });
            }
        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'Failed to create service. Please try again.',
                color: 'red',
            });
        }
    };

    const [openEditService, setOpenEditService] = useState(false);
    const [formServiceData, setFormServiceData] = useState<Service>({
        id: 0,
        name: '',
        room_id: 0,
        description: '',
        amount: 0,
        balance: 0,
        rating: 0,
        type: '',
        createdAt: '',
        updatedAt: ''
    });

    const handleEditService = (service: Service) => {
        setFormServiceData(service);
        setOpenEditService(true);
    };

    const handleSubmitEditService = async (updatedData: Service) => {
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
                    message: 'Service updated successfully!',
                    color: 'green',
                    position: 'bottom-right',
                });
                fetchData();
                setOpenEditService(false);
            } else {
                const data = await response.json();
                showNotification({
                    title: 'Error',
                    message: data.message || 'Failed to update service.',
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
            <Title className={styles.title}>Service Management</Title>

            <Table highlightOnHover className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Room</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Rating</th>
                        <th>Type</th>

                        <th>
                            <div className={styles.actionHeader}>
                                Actions
                                <Button size="xs" color="indigo" onClick={handleCreateService}>
                                    Add New Service
                                </Button>
                            </div>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {displayedServices.length > 0 ? (
                        displayedServices.map((service) => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>{service.name}</td>
                                <td>{service.room_id}</td>
                                <td>{service.description}</td>
                                <td>{service.amount}</td>
                                <td>{service.balance}</td>
                                <td>{service.rating}</td>
                                <td>{service.type}</td>
                                <td>
                                    <Group gap="xs">
                                        <Button size="xs" color="green" onClick={() => handleEditService(service)} className={`${styles.button} ${styles.buttonGreen}`}>
                                            Edit
                                        </Button>
                                        <Button size="xs" color="red" onClick={() => handleDeleteService(service.id)} className={`${styles.button} ${styles.buttonRed}`}>
                                            Delete
                                        </Button>
                                    </Group>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} style={{ textAlign: 'center', padding: '20px' }}>
                                No services found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Group mt="md" className={styles.paginationGroup} justify="center">
                <Pagination
                    value={page}
                    onChange={setPage}
                    total={Math.ceil(services.length / rowsPerPage)}
                />
                <Select
                    value={rowsPerPage.toString()}
                    onChange={(value) => setRowsPerPage(Number(value))}
                    data={['10', '20', '50']}
                    placeholder="Rows per page"
                    style={{ width: 100 }}
                />
            </Group>

            {/* Add CreateServiceModal, EditServiceModal, and DeleteServiceModal components here */}
            <CreateServiceModal
                openCreateService={modalCreateOpen}
                setOpenCreateService={setModalCreateOpened}
                formServiceData={formServiceData}
                setFormServiceData={setFormServiceData}
                handleSubmitCreate={handleSubmitCreateService}
            />

            <EditServiceModal
                openEditService={openEditService}
                setOpenEditService={setOpenEditService}
                formServiceData={formServiceData}
                setFormServiceData={setFormServiceData}
                handleSubmitEdit={handleSubmitEditService}
            />
            <DeleteServiceModal
                opened={openedConfirmDelete}
                onConfirm={confirmDelete}
                onClose={cancelDelete}

            />
        </Container>
    )
}

export default ServiceManagement;

