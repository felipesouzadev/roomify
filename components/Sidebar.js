"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Teachers", href: "/teachers" },
  { name: "Schedule", href: "/schedule" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 flex h-screen flex-col p-4 border-r divide-x-reservre md:w-60 md-flex">
      <nav className="flex-grow">
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={`rounded-sm block px-4 py-3 hover:bg-primary-light text-center ${
              pathname === item.href ? "bg-primary-dark" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
