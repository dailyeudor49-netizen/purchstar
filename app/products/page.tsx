"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const allProducts = [
  // Kitchen
  {
    name: "Air Fryer Pro",
    cat: "Kitchen",
    img: "/images/airfryer/1.webp",
    href: "/airfryer",
    badge: "Trending",
    badgeColor: "bg-[#e30613]",
    desc: "Healthy cooking with 80% less oil. Large capacity, digital controls.",
  },
  {
    name: "ChefOne Smart Kitchen Robot",
    cat: "Kitchen",
    img: "/images/chef-one/aurixachefone.webp",
    href: "/chefone",
    badge: "Best Seller",
    badgeColor: "bg-[#e30613]",
    desc: "All-in-one smart kitchen robot with integrated display and recipes.",
  },
  // Home
  {
    name: "Robot Vacuum Cleaner",
    cat: "Home",
    img: "/images/robot-asp/1.webp",
    href: "/robot-asp",
    badge: "Popular",
    badgeColor: "bg-[#ffd000]",
    desc: "Smart navigation, auto-emptying station, mop & vacuum combo.",
  },
  {
    name: "Steam Mop Pro",
    cat: "Home",
    img: "/images/steammop/h12-pro-ultra-pc-frame1_18_800x.webp",
    href: "/steammop",
    badge: "Hot Deal",
    badgeColor: "bg-[#e30613]",
    desc: "3-in-1 wet & dry vacuum with steam function. Self-cleaning.",
  },
  {
    name: "Garden Gazebo",
    cat: "Home",
    img: "/images/gazebo/1.jpg",
    href: "/gazebo-giardino",
    badge: null,
    badgeColor: "",
    desc: "Premium outdoor gazebo with curtains. Waterproof, UV resistant.",
  },
  // Personal Care
  {
    name: "Professional Hair Dryer",
    cat: "Personal Care",
    img: "/images/hairdryer/1.webp",
    href: "/hairdryer",
    badge: null,
    badgeColor: "",
    desc: "High-speed motor, ionic technology, multiple heat settings.",
  },
  {
    name: "Coanda Pro IQ Styler",
    cat: "Personal Care",
    img: "/images/coanda/main.png",
    href: "/coanda-proiq",
    badge: "Popular",
    badgeColor: "bg-[#ffd000]",
    desc: "Multi-function hair styler with 6 interchangeable attachments.",
  },
  {
    name: "Bio-Collagen Sheet Mask",
    cat: "Personal Care",
    img: "/images/collagen-mask/2.webp",
    href: "/collagen-mask",
    badge: "New",
    badgeColor: "bg-[#00a651]",
    desc: "Premium bio-collagen face mask set for deep hydration.",
  },
  // Wearables & Tech
  {
    name: "Smart Ring",
    cat: "Wearables",
    img: "/images/smart-ring/blackring.webp",
    href: "/smart-ring",
    badge: "Best Seller",
    badgeColor: "bg-[#e30613]",
    desc: "Health & fitness tracker ring with heart rate, SpO2, sleep analysis.",
  },
  {
    name: "Mini Phone 17",
    cat: "Tech",
    img: "/images/miniphone17/1.webp",
    href: "/miniphone17",
    badge: "New",
    badgeColor: "bg-[#00a651]",
    desc: "Ultra-compact smartphone with full Android OS. Pocket-sized.",
  },
  {
    name: "Titan Go Console",
    cat: "Tech",
    img: "/images/titango/1283878.webp",
    href: "/titan-go",
    badge: "New",
    badgeColor: "bg-[#00a651]",
    desc: "Portable gaming console with large display, high-performance chip.",
  },
  // Wellness
  {
    name: "Slimique Patch",
    cat: "Wellness",
    img: "/images/slimique/slimique.webp",
    href: "/slimique",
    badge: null,
    badgeColor: "",
    desc: "Slimming body patches with natural active ingredients.",
  },
  {
    name: "GlicoBlock Patch",
    cat: "Wellness",
    img: "/images/patch/patch.webp",
    href: "/patch",
    badge: null,
    badgeColor: "",
    desc: "Caffeine-infused slimming patches. Stimulating & draining formula.",
  },
  // Outdoor
  {
    name: "CloudStep Shoes",
    cat: "Outdoor",
    img: "/images/cloudstep/adatta.jpg",
    href: "/cloudstep",
    badge: "Trending",
    badgeColor: "bg-[#e30613]",
    desc: "Ultra-comfortable walking shoes with cloud-like cushioning.",
  },
  {
    name: "GrassBoss Trimmer",
    cat: "Outdoor",
    img: "/images/grassboss/asta allungabile.webp",
    href: "/products",
    badge: null,
    badgeColor: "",
    desc: "Cordless grass trimmer with extendable pole. Lithium battery.",
  },
];

const categories = ["All", "Kitchen", "Home", "Personal Care", "Wearables", "Tech", "Wellness", "Outdoor"];

export default function ProductsPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchesCat = activeCat === "All" || p.cat === activeCat;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f5] min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 md:py-16">
            <div className="max-w-2xl">
              <span className="text-[#e30613] text-xs font-bold uppercase tracking-wider">Product Catalogue</span>
              <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
                Browse Our Products
              </h1>
              <p className="text-gray-400 text-lg">
                Over 3,500 quality tech products and gadgets. Click any product for full details, specs and ordering.
              </p>
            </div>
          </div>
        </section>

        {/* Filters bar */}
        <section className="sticky top-[72px] z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-72 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e30613] focus:bg-white border border-transparent focus:border-[#e30613]/20 transition-all"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                      activeCat === cat
                        ? "bg-[#e30613] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Count */}
              <div className="hidden lg:block ml-auto text-sm text-gray-500">
                <span className="font-semibold text-[#1a1a1a]">{filtered.length}</span> products
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-8 md:py-12">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try a different search term or category.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCat("All"); }}
                  className="mt-4 px-6 py-2.5 bg-[#e30613] text-white text-sm font-semibold rounded-lg hover:bg-[#c20510] transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((product, i) => (
                  <Link
                    key={i}
                    href={product.href}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#e30613]/20 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative bg-[#f9f9f9] aspect-square flex items-center justify-center overflow-hidden p-4">
                      {product.badge && (
                        <span className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}>
                          {product.badge}
                        </span>
                      )}
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#e30613] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-[#e30613] uppercase tracking-wider">{product.cat}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#e30613] transition-colors leading-snug mb-1.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{product.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">Wholesale pricing</span>
                        <svg className="w-4 h-4 text-gray-300 group-hover:text-[#e30613] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#1a1a1a] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need a Custom Quote?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Contact us for personalised wholesale pricing, volume discounts, and bulk order enquiries. No minimum for first orders.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-[#e30613] hover:bg-[#c20510] text-white font-bold rounded-lg transition-colors text-center"
                >
                  Request Quote
                </Link>
                <a
                  href="mailto:info@purchstar.com"
                  className="w-full sm:w-auto px-8 py-4 border border-gray-600 hover:border-gray-400 text-white font-semibold rounded-lg transition-colors text-center"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
