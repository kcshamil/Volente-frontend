import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { MenCards } from "../components/Products";


function Men() {
  const navigate = useNavigate();
  const heroRef       = useRef(null);
  const headingRef    = useRef(null);
  const subRef        = useRef(null);
  const btnRef        = useRef(null);
  const breadcrumbRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(breadcrumbRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(headingRef.current,    { opacity: 0, y: 40 },  { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
      .fromTo(subRef.current,        { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(btnRef.current,        { opacity: 0, y: 15 },  { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

        .men-hero-bg {
          background: linear-gradient(160deg, #1a2028 0%, #2c3a30 40%, #3a2c1e 100%);
        }
        .men-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .men-pill {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(168,152,128,0.4);
          border-radius: 999px;
          padding: 5px 13px;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a6e65;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .men-pill:hover { background: #2c2c2c; border-color: #2c2c2c; color: #fff; }

        .men-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: 100%;
        }
        .men-stats-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 4px;
          border-left: 1px solid rgba(168,152,128,0.25);
        }
        .men-stats-block:first-child { border-left: none; }

        .filter-bar::-webkit-scrollbar { display: none; }
        .filter-bar { scrollbar-width: none; }
      `}</style>


      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="men-hero-bg men-grain relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100svh", padding: "64px 20px 0" }}
      >
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 440, height: 440, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none", zIndex: 0 }} />

        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-light uppercase text-white/[0.025] select-none pointer-events-none leading-none z-0"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(80px, 28vw, 220px)", whiteSpace: "nowrap" }}
        >
          Men
        </span>

        <div className="relative z-10 flex flex-col items-center w-full" style={{ maxWidth: 360 }}>
          <div ref={breadcrumbRef} className="flex items-center gap-2 mb-6">
            <button
              onClick={() => navigate("/")}
              style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}
            >
              Home
            </button>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>·</span>
            <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a89880" }}>
              Men's Collection
            </span>
          </div>

          <span style={{ display: "block", width: 1, height: 60, background: "linear-gradient(to bottom, transparent, #a89880, transparent)", margin: "0 auto 14px" }} />

          <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a89880", marginBottom: 12 }}>
            For Him — 2026
          </p>

          <h1
            ref={headingRef}
            className="font-light uppercase leading-none text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 12vw, 88px)", letterSpacing: "-0.02em", marginBottom: 18 }}
          >
            Men's
            <br />
            <span className="italic" style={{ color: "#a89880" }}>Fragrances</span>
          </h1>

          <p
            ref={subRef}
            style={{ fontFamily: "Barlow, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 24, padding: "0 4px" }}
          >
            Bold woods, deep amber, smoky oud. Fragrances built for the man who leaves a lasting impression.
          </p>

          <button
            ref={btnRef}
            onClick={() => navigate("/")}
            style={{ fontFamily: "Barlow, sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "10px 22px", background: "transparent", cursor: "pointer", marginBottom: 36 }}
          >
            ← Back to Home
          </button>
        </div>

        <div className="relative z-10 w-full mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="men-stats-grid" style={{ padding: "14px 8px" }}>
            {[
              { num: "6+",   label: "Fragrances" },
              { num: "4",    label: "Sizes" },
              { num: "12hr", label: "Longevity" },
              { num: "100%", label: "Natural" },
            ].map(({ num, label }) => (
              <div key={label} className="men-stats-block">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, color: "#fff" }}>{num}</span>
                <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 3, textAlign: "center" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER / SORT BAR ── */}
      <div
        className="filter-bar"
        style={{ background: "#dce8e5", padding: "14px 16px", display: "flex", alignItems: "center", gap: 8, overflowX: "auto", fontFamily: "Barlow, sans-serif" }}
      >
        <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a6e65", flexShrink: 0, marginRight: 4 }}>Filter:</span>
        {["All", "Bestseller", "New", "Premium", "Fresh"].map((tag) => (
          <button key={tag} className="men-pill">{tag}</button>
        ))}
        <div style={{ marginLeft: "auto", flexShrink: 0, display: "flex", alignItems: "center", gap: 6, paddingLeft: 12 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a6e65" }}>Sort:</span>
          <select style={{ background: "transparent", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: "#2c2c2c", border: "none", outline: "none", fontFamily: "Barlow, sans-serif" }}>
            <option>Featured</option>
            <option>Price: Low–High</option>
            <option>Price: High–Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="collection-header" style={{ background: "#dce8e5", padding: "28px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a89880", marginBottom: 4 }}>
            Scroll to explore →
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 5.5vw, 34px)", fontWeight: 300, color: "#2c2c2c", lineHeight: 1 }}>
            All Men's Fragrances
          </h2>
        </div>
        <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a89880" }}>6 Products</p>
      </div>

      {/* ── PRODUCTS ── */}
      <MenCards />

      {/* ── COLLECTION STORY ── */}
      <section style={{ background: "linear-gradient(135deg, #1a2028 0%, #2c3a30 100%)", padding: "60px 20px", textAlign: "center", overflow: "hidden" }}>
        <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a89880", marginBottom: 18 }}>The Men's Story</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 5.5vw, 42px)", fontWeight: 300, color: "#fff", lineHeight: 1.6, maxWidth: 520, margin: "0 auto 24px" }}>
          "Strength has a scent. Make it yours."
        </h2>
        <div style={{ width: 32, height: 1, background: "#a89880", margin: "0 auto 28px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
          {[
            { label: "Woody",   desc: "Oud · Cedar · Sandalwood" },
            { label: "Spicy",   desc: "Pepper · Cardamom · Amber" },
            { label: "Aquatic", desc: "Sea Salt · Driftwood · Musk" },
          ].map(({ label, desc }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>{label}</p>
              <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CROSS NAVIGATION ── */}
      <section className="explore-more-section" style={{ background: "#f5f0eb", padding: "36px 16px" }}>
        <p style={{ textAlign: "center", fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#a89880", marginBottom: 20 }}>Explore More</p>
        <div style={{ display: "flex", gap: 12, maxWidth: 500, margin: "0 auto" }}>
          {[
            { label: "Women", path: "/women", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&auto=format&fit=crop" },
            // ✅ CLIENT IMAGE: coloured 8ml bottles for Unisex cross-nav
            { label: "Unisex", path: "/unisex", img: "/Lp8ml.jpeg" },
          ].map(({ label, path, img }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              style={{ flex: 1, position: "relative", borderRadius: 16, overflow: "hidden", height: 120, cursor: "pointer" }}
            >
              <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.15em", color: "#fff" }}>{label}</h3>
                <span style={{ marginTop: 6, fontFamily: "Barlow, sans-serif", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.3)", padding: "3px 10px", borderRadius: 999 }}>Shop →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}

export default Men;