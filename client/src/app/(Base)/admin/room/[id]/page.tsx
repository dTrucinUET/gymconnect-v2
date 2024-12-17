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

    if (!room) {
        notFound();
    }
    console.log(room.location);

    return (
        <Container size="lg" style={{ marginTop: '2rem' }}>
            <Paper p="lg" shadow="sm" style={{ borderRadius: '8px' }}>
                <Title order={2} style={{ marginBottom: '1rem' }}>
                    Thông tin phòng gym
                </Title>

                {/* Flexbox for layout */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '2rem',
                        alignItems: 'flex-start',
                    }}
                >
                    {/* Left Column: Title and Description */}
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>
                            {room.name}
                        </h1>

                        <Text style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                            {room.description}
                        </Text>

                        <Text style={{ fontSize: '1rem', marginBottom: '1rem', color: '#555' }}>
                            <strong>Location: </strong>
                            {JSON.parse(room.location).city}, {JSON.parse(room.location).country}
                        </Text>

                        <Stack gap="xs" style={{ marginBottom: '1.5rem' }}>
                            <Text style={{ fontSize: '1rem', color: '#555' }}>
                                <strong>Rating:</strong>
                            </Text>
                            <Rating
                                value={room.rating}
                                readOnly
                                style={{ fontSize: '1.5rem' }}
                            />
                        </Stack>
                    </div>

                    {/* Right Column: Image */}
                    <div style={{ flex: 1 }}>
                        <Image
                            src={room.image || '/phongtap2.png'}
                            alt={room.name}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>

                {/* Google Maps Embed */}
                <div style={{ marginTop: '2rem', borderRadius: '8px', overflow: 'hidden' }}>
                    <iframe
                        width="100%"
                        height="300"
                        style={{ border: '0' }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY&q=${JSON.parse(room.location).city},${JSON.parse(room.location).country}`}
                    // src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY&q=Hà Nội,Việt Nam`}

                    ></iframe>
                </div>
            </Paper>
        </Container>
    );
};
export default RoomDetail;