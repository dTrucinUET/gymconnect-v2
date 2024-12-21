'use client'
import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
import classes from "./NavbarLinksGroup.module.css";
import { useRouter } from "next/navigation";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links: string;
  page: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links, page
}: LinksGroupProps) {
  const [opened, setOpened] = useState(initiallyOpened || false);

  const router = useRouter();

  const handleClickButton = (link: string) => {
    router.push(`/${page}/${link}`);
  }

  return (
    <>
      <UnstyledButton
        onClick={() => handleClickButton(links)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>

        </Group>
      </UnstyledButton>

    </>
  );
}

