import UserManagement from "@/component/admin/user/user.management";


const UserManagementPage = async () => {

    const response = await fetch('http://localhost:8080/room');
    const data = await response.json();
    console.log("data", data)

    return (
        <>
            <UserManagement data={data} />
        </>
    );
}
export default UserManagementPage;