import { notFound } from 'next/navigation';

import RoomDetail from "@/component/user/room/room";
// import Comment from "@/component/comment/comment"; 



interface RoomPageProps {
    params: { roomId: string };
}

const RoomPage = async ({ params }: RoomPageProps) => {
    const { roomId } = await Promise.resolve(params);
    console.log(roomId);

    const response = await fetch(`http://localhost:8080/room/${roomId}`);
    const room = await response.json();

    if (!room) {
        notFound();
    }


    const responseComment = await fetch(`http://localhost:8080/room_comment/room/${roomId}`);
    const comments = await responseComment.json();
    console.log("comment", typeof (comments));


    return (
        <>
            <RoomDetail room={room} />
            {/* <Comment comments={comments} /> */}
        </>
    );
};

export default RoomPage;
