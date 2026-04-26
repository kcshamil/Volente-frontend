import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

// ── Shop details ─────────────────────────────────────────────────────────────
const SHOP_PHONE    = "+91 8891163878";
const SHOP_EMAIL    = "hello@volente.in";
const SHOP_ADDRESS  = "Near New Bus Stand, Manjeri, Kerala";
const WHATSAPP_NO   = "919207388631";
const INSTAGRAM_URL = "https://instagram.com/volente";
const FACEBOOK_URL  = "https://facebook.com/volente";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Barlow:wght@300;400;500&display=swap');
      `}</style>

      <footer className="w-full bg-[#2c2c2c] text-white" style={{ fontFamily: "Barlow, sans-serif" }}>

        {/* ── TOP BAND ── */}
        <div className="w-full bg-[#1a1a1a] py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#a89880]">
            Free Shipping Above Rs.999 · Authentic Fragrances · Easy Returns
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NO}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white text-[10px] uppercase tracking-widest px-5 py-2 rounded-full"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 32 32">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.494 2.027 7.808L.057 31.428a.75.75 0 0 0 .916.916l7.62-2.013A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.207 20.157c-.395-.198-2.338-1.152-2.7-1.284-.36-.13-.624-.198-.887.198-.263.395-1.02 1.284-1.25 1.547-.23.263-.46.296-.856.099-.395-.198-1.668-.615-3.176-1.96-1.174-1.047-1.966-2.34-2.197-2.735-.23-.395-.025-.609.173-.806.177-.177.395-.46.593-.69.198-.23.263-.395.395-.66.131-.263.066-.494-.033-.69-.099-.198-.887-2.143-1.216-2.932-.32-.769-.647-.665-.887-.677-.23-.01-.494-.013-.757-.013-.264 0-.69.099-1.052.494-.362.395-1.382 1.35-1.382 3.294 0 1.943 1.415 3.822 1.612 4.085.198.263 2.785 4.252 6.748 5.963.943.407 1.678.65 2.252.831.946.302 1.807.26 2.487.158.759-.113 2.338-.956 2.667-1.878.329-.921.329-1.71.23-1.877-.099-.164-.362-.263-.757-.46z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* ── MAIN FOOTER ── */}
        <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* ── BRAND ── */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <div>
              <h2
                className="text-[28px] font-light tracking-[0.3em] text-white leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                VOLENTE
              </h2>
              <p className="text-[8px] tracking-[0.4em] text-[#a89880] uppercase mt-1">Eau de Parfum</p>
            </div>
            <p className="text-[12px] leading-6 text-[#7a8a8a] max-w-[220px]">
              Handcrafted fragrances made with the finest natural ingredients. Wear your story.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-1">
              {/* Instagram */}
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4 text-[#a89880]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4 text-[#a89880]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href={`https://wa.me/${WHATSAPP_NO}`} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="WhatsApp">
                <svg className="h-4 w-4 text-[#a89880]" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.494 2.027 7.808L.057 31.428a.75.75 0 0 0 .916.916l7.62-2.013A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.207 20.157c-.395-.198-2.338-1.152-2.7-1.284-.36-.13-.624-.198-.887.198-.263.395-1.02 1.284-1.25 1.547-.23.263-.46.296-.856.099-.395-.198-1.668-.615-3.176-1.96-1.174-1.047-1.966-2.34-2.197-2.735-.23-.395-.025-.609.173-.806.177-.177.395-.46.593-.69.198-.23.263-.395.395-.66.131-.263.066-.494-.033-.69-.099-.198-.887-2.143-1.216-2.932-.32-.769-.647-.665-.887-.677-.23-.01-.494-.013-.757-.013-.264 0-.69.099-1.052.494-.362.395-1.382 1.35-1.382 3.294 0 1.943 1.415 3.822 1.612 4.085.198.263 2.785 4.252 6.748 5.963.943.407 1.678.65 2.252.831.946.302 1.807.26 2.487.158.759-.113 2.338-.956 2.667-1.878.329-.921.329-1.71.23-1.877-.099-.164-.362-.263-.757-.46z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── SHOP ── */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#a89880] mb-1">Shop</h3>
            {[
              { label: "Men's Fragrances",   path: "/men" },
              { label: "Women's Fragrances", path: "/women" },
              { label: "Unisex Collection",  path: "/unisex" },
              { label: "Gift Sets",          path: "/" },
              { label: "New Arrivals",       path: "/" },
            ].map(({ label, path }) => (
              <Link key={label} to={path}
                className="text-[12px] text-[#7a8a8a] hover:text-white no-underline transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* ── HELP ── */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#a89880] mb-1">Help</h3>
            {[
              { label: "How to Order",   path: "/" },
              { label: "Shipping Info",  path: "/" },
              { label: "Return Policy",  path: "/" },
              { label: "Contact Us",     path: "/contact" },
              { label: "FAQ",            path: "/" },
            ].map(({ label, path }) => (
              <Link key={label} to={path}
                className="text-[12px] text-[#7a8a8a] hover:text-white no-underline transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* ── CONTACT ── */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#a89880] mb-1">Contact</h3>

            <a href={`tel:${SHOP_PHONE}`}
              className="flex items-start gap-3 text-[12px] text-[#7a8a8a] hover:text-white no-underline transition-colors">
              <Phone className="h-4 w-4 text-[#a89880] mt-0.5 shrink-0" />
              {SHOP_PHONE}
            </a>

            <a href={`mailto:${SHOP_EMAIL}`}
              className="flex items-start gap-3 text-[12px] text-[#7a8a8a] hover:text-white no-underline transition-colors">
              <Mail className="h-4 w-4 text-[#a89880] mt-0.5 shrink-0" />
              {SHOP_EMAIL}
            </a>

            <div className="flex items-start gap-3 text-[12px] text-[#7a8a8a]">
              <MapPin className="h-4 w-4 text-[#a89880] mt-0.5 shrink-0" />
              <span className="leading-5">{SHOP_ADDRESS}</span>
            </div>

            <div className="flex items-start gap-3 text-[12px] text-[#7a8a8a]">
              <Clock className="h-4 w-4 text-[#a89880] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#a89880] text-[10px] uppercase tracking-widest mb-0.5">Working Hours</p>
                Mon – Sat · 10am – 7pm
              </div>
            </div>

            {/* WhatsApp order CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NO}?text=${encodeURIComponent("Hi! I'd like to place an order from Volente.")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full border border-[#a89880] px-5 py-2.5 text-[10px] uppercase tracking-widest
                text-[#a89880] hover:bg-[#a89880] hover:text-[#2c2c2c] transition-colors text-center"
            >
              Order via WhatsApp
            </a>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="w-full h-px bg-white/10" />
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#4a5a5a] tracking-wide">
            © {new Date().getFullYear()} Volente. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((label) => (
              <Link key={label} to="/"
                className="text-[10px] text-[#4a5a5a] hover:text-[#a89880] no-underline transition-colors tracking-wide">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-[10px] text-[#4a5a5a] tracking-wide">Made with 🤍 in Kerala</p>
        </div>

      </footer>
    </>
  );
}