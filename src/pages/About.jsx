import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PerfumeCreation from "../components/PerfumeCreation";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionsRef = useRef([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("volente_theme") || "light");

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Barlow:wght@300;400;500&display=swap');
      `}</style>

      {/* HERO / INTRO */}
      <section 
        className="w-full bg-[#f5f0eb] py-16 md:py-24 px-6 text-center"
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <p className="text-[9px] tracking-[0.4em] uppercase text-[#a89880] mb-3">Our Essence</p>
        <h1 
          className="text-4xl md:text-6xl font-light text-[#2c2c2c] uppercase tracking-wide leading-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Story of Volonté
        </h1>
        <p className="text-sm text-[#7a6e65] max-w-xl mx-auto leading-relaxed">
          Crafted for the discerning mind, Volonté is a testament to the pursuit of presence, memory, and the unseen luxury of scent.
        </p>
      </section>

      {/* BRAND HERITAGE SECTION */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="w-full bg-[#fcfbfa] py-16 md:py-24 px-6 border-t border-b border-[#ede7df]"
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-12 items-center gap-10 md:gap-16">
          <div className="md:col-span-7 order-2 md:order-1">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#a89880] mb-4">The Emblem</p>
            <h2
              className="text-4xl md:text-5xl font-light text-[#2c2c2c] leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The Story of <br /> Volonté Luxury
            </h2>
            <p className="text-sm text-[#7a6e65] leading-relaxed mb-6">
              Our name, derived from the timeless pursuit of presence and memory, represents our willpower to create extraordinary olfactory experiences. Every fragrance is a testament to sophisticated craftsmanship, housed in a vessel of timeless elegance.
            </p>
            <p className="text-sm text-[#7a6e65] leading-relaxed">
              Embossed with gold foil and crafted with precision, the Volonté emblem stands for authenticity, luxury, and the art of invisible presence.
            </p>
          </div>
          
          <div className="md:col-span-5 order-1 md:order-2 w-full flex justify-center">
            <div 
              className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden shadow-xl border border-[#ede7df] dark:border-[#242424] hover:scale-[1.02] transition-transform duration-500 bg-[#f5f0eb] dark:bg-[#1a1a1a] p-6 flex items-center justify-center select-none"
              style={{ minHeight: "340px" }}
            >
              <img 
                src={brandEmblemSrc} 
                alt="Volonté Brand Emblem" 
                className="w-[85%] h-auto object-contain rounded-2xl transition-all duration-700 ease-in-out" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY VOLONTÉ */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="w-full bg-[#f5f0eb] py-16 md:py-20 px-6"
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <div className="text-center mb-10 md:mb-12">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-3">Why Volonté</p>
          <h2
            className="text-3xl font-light text-[#2c2c2c]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Crafted for the Discerning
          </h2>
        </div>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: "🌿", title: "Natural Ingredients", desc: "Crafted with luxurious ingredients inspired by the timeless scent traditions of Kerala." },
            { icon: "⏳", title: "Long-Lasting", desc: "Our Eau de Parfum ensures 8-10 hours of lingering fragrance." },
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
        ref={(el) => (sectionsRef.current[2] = el)}
        className="w-full bg-white py-14 md:py-20 px-6 overflow-hidden"
        style={{ fontFamily: "Barlow, sans-serif" }}
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
              Every drop of Volonté is a symphony of rare essences. We don't just
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
    </>
  );
}

export default About;
