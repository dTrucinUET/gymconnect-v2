'use client';
import { Button, Group, Container, Title, Text, Pagination, Input } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './rooms.module.css';
import RoomRating from '@/component/rating/rating';

const Rooms = (props: any) => {
    const itemsPerPage = 6;

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    
    // const filteredData = props.data.filter((room: any) =>
    //     room.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredData = Array.isArray(props.data) 
    ? props.data.filter((room: any) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];  

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginateData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };
    // console.log(props.data);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleDetailRoom = (roomId: string) => {
        router.push(`/room/${roomId}`); // Điều hướng đến trang chi tiết
    };

    return (
        <Container size="lg">
            <div className={styles.titleContainer}>
                <Title className={styles.title}>Các phòng tập</Title>
            </div>

            <div className={styles.searchContainer}>
                <Input
                    id="box"
                    placeholder="Search anything..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.search__box}
                />
                <i className={styles.search__icon} id="icon"></i>
            </div>

            <div className={styles.cardsContainer}>
                {paginateData().map((room: any) => (
                    <div key={room.id} className={styles.card}>
                        <img src="/phongtap2.png" alt={room.name} className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <Title order={4}>{room.name}</Title>
                            <Text>{room.description}</Text>
                            <RoomRating rate={room} />
                            <Group>
                                <Button color="blue" onClick={() => handleDetailRoom(room.id)}>
                                    Chi tiết
                                </Button>
                            </Group>
                        </div>
                    </div>
                ))}
            </div>

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

export default Rooms;
