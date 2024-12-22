'use client'

import { Card, Text, Button, Group } from '@mantine/core';
import '../../component/service/ServiceCards.css'

function ServiceCard() {
  return (
    <Card
    style={{
        width: '31%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '3%'
    }} 
    shadow="sm" padding="sx" radius="md" withBorder>

        <Group justify="space-between" mt="md" mb="xs">
            <Text
            style={{
                fontSize: '1.4rem',
                fontWeight: 500
            }}
             fw={600}>Thẻ thường</Text>
        </Group>
      
      <Group mt="md" mb="xs" >
        <Group gap={0}>
            <Text
            size='xl'
            style={{
                fontSize: '2.1rem',
                display: 'flex',
                flexDirection: 'row'
            }}
             fw={800}>
                <Text 
                    style={{
                        fontSize: '0.6rem',
                        marginTop: '0.3rem'
                    }}
                    fw={600}
                    size='sm'>
                        VNĐ
                </Text>

                3</Text>
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
        
      }}
      size="sm" 
      c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button
      style={{
        width: '90%',
      }}
       color="black" mt="md" radius="md">
        Đăng ký ngay
      </Button>
    </Card>
  );
}

export default ServiceCard