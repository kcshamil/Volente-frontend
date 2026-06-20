import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { MenCards, WomenCards, UnisexCards, CarCards } from "../components/Products";
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
  carImage: "/Firefly_Gemini Flash_Luxury product hangtag mockup, hanging from black _cord with gold eyelet, vertical st 221163.png",
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
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("volente_theme") || "light");
  const [isSpraying, setIsSpraying] = useState(false);

  const [siteContent, setSiteContent] = useState(() => {
    try {
      const cached = localStorage.getItem("volente_site_content");
      return cached ? JSON.parse(cached) : defaultSiteContent;
    } catch {
      return defaultSiteContent;
    }
  });
  const [perfumes, setPerfumes] = useState(() => {
    try {
      const cached = localStorage.getItem("volente_perfumes");
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const handleThemeChange = (e) => {
      setTheme(e.detail || localStorage.getItem("volente_theme") || "light");
    };
    window.addEventListener("volenteThemeChanged", handleThemeChange);
    return () => window.removeEventListener("volenteThemeChanged", handleThemeChange);
  }, []);

  const isDarkTheme = theme === "dark";
  const brandEmblemSrc = isDarkTheme ? "/volente-light-card.jpg" : "/volente-dark-logo.jpg";

  useEffect(() => {
    const fetchSiteContent = async () => {
      try {
        const res = await axios.get(`${API_URL}/site-content`);
        const data = res.data?.data || {};
        const newContent = {
          ...defaultSiteContent,
          ...data,
        };
        setSiteContent(newContent);
        localStorage.setItem("volente_site_content", JSON.stringify(newContent));
      } catch (err) {
        console.error("Failed to fetch site content:", err);
      }
    };

    const fetchPerfumes = async () => {
      try {
        const res = await axios.get(`${API_URL}/perfumes`);
        const list = res.data?.data || res.data;
        if (Array.isArray(list)) {
          setPerfumes(list);
          localStorage.setItem("volente_perfumes", JSON.stringify(list));
        }
      } catch (err) {
        console.error("Failed to fetch perfumes:", err);
      }
    };

    fetchSiteContent();
    fetchPerfumes();
  }, []);

  const getMatchedProduct = (targetName) => {
    if (!targetName) return null;
    const cleanTarget = targetName.toLowerCase().replace(/combo|set|edition/g, "").replace(/\s+/g, " ").trim();
    
    // Fallback static matches to allow perfect local offline verification
    const itemsToCheck = perfumes.length > 0 ? perfumes : [
      { name: "Layam Edition", category: "Men" },
      { name: "Premium Dark Set", category: "Men" },
      { name: "Luxury 8ml Set", category: "Unisex" }
    ];

    return itemsToCheck.find(p => {
      const cleanPName = p.name.toLowerCase().replace(/combo|set|edition/g, "").replace(/\s+/g, " ").trim();
      return cleanPName.includes(cleanTarget) || cleanTarget.includes(cleanPName);
    });
  };

  const handleLatestDropClick = (name) => {
    const matched = getMatchedProduct(name);
    if (matched) {
      const categoryPath = `/${matched.category.toLowerCase()}`;
      navigate(categoryPath, { state: { autoOpenProduct: matched.name } });
    } else {
      setNotification(`${name} is currently in our master aging cellar. Enter your email in the subscription box below to secure your bottle first!`);
      setTimeout(() => {
        setNotification(null);
      }, 6000);
    }
  };

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
                Hand- fragrances that linger long after you leave the room.
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
              Volonté · Long Lasting · Handcrafted · Premium · Free Shipping Rs.999+
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
              btn: "Shop",
              // ✅ CLIENT IMAGE: dark 8ml bottles — dark moody men aesthetic
              img: siteContent.menImage,
            },
            {
              label: "Unisex",
              sub: "Fresh. Modern. Free.",
              path: "/unisex",
              btn: "Shop",
              badge: "New",
              // ✅ CLIENT IMAGE: coloured 8ml bottles — vibrant unisex collection
              img: siteContent.unisexImage,
            },
            {
              label: "Women",
              sub: "Floral. Soft. Timeless.",
              path: "/women",
              btn: "Shop",
              img: siteContent.womenImage,
            },
            {
              label: "Car",
              sub: "Sleek. Leather. Fresh.",
              path: "/car",
              btn: "Shop",
              badge: "New",
              img: siteContent.carImage,
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
        <div className="hidden md:grid grid-cols-4 h-[80vh]">
          {[
            {
              label: "Men",
              sub: "Bold. Woody. Intense.",
              path: "/men",
              btn: "Shop",
              overlay: "bg-black/35",
              img: siteContent.menImage,
            },
            {
              label: "Unisex",
              sub: "Fresh. Modern. Free.",
              path: "/unisex",
              btn: "Shop",
              overlay: "bg-black/40",
              badge: "New",
              img: siteContent.unisexImage,
            },
            {
              label: "Women",
              sub: "Floral. Soft. Timeless.",
              path: "/women",
              btn: "Shop",
              overlay: "bg-black/30",
              img: siteContent.womenImage,
            },
            {
              label: "Car",
              sub: "Sleek. Leather. Fresh.",
              path: "/car",
              btn: "Shop",
              overlay: "bg-black/35",
              badge: "New",
              img: siteContent.carImage,
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

      {/* MEN PRODUCTS */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="bg-[#dce8e5] overflow-hidden">
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
      <section ref={(el) => (sectionsRef.current[3] = el)} className="bg-[#f0e8e4] overflow-hidden">
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
      <section ref={(el) => (sectionsRef.current[4] = el)} className="bg-[#ede7df] overflow-hidden">
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

      {/* CAR PRODUCTS */}
      <section ref={(el) => (sectionsRef.current[10] = el)} className="bg-[#e2e8f0] overflow-hidden">
        <div className="px-5 pt-7 pb-2 flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#a89880] mb-1">On The Road — 2026</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Car Fragrances
            </h2>
          </div>
          <button onClick={() => navigate("/car")} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">
            View All
          </button>
        </div>
        <CarCards />
      </section>

      {/* FEATURED DROPS */}
      <section
        ref={(el) => (sectionsRef.current[5] = el)}
        className="relative py-12 md:py-16 px-5 overflow-hidden bg-[#f5f0eb]"
      >
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] md:text-[14vw] font-light tracking-widest text-[#2c2c2c]/[0.05] select-none pointer-events-none whitespace-nowrap leading-none z-0 uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          VOLONTÉ
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
              price: "400",
              img: siteContent.latestDrop1Image,
            },
            {
              name: "Premium Dark Combo Set",
              price: "299",
              img: siteContent.latestDrop2Image,
            },
            {
              name: "Luxury 8ml Combo Set",
              price: "299",
              img: siteContent.latestDrop3Image,
            },
          ].map(({ name, price, img }) => {
            const matched = getMatchedProduct(name);
            const isAvailable = !!matched;
            return (
              <div 
                key={name} 
                onClick={() => handleLatestDropClick(name)}
                className={`flex gap-4 items-center rounded-2xl p-3 transition-all duration-300 ${
                  isAvailable 
                    ? "bg-white/60 hover:bg-white/95 hover:shadow-md cursor-pointer" 
                    : "bg-white/30 opacity-75 cursor-default relative overflow-hidden group"
                }`}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={img} alt={name} className="w-full h-full object-cover" />
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[7px] tracking-widest text-[#c9a96e] uppercase font-bold bg-black/60 px-1.5 py-0.5 rounded">Aging</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2c2c2c] uppercase tracking-wide">
                    {name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[11px] text-[#a89880]">Rs. {price}</p>
                    {isAvailable ? (
                      <span className="text-[8px] text-[#c9a96e] uppercase tracking-wider font-semibold">Buy Now →</span>
                    ) : (
                      <span className="text-[8px] text-[#a89880] uppercase tracking-wider">Coming Soon</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP — Latest Drops */}
        <div className="relative z-10 hidden md:grid grid-cols-3 gap-6 items-end">
          {/* Card 1: Layam Edition */}
          {(() => {
            const name = "Layam Edition";
            const matched = getMatchedProduct(name);
            const isAvailable = !!matched;
            return (
              <div 
                onClick={() => handleLatestDropClick(name)}
                className={`flex flex-col gap-4 mt-24 transition-all duration-300 ${
                  isAvailable ? "cursor-pointer group" : "opacity-80"
                }`}
              >
                <div className="h-[420px] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all relative">
                  <img src={siteContent.latestDrop1Image} alt="Layam Edition" className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? "group-hover:scale-105" : ""}`} />
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[9px] tracking-[0.3em] text-[#c9a96e] uppercase font-bold bg-black/65 px-3 py-1 rounded-full border border-[#c9a96e]/30">Aging in Cellar</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-medium text-[#2c2c2c] uppercase tracking-wide transition-colors ${isAvailable ? "group-hover:text-[#c9a96e]" : ""}`}>{name}</p>
                    <p className="text-[11px] text-[#a89880] mt-0.5">Rs. 400</p>
                  </div>
                  {isAvailable && (
                    <span className="text-[9px] tracking-widest text-[#c9a96e] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Buy Now →</span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Card 2: Luxury 8ml Combo Set */}
          {(() => {
            const name = "Premium Dark Combo Set";
            const matched = getMatchedProduct(name);
            const isAvailable = !!matched;
            return (
              <div 
                onClick={() => handleLatestDropClick(name)}
                className={`flex flex-col gap-4 transition-all duration-300 ${
                  isAvailable ? "cursor-pointer group" : "opacity-80"
                }`}
              >
                <div className="h-[480px] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all relative">
                  <img src={siteContent.latestDrop2Image} alt="Luxury 8ml Set" className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? "group-hover:scale-105" : ""}`} />
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[9px] tracking-[0.3em] text-[#c9a96e] uppercase font-bold bg-black/65 px-3 py-1 rounded-full border border-[#c9a96e]/30">Aging in Cellar</span>
                    </div>
                  )}
                </div>
                <div className="text-center flex flex-col items-center">
                  <p className={`text-xs font-medium text-[#2c2c2c] uppercase tracking-wide transition-colors ${isAvailable ? "group-hover:text-[#c9a96e]" : ""}`}>{name}</p>
                  <p className="text-[11px] text-[#a89880] mt-0.5">Rs. 299</p>
                  {isAvailable && (
                    <span className="text-[9px] tracking-widest text-[#c9a96e] uppercase font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Buy Now →</span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Card 3: Premium Dark Combo Set */}
          {(() => {
            const name = "Luxury 8ml Combo Set";
            const matched = getMatchedProduct(name);
            const isAvailable = !!matched;
            return (
              <div 
                onClick={() => handleLatestDropClick(name)}
                className={`flex flex-col gap-4 mt-16 transition-all duration-300 ${
                  isAvailable ? "cursor-pointer group" : "opacity-80"
                }`}
              >
                <div className="h-[400px] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all relative">
                  <img src={siteContent.latestDrop3Image} alt="Premium Dark Set" className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? "group-hover:scale-105" : ""}`} />
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[9px] tracking-[0.3em] text-[#c9a96e] uppercase font-bold bg-black/65 px-3 py-1 rounded-full border border-[#c9a96e]/30">Aging in Cellar</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  {isAvailable && (
                    <span className="text-[9px] tracking-widest text-[#c9a96e] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity">← Buy Now</span>
                  )}
                  <div className="text-right">
                    <p className={`text-xs font-medium text-[#2c2c2c] uppercase tracking-wide transition-colors ${isAvailable ? "group-hover:text-[#c9a96e]" : ""}`}>{name}</p>
                    <p className="text-[11px] text-[#a89880] mt-0.5">Rs. 299</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section
        ref={(el) => (sectionsRef.current[6] = el)}
        className="relative w-full py-24 md:py-32 px-6 flex items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0.35 }}
        >
          <source src="/6764959-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* Luxury dark gradient overlay for text readability */}
        <div 
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(to bottom, rgba(44, 44, 44, 0.85) 0%, rgba(74, 63, 53, 0.8) 100%)" }}
        />

        <div className="text-center z-10 max-w-xs md:max-w-3xl mx-auto relative">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-6 font-semibold">The Volonté Philosophy</p>
          <h2
            className="text-2xl md:text-6xl font-light text-white leading-relaxed tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "A fragrance is the invisible part of your personality."
          </h2>
          <div className="w-10 h-[1px] bg-[#c9a96e] mx-auto mt-8" />
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
              Every Volonté order arrives in our signature gift box. Perfect for
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

      {/* Premium Glassmorphic Toast Notification */}
      {notification && (
        <div 
          style={{
            position: "fixed",
            top: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "90%",
            maxWidth: "400px",
            transition: "all 0.3s ease-in-out"
          }}
        >
          <div className="bg-black/90 dark:bg-neutral-900/95 text-white backdrop-blur-md border border-[#c9a96e]/30 px-5 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex-1">
              <p className="text-[8px] tracking-[0.25em] uppercase text-[#c9a96e] mb-1 font-medium">Pre-Release Reserve</p>
              <p className="text-xs text-white/90 leading-relaxed font-light">{notification}</p>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;