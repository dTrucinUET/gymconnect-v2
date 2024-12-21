import RoomManagement from "@/component/admin/room/room.management";


const RoomManagementPage = async () => {

    const response = await fetch('http://localhost:8080/room');
    const dataAA = await response.json();
    console.log("dataqqqqqqqqq fetch server new ", dataAA)

    return (
        <>
            <RoomManagement data={dataAA} />
        </>
    );
}
export default RoomManagementPage;