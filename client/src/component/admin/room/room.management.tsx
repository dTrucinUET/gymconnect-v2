'use client'
import { Button, Group, Container, Title, Text, Pagination } from '@mantine/core';
import { useState } from 'react';
import styles from './room-management.module.css';

const RoomManagement = (props: any) => {
    const itemsPerPage = 6;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(props.data.length / itemsPerPage);

    const paginateData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return props.data.slice(startIndex, endIndex);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDetailRoom = (roomId: string) => {
        console.log(`Update permissions for: ${roomId}`);
    };

    const handleEditRoom = (roomId: string) => {
        console.log(`Edit room: ${roomId}`);
    };

    const handleDeleteRoom = (roomId: string) => {
        console.log(`Delete room: ${roomId}`);
    };
    const handleCreateGym = () => {
        console.log("Thêm mới phòng gym");
        // Thêm logic xử lý
    };
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
                        <img src='/phongtap2.png' alt={room.name} className={styles.cardImage} />

                        <div className={styles.cardContent}>


                            <Title order={4}>{room.name}</Title>
                            <Text>{room.description}</Text>
                            <Group>
                                <Button color="blue" onClick={() => handleDetailRoom(room.id)}>
                                    Chi tiết
                                </Button>
                                <Button color="yellow" onClick={() => handleEditRoom(room.id)}>
                                    Chỉnh sửa
                                </Button>
                                <Button color="red" onClick={() => handleDeleteRoom(room.id)}>
                                    Xóa
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
        </Container>
    );
};

export default RoomManagement;
