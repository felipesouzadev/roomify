import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import Logout from '../components/Logout';

export default function Topmenu() {

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Teachers", href: "/teachers" },
    { name: "Schedule", href: "/schedule" },
  ];



  return (
        <Navbar shouldHideOnScroll className="py-6">
          <NavbarBrand href="/">
            <p className="font-bold text-inherit">ROOMIFY</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">      
            {navigation.map((item) => (
              <NavbarItem key={item.name}>
                <Link color='foreground' href={item.href}>{item.name}</Link>
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Logout/>
            </NavbarItem>
            <NavbarItem>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
  );
}
