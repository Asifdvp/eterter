"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Container from "../shared/Container";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Ana Səhifə" },
  { href: "/about", label: "Haqqımızda" },
  { href: "/services", label: "Xidmətlər" },
  { href: "/doctors", label: "Həkimlər" },
  { href: "/media", label: "Xəbərlər" },
  { href: "/galery", label: "Qalereya" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <nav
      aria-label="Əsas naviqasiya"
      className={`z-50 w-full ${
        isHome
          ? "sticky top-0 bg-black/20 backdrop-blur-sm border-b border-black/16"
          : "sticky top-0 bg-background backdrop-blur-sm"
      }`}
    >
      <div className="relative py-0 h-18 flex items-center">
        <Container>
          <div className="flex mx-auto justify-between items-center">
            {/* Logo */}
            <Link href="/" aria-label="Çöhrə Estetik Klinikası — Ana Səhifə">
              <div className="hidden md:block w-60 h-13">
                <Image
                  src={isHome ? "/images/logo-white.png" : "/images/logo-black.png"}
                  width={240}
                  height={40}
                  alt="Çöhrə Estetik Klinikası loqosu"
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="items-center flex md:hidden w-18 h-10">
                <Image
                  src={isHome ? "/images/logo-white.png" : "/images/logo-black.png"}
                  width={140}
                  height={24}
                  alt="Çöhrə Estetik Klinikası loqosu"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Desktop navigation */}
            <ul
              role="list"
              className={`hidden md:flex items-center gap-0 list-none m-0 p-0 ${
                isHome ? "text-white" : "text-black/80"
              }`}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="menu-item"
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger button */}
            <div className="my-auto block md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex flex-col justify-center items-center gap-1.5 cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className={`w-5.5 h-0.5 bg-black/60 rounded transition-all duration-500 ease-in-out ${
                    open ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`w-5.5 h-0.5 bg-black/60 rounded transition-all ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`w-5.5 h-0.5 bg-black/60 rounded transition-all duration-500 ease-in-out ${
                    open ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobil naviqasiya menyusu"
            className="absolute top-full left-0 w-full bg-primary z-50 h-screen p-5"
          >
            <Container className="w-full flex flex-col gap-2">
              <nav aria-label="Mobil naviqasiya">
                <ul role="list" className="list-none m-0 p-0 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="mobil-menu-item"
                        aria-current={pathname === link.href ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-b border-solid border-black/10 mt-5 mb-6" />
            </Container>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
