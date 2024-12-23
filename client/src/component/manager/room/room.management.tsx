'use client'
import { Button, Group, Container, Title, Text, Pagination, Modal } from '@mantine/core';
import { useContext, useState } from 'react';
import styles from './room-management.module.css';
import EditRoomModal from '../modal/modal_room_edit';
import { IconArrowRotaryLastRight } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import CreateRoomModal from '../modal/modal_room_create';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/component/userContext/userContext';
import customFetch from '@/component/utils/custom_fetch';
import { cookies } from 'next/headers';
import CreateRoomModalManager from '../modal/modal_room_create';
interface Room {
    id: number;
    name: string;
    description: string;
    location: string; // JSON string
    rating: number;
    image: File;
}

const RoomManagementManager = (props: any) => {
    const [dataPage, setDataPage] = useState(props.data)
    const itemsPerPage = 6;
    const { user } = useContext(UserContext);

    const fetchRoomdata = async () => {

        try {
            const response = await fetch('http://localhost:8080/api/v1/room', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                credentials: 'include',

            });

            const data = await response.json();
            console.log("data fetch any time", data)
            setDataPage(data)
        } catch (error) {
            console.error(error);
        }
    }

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(dataPage.length / itemsPerPage);

    const paginateData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return dataPage.slice(startIndex, endIndex);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    const router = useRouter()
    const handleDetailRoom = (room: any) => {
        console.log("handle detailRoom");
        console.log(room);
        router.push(`/manager/room/${room.id}`)
    };

    const [openModalEdit, setModalEdit] = useState(false)

    const [dataEdit, setDataEdit] = useState({
        name: "",
        description: "",
        location: '{"city":"","country":""}',
        rating: 0,
    });
    const handleEditRoom = (room: { name: string; description: string; location: string; rating: number }) => {
        setDataEdit(room);
        setModalEdit(true);
    };
    console.log("dataEdit", dataEdit);



    const handleSubmitEdit = async (editedData: any) => {
        console.log("data final edit", editedData);
        try {

            const response = await fetch(`http://localhost:8080/api/v1/room/${editedData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(editedData),
            });


            console.log('hit get data');

            console.log(response);

            const data = await response.json();
            console.log("data server response", data);
            if (response.status === 200) {
                setModalEdit(false);
                fetchRoomdata()
                showNotification({
                    title: 'Chỉnh sửa thông tin thành công',
                    message: `Thông tin Phòng số ${editedData.id} đã được cập nhật`,
                    color: 'green',
                    position: 'bottom-right'
                })
            }
        } catch (error) {

            console.log('hit error', error);
            showNotification({
                title: 'Có gì đó xảy ra?',
                message: `Có điều gì đó đã xảy ra với server???`,
                color: 'red',
                position: 'bottom-right'
            })
        }

    }




    const [opened, setOpened] = useState(false);
    const [roomIdToDelete, setRoomIdToDelete] = useState<number | null>(null);

    const handleDeleteRoom = (roomId: number) => {

        setRoomIdToDelete(roomId);
        setOpened(true);
    };
    const cancelDelete = () => {
        setOpened(false);
    };

    const confirmDelete = async () => {
        if (roomIdToDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/room/${roomIdToDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`

                    }
                });

                if (response.ok) {
                    fetchRoomdata()
                    showNotification({
                        title: 'Xoá thành công',
                        message: `Đã xoá thành công Phòng số ${roomIdToDelete}`,
                        color: 'green',
                        position: 'bottom-right'


                    })
                } else {
                    console.error('Failed to delete room');
                    showNotification({
                        title: 'Xoá thất bại',
                        message: `Xoá không thành công Phòng số ${roomIdToDelete}`,
                        color: 'yellow',
                        position: 'bottom-right'


                    })
                }
            } catch (error) {
                console.error('Error deleting room', error);
                showNotification({
                    title: 'Có gì đó xảy ra?',
                    message: `Có điều gì đó đã xảy ra với server???`,
                    color: 'red',
                    position: 'bottom-right'


                })
            }
        }
        setOpened(false);
    };

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [dataCreate, setDataCreate] = useState({
        owner_id: user.id,
        name: "",
        description: "",
        location: '{"city":"","country":""}',
        rating: 0,

    });

    const handleCreateGym = () => {
        console.log("Thêm mới phòng gym");
        setOpenModalCreate(true)
    };
    const handleSumbitCreate = async (dataCreate: any, file: File | null) => {
        console.log("data final create", dataCreate);
        try {
            console.log(file);

            if (!file) {
                showNotification({
                    title: 'Chưa chọn file',
                    message: 'Vui lòng chọn một file trước khi tạo phòng',
                    color: 'red',
                    position: 'bottom-right'
                });
                return;
            }
            const formData = new FormData();

            formData.append("data", JSON.stringify(dataCreate));
            formData.append("image", file);
            console.log("formData in create Room >+++", formData);
            for (var key of formData.keys()) {
                console.log(key);
                console.log(formData.get(key));
            }
            const response = await fetch(`http://localhost:8080/api/v1/room`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: formData,
            });
            const data = await response.json();
            console.log("data server response", data);
            if (response.status === 200) {
                setOpenModalCreate(false);
                fetchRoomdata()
                showNotification({
                    title: 'Tạo phòng thành công',
                    message: `Đã tạo thành công phòng mới`,
                    color: 'green',
                    position: 'bottom-right'
                })
            }
        } catch (error) {
            console.log(error);
            showNotification({
                title: 'Có gì đó xảy ra?',
                message: `Có điều gì đó đã xảy ra với server???`,
                color: 'red',
                position: 'bottom-right'
            })
        }
    }

    const handleServices = (roomId: number) => {
        console.log("handleServices", roomId);
        router.push(`/manager/services/${roomId}`)
    }

    const hanldeEquipment = (roomId: number) => {
        console.log("handleServices", roomId);
        router.push(`/manager/equipment/${roomId}`)
    }
    return (
        <Container size="lg">
            {/* <Title className={styles.title}>
                Quản lý Phòng gym
            </Title>   */}
            <div className={styles.titleContainer}>
                <Title className={styles.title}>
                    Quản lý Phòng gym
                </Title>
                <Button size="md" color="blue" onClick={() => handleCreateGym()}>
                    Tạo mới phòng gym
                </Button>
            </div>
            <div className={styles.cardsContainer}>
                {paginateData().map((room: any) => (
                    <div key={room.id} className={styles.card}>
                        {/* <img src={room.imageUrl} alt={room.name} className={styles.cardImage} /> */}
                        <img src={`http://localhost:8080/api/v1/Images/${room.image}`} alt={room.name} className={styles.cardImage} />
                        <div className={styles.cardContent}>

                            <Title order={4}>{room.name}</Title>
                            <Text>{room.description}</Text>
                            <Group>
                                <Button color="blue" onClick={() => handleDetailRoom(room)}>
                                    Chi tiết
                                </Button>
                                <Button color="yellow" onClick={() => handleEditRoom(room)}>
                                    Chỉnh sửa
                                </Button>
                                <Button color="red" onClick={() => handleDeleteRoom(room.id)}>
                                    Xóa
                                </Button>

                                <Button color="cyan" onClick={() => hanldeEquipment(room.id)}>
                                    Quản lý thiết bị
                                </Button>
                                <Button color="gray" onClick={() => handleServices(room.id)}>
                                    Quản lý dịch vụ
                                </Button>
                            </Group>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            <Group justify="center" mt="md">
                <Pagination
                    className={styles.paginationGroup}
                    value={currentPage}
                    onChange={handlePageChange}
                    total={totalPages}
                    withEdges
                />
            </Group>
            <EditRoomModal
                openEditUser={openModalEdit}
                setOpenEditUser={setModalEdit}
                formUserData={dataEdit}
                setFormUserData={setDataEdit}
                handleSubmitEdit={handleSubmitEdit}
            />
            <CreateRoomModalManager
                openCreateRoom={openModalCreate}
                setOpenCreateRoom={setOpenModalCreate}
                formRoomData={dataCreate}
                setFormRoomData={setDataCreate}
                handleSubmitCreate={handleSumbitCreate}
            />
            <Modal
                opened={opened}
                onClose={cancelDelete}
                title="Confirm Deletion"

            >
                <div>Bạn có thực sự muốn xoá phòng này đi không</div>
                <Group gap="apart" style={{ marginTop: '20px' }}>
                    <Button variant="light" onClick={cancelDelete} style={{ marginRight: '1vh' }}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={confirmDelete}>
                        Yes, delete
                    </Button>
                </Group>

            </Modal>
        </Container>
    );
};

export default RoomManagementManager;


