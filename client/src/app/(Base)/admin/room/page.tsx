import RoomManagement from "@/component/admin/room/room.management";


const RoomManagementPage = async () => {

    const response = await fetch('http://localhost:8080/room');
    const data = await response.json();
    console.log("data", data)

    return (
        <>
            <RoomManagement data={data} />
        </>
    );
}
export default RoomManagementPage;