'use client'
import {
    IconBook,
    IconChartPie3,
    IconChevronDown,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
} from '@tabler/icons-react';
import {
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    ScrollArea,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
    Container,
    Menu,
    Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import Logo from '../logo/logo';
import { usePathname, useRouter } from 'next/navigation';
import { UserContext } from '../userContext/userContext';
import { useContext, useEffect, useState } from 'react';

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];

const HeaderMegaMenu = () => {

    const { loginContext } = useContext(UserContext);
    const { user, logoutContext } = useContext(UserContext);

    const pathname = usePathname();
    const [userData, setUserData] = useState({
        token: '',
        username: '',
        email: '',
        isAuthenticate: false,
        first_name: '',
        last_name: '',
        role_name: '',
        id: 0,
    })

    const userDataDefault = {
        token: '',
        username: '',
        email: '',
        isAuthenticate: false,
        first_name: '',
        last_name: '',
        role_name: '',
        id: 0,
    }
    useEffect(() => {

        if (user && user.isAuthenticate === false && pathname !== '/' && pathname !== '/login') {
            // route.push('/login');
            console.log("no data");
        }
        else {
            console.log("check user");
            console.log("user in context", user);
            setUserData({
                token: user.token,
                username: user.username,
                email: user.email,
                isAuthenticate: user.isAuthenticate,
                first_name: user.first_name,
                last_name: user.last_name,
                role_name: user.role_name,
                id: user.id
            })
        }

    }, [user]);

    console.log("check user Data", userData);

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const router = useRouter();

    const handleNavigate = (url: string) => {
        router.push(url);
    };
    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));
    const handleLogout = () => {
        logoutContext();
        setUserData(userDataDefault)
        router.push('/')
    }

    return (
        < >
            <Container fluid px={0}>

                <header className={classes.header} style={{ paddingBottom: 0 }
                }>
                    <Group justify="space-between" h="100%">

                        <Logo />

                        <Group h="100%" gap={0} visibleFrom="sm">
                            <Button variant="light" className={classes.link} onClick={() => handleNavigate('/')}>
                                Trang chủ
                            </Button>
                            {user.role_name === 'admin' && (
                                <Button className={classes.link} onClick={() => handleNavigate('/admin/user')}>
                                    Admin
                                </Button>
                            )}
                            {user.role_name === 'manager' && (
                                <Button className={classes.link} onClick={() => handleNavigate('/manager/user')}>
                                    Manager
                                </Button>
                            )}
                            <Collapse in={linksOpened}>{links}</Collapse>

                            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                                <HoverCard.Target>
                                    <Button variant="light" className={classes.link} onClick={() => handleNavigate('/room')}>
                                        <Center inline>
                                            <Box component="span" mr={5}>
                                                Phòng tập
                                            </Box>
                                        </Center>
                                    </Button>
                                </HoverCard.Target>


                            </HoverCard>
                            <Button variant="light" className={classes.link} onClick={() => handleNavigate('/about')}>
                                Về Chúng Tôi
                            </Button>
                            <Button variant="light" className={classes.link} onClick={() => handleNavigate('/contact')}>
                                Liên hệ
                            </Button>
                        </Group>

                        {user && user.isAuthenticate === false ? (
                            <Group visibleFrom="sm">
                                <Button
                                    className={classes.buttonRegister}
                                    variant="outline"
                                    onClick={() => handleNavigate('/signin')}
                                >
                                    Đăng ký ngay
                                </Button>
                            </Group>
                        ) : (
                            <Group visibleFrom="sm">
                                <Menu shadow="md" width={200} withinPortal>
                                    <Menu.Target>
                                        <Avatar
                                            src={user.avatar || null}
                                            radius="xl"
                                            alt="Avatar"
                                            size="md"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Label>Tuỳ chọn</Menu.Label>
                                        <Menu.Item onClick={() => handleNavigate('/profile')}>Profile</Menu.Item>
                                        {user.role_name === 'admin' && (
                                            <Menu.Item onClick={() => handleNavigate('/admin/user')}>
                                                Admin
                                            </Menu.Item>
                                        )}
                                        {user.role_name === 'manager' && (
                                            <Menu.Item onClick={() => handleNavigate('/manager/user')}>
                                                Manager
                                            </Menu.Item>
                                        )}
                                        <Menu.Divider />
                                        <Menu.Item color="red" onClick={handleLogout}>
                                            Đăng xuất
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        )}


                        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                    </Group>
                </header >

                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="100%"
                    padding="md"
                    title="Navigation"
                    hiddenFrom="sm"
                    zIndex={1000000}
                >
                    <ScrollArea>
                        <Divider my="sm" />

                        {/* Menu Items */}
                        <UnstyledButton className={classes.link} onClick={() => handleNavigate('/')}>
                            Trang chủ
                        </UnstyledButton>
                        <UnstyledButton className={classes.link} onClick={() => handleNavigate('/admin/user')}>
                            Admin
                        </UnstyledButton>
                        <UnstyledButton className={classes.link} onClick={() => handleNavigate('/manager/user')}>
                            Manager
                        </UnstyledButton>

                        <UnstyledButton className={classes.link} onClick={toggleLinks}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Phòng tập
                                </Box>
                                <IconChevronDown size={16} color={theme.colors.blue[6]} />
                            </Center>
                        </UnstyledButton>
                        <Collapse in={linksOpened}>{links}</Collapse>

                        <UnstyledButton className={classes.link} onClick={() => handleNavigate('/about')}>
                            Về Chúng Tôi
                        </UnstyledButton>
                        <UnstyledButton className={classes.link} onClick={() => handleNavigate('/contact')}>
                            Liên hệ
                        </UnstyledButton>

                        <Divider my="sm" />

                        {/* Register Button */}
                        <Group justify="center" grow pb="xl" px="md">
                            <Button
                                className={classes.buttonRegister}
                                variant="outline"
                                onClick={() => handleNavigate('/signin')}
                            >
                                Đăng ký ngay
                            </Button>
                        </Group>
                    </ScrollArea>
                </Drawer>

            </Container>
        </>
    );
}
export default HeaderMegaMenu;