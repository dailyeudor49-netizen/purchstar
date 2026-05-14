"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const categories = [
    { href: "/products#speakers", label: "Speakers", icon: "🔊" },
    { href: "/products#audio", label: "Audio", icon: "🎧" },
    { href: "/products#power", label: "Power Banks", icon: "🔋" },
    { href: "/products#wearables", label: "Wearables", icon: "⌚" },
    { href: "/products#accessories", label: "Accessories", icon: "📱" },
    { href: "/products#cables", label: "Cables", icon: "🔌" },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#1a1a1a] text-white text-xs">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#ffd000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Free shipping on orders over £500
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#00a651]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pay on delivery available
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:info@purchstar.com" className="hover:text-[#ffd000] transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@purchstar.com
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Purchstar"
                width={160}
                height={48}
                className="h-9 lg:h-10 w-auto"
                unoptimized
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    pathname === link.href
                      ? "text-[#e30613] bg-red-50"
                      : "text-[#1a1a1a] hover:text-[#e30613] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* CTA */}
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[#e30613] hover:bg-[#c20510] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get Quote
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Menu"
              >
                <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className={`border-t border-gray-100 overflow-hidden transition-all duration-300 ${searchOpen ? "max-h-20" : "max-h-0"}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products, categories, brands..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e30613] focus:bg-white border border-transparent focus:border-[#e30613]/20 transition-all"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category bar — desktop */}
        <div className="hidden lg:block border-t border-gray-100 bg-gray-50/80">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-1 h-10">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#555] hover:text-[#e30613] hover:bg-white rounded-md transition-all"
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden border-t border-gray-100 overflow-hidden transition-all duration-300 bg-white ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
          <div className="px-4 py-4 space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#e30613] bg-red-50"
                    : "text-[#1a1a1a] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#555] hover:text-[#e30613] hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-3">
              <Link
                href="/contact"
                className="block w-full py-3 bg-[#e30613] text-white text-sm font-semibold rounded-lg text-center hover:bg-[#c20510] transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
