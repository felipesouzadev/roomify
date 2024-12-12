"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@nextui-org/react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Teachers", href: "/teachers" },
  { name: "Schedule", href: "/schedule" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Card className="w-64 bg-background flex h-screen flex-col border-r md:w-60 md-flex">
      <nav className="flex-grow">
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={`rounded-sm block px-4 py-3 text-bold text-primary hover:bg-primary hover:text-secondary text-center ${
              pathname === item.href ? "bg-secondary" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </Card>
  );
}
