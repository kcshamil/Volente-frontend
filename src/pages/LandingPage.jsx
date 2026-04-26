import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { MenCards, WomenCards, UnisexCards } from "../components/Products";


function LandingPage() {
  const textRef = useRef([]);
  const navigate = useNavigate();
  const splitSectionRef = useRef(null);

  const scrollToSplit = () => {
    splitSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

 useEffect(() => {
  const chars = textRef.current;
  if (!chars.length) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(chars,
      { rotationX: -90, opacity: 0 },
      {
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
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
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }

        /* Horizontal scroll snap for product rows on mobile */
        .cards-scroll {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 12px;
          padding: 12px 20px 20px;
        }
        .cards-scroll::-webkit-scrollbar { display: none; }
        .cards-scroll > * {
          scroll-snap-align: start;
          flex-shrink: 0;
          width: 52vw;
          max-width: 200px;
        }

        /* On md+ let cards-scroll be a normal grid (Products component handles its own layout) */
        @media (min-width: 768px) {
          .cards-scroll {
            display: block;
            overflow-x: visible;
            padding: 0;
          }
          .cards-scroll > * {
            width: auto;
            max-width: none;
          }
        }
      `}</style>


      {/* ── 1. HERO ── */}
      <section className="w-full bg-[#f5f0eb]" style={{ fontFamily: "Barlow, sans-serif" }}>

        {/* MOBILE */}
        <div className="flex flex-col md:hidden">
          <div className="w-full h-[60vw] bg-[#ede7df] flex items-end justify-center overflow-hidden">
            <img src="/img1.jpg" alt="Signature Perfume" className="h-full w-auto object-contain drop-shadow-xl" />
          </div>
          <div className="px-6 py-10 text-center">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#a89880] mb-3">New Season — 2026</p>
            <h1 className="text-[36px] font-light uppercase leading-none text-[#2c2c2c] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Scent Your Story
            </h1>
            <p className="text-sm leading-6 text-[#7a6e65] mb-6">
              Hand-crafted fragrances that linger long after you leave the room.
            </p>
            <button onClick={scrollToSplit} className="rounded-full bg-[#2c2c2c] px-8 py-3 text-[11px] uppercase tracking-widest text-white">
              Explore Now
            </button>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid min-h-screen grid-cols-3">
          <div className="flex items-center justify-center overflow-hidden px-6">
            <h1 className="flex flex-wrap justify-center text-[90px] font-light uppercase leading-none tracking-[-0.04em] text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {text.map((char, i) => (
                <span key={i} ref={(el) => (textRef.current[i] = el)} className="inline-block m-1">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>
          <div className="flex items-end justify-center overflow-hidden bg-[#ede7df] h-screen">
            <img src="/img1.jpg" alt="Signature Perfume" className="h-full w-auto object-contain drop-shadow-2xl" />
          </div>
          <div className="flex items-center justify-center px-6">
            <div className="max-w-[260px]">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#a89880] mb-3">New Season — 2026</p>
              <h2 className="text-3xl font-light text-[#2c2c2c] leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                The Art of Invisible Luxury
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#7a6e65]">Hand-crafted fragrances that linger long after you leave the room.</p>
              <button onClick={scrollToSplit} className="mt-6 rounded-full bg-[#2c2c2c] px-7 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-[#1a1a1a] transition-colors">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MARQUEE ── */}
      <div className="w-full bg-[#2c2c2c] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-[10px] tracking-[0.3em] uppercase text-[#a89880] mx-6">
              Volente {" · "} Long Lasting {" · "} Handcrafted {" · "} Premium {" · "} Free Shipping Rs.999+
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. MEN / UNISEX / WOMEN ── */}
      <section ref={splitSectionRef} className="w-full">

        {/* MOBILE — vertical stacked panels */}
        <div className="flex flex-col md:hidden">
          {[
            { label: "Men",    sub: "Bold. Woody. Intense.",    path: "/men",         btn: "Shop Men",
              img: "https://www.frenchessence.com/cdn/shop/files/6_082874df-845a-4503-889e-6c5a5a7e5151.jpg?v=1758783179&width=1946" },
            { label: "Unisex", sub: "Fresh. Modern. Free.",     path: "/unisex", btn: "Shop Unisex", badge: "New",
              img: "https://lafrenchperfumes.com/cdn/shop/files/bespoke-perfume-scent-for-men-30-ml-404048_53b2ed6d-be5b-4c53-942a-169fe8f864f8.jpg?v=1725281821" },
            { label: "Women",  sub: "Floral. Soft. Timeless.",  path: "/women",       btn: "Shop Women",
              img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop" },
          ].map(({ label, sub, path, btn, badge, img }) => (
            <div key={label} className="relative h-[65vw] overflow-hidden cursor-pointer" onClick={() => navigate(path)}>
              <img src={img} alt={label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              {badge && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-white/20 border border-white/40 text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">{badge}</span>
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/60 mb-2">{sub}</p>
                <h2 className="text-[38px] font-light uppercase tracking-widest text-white leading-none mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {label}
                </h2>
                <button className="rounded-full border border-white px-6 py-2 text-[10px] uppercase tracking-widest text-white bg-white/10 backdrop-blur-sm">
                  {btn}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP — 3 col */}
        <div className="hidden md:grid grid-cols-3 h-[80vh]">
          {[
            { label: "Men",    sub: "Bold. Woody. Intense.",   path: "/men",         btn: "Shop Men",    overlay: "bg-black/35",
              img: "https://www.frenchessence.com/cdn/shop/files/6_082874df-845a-4503-889e-6c5a5a7e5151.jpg?v=1758783179&width=1946" },
            { label: "Unisex", sub: "Fresh. Modern. Free.",    path: "/unisex", btn: "Shop Unisex", overlay: "bg-black/40", badge: "New",
              img: "https://lafrenchperfumes.com/cdn/shop/files/bespoke-perfume-scent-for-men-30-ml-404048_53b2ed6d-be5b-4c53-942a-169fe8f864f8.jpg?v=1725281821" },
            { label: "Women",  sub: "Floral. Soft. Timeless.", path: "/women",       btn: "Shop Women",  overlay: "bg-black/30",
              img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop" },
          ].map(({ label, sub, path, btn, overlay, badge, img }) => (
            <div key={label} className="relative overflow-hidden group cursor-pointer" onClick={() => navigate(path)}>
              <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 ${overlay} group-hover:bg-black/55 transition-colors duration-500`} />
              {badge && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2">
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[9px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">{badge}</span>
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">{sub}</p>
                <h2 className="text-5xl font-light uppercase tracking-widest text-white leading-none mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{label}</h2>
                <button className="rounded-full border border-white px-6 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300">{btn}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. WHY VOLENTE ── */}
      <section className="w-full bg-[#f5f0eb] py-16 px-6" style={{ fontFamily: "Barlow, sans-serif" }}>
        <div className="text-center mb-12">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-3">Why Volente</p>
          <h2 className="text-3xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Crafted for the Discerning
          </h2>
        </div>
        <div className="flex flex-col gap-10 md:grid md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: "🌿", title: "Natural Ingredients", desc: "Sourced from the finest botanical gardens across France, India & the Middle East." },
            { icon: "⏳", title: "Long-Lasting",        desc: "Our Eau de Parfum ensures 10–14 hours of lingering fragrance." },
            { icon: "🫙", title: "Artisan Bottled",     desc: "Hand-poured in premium glass bottles — a gift to yourself or loved ones." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">{icon}</span>
              <h3 className="text-xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{title}</h3>
              <p className="text-sm text-[#7a6e65] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. MEN'S PRODUCTS ── */}
      <section className="bg-[#dce8e5] overflow-hidden">
        <div className="px-5 pt-10 pb-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#a89880] mb-1">For Him — 2026</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Men's Fragrances</h2>
          </div>
          <button onClick={() => navigate("/men")} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">View All</button>
        </div>
        {/* Wrap cards in a mobile scroll container */}
        <div className="cards-scroll">
          <MenCards />
        </div>
      </section>

      {/* ── 6. WOMEN'S PRODUCTS ── */}
      <section className="bg-[#f0e8e4] overflow-hidden">
        <div className="px-5 pt-10 pb-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#a89880] mb-1">For Her — 2026</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Women's Fragrances</h2>
          </div>
          <button onClick={() => navigate("/women")} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">View All</button>
        </div>
        <div className="cards-scroll">
          <WomenCards />
        </div>
      </section>

      {/* ── 7. UNISEX PRODUCTS ── */}
      <section className="bg-[#ede7df] overflow-hidden">
        <div className="px-5 pt-10 pb-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#a89880] mb-1">For Everyone — 2026</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Unisex Collection</h2>
          </div>
          <button onClick={() => navigate("/unisex")} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">View All</button>
        </div>
        <div className="cards-scroll">
          <UnisexCards />
        </div>
      </section>

      {/* ── 8. FEATURED DROPS ── */}
      <section className="relative py-16 px-5 overflow-hidden bg-[#f5f0eb]">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] md:text-[14vw] font-light tracking-widest text-[#2c2c2c]/[0.05] select-none pointer-events-none whitespace-nowrap leading-none z-0 uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          VOLENTE
        </span>
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#a89880] mb-2">Signature Line — 2026</p>
            <h2 className="text-2xl md:text-5xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Latest Drops</h2>
          </div>
          <button onClick={scrollToSplit} className="rounded-full border border-[#2c2c2c] px-4 py-2 text-[9px] uppercase tracking-widest text-[#2c2c2c] whitespace-nowrap">View All</button>
        </div>

        {/* Mobile cards */}
        <div className="relative z-10 flex flex-col gap-4 md:hidden">
          {[
            { name: "Oud Royale",  price: "2,499", img: "https://www.vessenceluxe.com/cdn/shop/files/freepik__perfume-bottle-placed-on-a-luxury-marble-table-wit__34595.png?v=1774281149&width=493" },
            { name: "Velvet Rose", price: "3,199", img: "https://www.vessenceluxe.com/cdn/shop/files/freepik__perfume-bottle-placed-on-marble-surface-with-candl__72916.png?v=1774282698&width=493  " },
            { name: "Amber Noir",  price: "2,799", img: "https://www.vessenceluxe.com/cdn/shop/files/freepik__perfume-bottle-placed-on-glossy-black-surface-with__72936.png?v=1774284758&width=493" },
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

        {/* Desktop staggered */}
        <div className="relative z-10 hidden md:grid grid-cols-3 gap-6 items-end">
          <div className="flex flex-col gap-4 mt-24">
            <div className="h-[320px] rounded-2xl overflow-hidden"><img src="https://www.vessenceluxe.com/cdn/shop/files/freepik__perfume-bottle-placed-on-a-luxury-marble-table-wit__34595.png?v=1774281149&width=493" alt="Oud Royale" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            <div><p className="text-xs font-medium text-[#2c2c2c] uppercase tracking-wide">Oud Royale</p><p className="text-[11px] text-[#a89880] mt-0.5">Rs. 2,499</p></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-[480px] rounded-2xl overflow-hidden"><img src="https://www.vessenceluxe.com/cdn/shop/files/freepik__perfume-bottle-placed-on-marble-surface-with-candl__72916.png?v=1774282698&width=493" alt="Velvet Rose" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            <div className="text-center"><p className="text-xs font-medium text-[#2c2c2c] uppercase tracking-wide">Velvet Rose</p><p className="text-[11px] text-[#a89880] mt-0.5">Rs. 3,199</p></div>
          </div>
          <div className="flex flex-col gap-4 mt-16">
            <div className="text-right"><p className="text-xs font-medium text-[#2c2c2c] uppercase tracking-wide">Amber Noir</p><p className="text-[11px] text-[#a89880] mt-0.5">Rs. 2,799</p></div>
            <div className="h-[280px] rounded-2xl overflow-hidden"><img src="https://www.vessenceluxe.com/cdn/shop/files/freepik__perfume-bottle-placed-on-glossy-black-surface-with__72936.png?v=1774284758&width=493" alt="Amber Noir" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
          </div>
        </div>
      </section>

      {/* ── 9. QUOTE BANNER ── */}
      <section className="relative w-full py-20 px-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2c2c2c 0%, #4a3f35 100%)" }}>
        <div className="text-center z-10 max-w-xs md:max-w-3xl mx-auto">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#a89880] mb-6">The Volente Philosophy</p>
          <h2 className="text-2xl md:text-6xl font-light text-white leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            "A fragrance is the invisible part of your personality."
          </h2>
          <div className="w-10 h-[1px] bg-[#a89880] mx-auto mt-8" />
        </div>
      </section>

      {/* ── 10. GIFT SECTION ── */}
      <section className="w-full bg-[#f5f0eb] py-16 px-5" style={{ fontFamily: "Barlow, sans-serif" }}>
        <div className="mx-auto max-w-5xl flex flex-col gap-8 md:grid md:grid-cols-2 items-center">
          <div className="rounded-2xl overflow-hidden h-[60vw] md:h-[400px]">
            <img src="/gift1.jpg" alt="Gift Set" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-3">Gift Someone Special</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2c2c2c] leading-snug mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The Perfect Gift, Beautifully Wrapped
            </h2>
            <p className="text-sm text-[#7a6e65] leading-relaxed mb-6">
              Every Volente order arrives in our signature gift box. Perfect for birthdays, anniversaries, and festive occasions.
            </p>
            <button onClick={() => navigate("/unisex")} className="rounded-full bg-[#2c2c2c] px-7 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-[#1a1a1a] transition-colors">
              Shop Gifts
            </button>
          </div>
        </div>
      </section>

      
    </>
  );
}

export default LandingPage;