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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import Logo from '../logo/logo';
import { useRouter } from 'next/navigation';

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

                        <Collapse in={linksOpened}>{links}</Collapse>

                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <Button variant="light" className={classes.link} onClick={() => handleNavigate('/room')}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Phòng tập
                                        </Box>
                                        {/* <IconChevronDown size={16} color={theme.colors.blue[6]} /> */}
                                    </Center>
                                </Button>
                            </HoverCard.Target>

                            {/* <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>Features</Text>
                                    <Anchor href="#" fz="xs">
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider my="sm" />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group justify="space-between">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Get started
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant="default">Get started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown> */}
                        </HoverCard>
                        <Button variant="light" className={classes.link} onClick={() => handleNavigate('/about')}>
                            Về Chúng Tôi
                        </Button>
                        <Button variant="light" className={classes.link} onClick={() => handleNavigate('/contact')}>
                            Liên hệ
                        </Button>
                    </Group>

                    <Group visibleFrom="sm">
                        <Button className={classes.buttonRegister} variant="outline" onClick={() => handleNavigate('/Signin')} >Đăng ký ngay</Button>
                        {/* <Button className='buttonSingup'>Sign up</Button> */}
                    </Group>

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
                <ScrollArea >
                    <Divider my="sm" />

                    <a href="#" className={classes.link}>
                        Trang chủ
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Phòng tập
                            </Box>
                            <IconChevronDown size={16} color={theme.colors.blue[6]} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Về Chúng Tôi
                    </a>
                    <a href="#" className={classes.link}>
                        Liên hệ
                    </a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Button className={classes.buttonRegister} variant="outline" >Đăng ký ngay</Button>

                        {/* <Button variant="outline" color="white">Log in</Button>
                        <Button variant="outline" color="white">Sign up</Button> */}
                    </Group>

                </ScrollArea>
            </Drawer>
            </Container>
        </>
    );
}
export default HeaderMegaMenu;