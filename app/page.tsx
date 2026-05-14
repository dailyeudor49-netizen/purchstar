"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

/* ═══════ DATA ═══════ */
const heroSlides = [
  {
    title: "Smart Ring",
    subtitle: "Health & fitness tracking on your finger",
    highlight: "Best Seller",
    img: "/images/smart-ring/blackring.webp",
    href: "/smart-ring",
    bg: "from-[#0a0a0a] to-[#1a1a2e]",
    accent: "#e30613",
  },
  {
    title: "ChefOne Kitchen Robot",
    subtitle: "The all-in-one smart cooking companion",
    highlight: "New Arrival",
    img: "/images/chef-one/aurixachefone.webp",
    href: "/chefone",
    bg: "from-[#1a1a1a] to-[#2d1f0e]",
    accent: "#ffd000",
  },
  {
    title: "Robot Vacuum Cleaner",
    subtitle: "Smart navigation, auto-empty station",
    highlight: "Top Rated",
    img: "/images/robot-asp/1.webp",
    href: "/robot-asp",
    bg: "from-[#0f172a] to-[#1e293b]",
    accent: "#00a651",
  },
];

const featuredProducts = [
  { name: "Smart Ring", cat: "Wearables", img: "/images/smart-ring/blackring.webp", href: "/smart-ring", badge: "Best Seller", badgeColor: "bg-[#e30613]", price: "Wholesale" },
  { name: "Professional Hair Dryer", cat: "Personal Care", img: "/images/hairdryer/1.webp", href: "/hairdryer", badge: null, badgeColor: "", price: "Wholesale" },
  { name: "Robot Vacuum Cleaner", cat: "Home", img: "/images/robot-asp/1.webp", href: "/robot-asp", badge: "Trending", badgeColor: "bg-[#e30613]", price: "Wholesale" },
  { name: "Air Fryer Pro", cat: "Kitchen", img: "/images/airfryer/1.webp", href: "/airfryer", badge: null, badgeColor: "", price: "Wholesale" },
  { name: "Steam Mop Pro", cat: "Home", img: "/images/steammop/h12-pro-ultra-pc-frame1_18_800x.webp", href: "/steammop", badge: "Hot Deal", badgeColor: "bg-[#e30613]", price: "Wholesale" },
  { name: "Coanda Pro IQ Styler", cat: "Personal Care", img: "/images/coanda/main.png", href: "/coanda-proiq", badge: "Popular", badgeColor: "bg-[#ffd000] text-black", price: "Wholesale" },
  { name: "Mini Phone 17", cat: "Tech", img: "/images/miniphone17/1.webp", href: "/miniphone17", badge: "New", badgeColor: "bg-[#00a651]", price: "Wholesale" },
  { name: "ChefOne Kitchen Robot", cat: "Kitchen", img: "/images/chef-one/aurixachefone.webp", href: "/chefone", badge: "Best Seller", badgeColor: "bg-[#e30613]", price: "Wholesale" },
  { name: "Titan Go Console", cat: "Gaming", img: "/images/titango/1283878.webp", href: "/titan-go", badge: "New", badgeColor: "bg-[#00a651]", price: "Wholesale" },
  { name: "Garden Gazebo", cat: "Outdoor", img: "/images/gazebo/1.jpg", href: "/gazebo-giardino", badge: null, badgeColor: "", price: "Wholesale" },
];

const categories = [
  { name: "Kitchen", icon: "🍳", href: "/products", color: "bg-orange-50 hover:bg-orange-100 border-orange-200" },
  { name: "Home", icon: "🏠", href: "/products", color: "bg-blue-50 hover:bg-blue-100 border-blue-200" },
  { name: "Personal Care", icon: "💇", href: "/products", color: "bg-pink-50 hover:bg-pink-100 border-pink-200" },
  { name: "Wearables", icon: "⌚", href: "/products", color: "bg-purple-50 hover:bg-purple-100 border-purple-200" },
  { name: "Tech", icon: "📱", href: "/products", color: "bg-cyan-50 hover:bg-cyan-100 border-cyan-200" },
  { name: "Outdoor", icon: "🌿", href: "/products", color: "bg-green-50 hover:bg-green-100 border-green-200" },
  { name: "Wellness", icon: "💆", href: "/products", color: "bg-amber-50 hover:bg-amber-100 border-amber-200" },
  { name: "Gaming", icon: "🎮", href: "/products", color: "bg-red-50 hover:bg-red-100 border-red-200" },
];

/* ═══════ COMPONENT ═══════ */
export default function Home() {
  const [slide, setSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setSlide((s) => (s + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [nextSlide]);

  return (
    <>
      <Header />
      <main className="bg-[#f2f2f2]">

        {/* ═══════ HERO SLIDER ═══════ */}
        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4">
            <div className="grid lg:grid-cols-[1fr_320px] gap-4">
              {/* Main banner */}
              <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px]">
                {heroSlides.map((s, i) => (
                  <Link
                    key={i}
                    href={s.href}
                    className={`absolute inset-0 bg-gradient-to-r ${s.bg} flex items-center transition-opacity duration-700 ${
                      i === slide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <div className="relative z-10 px-8 md:px-14 py-10 flex items-center justify-between w-full">
                      <div className="max-w-md">
                        <span
                          className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider"
                          style={{ backgroundColor: s.accent }}
                        >
                          {s.highlight}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
                          {s.title}
                        </h2>
                        <p className="text-white/70 text-base md:text-lg mb-6">{s.subtitle}</p>
                        <span className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] font-bold px-6 py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                          Shop Now
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                      <div className="hidden md:block relative w-[280px] h-[280px] flex-shrink-0">
                        <Image
                          src={s.img}
                          alt={s.title}
                          fill
                          className="object-contain drop-shadow-2xl"
                          unoptimized
                        />
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === slide ? "w-8 bg-white" : "w-2 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Side banners */}
              <div className="hidden lg:flex flex-col gap-4">
                <Link
                  href="/airfryer"
                  className="relative flex-1 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl overflow-hidden p-6 flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Hot Deal</span>
                    <h3 className="text-xl font-bold text-white mt-1">Air Fryer Pro</h3>
                    <p className="text-white/70 text-xs mt-1">Healthy cooking, 80% less oil</p>
                  </div>
                  <div className="relative h-24 mt-2">
                    <Image src="/images/airfryer/1.webp" alt="Air Fryer" fill className="object-contain group-hover:scale-110 transition-transform duration-300" unoptimized />
                  </div>
                </Link>
                <Link
                  href="/steammop"
                  className="relative flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl overflow-hidden p-6 flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Trending</span>
                    <h3 className="text-xl font-bold text-white mt-1">Steam Mop Pro</h3>
                    <p className="text-white/70 text-xs mt-1">3-in-1 wet & dry vacuum</p>
                  </div>
                  <div className="relative h-24 mt-2">
                    <Image src="/images/steammop/h12-pro-ultra-pc-frame1_18_800x.webp" alt="Steam Mop" fill className="object-contain group-hover:scale-110 transition-transform duration-300" unoptimized />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ CATEGORIES ═══════ */}
        <section className="py-6">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`flex flex-col items-center gap-1.5 p-3 md:p-4 rounded-xl border ${cat.color} transition-all text-center`}
                >
                  <span className="text-2xl md:text-3xl">{cat.icon}</span>
                  <span className="text-[10px] md:text-xs font-semibold text-gray-700 leading-tight">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ USP BAR ═══════ */}
        <section className="py-4">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-200 px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "🚚", title: "Fast Shipping", desc: "24/48h worldwide delivery" },
                { icon: "💳", title: "Pay on Delivery", desc: "No upfront payment" },
                { icon: "✅", title: "Quality Tested", desc: "Every product inspected" },
                { icon: "📦", title: "Volume Discounts", desc: "Up to 30% off bulk orders" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FEATURED PRODUCTS ═══════ */}
        <section className="py-6">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Section header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#e30613] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">Featured Products</h2>
                </div>
                <Link href="/products" className="text-sm font-semibold text-[#e30613] hover:text-[#c20510] flex items-center gap-1 transition-colors">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {featuredProducts.map((product, i) => (
                  <Link
                    key={i}
                    href={product.href}
                    className="group relative p-4 border-r border-b border-gray-100 last:border-r-0 hover:bg-gray-50/80 transition-colors"
                  >
                    {/* Badge */}
                    {product.badge && (
                      <span className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Image */}
                    <div className="relative aspect-square mb-3 flex items-center justify-center p-2">
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>

                    {/* Info */}
                    <p className="text-[10px] font-semibold text-[#e30613] uppercase tracking-wider">{product.cat}</p>
                    <h3 className="text-sm font-medium text-[#1a1a1a] mt-0.5 leading-snug group-hover:text-[#e30613] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Wholesale pricing
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PROMO BANNERS ROW ═══════ */}
        <section className="py-4">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Promo 1 */}
              <Link href="/coanda-proiq" className="relative bg-gradient-to-r from-[#1a1a1a] to-[#333] rounded-2xl overflow-hidden group">
                <div className="flex items-center p-6 md:p-8">
                  <div className="flex-1">
                    <span className="text-[#ffd000] text-xs font-bold uppercase tracking-wider">Popular Choice</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-2">Coanda Pro IQ</h3>
                    <p className="text-gray-400 text-sm mb-4">6-in-1 professional hair styler</p>
                    <span className="inline-flex items-center gap-1 text-white text-sm font-semibold bg-white/10 px-4 py-2 rounded-lg group-hover:bg-white/20 transition-colors">
                      Shop Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0">
                    <Image src="/images/coanda/main.png" alt="Coanda Pro" fill className="object-contain group-hover:scale-110 transition-transform duration-300" unoptimized />
                  </div>
                </div>
              </Link>

              {/* Promo 2 */}
              <Link href="/contact" className="relative bg-[#e30613] rounded-2xl overflow-hidden group">
                <div className="p-6 md:p-8">
                  <span className="text-white/80 text-xs font-bold uppercase tracking-wider">For Retailers</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-2">Bulk Orders?<br />Up to 30% Off</h3>
                  <p className="text-white/80 text-sm mb-4">Volume discounts on 100+ units. Pay on delivery available.</p>
                  <span className="inline-flex items-center gap-1 text-[#e30613] text-sm font-bold bg-white px-5 py-2.5 rounded-lg group-hover:bg-gray-100 transition-colors">
                    Get Quote
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════ MORE PRODUCTS — GRID CARDS ═══════ */}
        <section className="py-6">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#ffd000] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">More to Explore</h2>
                </div>
                <Link href="/products" className="text-sm font-semibold text-[#e30613] hover:text-[#c20510] flex items-center gap-1 transition-colors">
                  Full Catalogue
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
                {[
                  { name: "Professional Hair Dryer", cat: "Personal Care", img: "/images/hairdryer/1.webp", href: "/hairdryer" },
                  { name: "Titan Go Console", cat: "Gaming", img: "/images/titango/1283878.webp", href: "/titan-go" },
                  { name: "Mini Phone 17", cat: "Tech", img: "/images/miniphone17/1.webp", href: "/miniphone17" },
                  { name: "Garden Gazebo", cat: "Outdoor", img: "/images/gazebo/1.jpg", href: "/gazebo-giardino" },
                ].map((p, i) => (
                  <Link key={i} href={p.href} className="group bg-white p-5 flex flex-col items-center text-center hover:bg-gray-50 transition-colors">
                    <div className="relative w-full aspect-square mb-3 flex items-center justify-center p-3">
                      <Image src={p.img} alt={p.name} width={180} height={180} className="object-contain w-full h-full group-hover:scale-105 transition-transform" unoptimized />
                    </div>
                    <p className="text-[10px] font-semibold text-[#e30613] uppercase tracking-wider">{p.cat}</p>
                    <h3 className="text-sm font-medium text-[#1a1a1a] mt-0.5 group-hover:text-[#e30613] transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">Wholesale pricing</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ WHY PURCHSTAR ═══════ */}
        <section className="py-8">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
              <div className="px-6 md:px-10 py-10 md:py-14">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Why 720+ Businesses Choose Purchstar</h2>
                  <p className="text-gray-400 mt-2">Trusted wholesale tech supplier since 2013</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: "⚡", title: "24/48h Delivery", desc: "Fast shipping to 35+ countries with full tracking on every order." },
                    { icon: "🔒", title: "Pay on Delivery", desc: "No upfront payment. Inspect your goods first, then pay. Zero risk." },
                    { icon: "🏆", title: "Quality Guaranteed", desc: "CE certified, RoHS compliant. Every product tested before shipping." },
                    { icon: "💰", title: "Volume Discounts", desc: "Up to 30% off on bulk orders. Competitive wholesale pricing." },
                  ].map((f, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-3xl mb-3 block">{f.icon}</span>
                      <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact" className="px-8 py-3.5 bg-[#e30613] hover:bg-[#c20510] text-white font-bold rounded-lg transition-colors">
                    Request a Quote
                  </Link>
                  <Link href="/about" className="px-8 py-3.5 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-colors">
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ TESTIMONIALS ═══════ */}
        <section className="py-6 pb-10">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#00a651] rounded-full" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">What Our Customers Say</h2>
                </div>
              </div>

              <div className="grid md:grid-cols-3 divide-x divide-gray-100">
                {[
                  { name: "Marco R.", company: "TechStore Italia", loc: "Milan", text: "Consistent quality, competitive prices, always on time. Our go-to supplier for 3 years." },
                  { name: "Anna K.", company: "Gadget Hub", loc: "Warsaw", text: "Pay-on-delivery was a game changer. We stock new products with zero financial risk." },
                  { name: "David M.", company: "ElectroPro", loc: "Prague", text: "Best quality-to-price ratio we've found. Exceptional customer service and fast responses." },
                ].map((t, i) => (
                  <div key={i} className="p-6">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-[#ffd000]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-semibold text-[#1a1a1a]">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.company} — {t.loc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
