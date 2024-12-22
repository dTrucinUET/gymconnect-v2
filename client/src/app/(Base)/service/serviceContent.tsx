'use client'

import ServiceCard from '@/component/service/ServiceCard'
import { SearchBar } from '@/component/UtilsComponents/SearchBar'
import { Container, Group, Text, Pagination } from '@mantine/core'
import React, { useEffect, useState } from 'react'


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

    function chunk<T>(array: T[], size: number): T[][] {
        if (!array.length) {
          return [];
        }
        const head = array.slice(0, size);
        const tail = array.slice(size);
        return [head, ...chunk(tail, size)];
      }

    const serviceData = services
    console.log(services);
    
    let initialItems: any[] | (() => any[]) = []
    serviceData.map((service, index)=>{
        const ServiceBlock = (
            <ServiceCard name={service.name} 
            description={service.description}
            amount={service.balance}
            id={service.id}
            quantity={service.amount}
            key={index} />
        )
        initialItems.push(ServiceBlock)
    })

    const initialChunk = chunk(initialItems, 3)

    const [activePage, setActivePage] = useState(1)
    const [search, setSearch] = useState('')
    const [renderItems, setRenderItems] = useState<any[]>(initialItems)
    const [renderChunk, setRenderChunk] = useState(initialChunk)


    const handleSearch = (search: string) => {
        let items: React.SetStateAction<any[] | undefined> = []
        if(search.trim().length == 0){
            serviceData.map((service, index)=>{
                const ServiceBlock = (
                    <ServiceCard name={service.name} 
                    description={service.description}
                    amount={service.balance} 
                    id={service.id}
                    quantity={service.amount}
                    key={index}/>
                )
                items.push(ServiceBlock)
            })
            setRenderItems(items)
            setRenderChunk(chunk(items, 3))
            return;
        }
        serviceData.map((service, index)=>{
            if (service.name.trim().toLowerCase().includes(search.toLowerCase()) ||
                service.description.trim().toLowerCase().includes(search.toLocaleLowerCase())){
                    const ServiceBlock = (
                        <ServiceCard name={service.name}
                        description={service.description}
                        amount={service.balance}
                        id={service.id}
                        quantity={service.amount}
                        key={index} />
                    )
                    items.push(ServiceBlock)
            }
        })
        setRenderItems(items)
        setRenderChunk(chunk(items, 3))
        return;
    }

    useEffect(()=>{
        handleSearch(search)
    }, [search])


    
    

  return (
    <>
        <Container
                style={{
                    background: 'black',
                    paddingBottom: '5%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    paddingTop: '2%',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    marginBottom: '0.1%'
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

                <Container style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '3%',
                    paddingBottom: '9%',
                }}>
                    <SearchBar search={search} setSearch={setSearch} />
                </Container>

                <Group className="service-container">
                    {renderChunk[activePage-1].map((item)=>{
                        return item
                    })}
                </Group>

                <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Pagination total={renderChunk.length} value={activePage} onChange={setActivePage} mt="sm" />
                </Container>
            </Container>
    </>
  )
}

export default ServiceContent