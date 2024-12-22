import ServiceCard from "@/component/service/ServiceCard";
import { Container, Group, Text, Pagination } from "@mantine/core";
import '../service/Service.css'
import { cookies } from "next/headers";
import ServiceContent from "./serviceContent";

interface RoomIdQuery {
    searchParams : {
        roomId : string
    }
}

const Service = async({searchParams}:RoomIdQuery) => {
    const cookie = await cookies()
    const token = cookie.get('token')


    console.log(token);
    
    const { roomId } = await searchParams;
    const servicesInRoomRes = await fetch(`http://localhost:8080/service?roomid=${roomId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token?.value}`,
        }
    })
    const servicesInRoom = await servicesInRoomRes.json()
    
    
    return (
        <>
            <ServiceContent services={servicesInRoom} />
            
        </>
    );
}
export default Service;