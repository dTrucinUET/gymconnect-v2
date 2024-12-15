

'use client'
import { Table, Button, Group, Pagination, Select, TextInput, Container, Title } from '@mantine/core';
import { useState } from 'react';
import styles from './user-management.module.css';

interface User {
    email: string;
    username: string;
    role: string;
    permissions: string[];
}

const UserManagement = (props: any) => {

    console.log(props.data);

    const [users, setUsers] = useState<User[]>([
        { email: 'test1@gmail.com', username: 'test1gym123', role: 'Người dùng', permissions: ['Xem', 'Mua hàng', 'Xóa tài khoản'] },
        { email: 'quanly@gmail.com', username: 'quanlyphonggym', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem', 'Xóa tài khoản'] },
        { email: 'test2@gmail.com', username: 'usergym2', role: 'Người dùng', permissions: ['Xem', 'Mua hàng'] },
        { email: 'manager1@gmail.com', username: 'gymmanager1', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem'] },
        { email: 'test3@gmail.com', username: 'usergym3', role: 'Người dùng', permissions: ['Xem', 'Mua hàng', 'Xóa tài khoản'] },
        { email: 'manager2@gmail.com', username: 'gymmanager2', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem', 'Xóa tài khoản'] },
        { email: 'test4@gmail.com', username: 'usergym4', role: 'Người dùng', permissions: ['Xem', 'Mua hàng'] },
        { email: 'manager3@gmail.com', username: 'gymmanager3', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem'] },
        { email: 'test5@gmail.com', username: 'usergym5', role: 'Người dùng', permissions: ['Xem', 'Mua hàng', 'Xóa tài khoản'] },
        { email: 'manager4@gmail.com', username: 'gymmanager4', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem', 'Xóa tài khoản'] },
        { email: 'test6@gmail.com', username: 'usergym6', role: 'Người dùng', permissions: ['Xem', 'Mua hàng'] },
        { email: 'manager5@gmail.com', username: 'gymmanager5', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem'] },
        { email: 'test7@gmail.com', username: 'usergym7', role: 'Người dùng', permissions: ['Xem', 'Mua hàng', 'Xóa tài khoản'] },
        { email: 'manager6@gmail.com', username: 'gymmanager6', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem', 'Xóa tài khoản'] },
        { email: 'test8@gmail.com', username: 'usergym8', role: 'Người dùng', permissions: ['Xem', 'Mua hàng'] },
        { email: 'manager7@gmail.com', username: 'gymmanager7', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem'] },
        { email: 'test9@gmail.com', username: 'usergym9', role: 'Người dùng', permissions: ['Xem', 'Mua hàng', 'Xóa tài khoản'] },
        { email: 'manager8@gmail.com', username: 'gymmanager8', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem', 'Xóa tài khoản'] },
        { email: 'test10@gmail.com', username: 'usergym10', role: 'Người dùng', permissions: ['Xem', 'Mua hàng'] },
        { email: 'manager9@gmail.com', username: 'gymmanager9', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem'] },
        { email: 'test11@gmail.com', username: 'usergym11', role: 'Người dùng', permissions: ['Xem', 'Mua hàng', 'Xóa tài khoản'] },
        { email: 'manager10@gmail.com', username: 'gymmanager10', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem', 'Xóa tài khoản'] },
        { email: 'test12@gmail.com', username: 'usergym12', role: 'Người dùng', permissions: ['Xem', 'Mua hàng'] },
        { email: 'manager11@gmail.com', username: 'gymmanager11', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem'] },
        { email: 'test13@gmail.com', username: 'usergym13', role: 'Người dùng', permissions: ['Xem', 'Mua hàng', 'Xóa tài khoản'] },
        { email: 'manager12@gmail.com', username: 'gymmanager12', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem', 'Xóa tài khoản'] },
        { email: 'test14@gmail.com', username: 'usergym14', role: 'Người dùng', permissions: ['Xem', 'Mua hàng'] },
        { email: 'manager13@gmail.com', username: 'gymmanager13', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem'] },
        { email: 'test15@gmail.com', username: 'usergym15', role: 'Người dùng', permissions: ['Xem', 'Mua hàng', 'Xóa tài khoản'] },
        { email: 'manager14@gmail.com', username: 'gymmanager14', role: 'Quản lý', permissions: ['Quản lý phòng gym', 'Xem', 'Xóa tài khoản'] },
    ]);

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const displayedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handlePermissionUpdate = (email: string) => {
        console.log(`Update permissions for: ${email}`);
    };

    const handleEditUser = (email: string) => {
        console.log(`Edit user: ${email}`);
    };

    const handleDeleteUser = (email: string) => {
        console.log(`Delete user: ${email}`);
    };

    const handleClickPermission = (permission: string) => {
        console.log(permission);
    };

    const handleCreatePermission = () => {

    }
    return (
        <Container size={'lg'}>
            <Title className={styles.title}>
                Quản lý người dùng
            </Title>

            <Table highlightOnHover className={styles.table}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>Tên đăng nhập</th>
                        <th>Vai trò</th>
                        <th>Quyền</th>
                        {/* <th>Hành động <Button size="xs" color="blue" onClick={() => handleCreatePermission()}>
                            Thêm mới
                        </Button></th> */}


                        <th>
                            <div className={styles.actionHeader}>
                                Hành động
                                <Button size="xs" color="blue" onClick={() => handleCreatePermission()}>
                                    Thêm mới người dùng
                                </Button>
                            </div>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {displayedUsers.map((user, index) => (
                        <tr key={user.email}>
                            <td>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <Group gap="xs">
                                    {user.permissions.map((permission) => (
                                        <Button onClick={() => handleClickPermission(permission)} size="xs" variant="light" key={permission} color={permission === 'Xóa tài khoản' ? 'red' : 'blue'}>
                                            {permission}
                                        </Button>
                                    ))}
                                </Group>
                            </td>
                            <td>
                                <Group gap="xs">
                                    <Button size="xs" color="green" onClick={() => handlePermissionUpdate(user.email)}>
                                        Cấp quyền
                                    </Button>
                                    <Button size="xs" color="yellow" onClick={() => handleEditUser(user.email)}>
                                        Chỉnh sửa
                                    </Button>
                                    <Button size="xs" color="red" onClick={() => handleDeleteUser(user.email)}>
                                        Xóa
                                    </Button>
                                </Group>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Group mt="md" className={styles.paginationGroup} justify="center">
                <Pagination value={page} onChange={setPage} total={Math.ceil(users.length / rowsPerPage)}
                    className={styles.paginationGroup} />
                <Select

                    value={rowsPerPage.toString()}
                    onChange={(value) => setRowsPerPage(Number(value))}
                    data={['10', '20', '50']}
                    placeholder="Rows per page"
                    style={{ width: 100 }}
                />
            </Group>

        </Container>
    );
};

export default UserManagement;
