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
    <aside className="w-64 bg-primary text-secondary flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold">
        Roomify
      </div>
      <nav className="flex-grow">
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={`rounded-sm block px-4 py-3 hover:bg-primary-light ${
              pathname === item.href ? "bg-primary-dark" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
