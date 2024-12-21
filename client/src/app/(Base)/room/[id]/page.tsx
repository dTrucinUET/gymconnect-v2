import { Container, Title } from '@mantine/core';
import { notFound } from 'next/navigation';
import { Paper, Text, Rating, Stack, Image } from '@mantine/core';

interface RoomDetailProps {
    params: { id: string };
}

const RoomDetail = async ({ params }: RoomDetailProps) => {
    const { id } = params;

    const response = await fetch(`http://localhost:8080/room/${id}`);
    const room = await response.json();
    console.log("room check here", room);

    if (!room) {
        notFound();
    }
    console.log("room location", room.location);

    return (
        <Container size="lg" style={{ marginTop: '2rem' }}>
            đây là thông tin chung của phòng nào đó
        </Container>
    );
};
export default RoomDetail;
