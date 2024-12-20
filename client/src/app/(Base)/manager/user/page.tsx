import UserManagementManager from "@/component/manager/user/user.management";


const UserManagementPage = async () => {

    // const response = await fetch('http://localhost:8080/users');
    // const data = await response.json();
    // console.log("data user fetcj", data)
    const data = {}
    return (
        <>
            <UserManagementManager data={data} />
        </>
    );
}
export default UserManagementPage;