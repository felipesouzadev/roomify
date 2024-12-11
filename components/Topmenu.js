"use client"

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
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
              <p className="font-bold text-inherit">ROOMIFY</p>
            </NavbarBrand>
            <NavbarItem>
              <button
                  onClick={() => {
                    setTheme(resolvedTheme === "light" ? "dark" : "light");
                  }}
                  type='button'
                  className='rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>
                  {theme === "light" ? <MoonIcon/> : <SunIcon/> }
              </button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Logout/>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
  );
}
