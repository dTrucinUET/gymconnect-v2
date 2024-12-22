import RoomView from "@/component/user/rooms/rooms.view";


const Room = async () => {

    const response = await fetch('http://localhost:8080/room');
    const data = await response.json();
    console.log("data", data)

    return (
        <>
            <RoomView data={data} />
        </>
    );
}
export default Room;