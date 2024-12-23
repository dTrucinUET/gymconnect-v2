'use client'

import { Card, Text, Button, Group } from '@mantine/core';
import { useRouter } from 'next/navigation'
import '../../component/service/ServiceCards.css'

interface ServiceInfo {
  name: string;
  description: string;
  amount: number;
  id: number;
  quantity: number;
}

function ServiceCard({name, description, amount, id, quantity}: ServiceInfo) {
  const router = useRouter()

  console.log(id);
  console.log(quantity);
  
  
  const handdleClick = () => {
    router.push(`/service/purchase/${id}?quantity=${quantity}&price=${amount}&name=${name}`)
  }


  return (
    <Card
    style={{
        width: '31%',
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    }} 
    shadow="sm" radius="md" withBorder>

        <Group justify="space-between" mt="md" mb="xs">
            <Text
            style={{
                fontSize: '1.4rem',
            }}
             fw={600}>{name}</Text>
        </Group>
      
      <Group mt="md" mb="xs" >
        
        <Group gap={0}>
          <Text 
            style={{
                fontSize: '0.6rem',
                marginTop: '-1.4rem'
            }}
            fw={600}
            size='sm'>
                VNĐ
          </Text>

            <Text
            size='xl'
            style={{
                fontSize: '2.1rem',
                display: 'flex',
                flexDirection: 'row'
            }}
             fw={800}>
                {amount}</Text>
            <Text
            span
            size='sm'
            style={{
                margin: '0px',  
            
            }}
             fw={400}>/mo</Text>
        </Group>
        
      </Group>

      <Text 
      style={{
        height: '21%'
      }}
      size="sm" 
      c="dimmed">
        {description}
      </Text>

      <Button
      onClick={handdleClick}
      className='purchase-btn'
      style={{
        width: '90%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        opacity: 0.8
      }}
       color="black" mt="md" radius="md">
        Đăng ký ngay
      </Button>
    </Card>
  );
}

export default ServiceCard