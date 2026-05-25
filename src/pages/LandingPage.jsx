import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { MenCards, WomenCards, UnisexCards } from "../components/Products";
import SprayMist from "../components/SprayMist";
import PerfumeCreation from "../components/PerfumeCreation";
import ScentQuiz from "../components/ScentQuiz";
import axios from "axios";  

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const defaultSiteContent = {
  heroImage: "/V3.jpeg",
  quizImage: "/Lb4.jpeg",
  menImage: "/Lp8ml2.jpeg",
  womenImage:
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop",
  unisexImage: "/Lp8ml.jpeg",
  giftImage: "/gift1.jpg",
  latestDrop1Image: "/V3.jpeg",
  latestDrop2Image: "/Lp8ml.jpeg",
  latestDrop3Image: "/Lp8ml2.jpeg",
};

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const textRef = useRef([]);
  const navigate = useNavigate();
  const splitSectionRef = useRef(null);
  const sectionsRef = useRef([]);
  const [isSpraying, setIsSpraying] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const [siteContent, setSiteContent] = useState(defaultSiteContent);

  useEffect(() => {
  const fetchSiteContent = async () => {
    try {
      const res = await axios.get(`${API_URL}/site-content`);
      setSiteContent({
        ...defaultSiteContent,
        ...(res.data?.data || {}),
      });
    } catch (err) {
      console.error("Failed to fetch site content:", err);
    }
  };

  fetchSiteContent();
}, []);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      gsap.fromTo(
        section,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  

  const scrollToSplit = () => {
    splitSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpraying(true);
      setTimeout(() => setIsSpraying(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const chars = textRef.current;
    if (!chars.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { rotationX: -90, opacity: 0 },
        {
          rotationX: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const text = "Scent your story".split(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Barlow:wght@300;400;500&display=swap');
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* HERO */}
      <section className="w-full bg-[#f5f0eb]" style={{ fontFamily: "Barlow, sans-serif" }}>
        {/* MOBILE HERO */}
        <div className="flex flex-col md:hidden">
          {/* ✅ CLIENT IMAGE: Layam on stone — clean hero product shot */}
          <div className="w-full h-[58vw] bg-[#ede7df] flex items-end justify-center overflow-hidden relative">
            <div className="absolute top-1/4 right-1/4 scale-75 z-20 pointer-events-none">
              <SprayMist active={isSpraying} />
            </div>
            <img
              src={siteContent.heroImage}
              alt="Volonté Layam Edition"
              className="h-full w-auto object-contain drop-shadow-xl relative z-10"
            />
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#a89880] mb-3">
              New Season — 2026
            </p>
            <h1
              className="text-[34px] font-light uppercase leading-none text-[#2c2c2c] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Scent Your Story
            </h1>
            <p className="text-sm leading-6 text-[#7a6e65] mb-6">
              Hand-crafted fragrances that linger long after you leave the room.
            </p>
            <button
              onClick={scrollToSplit}
              className="rounded-full bg-[#2c2c2c] px-8 py-3 text-[11px] uppercase tracking-widest text-white"
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* DESKTOP HERO */}
        <div className="hidden md:grid min-h-screen grid-cols-3">
          <div className="flex items-center justify-center overflow-hidden px-6">
            <h1
              className="flex flex-wrap justify-center text-[90px] font-light uppercase leading-none tracking-[-0.04em] text-[#2c2c2c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {text.map((char, i) => (
                <span key={i} ref={(el) => (textRef.current[i] = el)} className="inline-block m-1">
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* ✅ CLIENT IMAGE: Layam on stone — hero center column */}
          <div className="flex items-end justify-center overflow-hidden bg-[#ede7df] h-screen relative">
            <div className="absolute top-1/3 right-1/4 scale-[2] z-20 pointer-events-none">
              <SprayMist active={isSpraying} />
            </div>
            <img
              src={siteContent.heroImage}
              alt="Volonté Layam Edition"
              className="h-full w-auto object-contain drop-shadow-2xl relative z-10"
            />
          </div>

          <div className="flex items-center justify-center px-6">
            <div className="max-w-[260px]">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#a89880] mb-3">
                New Season — 2026
              </p>
              <h2
                className="text-3xl font-light text-[#2c2c2c] leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                The Art of Invisible Luxury
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#7a6e65]">
                Hand-crafted fragrances that linger long after you leave the room.
              </p>
              <button
                onClick={scrollToSplit}
                className="mt-6 rounded-full bg-[#2c2c2c] px-7 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-[#1a1a1a] transition-colors"
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="w-full bg-[#2c2c2c] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-[10px] tracking-[0.3em] uppercase text-[#a89880] mx-6">
              Volente · Long Lasting · Handcrafted · Premium · Free Shipping Rs.999+
            </span>
          ))}
        </div>
      </div>

      {/* SCENT DISCOVERY */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="w-full bg-white py-10 md:py-12 px-5 md:px-6"
      >
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 bg-[#f5f0eb] rounded-[32px] md:rounded-[40px] p-7 md:p-12 border border-[#ede7df] shadow-sm overflow-hidden relative group">
          <div className="relative z-10 text-center md:text-left max-w-lg">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#a89880] mb-4">
              Interactive Experience
            </p>
            <h2
              className="text-3xl md:text-5xl font-light text-[#2c2c2c] leading-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Find Your <br /> Signature Scent
            </h2>
            <p className="text-sm text-[#7a6e65] leading-relaxed mb-7">
              Not sure which fragrance defines you? Take our immersive scent quiz
              and discover the essence that matches your soul.
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="bg-[#2c2c2c] text-white px-8 py-3.5 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#1a1a1a] transition-all flex items-center gap-3 mx-auto md:mx-0"
            >
              Start Discovery Quiz
              <ChevronRight size={14} />
            </button>
          </div>

          {/* ✅ CLIENT IMAGE: Layam gold poster — replaces white ? card */}
          <div className="relative z-10 w-full md:w-auto flex justify-center">
            <div className="w-40 h-52 md:w-48 md:h-64 rounded-2xl shadow-xl overflow-hidden rotate-3">
              <img
                src={siteContent.quizImage}
                alt="Layam Edition"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MEN / UNISEX / WOMEN SPLIT */}
      <section
        ref={(el) => {
          sectionsRef.current[1] = el;
          splitSectionRef.current = el;
        }}
        className="w-full"
      >
        {/* MOBILE */}
        <div className="flex flex-col md:hidden">
          {[
            {
              label: "Men",
              sub: "Bold. Woody. Intense.",
              path: "/men",
              btn: "Shop Men",
              // ✅ CLIENT IMAGE: dark 8ml bottles — dark moody men aesthetic
              img: siteContent.menImage,
            },
            {
              label: "Unisex",
              sub: "Fresh. Modern. Free.",
              path: "/unisex",
              btn: "Shop Unisex",
              badge: "New",
              // ✅ CLIENT IMAGE: coloured 8ml bottles — vibrant unisex collection
              img: siteContent.unisexImage,
            },
            {
              label: "Women",
              sub: "Floral. Soft. Timeless.",
              path: "/women",
              btn: "Shop Women",
              img: siteContent.womenImage,
            },
          ].map(({ label, sub, path, btn, badge, img }) => (
            <div
              key={label}
              className="relative h-[58vw] overflow-hidden cursor-pointer"
              onClick={() => navigate(path)}
            >
              <img src={img} alt={label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              {badge && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-white/20 border border-white/40 text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                    {badge}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/60 mb-2">{sub}</p>
                <h2
                  className="text-[34px] font-light uppercase tracking-widest text-white leading-none mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {label}
                </h2>
                <button className="rounded-full border border-white px-6 py-2 text-[10px] uppercase tracking-widest text-white bg-white/10 backdrop-blur-sm">
                  {btn}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid grid-cols-3 h-[80vh]">
          {[
            {
              label: "Men",
              sub: "Bold. Woody. Intense.",
              path: "/men",
              btn: "Shop Men",
              overlay: "bg-black/35",
              // ✅ CLIENT IMAGE: dark 8ml bottles
              img: "/Lp8ml2.jpeg",
            },
            {
              label: "Unisex",
              sub: "Fresh. Modern. Free.",
              path: "/unisex",
              btn: "Shop Unisex",
              overlay: "bg-black/40",
              badge: "New",
              // ✅ CLIENT IMAGE: coloured 8ml bottles
              img: "/Lp8ml.jpeg",
            },
            {
              label: "Women",
              sub: "Floral. Soft. Timeless.",
              path: "/women",
              btn: "Shop Women",
              overlay: "bg-black/30",
              img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop",
            },
          ].map(({ label, sub, path, btn, overlay, badge, img }) => (
            <div
              key={label}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => navigate(path)}
            >
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 ${overlay} group-hover:bg-black/55 transition-colors duration-500`} />
              {badge && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2">
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[9px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
                    {badge}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">{sub}</p>
                <h2
                  className="text-5xl font-light uppercase tracking-widest text-white leading-none mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {label}
                </h2>
                <button className="rounded-full border border-white px-6 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300">
                  {btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY VOLENTE */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="w-full bg-[#f5f0eb] py-12 md:py-16 px-6"
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <div className="text-center mb-10 md:mb-12">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-3">Why Volente</p>
          <h2
            className="text-3xl font-light text-[#2c2c2c]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Crafted for the Discerning
          </h2>
        </div>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: "🌿", title: "Natural Ingredients", desc: "Sourced from the finest botanical gardens across France, India & the Middle East." },
            { icon: "⏳", title: "Long-Lasting", desc: "Our Eau de Parfum ensures 10–14 hours of lingering fragrance." },
            { icon: "🫙", title: "Artisan Bottled", desc: "Hand-poured in premium glass bottles — a gift to yourself or loved ones." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">{icon}</span>
              <h3 className="text-xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{title}</h3>
              <p className="text-sm text-[#7a6e65] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE ALCHEMY */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="w-full bg-white py-14 md:py-20 px-6 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-2 items-center gap-10 md:gap-16">
          <div className="order-2 md:order-1">
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-4">The Craft</p>
            <h2
              className="text-4xl md:text-5xl font-light text-[#2c2c2c] leading-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Where Science <br /> Meets Soul
            </h2>
            <p className="text-sm text-[#7a6e65] leading-relaxed mb-7 max-w-md">
              Every drop of Volente is a symphony of rare essences. We don't just
              mix scents; we curate memories, blending traditional alchemy with
              modern elegance.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                <p className="text-[11px] uppercase tracking-widest text-[#2c2c2c]">Cold-Pressed Extractions</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                <p className="text-[11px] uppercase tracking-widest text-[#2c2c2c]">Aged for Complexity</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 w-full">
            <PerfumeCreation />
          </div>
        </div>
      </section>

      {/* MEN PRODUCTS */}
      <section ref={(el) => (sectionsRef.current[4] = el)} className="bg-[#dce8e5] overflow-hidden">
        <div className="px-5 pt-7 pb-2 flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#a89880] mb-1">For Him — 2026</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Men's Fragrances
            </h2>
          </div>
          <button onClick={() => navigate("/men")} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">
            View All
          </button>
        </div>
        <MenCards />
      </section>

      {/* WOMEN PRODUCTS */}
      <section ref={(el) => (sectionsRef.current[5] = el)} className="bg-[#f0e8e4] overflow-hidden">
        <div className="px-5 pt-7 pb-2 flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#a89880] mb-1">For Her — 2026</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Women's Fragrances
            </h2>
          </div>
          <button onClick={() => navigate("/women")} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">
            View All
          </button>
        </div>
        <WomenCards />
      </section>

      {/* UNISEX PRODUCTS */}
      <section ref={(el) => (sectionsRef.current[6] = el)} className="bg-[#ede7df] overflow-hidden">
        <div className="px-5 pt-7 pb-2 flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#a89880] mb-1">For Everyone — 2026</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Unisex Collection
            </h2>
          </div>
          <button onClick={() => navigate("/unisex")} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">
            View All
          </button>
        </div>
        <UnisexCards />
      </section>

      {/* FEATURED DROPS */}
      <section
        ref={(el) => (sectionsRef.current[7] = el)}
        className="relative py-12 md:py-16 px-5 overflow-hidden bg-[#f5f0eb]"
      >
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] md:text-[14vw] font-light tracking-widest text-[#2c2c2c]/[0.05] select-none pointer-events-none whitespace-nowrap leading-none z-0 uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          VOLENTE
        </span>

        <div className="relative z-10 flex items-center justify-between mb-7">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#a89880] mb-2">Signature Line — 2026</p>
            <h2 className="text-2xl md:text-5xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Latest Drops
            </h2>
          </div>
          <button onClick={scrollToSplit} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">
            View All
          </button>
        </div>

        {/* MOBILE — Latest Drops */}
        <div className="relative z-10 flex flex-col gap-4 md:hidden">
          {[
            {
              name: "Layam Edition",
              price: "2,499",
              // ✅ CLIENT IMAGE: Layam stone shot
              img: siteContent.latestDrop1Image,
            },
            {
              name: "Luxury 8ml Set",
              price: "1,299",
              // ✅ CLIENT IMAGE: coloured 8ml bottles
              img: siteContent.latestDrop2Image,
            },
            {
              name: "Premium Dark Set",
              price: "1,499",
              // ✅ CLIENT IMAGE: dark 8ml bottles
              img: siteContent.latestDrop3Image,
            },
          ].map(({ name, price, img }) => (
            <div key={name} className="flex gap-4 items-center bg-white/60 rounded-2xl p-3">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={img} alt={name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#2c2c2c] uppercase tracking-wide">{name}</p>
                <p className="text-[11px] text-[#a89880] mt-1">Rs. {price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP — Latest Drops */}
        <div className="relative z-10 hidden md:grid grid-cols-3 gap-6 items-end">
          <div className="flex flex-col gap-4 mt-24">
            {/* ✅ CLIENT IMAGE: Layam stone — editorial product shot */}
            <div className="h-[320px] rounded-2xl overflow-hidden">
              <img src="/V3.jpeg" alt="Layam Edition" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#2c2c2c] uppercase tracking-wide">Layam Edition</p>
              <p className="text-[11px] text-[#a89880] mt-0.5">Rs. 2,499</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* ✅ CLIENT IMAGE: Coloured 8ml set — centre hero card */}
            <div className="h-[480px] rounded-2xl overflow-hidden">
              <img src="/Lp8ml.jpeg" alt="Luxury 8ml Set" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-[#2c2c2c] uppercase tracking-wide">Luxury 8ml Set</p>
              <p className="text-[11px] text-[#a89880] mt-0.5">Rs. 1,299</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-16">
            <div className="text-right">
              <p className="text-xs font-medium text-[#2c2c2c] uppercase tracking-wide">Premium Dark Set</p>
              <p className="text-[11px] text-[#a89880] mt-0.5">Rs. 1,499</p>
            </div>
            {/* ✅ CLIENT IMAGE: Dark 8ml set */}
            <div className="h-[280px] rounded-2xl overflow-hidden">
              <img src="/Lp8ml2.jpeg" alt="Premium Dark Set" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section
        ref={(el) => (sectionsRef.current[8] = el)}
        className="relative w-full py-16 md:py-20 px-6 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #2c2c2c 0%, #4a3f35 100%)" }}
      >
        <div className="text-center z-10 max-w-xs md:max-w-3xl mx-auto">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#a89880] mb-6">The Volente Philosophy</p>
          <h2
            className="text-2xl md:text-6xl font-light text-white leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "A fragrance is the invisible part of your personality."
          </h2>
          <div className="w-10 h-[1px] bg-[#a89880] mx-auto mt-8" />
        </div>
      </section>

      {/* GIFT SECTION */}
      <section
        ref={(el) => (sectionsRef.current[9] = el)}
        className="w-full bg-[#f5f0eb] py-14 md:py-16 px-5"
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <div className="mx-auto max-w-5xl flex flex-col gap-8 md:grid md:grid-cols-2 items-center">
          <div className="rounded-2xl overflow-hidden h-[58vw] md:h-[400px] w-full">
            <img src={siteContent.giftImage} alt="Gift Set" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-3">Gift Someone Special</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2c2c2c] leading-snug mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The Perfect Gift, Beautifully Wrapped
            </h2>
            <p className="text-sm text-[#7a6e65] leading-relaxed mb-6">
              Every Volente order arrives in our signature gift box. Perfect for
              birthdays, anniversaries, and festive occasions.
            </p>
            <button
              onClick={() => navigate("/unisex")}
              className="rounded-full bg-[#2c2c2c] px-7 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-[#1a1a1a] transition-colors"
            >
              Shop Gifts
            </button>
          </div>
        </div>
      </section>

      <ScentQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}

export default LandingPage;