"use client"

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu} from "@nextui-org/react";
import MoonIcon from '../components/Icons/MoonIcon';
import SunIcon from '../components/Icons/SunIcon';
import Logout from '../components/Logout';
import { useTheme } from "next-themes";

export default function Topmenu() {

  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
        <Navbar shouldHideOnScroll isBordered maxWidth="full">
          <NavbarContent  justify="start" >
            <NavbarBrand >
              <p className="font-bold text-primary">ROOMIFY</p>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent as="div" justify="end">
          <NavbarItem>
          <Button variant="light"
                  onClick={() => {
                    setTheme(resolvedTheme === "light" ? "dark" : "light");
                  }}
                  type='button'
                  className='rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>
                  {theme === "light" ? <MoonIcon/> : <SunIcon/> }
          </Button>
          </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button color="primary">
              My Account
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings" href="/users" >Manager Users</DropdownItem>
            <DropdownItem key="logout">
              <Logout/>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
        </Navbar>
  );
}
