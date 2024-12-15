'use client '
import React from "react";
import { Container, Group, Text, Button, Anchor, Box, Stack, Divider, useMantineTheme, } from '@mantine/core';
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram } from '@tabler/icons-react';
import Logo from "../logo/logo";

export default function Footer() {

    return (
        <Container fluid px={0}>

        <Box bg="black" py={8} style={{
            color: 'white',
        }}>
            <Container size="lg">
                <Group gap={30} align="flex-start" wrap="nowrap">
                    {/* Logo and Description */}
                    <Box style={{ width: '100%', maxWidth: 300 }} mb={6}>
                        <Logo />
                        <Text color="gray" mt={10}>Dịch vụ thuê phòng tập số 1 Việt Nam</Text>
                        <Stack gap={4} mt={10}>
                            <Text color="gray">Sức khỏe của bạn, sứ mệnh của chúng tôi</Text>
                            <Text color="gray">Uy tín, an toàn, chất lượng</Text>
                        </Stack>
                    </Box>

                    {/* Support Section */}
                    <Box>
                        <Text w={600} size="lg">Bạn cần hỗ trợ</Text>
                        <Text size="sm" color="gray">Hotline: +123456789</Text>
                        <Text size="sm" color="gray">Email: info@gymconnect.com</Text>

                        {/* Social Media Links */}
                        <Group mt={15} gap={15}>
                            <Anchor href="#" color="gray" size="lg" aria-label="Visit our Facebook page">
                                <IconBrandFacebook size={24} />
                            </Anchor>
                            <Anchor href="#" color="gray" size="lg" aria-label="Visit our Twitter page">
                                <IconBrandTwitter size={24} />
                            </Anchor>
                            <Anchor href="#" color="gray" size="lg" aria-label="Visit our Instagram page">
                                <IconBrandInstagram size={24} />
                            </Anchor>
                        </Group>

                    </Box>
                    <Group ps="center">
                        <Button variant="outline" color="white" size="md">Đăng ký ngay</Button>
                    </Group>
                </Group>
            </Container>
        </Box >
        </Container>
    );
}
