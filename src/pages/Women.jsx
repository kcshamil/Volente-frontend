import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { WomenCards } from "../components/Products";


function Women() {
  const navigate = useNavigate();
  const headingRef   = useRef(null);
  const subRef       = useRef(null);
  const btnRef       = useRef(null);
  const breadcrumbRef = useRef(null);
  const lineRef      = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(breadcrumbRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(lineRef.current,       { scaleY: 0 },           { scaleY: 1, duration: 0.5, transformOrigin: "top" }, "-=0.1")
      .fromTo(headingRef.current,    { opacity: 0, y: 40 },   { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
      .fromTo(subRef.current,        { opacity: 0, y: 20 },   { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(btnRef.current,        { opacity: 0, y: 15 },   { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

        .women-hero-bg {
          background: linear-gradient(160deg, #2d1a1e 0%, #3d2430 50%, #2a1f2e 100%);
        }
        .women-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
        .women-hero-accent { color: #d4a0b0; }
        .women-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(212,160,176,0.35);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #9a7080;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .women-pill:hover, .women-pill.active {
          background: #2c2c2c;
          border-color: #2c2c2c;
          color: #fff;
        }
        .women-stats-block {
          border-left: 1px solid rgba(212,160,176,0.2);
          padding-left: 28px;
        }
        .women-stats-block:first-child { border-left: none; padding-left: 0; }

        @keyframes float-petal {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50%       { transform: translateY(-18px) rotate(8deg); opacity: 0.15; }
        }
        .petal { animation: float-petal 6s ease-in-out infinite; }
        .petal:nth-child(2) { animation-delay: 1.5s; }
        .petal:nth-child(3) { animation-delay: 3s; }
      `}</style>


      {/* ── HERO ── */}
      <section className="women-hero-bg women-grain relative min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <span
          className="absolute inset-0 flex items-center justify-center text-[20vw] font-light uppercase tracking-[0.15em] text-white/[0.025] select-none pointer-events-none leading-none z-0"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Women
        </span>

        <div className="petal absolute top-[15%] left-[10%] w-20 h-20 rounded-full bg-[#d4a0b0]/10 blur-2xl" />
        <div className="petal absolute top-[60%] right-[12%] w-28 h-28 rounded-full bg-[#d4a0b0]/10 blur-3xl" />
        <div className="petal absolute top-[40%] left-[5%] w-12 h-12 rounded-full bg-[#d4a0b0]/08 blur-xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#d4a0b0]/[0.06] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-[#d4a0b0]/[0.04] z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <div ref={breadcrumbRef} className="flex items-center gap-2 mb-8">
            <button onClick={() => navigate("/")} className="text-[9px] tracking-[0.3em] uppercase text-white/40 hover:text-white/70 transition-colors">
              Home
            </button>
            <span className="text-white/20 text-[9px]">·</span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#d4a0b0]">Women's Collection</span>
          </div>

          <span
            ref={lineRef}
            style={{ display: "block", width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, #d4a0b0, transparent)", margin: "0 auto 20px" }}
          />

          <p className="text-[9px] tracking-[0.4em] uppercase text-[#d4a0b0] mb-4">For Her — 2026</p>
          <h1
            ref={headingRef}
            className="text-[56px] md:text-[90px] font-light uppercase leading-none tracking-[-0.02em] text-white mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Women's
            <br />
            <span className="italic" style={{ color: "#d4a0b0" }}>Fragrances</span>
          </h1>
          <p ref={subRef} className="text-sm text-white/50 max-w-sm leading-7 mb-8" style={{ fontFamily: "Barlow, sans-serif" }}>
            Blooming roses, soft jasmine, velvet musk. Fragrances that whisper elegance long after you've left the room.
          </p>
          <button
            ref={btnRef}
            onClick={() => navigate("/")}
            className="rounded-full border border-white/20 px-6 py-2.5 text-[10px] uppercase tracking-widest text-white/70 hover:border-white/50 hover:text-white transition-all duration-300"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            ← Back to Home
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/[0.07] px-8 py-5">
          <div className="max-w-4xl mx-auto flex items-center justify-center flex-wrap md:flex-nowrap">
            {[
              { num: "6+",   label: "Fragrances" },
              { num: "4",    label: "Sizes Available" },
              { num: "14hr", label: "Avg Longevity" },
              { num: "100%", label: "Floral Extracts" },
            ].map(({ num, label }) => (
              <div key={label} className="women-stats-block flex flex-col items-center px-8 py-2">
                <span className="text-2xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{num}</span>
                <span className="text-[8px] tracking-[0.25em] uppercase text-white/35 mt-1" style={{ fontFamily: "Barlow, sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER / SORT BAR ── */}
      <div className="bg-[#f0e8e4] px-5 py-5 flex items-center gap-3 overflow-x-auto" style={{ fontFamily: "Barlow, sans-serif" }}>
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#9a7080] flex-shrink-0 mr-2">Filter:</span>
        {["All", "Bestseller", "New", "Premium", "Floral"].map((tag) => (
          <button key={tag} className="women-pill flex-shrink-0">{tag}</button>
        ))}
        <div className="ml-auto flex-shrink-0 flex items-center gap-2">
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#9a7080]">Sort:</span>
          <select className="bg-transparent text-[9px] uppercase tracking-widest text-[#2c2c2c] border-none outline-none cursor-pointer" style={{ fontFamily: "Barlow, sans-serif" }}>
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="bg-[#f0e8e4] px-5 pt-10 pb-3 flex items-center justify-between">
        <div>
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#a89880] mb-1">Scroll to explore →</p>
          <h2 className="text-2xl md:text-4xl font-light text-[#2c2c2c] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            All Women's Fragrances
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[9px] tracking-[0.2em] uppercase text-[#a89880]">6 Products</p>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <WomenCards />

      {/* ── COLLECTION STORY ── */}
      <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg, #2d1a1e 0%, #3d2430 100%)", fontFamily: "Barlow, sans-serif" }}>
        <p className="text-[9px] tracking-[0.4em] uppercase text-[#d4a0b0] mb-6">The Women's Story</p>
        <h2 className="text-3xl md:text-5xl font-light text-white leading-relaxed max-w-2xl mx-auto mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "A woman who wears her scent with confidence needs no introduction."
        </h2>
        <div className="w-10 h-[1px] mx-auto mb-10" style={{ background: "#d4a0b0" }} />
        <div className="flex justify-center gap-8 flex-wrap">
          {[
            { label: "Floral",  desc: "Rose · Jasmine · Cherry Blossom" },
            { label: "Powdery", desc: "Iris · Violet · Cashmere" },
            { label: "Sweet",   desc: "Vanilla · Peach · White Musk" },
          ].map(({ label, desc }) => (
            <div key={label} className="text-center">
              <p className="text-sm font-light text-white/80 uppercase tracking-widest mb-1">{label}</p>
              <p className="text-[10px] text-white/35 tracking-wide">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CROSS NAVIGATION ── */}
      <section className="bg-[#f5f0eb] py-12 px-5" style={{ fontFamily: "Barlow, sans-serif" }}>
        <p className="text-center text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-8">Explore More</p>
        <div className="flex gap-4 max-w-2xl mx-auto">
          {[
            // ✅ CLIENT IMAGE: dark 8ml bottles for Men cross-nav
            { label: "Men",    path: "/men",    img: "/Lp8ml2.jpeg" },
            // ✅ CLIENT IMAGE: coloured 8ml bottles for Unisex cross-nav
            { label: "Unisex", path: "/unisex", img: "/Lp8ml.jpeg" },
          ].map(({ label, path, img }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              className="flex-1 relative rounded-2xl overflow-hidden h-36 cursor-pointer group"
            >
              <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-light uppercase tracking-widest text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {label}
                </h3>
                <span className="mt-2 text-[9px] tracking-widest uppercase text-white/60 border border-white/30 px-3 py-1 rounded-full">
                  Shop →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}

export default Women;