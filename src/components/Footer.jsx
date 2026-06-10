import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const SHOP_PHONE = "+91 8891163878";
const SHOP_EMAIL = "volontefragrances@gmail.com";
const SHOP_ADDRESS = "Manjeri, Kerala";
const WHATSAPP_NO = "918891163878";
const INSTAGRAM_URL = "https://www.instagram.com/volontefragrance?igsh=MTd3NnE1NDBkbHZ5bw==";


export default function Footer() {
  const whatsappMessage = encodeURIComponent(
    "Hi! I would like to know more about Volente perfumes."
  );

  return (
    <footer
      className="w-full bg-[#1f1f1f] text-white"
      style={{ fontFamily: "Barlow, sans-serif" }}
    >
      <div className="bg-[#111111] px-5 py-4">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#a89880]">
            <Truck size={14} /> Free Shipping Above Rs.999
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#a89880]">
            <ShieldCheck size={14} /> Authentic Fragrances
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#a89880]">
            <RotateCcw size={14} /> Easy Order Support
          </div>
        </div>
      </div>

      <div className="bg-[#f5f0eb] text-[#2c2c2c] px-5 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[9px] uppercase tracking-[0.35em] text-[#a89880] mb-3">
            Join The Volente Circle
          </p>

          <h2
            className="text-3xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Discover New Drops First
          </h2>

          <p className="text-sm text-[#7a6e65] leading-6 max-w-xl mx-auto mb-7">
            Get updates on exclusive fragrance launches, offers, and gifting
            collections.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to Volente.");
            }}
            className="mx-auto max-w-md flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-[#d5ccc3] bg-white px-5 py-3 text-sm outline-none focus:border-[#2c2c2c]"
            />

            <button
              type="submit"
              className="rounded-full bg-[#2c2c2c] px-7 py-3 text-[10px] uppercase tracking-widest text-white hover:bg-black transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2
            className="text-[30px] font-light tracking-[0.28em] leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            VOLENTE
          </h2>

          <p className="text-[8px] tracking-[0.4em] text-[#a89880] uppercase mt-2">
            Eau de Parfum
          </p>

          <p className="text-[13px] leading-6 text-[#8b9898] max-w-[250px] mt-5">
            Luxury fragrances inspired by timeless elegance. Crafted for
            presence. Designed for memory.
          </p>

          <div className="flex gap-3 mt-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#a89880] hover:text-[#1f1f1f] flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NO}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#a89880] hover:text-[#1f1f1f] flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#a89880] mb-5">
            Shop
          </h3>

          <div className="flex flex-col gap-3">
            {[
              { label: "Men's Fragrances", path: "/men" },
              { label: "Women's Fragrances", path: "/women" },
              { label: "Unisex Collection", path: "/unisex" },
              { label: "Gift Collection", path: "/unisex" },
              { label: "Latest Drops", path: "/" },
            ].map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className="text-[13px] text-[#8b9898] hover:text-white no-underline transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#a89880] mb-5">
            Support
          </h3>

          <div className="flex flex-col gap-3">
            {[
              { label: "Track My Order", path: "/my-orders" },
              { label: "How to Order", path: "/checkout" },
              { label: "Contact Us", path: "/contact" },
              { label: "Shipping Support", path: "/contact" },
              { label: "Return Help", path: "/contact" },
            ].map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className="text-[13px] text-[#8b9898] hover:text-white no-underline transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#a89880] mb-5">
            Contact
          </h3>

          <div className="flex flex-col gap-4">
            <a
              href={`tel:${SHOP_PHONE}`}
              className="flex items-start gap-3 text-[13px] text-[#8b9898] hover:text-white no-underline transition-colors"
            >
              <Phone size={16} className="text-[#a89880] shrink-0 mt-0.5" />
              {SHOP_PHONE}
            </a>

            <a
              href={`mailto:${SHOP_EMAIL}`}
              className="flex items-start gap-3 text-[13px] text-[#8b9898] hover:text-white no-underline transition-colors"
            >
              <Mail size={16} className="text-[#a89880] shrink-0 mt-0.5" />
              {SHOP_EMAIL}
            </a>

            <div className="flex items-start gap-3 text-[13px] text-[#8b9898]">
              <MapPin size={16} className="text-[#a89880] shrink-0 mt-0.5" />
              <span className="leading-5">{SHOP_ADDRESS}</span>
            </div>

            <div className="flex items-start gap-3 text-[13px] text-[#8b9898]">
              <Clock size={16} className="text-[#a89880] shrink-0 mt-0.5" />
              <span>Mon - Sat, 10 AM - 7 PM</span>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NO}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full border border-[#a89880] px-5 py-3 text-[10px] uppercase tracking-widest text-[#a89880] hover:bg-[#a89880] hover:text-[#1f1f1f] transition-colors text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-white/10" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-[#657272] tracking-wide text-center">
          © {new Date().getFullYear()} Volenté. All rights reserved.
        </p>


        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="text-[10px] text-[#657272] hover:text-[#a89880] no-underline transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            to="/"
            className="text-[10px] text-[#657272] hover:text-[#a89880] no-underline transition-colors"
          >
            Terms
          </Link>

          <Link
            to="/admin"
            className="text-[10px] text-[#657272] hover:text-[#a89880] no-underline transition-colors"
          >
            Studio Access
          </Link>
        </div>
      </div>
    </footer>
  );
}