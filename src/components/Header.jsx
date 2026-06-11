import { Menu, X, ShoppingBag, PackageSearch } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CART_KEY = "volente_cart";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Men", path: "/men" },
  { label: "Women", path: "/women" },
  { label: "Unisex", path: "/unisex" },
  {
    label: (
      <span className="flex items-center gap-1">
        <PackageSearch size={14} />
        My Orders
      </span>
    ),
    path: "/my-orders",
  },
  { label: "Contact Us", path: "/contact" },
];

const getCartCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  } catch {
    return 0;
  }
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount);
  const [cartBump, setCartBump] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("volente_theme") || "light";
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("volente_theme", theme);
    // Dispatch custom event to notify other components of the theme change
    window.dispatchEvent(new CustomEvent("volenteThemeChanged", { detail: theme }));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const sync = () => {
      const newCount = getCartCount();

      if (newCount > cartCount) {
        setCartBump(true);
        setTimeout(() => setCartBump(false), 400);
      }

      setCartCount(newCount);
    };

    window.addEventListener("cartUpdated", sync);

    return () => window.removeEventListener("cartUpdated", sync);
  }, [cartCount]);

  const handleCartClick = () => {
    navigate("/checkout");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Inter:wght@700;900&display=swap');

        @keyframes cart-bump {
          0% { transform: scale(1); }
          40% { transform: scale(1.35); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        .cart-bump {
          animation: cart-bump 0.4s ease;
        }
      `}</style>

      <div
        className="w-full bg-[#dfe7eb] px-4 md:px-6 pt-7 pb-3"
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <div className="mx-auto max-w-6xl rounded-[30px] bg-[#edf3f5] p-3">
          <div className="relative flex items-center justify-between rounded-[24px] bg-[#dfe9ed] px-4 md:px-9 py-[18px]">
            <Link
              to="/"
              className="hidden md:flex items-center gap-3 no-underline group"
            >
              <div className="w-9 h-9 bg-black rounded-[8px] flex items-center justify-center shadow-md group-hover:bg-gray-800 transition-colors">
                <span
                  className="text-[17px] font-light leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#c9a96e"
                  }}
                >
                  V
                </span>
              </div>

              <div className="flex flex-col leading-none">
                <span
                  className="text-[18px] font-light text-[#1a1a1a] uppercase group-hover:text-black transition-colors"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "0.24em",
                  }}
                >
                  VOLONTÉ
                </span>

                <span 
                  className="text-[7.5px] uppercase tracking-[0.25em] mt-[2px] font-semibold"
                  style={{ color: "#c9a96e" }}
                >
                  Fragrance
                </span>
              </div>
            </Link>

            <Link
              to="/"
              className="md:hidden flex items-center gap-2 no-underline group"
            >
              <div className="w-8 h-8 bg-black rounded-[7px] flex items-center justify-center">
                <span
                  className="text-[15px] font-light"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#c9a96e"
                  }}
                >
                  V
                </span>
              </div>

              <div className="flex flex-col leading-none">
                <span
                  className="text-[16px] font-light text-[#1a1a1a] uppercase"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "0.22em",
                  }}
                >
                  VOLONTÉ
                </span>

                <span 
                  className="text-[6.5px] uppercase tracking-[0.2em] mt-[1px] font-semibold"
                  style={{ color: "#c9a96e" }}
                >
                  Fragrance
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex gap-6 lg:gap-8">
              {navLinks.map(({ label, path }, index) => (
                <Link
                  key={index}
                  to={path}
                  className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black no-underline transition-colors flex items-center gap-1"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] text-[#2c2c2c] dark:text-[#f5f0eb] border border-[#ede7df] dark:border-[#2c2c2c] hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors shadow-sm"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                onClick={handleCartClick}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-gray-800 transition-colors shadow-md"
                aria-label="View cart"
              >
                <ShoppingBag
                  className={`h-[18px] w-[18px] text-white ${
                    cartBump ? "cart-bump" : ""
                  }`}
                />

                {cartCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#c8a97e] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none ${
                      cartBump ? "cart-bump" : ""
                    }`}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden bg-black text-white rounded-full p-2"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-[#edf3f5] flex flex-col shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4dde2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-[7px] flex items-center justify-center">
              <span
                className="text-[15px] font-light"
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#c9a96e"
                }}
              >
                V
              </span>
            </div>

            <div className="flex flex-col leading-none">
              <span
                className="text-[15px] font-light text-[#1a1a1a] uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: "0.2em",
                }}
              >
                VOLONTÉ
              </span>

              <span 
                className="text-[6.5px] uppercase tracking-[0.2em] mt-[1px] font-semibold"
                style={{ color: "#c9a96e" }}
              >
                Fragrance
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button in Mobile Drawer */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-[#1a1a1a] text-[#2c2c2c] dark:text-[#f5f0eb] border border-[#ede7df] dark:border-[#2c2c2c] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <nav className="flex flex-col px-6 py-4 flex-1">
          {navLinks.map(({ label, path }, index) => (
            <Link
              key={index}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="py-4 text-[12px] uppercase tracking-widest text-gray-500 border-b border-[#dde6ea] hover:text-black no-underline transition-colors flex items-center gap-2"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => {
              setMobileOpen(false);
              navigate("/checkout");
            }}
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