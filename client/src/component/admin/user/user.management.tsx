'use client'

import { Table, Button, Group, Pagination, Select, Container, Title, Modal } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import styles from './user-management.module.css';
import { UserContext } from '@/component/userContext/userContext';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import AdminUserCreationModal from '../modal/modal_user/create_user';

export interface User {
    role_id: number;
    email: string;
    first_name: string;
    last_name: string;
    id: number;
    isAuthenticate: boolean;
    role_name: string;
    token: string;
    username: string;
    permission_list: any
}

const fakeUsers: User[] = [
    {
        email: 'admin@example.com',
        first_name: 'Admin',
        last_name: 'User',
        id: 1,
        isAuthenticate: true,
        role_name: 'admin',
        token: 'fake-token-1',
        username: 'admin',
        permission_list: ['create', 'read', 'update', 'delete'],
        role_id: 0
    },
    {
        email: 'user@example.com',
        first_name: 'Regular',
        last_name: 'User',
        id: 2,
        isAuthenticate: true,
        role_name: 'user',
        token: 'fake-token-2',
        username: 'user',
        permission_list: ['read'],
        role_id: 0
    },
];

const UserManagement = () => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [dataUser, setDataUser] = useState<User[]>(fakeUsers);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const fetchData = async () => {
        try {
            console.log('fetch user list in admin');

            if (user.isAuthenticate === false || !user.token) {
                router.push('/'); // Chuyển hướng nếu người dùng không xác thực
                return;
            }

            const response = await fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                console.log('Successfully fetched user data');
                const data = await response.json();
                console.log(data);

                setDataUser(data); // Lưu dữ liệu vào state
            } else {
                showNotification({
                    title: 'Error',
                    message: 'Không thể tải dữ liệu!',
                    color: 'red',
                    position: 'bottom-right',
                });
            }
        } catch (error) {
            console.error(error);
            showNotification({
                title: 'Error',
                message: 'Không thể tải dữ liệu!',
                color: 'red',
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {

        fetchData()
        if (user) {
            if (user.isAuthenticate === false || user.role_name !== 'admin') {
                showNotification({
                    title: 'Warning',
                    message: 'Bạn không có quyền tham gia hành động này!',
                    color: 'yellow',
                    position: 'bottom-right',
                });
                router.push('/');
            } else {
                fetchData();
            }
        }
    }, [user, router]);

    const displayedUsers = dataUser.slice((page - 1) * rowsPerPage, page * rowsPerPage);


    const [openedConfirmDeleteUser, setOpenedConfirmDeleteUser] = useState(false);
    const [userIdDelete, setUserIdDelete] = useState<number | null>(null);

    const handleDeleteUser = (id_delete: number) => {

        setUserIdDelete(id_delete);
        setOpenedConfirmDeleteUser(true);
    };

    const cancelDelete = () => {
        setOpenedConfirmDeleteUser(false);
    };

    const confirmDelete = async () => {
        if (userIdDelete) {
            try {
                const response = await fetch(`http://localhost:8080/users/${userIdDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`

                    }
                });
                console.log('response delete User', response);

                if (response.status === 200) {
                    console.log('hit delete');

                    fetchData()
                    showNotification({
                        title: 'Xoá thành công',
                        message: `Đã xoá thành công người dùng số ${userIdDelete}`,
                        color: 'green',
                        position: 'bottom-right'
                    })
                } else {
                    console.log('hit no delete');

                    console.error('Failed to delete user');
                    showNotification({
                        title: 'Xoá thất bại',
                        message: `Xoá không thành công người dùng số ${userIdDelete}`,
                        color: 'yellow',
                        position: 'bottom-right'


                    })
                }
            } catch (error) {
                console.error('Error deleting user', error);
                showNotification({
                    title: 'Có gì đó xảy ra?',
                    message: `Có điều gì đó đã xảy ra với server???`,
                    color: 'red',
                    position: 'bottom-right'


                })
            }
        }
        setOpenedConfirmDeleteUser(false);
    };


    const [modalCreateOpen, setModalCreateOpened] = useState(false);

    const handleCreateUser = () => {
        setModalCreateOpened(true)
        console.log('Creating new user');
    };
    const handleSubmitCreateUser = async (userCreate: any) => {
        console.log('userCreate in Admin', userCreate);

        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            },
            body: JSON.stringify(userCreate),
            credentials: 'include'
        });
        console.log("response", response);

        const data = await response.json();

        if (response.status === 201) {
            setModalCreateOpened(false)
            showNotification({
                title: 'Success',
                message: 'Registration successful!',
                color: 'green',
            });
            fetchData()
        } else {
            showNotification({
                title: 'Error',
                message: data.message || 'Registration failed. Please try again.',
                color: 'red',
            });
        }
    }


    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [selectedRole, setSelectedRole] = useState<number | null>(null);

    const roles = [
        { id: 1, name: 'User' },
        { id: 2, name: 'Admin' },
        { id: 3, name: 'Manager' },
    ];

    const handlePermissionUpdate = (userId: number, currentRoleId: number) => {
        setEditingUserId(userId);
        setSelectedRole(currentRoleId);
    };

    const handleRoleChange = async (userId: number, roleId: number) => {
        try {
            console.log('handleRoleChange in Admin', userId, roleId);

            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ roleId }),
            });

            if (response.ok) {
                showNotification({
                    title: 'Cấp quyền cho người dùng thành công',
                    message: `Cấp quyền thành công người dùng số ${userIdDelete}`,
                    color: 'green',
                    position: 'bottom-right'


                })
                setEditingUserId(null);
                fetchData();
            } else {
                showNotification({
                    title: 'Cấp quyền cho người dùng thất bại',
                    message: `Cấp quyền thất bại người dùng số ${userIdDelete}`,
                    color: 'red',
                    position: 'bottom-right'


                })
            }
        } catch (error) {
            showNotification({
                title: 'có vấn đề gì đó xảy ra với server',
                message: `server đang có vấn đề này, đợi fix nhé`,
                color: 'red',
                position: 'bottom-right'
            })
        }
    };

    return (
        <Container size="lg">
            <Title className={styles.title}>Quản lý người dùng</Title>

            <Table highlightOnHover className={styles.table}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>Tên đăng nhập</th>
                        <th>Vai trò</th>
                        <th>Quyền</th>
                        <th>
                            <div className={styles.actionHeader}>
                                Hành động
                                <Button size="xs" color="blue" onClick={handleCreateUser}>
                                    Thêm mới người dùng
                                </Button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayedUsers.length > 0 ? (
                        displayedUsers.map((user, index) => (
                            <tr key={user.email}>
                                <td>{(page - 1) * rowsPerPage + index + 1}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>

                                <td >
                                    {editingUserId === user.id ? (
                                        <>
                                            <Group wrap='nowrap' gap={1}>
                                                <Select
                                                    value={selectedRole?.toString() || user.role_id.toString()}
                                                    onChange={(value) => setSelectedRole(Number(value))}
                                                    data={roles.map((role) => ({ value: role.id.toString(), label: role.name }))}
                                                    style={{ width: '15vh' }}
                                                />
                                                <Button
                                                    onClick={() => {
                                                        if (selectedRole !== null) { handleRoleChange(user.id, selectedRole) }
                                                    }
                                                    }
                                                    size="xs"
                                                    variant="filled"
                                                    style={{ backgroundColor: '#228be6', color: '#fff' }}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={() => setEditingUserId(null)}
                                                    size="xs"
                                                    variant="outline"
                                                    style={{ backgroundColor: 'orange', color: '#fff' }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Group>
                                        </>
                                    ) : (
                                        <>
                                            {user.role_id === 1
                                                ? 'User'
                                                : user.role_id === 2
                                                    ? 'Admin'
                                                    : 'Manager'}

                                        </>
                                    )}
                                </td>
                                <td>
                                    <Group gap={1}>
                                        {user.permission_list.map((permissionObj: any, index: any) => (
                                            <Button
                                                size="xs"
                                                variant="light"
                                                key={index}
                                                color={user.role_id === 2 ? 'red' : user.role_id === 3 ? 'orange' : 'blue'}
                                            >
                                                {permissionObj.permission}
                                            </Button>
                                        ))}
                                    </Group>
                                </td>
                                <td>
                                    <Group gap="xs">
                                        <Button size="xs" color="green" onClick={() => handlePermissionUpdate(user.id, user.role_id)}>
                                            Chỉnh sửa quyền
                                        </Button>
                                        {/* <Button size="xs" color="yellow" onClick={() => handleEditUser(user)}>
                                            Chỉnh sửa
                                        </Button> */}
                                        <Button size="xs" color="red" onClick={() => handleDeleteUser(user.id)}>
                                            Xóa
                                        </Button>
                                    </Group>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                                Không có người dùng
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Group mt="md" className={styles.paginationGroup} justify="center">
                <Pagination
                    value={page}
                    onChange={setPage}
                    total={Math.ceil(dataUser.length / rowsPerPage)}
                    className={styles.paginationGroup}
                />
                <Select
                    value={rowsPerPage.toString()}
                    onChange={(value) => setRowsPerPage(Number(value))}
                    data={['10', '20', '50']}
                    placeholder="Rows per page"
                    style={{ width: 100 }}
                />
            </Group>
            <AdminUserCreationModal
                opened={modalCreateOpen}
                onClose={() => setModalCreateOpened(false)}
                onCreateUser={handleSubmitCreateUser}
            />


            <Modal
                opened={openedConfirmDeleteUser}
                onClose={cancelDelete}
                title="Confirm Deletion"

            >
                <div>Bạn có thực sự muốn xoá phòng này đi không</div>
                <Group gap="apart" style={{ marginTop: '20px' }}>
                    <Button variant="light" onClick={cancelDelete} style={{ marginRight: '1vh' }}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={confirmDelete}>
                        Yes, delete
                    </Button>
                </Group>

            </Modal>

        </Container>
    );
};

export default UserManagement;

