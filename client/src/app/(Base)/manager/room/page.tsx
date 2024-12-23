import RoomManagementManager from "@/component/manager/room/room.management";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const Manager = async () => {



    const cookie = await cookies();
    const token = cookie.get('token')
    if (!token) {
        return redirect('/login')
    }
    console.log("token in room", token?.value);

    const response = await fetch('http://localhost:8080/api/v1/room', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}`
        },
        credentials: 'include',

    });

    const dataRoomManager = await response.json();
    console.log("dataRoomManager in fetch server new ", dataRoomManager)

    return (
        <>
            <RoomManagementManager data={dataRoomManager} />
        </>
    );
}
export default Manager;