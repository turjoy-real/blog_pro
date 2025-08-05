"use client";
import Link from "next/link";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const NavBar = () => {
  return (
    <nav className="my-16 animate-fade-in">
      <ul className="flex items-center justify-center gap-4">
        {navigation.map((item, index) => (
          <li key={index}>
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-300 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
