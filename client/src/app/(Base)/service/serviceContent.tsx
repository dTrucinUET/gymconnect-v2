'use client'

import ServiceCard from '@/component/service/ServiceCard'
import { Container, Group, Text, Pagination } from '@mantine/core'
import React, { useState } from 'react'

type Service = {
    id: number,
    name: string,
    description: string,
    rating: number,
    balance: number,
    days: number,
    amount: number,
    type: string,
    room_id: number,
}

interface ServiceData {
    services : Array<Service>
}

function ServiceContent({ services }: ServiceData) {
    const [activePage, setActivePage] = useState(1)
    const [renderItems, setRenderItems] = useState()

    const serviceData = services
    console.log(serviceData, 'in Service Content');
    
    

  return (
    <>
        <Container
                style={{
                    background: 'black',
                    paddingBottom: '5%'
                }}
            >
                <Container
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
                >
                    <Text 
                    fw={700}
                    style={{
                        color: 'white',
                        fontSize: '2.5rem',
                    }}> Dịch vụ tại phòng tập</Text>
                </Container>

                <Container>
                    <Text style={{
                        color: 'white',
                    }}>
                        Search bar
                    </Text>
                </Container>

                <Group className="service-container">
                    <ServiceCard/>
                    <ServiceCard/>
                    <ServiceCard/>
                </Group>

            </Container>
    </>
  )
}

export default ServiceContent