import { notFound } from 'next/navigation';
import RoomDetail from "@/component/user/room/room"; 
import Comment from "@/component/comment/comment"; 
export function generateStaticParams() {
    return [{ roomId: "room" }];
  }

interface RoomPageProps {
    // params: { roomId: string }; 
    params: Promise<{ roomId: string }>;

}

const RoomPage = async ({ params }: RoomPageProps) => {
    const { roomId } = await Promise.resolve(params); 
    console.log(roomId);
    
    const response = await fetch(`http://localhost:8080/api/v1/room/${roomId}`);
    const room = await response.json();
    console.log("test", response);
    
    if (!room) {
        notFound(); 
    }


    const responseComment = await fetch(`http://localhost:8080/api/v1/room_comment/room/${roomId}`);
    const comments = await responseComment.json(); 
    console.log("comment", typeof(comments));
    

    return (
        <>
            <RoomDetail room={room} />
            <Comment comments={comments} />
        </>
    );
};

export default RoomPage;
