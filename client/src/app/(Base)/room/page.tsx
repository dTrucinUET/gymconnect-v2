import Rooms from "@/component/user/rooms/rooms.view";


const Room = async () => {

    const response = await fetch('http://localhost:8080/room');
    const dataAA = await response.json();
    console.log("dataqqqqqqqqq fetch server new ", dataAA)

    return (
        <>
            <Rooms data={dataAA} />
        </>
    );
}
export default Room;