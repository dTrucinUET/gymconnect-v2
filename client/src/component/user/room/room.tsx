'use client'
import { Container, Title, Group, Button } from '@mantine/core';
import { notFound } from 'next/navigation';
import { Paper, Text, Rating, Stack, Image } from '@mantine/core';
import { useRouter } from 'next/navigation';

interface RoomDetailProps {
  room: {
    id: string;
    name: string;
    description: string;
    location: string;
    image: string;
    rating: number;
  };
}

const RoomDetail = ({ room }: RoomDetailProps) => {
  const router = useRouter();

  const handleServiceRoom = (roomId: string) => {
    router.push(`/service?roomId=${roomId}`); 
  };

  const handleEquipmentRoom = (roomId: string) => {
    router.push(``); 
  };

  if (!room) {
    notFound();
  }

  // console.log("room location", room.location);
  // console.log("type", typeof(room.location));

  return (
    <Container size="lg" style={{ marginTop: '2rem' }}>
      <Paper p="lg" shadow="sm" style={{ borderRadius: '8px' }}>
        <Title order={2} style={{ marginBottom: '1rem' }}>
          Thông tin phòng gym
        </Title>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2rem',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>
              {room.name}
            </h1>

            <Text style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {room.description}
            </Text>

            <Text style={{ fontSize: '1rem', marginBottom: '1rem', color: '#555' }}>
              <strong>Location: </strong>
              {/* {room.location && JSON.parse(room.location)?.city && JSON.parse(room.location)?.country
                ? `${JSON.parse(room.location).city}, ${JSON.parse(room.location).country}`
                : 'N/A'} */}
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

        {/* Buttons for handling actions */}
        <Group gap="xs" style={{ marginTop: '2rem' }}>
          <Button size="xs" color="green" onClick={() => handleEquipmentRoom(room.id)}>
            Dụng cụ
          </Button>
          <Button size="xs" color="yellow" onClick={() => handleServiceRoom(room.id)}>
            Dịch vụ
          </Button>
        </Group>

        {/* Google Maps Embed */}
        <div style={{ marginTop: '2rem', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe
            width="100%"
            height="300"
            style={{ border: '0' }}
            loading="lazy"
            allowFullScreen
            // src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(room.location)}`}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default RoomDetail;
