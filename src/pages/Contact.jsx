import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const SHOP_PHONE  = "+91 8891163878";
const SHOP_EMAIL  = "volentefragrances@gmail.com";
const SHOP_ADDRESS = "Manjeri, Kerala";
const WHATSAPP_NO = "918891163878";

export default function Contact() {
  const navigate  = useNavigate();
  const headingRef = useRef(null);
  const subRef     = useRef(null);

  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [sent,    setSent]    = useState(false);

  // Simple entrance animation without GSAP dependency issues
  useEffect(() => {
    const els = [headingRef.current, subRef.current].filter(Boolean);
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100 + i * 120);
    });
  }, []);

  const handleSend = () => {
    if (!form.name.trim() || !form.message.trim()) return;
    const text = encodeURIComponent(
      `👋 *Contact from Volonté Website*\n` +
      `──────────────────────────────\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email || "—"}\n` +
      `──────────────────────────────\n` +
      `Message:\n${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NO}?text=${text}`, "_blank");
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Barlow:wght@300;400;500&display=swap');
      `}</style>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a1a22 0%, #2c2a1e 50%, #1a2220 100%)", minHeight: "40vh" }}
      >
        {/* giant bg word */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none leading-none z-0 uppercase font-light text-white/[0.03]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(64px, 22vw, 160px)", whiteSpace: "nowrap" }}
        >
          Contact
        </span>

        <div className="relative z-10 flex flex-col items-center">
          {/* breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <button
              onClick={() => navigate("/")}
              style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}
            >
              Home
            </button>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>·</span>
            <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9b99a" }}>
              Contact Us
            </span>
          </div>

          <span
            style={{ display: "block", width: 1, height: 50, background: "linear-gradient(to bottom, transparent, #c9b99a, transparent)", margin: "0 auto 16px" }}
          />

          <h1
            ref={headingRef}
            className="font-light uppercase leading-none text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 10vw, 76px)", letterSpacing: "-0.02em", marginBottom: 16 }}
          >
            Get in Touch
          </h1>
          <p
            ref={subRef}
            style={{ fontFamily: "Barlow, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 340 }}
          >
            Questions about an order, a fragrance, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section
        className="px-5 py-16"
        style={{ background: "#f5f0eb", fontFamily: "Barlow, sans-serif" }}
      >
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ── LEFT: Info ── */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-3">Reach Us</p>
              <h2
                className="font-light text-[#2c2c2c] leading-snug mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 5vw, 36px)" }}
              >
                We're always happy to help
              </h2>
              <p className="text-sm text-[#7a6e65] leading-relaxed">
                Whether you need help choosing a fragrance, tracking your order, or just want to learn more about Volonté — reach out anytime.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              <a
                href={`tel:${SHOP_PHONE}`}
                className="flex items-start gap-4 group no-underline"
              >
                <div className="w-10 h-10 rounded-full bg-[#ede7df] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2c2c2c] transition-colors">
                  <Phone className="h-4 w-4 text-[#a89880] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#a89880] mb-1">Phone</p>
                  <p className="text-sm text-[#2c2c2c]">{SHOP_PHONE}</p>
                </div>
              </a>

              <a
                href={`mailto:${SHOP_EMAIL}`}
                className="flex items-start gap-4 group no-underline"
              >
                <div className="w-10 h-10 rounded-full bg-[#ede7df] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2c2c2c] transition-colors">
                  <Mail className="h-4 w-4 text-[#a89880] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#a89880] mb-1">Email</p>
                  <p className="text-sm text-[#2c2c2c]">{SHOP_EMAIL}</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ede7df] flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-[#a89880]" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#a89880] mb-1">Visit Us</p>
                  <p className="text-sm text-[#2c2c2c] leading-relaxed">{SHOP_ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ede7df] flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-[#a89880]" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#a89880] mb-1">Working Hours</p>
                  <p className="text-sm text-[#2c2c2c]">Mon – Sat · 10am – 7pm</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NO}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 w-fit bg-green-500 hover:bg-green-600 transition-colors text-white text-[11px] uppercase tracking-widest px-6 py-3 rounded-full no-underline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.494 2.027 7.808L.057 31.428a.75.75 0 0 0 .916.916l7.62-2.013A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.207 20.157c-.395-.198-2.338-1.152-2.7-1.284-.36-.13-.624-.198-.887.198-.263.395-1.02 1.284-1.25 1.547-.23.263-.46.296-.856.099-.395-.198-1.668-.615-3.176-1.96-1.174-1.047-1.966-2.34-2.197-2.735-.23-.395-.025-.609.173-.806.177-.177.395-.46.593-.69.198-.23.263-.395.395-.66.131-.263.066-.494-.033-.69-.099-.198-.887-2.143-1.216-2.932-.32-.769-.647-.665-.887-.677-.23-.01-.494-.013-.757-.013-.264 0-.69.099-1.052.494-.362.395-1.382 1.35-1.382 3.294 0 1.943 1.415 3.822 1.612 4.085.198.263 2.785 4.252 6.748 5.963.943.407 1.678.65 2.252.831.946.302 1.807.26 2.487.158.759-.113 2.338-.956 2.667-1.878.329-.921.329-1.71.23-1.877-.099-.164-.362-.263-.757-.46z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* ── RIGHT: Message form ── */}
          <div className="bg-white rounded-3xl border border-[#ede7df] p-7 flex flex-col gap-5 shadow-sm">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#a89880] mb-1">Send a Message</p>
              <h3
                className="font-light text-[#2c2c2c]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26 }}
              >
                Drop us a note
              </h3>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">Your Name *</label>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#f9f6f3] border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm text-[#2c2c2c] outline-none placeholder-[#c5b9ae] focus:border-[#2c2c2c] transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">Email (optional)</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#f9f6f3] border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm text-[#2c2c2c] outline-none placeholder-[#c5b9ae] focus:border-[#2c2c2c] transition-colors"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">Message *</label>
              <textarea
                placeholder="How can we help you?"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#f9f6f3] border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm text-[#2c2c2c] outline-none placeholder-[#c5b9ae] resize-none focus:border-[#2c2c2c] transition-colors"
              />
            </div>

            {sent && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-sm text-green-700">
                ✅ Message sent via WhatsApp! We'll get back to you soon.
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={!form.name.trim() || !form.message.trim()}
              className={`w-full py-3.5 rounded-full text-[11px] uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-all duration-300
                ${form.name.trim() && form.message.trim()
                  ? "bg-[#2c2c2c] text-white hover:bg-[#1a1a1a]"
                  : "bg-[#e8dfd5] text-[#a89880] cursor-not-allowed"
                }`}
            >
              <Send className="h-4 w-4" /> Send via WhatsApp
            </button>

            <p className="text-[10px] text-[#a89880] text-center leading-relaxed">
              This will open WhatsApp with your message pre-filled. Just hit send!
            </p>
          </div>

        </div>
      </section>

      {/* ── MAP / STORE INFO BAND ── */}
      <section style={{ background: "#ede7df", padding: "40px 20px", fontFamily: "Barlow, sans-serif" }}>
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#a89880] mb-2">Our Store</p>
            <h3
              className="font-light text-[#2c2c2c] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24 }}
            >
              Volonté — Manjeri, Kerala
            </h3>
            <p className="text-sm text-[#7a6e65]">{SHOP_ADDRESS}</p>
          </div>
          <div className="flex gap-3">
            <a
              href={`tel:${SHOP_PHONE}`}
              className="flex items-center gap-2 border border-[#2c2c2c] rounded-full px-5 py-2.5 text-[10px] uppercase tracking-widest text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-white transition-colors no-underline"
            >
              <Phone className="h-3.5 w-3.5" /> Call Now
            </a>
            <button
              onClick={() => navigate("/")}
              className="border border-[#2c2c2c] rounded-full px-5 py-2.5 text-[10px] uppercase tracking-widest text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-white transition-colors"
            >
              ← Back to Shop
            </button>
          </div>
        </div>
      </section>
    </>
  );
}