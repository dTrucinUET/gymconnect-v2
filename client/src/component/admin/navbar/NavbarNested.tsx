'use client'
import { Group, Code, ScrollArea, rem, Button, UnstyledButton } from "@mantine/core";
import {
  IconNotes,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconMenu2,
  IconPictureInPictureOff,
  IconX,
  IconSquareChevronRight,
  IconBook2,
  IconTransfer
} from "@tabler/icons-react";
import { LinksGroup } from "./NavbarLinksGroup/NavbarLinksGroup";
import classes from "./NavbarNested.module.css";
import { useState } from "react";
import { log } from "node:console";

export function NavbarNested(props: any) {
  let mockdata;

  if (props.page === "admin") {
    console.log(props.page);

    mockdata = [
      { label: "Quản lý người dùng", icon: IconPictureInPictureOff, links: "user" },
      {
        label: "Quản lý phòng tập",
        icon: IconNotes,
        links: "room"
      },


    ];
  }
  else {
    mockdata = [
      { label: "Quản lý khách hàng", icon: IconPictureInPictureOff, links: "user" },
      {
        label: "Quản lý phòng tập",
        icon: IconNotes,
        links: "room"
      },
      {
        label: "Quản lý nhân viên",
        icon: IconNotes,
        links: "customer"
      },
      {
        label: "Quản lý thiết bị",
        icon: IconNotes,
        links: "equipment"
      },
      {
        label: "Quản lý dịch vụ",
        icon: IconNotes,
        links: "services"
      }


    ];
  }

  const links = mockdata.map((item: any) => (
    <LinksGroup
      {...item}
      page={props.page}
      key={item.label}
    />
  ));

  const [isOpened, setIsOpened] = useState(true);

  const handleClickBtn = () => {
    setIsOpened(!isOpened);
  }


  return (
    <div>
      <Button className={classes.toggle} onClick={() => handleClickBtn()}>
        <IconMenu2 style={{ color: "black" }}></IconMenu2>
      </Button>

      <nav className={`${classes.navbar} ${isOpened ? classes.navOuline : classes.navInline}`}
      >

        <ScrollArea className={classes.links} >
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
      </nav>
    </div>
  );
}
