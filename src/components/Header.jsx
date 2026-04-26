import { Menu, X, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CART_KEY = "volente_cart";

const navLinks = [
  { label: "Home",       path: "/" },
  { label: "Men",        path: "/men" },
  { label: "Women",      path: "/women" },
  { label: "Unisex",     path: "/unisex" },
  { label: "Contact Us", path: "/contact" },
];

const getCartCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  } catch { return 0; }
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount,  setCartCount]  = useState(getCartCount);
  const [cartBump,   setCartBump]   = useState(false);
  const navigate = useNavigate();

  // Keep cart count in sync with any add/remove events
  useEffect(() => {
    const sync = () => {
      const newCount = getCartCount();
      if (newCount > cartCount) {
        // Trigger bump animation when items are added
        setCartBump(true);
        setTimeout(() => setCartBump(false), 400);
      }
      setCartCount(newCount);
    };
    window.addEventListener("cartUpdated", sync);
    return () => window.removeEventListener("cartUpdated", sync);
  }, [cartCount]);

  const handleCartClick = () => navigate("/checkout");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Inter:wght@700;900&display=swap');
        @keyframes cart-bump {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.35); }
          70%  { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .cart-bump { animation: cart-bump 0.4s ease; }
      `}</style>

      {/* ── DESKTOP HEADER ── */}
      <div className="w-full bg-[#dfe7eb] px-6 pt-7 pb-3" style={{ fontFamily: "Barlow, sans-serif" }}>
        <div className="mx-auto max-w-6xl rounded-[30px] bg-[#edf3f5] p-3">
          <div className="relative flex items-center justify-between rounded-[24px] bg-[#dfe9ed] px-9 py-[18px]">

            {/* ── LOGO ── */}
            <Link to="/" className="hidden md:flex items-center gap-3 no-underline group">
              <div className="w-9 h-9 bg-black rounded-[8px] flex items-center justify-center shadow-md group-hover:bg-gray-800 transition-colors">
                <span className="text-white text-[15px] font-black leading-none" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}>
                  V
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[18px] font-black text-[#1a1a1a] tracking-tight uppercase group-hover:text-black transition-colors" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.03em" }}>
                  VOLENTE
                </span>
                <span className="text-[7.5px] uppercase tracking-[0.25em] text-gray-400 mt-[2px]">Fragrance</span>
              </div>
            </Link>

            {/* ── MOBILE LOGO ── */}
            <Link to="/" className="md:hidden flex items-center gap-2 no-underline group">
              <div className="w-8 h-8 bg-black rounded-[7px] flex items-center justify-center">
                <span className="text-white text-[13px] font-black" style={{ fontFamily: "Inter, sans-serif" }}>V</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[16px] font-black text-[#1a1a1a] uppercase" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.03em" }}>VOLENTE</span>
                <span className="text-[6.5px] uppercase tracking-[0.2em] text-gray-400 mt-[1px]">Fragrance</span>
              </div>
            </Link>

            {/* ── NAV LINKS ── */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map(({ label, path }) => (
                <Link key={label} to={path} className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black no-underline transition-colors">
                  {label}
                </Link>
              ))}
            </nav>

            {/* ── RIGHT: Cart + Mobile hamburger ── */}
            <div className="flex items-center gap-3">

              {/* Cart button — shown on all screen sizes */}
              <button
                onClick={handleCartClick}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-gray-800 transition-colors shadow-md"
                aria-label="View cart"
              >
                <ShoppingBag className={`h-[18px] w-[18px] text-white ${cartBump ? "cart-bump" : ""}`} />
                {cartCount > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1
                    bg-[#c8a97e] text-white text-[9px] font-bold rounded-full
                    flex items-center justify-center leading-none
                    ${cartBump ? "cart-bump" : ""}`}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden bg-black text-white rounded-full p-2"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/30" />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-[#edf3f5] flex flex-col shadow-2xl
          transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4dde2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-[7px] flex items-center justify-center">
              <span className="text-white text-[13px] font-black" style={{ fontFamily: "Inter, sans-serif" }}>V</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-black text-[#1a1a1a] uppercase" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.03em" }}>VOLENTE</span>
              <span className="text-[6.5px] uppercase tracking-[0.2em] text-gray-400 mt-[1px]">Fragrance</span>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Drawer Nav */}
        <nav className="flex flex-col px-6 py-4 flex-1">
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="py-4 text-[12px] uppercase tracking-widest text-gray-500 border-b border-[#dde6ea] hover:text-black no-underline transition-colors"
            >
              {label}
            </Link>
          ))}

          {/* Cart link in drawer */}
          <button
            onClick={() => { setMobileOpen(false); navigate("/checkout"); }}
            className="mt-6 flex items-center gap-3 py-3 px-4 bg-black text-white rounded-xl text-[11px] uppercase tracking-widest"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            {cartCount > 0 && (
              <span className="ml-auto bg-[#c8a97e] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </>
  );
}