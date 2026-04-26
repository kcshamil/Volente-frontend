import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Check, Zap, Minus, Plus, Heart, Star, X } from "lucide-react";

const ALL_SIZES = ["30ml", "50ml", "75ml", "100ml"];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS DATA
// ─────────────────────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  // MEN
  {
    _id: "m1", name: "Oud Royale", category: "Men", price: 2499, originalPrice: 2999,
    img: "https://www.vessenceluxe.com/cdn/shop/files/freepik__perfume-bottle-placed-on-black-marble-pedestal-wit__34594.png?v=1774281176&width=493",
    description: "A bold, smoky oud with hints of sandalwood and black pepper.",
    notes: "Top: Black Pepper · Heart: Oud · Base: Sandalwood",
    tag: "Bestseller", rating: 4.8, reviews: 124,
  },
  {
    _id: "m2", name: "Noir Cedar", category: "Men", price: 2199,
    img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop",
    description: "Deep cedarwood with a fresh citrus opening, perfect for evening wear.",
    notes: "Top: Bergamot · Heart: Cedar · Base: Musk",
    tag: "New", rating: 4.5, reviews: 67,
  },
  {
    _id: "m3", name: "Amber Storm", category: "Men", price: 2799, originalPrice: 3200,
    img: "https://www.vessenceluxe.com/cdn/shop/files/freepik__perfume-bottle-placed-on-deep-blue-satin-fabric-wi__72933.png?v=1774284502&width=493",
    description: "Warm amber with spiced tobacco — powerful and long-lasting.",
    notes: "Top: Cardamom · Heart: Amber · Base: Tobacco",
    tag: "Premium", rating: 4.9, reviews: 203,
  },
  {
    _id: "m4", name: "Ocean Drift", category: "Men", price: 1999,
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&auto=format&fit=crop",
    description: "Fresh aquatic fragrance with sea salt and driftwood.",
    notes: "Top: Sea Salt · Heart: Aquatic · Base: Driftwood",
    tag: "Fresh", rating: 4.3, reviews: 88,
  },
  {
    _id: "m5", name: "Cedar Noir II", category: "Men", price: 2799,
    img: "https://www.vessenceluxe.com/cdn/shop/files/img_3_f7b70e66-7188-426d-8357-e6aa1f0c1298.png?v=1776442601&width=493",
    description: "A deeper, smokier take on cedar with amber undertones.",
    notes: "Top: Cardamom · Heart: Amber · Base: Tobacco",
    tag: "Premium", rating: 4.7, reviews: 55,
  },
  {
    _id: "m6", name: "Najrah", category: "Men", price: 1999,
    img: "https://parisbelle.in/cdn/shop/files/NAJRAH_v.jpg?v=1758966276&width=493",
    description: "A velvety oriental with warm woody notes.",
    notes: "Top: Sea Salt · Heart: Aquatic · Base: Driftwood",
    tag: "Fresh", rating: 4.4, reviews: 41,
  },

  // WOMEN
  {
    _id: "w1", name: "Velvet Rose", category: "Women", price: 3199, originalPrice: 3599,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    description: "A luxurious bouquet of damask rose with creamy musk undertones.",
    notes: "Top: Lychee · Heart: Damask Rose · Base: White Musk",
    tag: "Bestseller", rating: 4.9, reviews: 312,
  },
  {
    _id: "w2", name: "Sakura Bloom", category: "Women", price: 2699,
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQf6ib7jbgJH3Q82Ja5-oc9dbCOVYc7rCtZLu1m--nlnq7Aeb3wdrPmohwK_aGsh6SPU3tYHs9SlvCXnEzCh1b-Kcn0a5PbInSZ0sq8PWGzOT1tOYuY1h67",
    description: "Delicate cherry blossom with peach and soft vanilla.",
    notes: "Top: Peach · Heart: Cherry Blossom · Base: Vanilla",
    tag: "New", rating: 4.6, reviews: 78,
  },
  {
    _id: "w3", name: "Iris Mystique", category: "Women", price: 3499,
    img: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&auto=format&fit=crop",
    description: "Powdery iris with violet and a warm woody base.",
    notes: "Top: Violet · Heart: Iris · Base: Cashmere Wood",
    tag: "Premium", rating: 4.8, reviews: 156,
  },
  {
    _id: "w4", name: "Jasmine Dusk", category: "Women", price: 2399,
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&auto=format&fit=crop",
    description: "Intoxicating night jasmine with warm amber and patchouli.",
    notes: "Top: Bergamot · Heart: Jasmine · Base: Patchouli",
    tag: "Floral", rating: 4.5, reviews: 94,
  },
  {
    _id: "w5", name: "Dusk Edition", category: "Women", price: 2399,
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQIZgN2zQW5LgP_ESuvQZFz9LiHZGuiGIxd3YT2KuEPt5y5JDZKu-Yp1A4Av9nHk2pKhTBtPHWvvzWqxNmqylSLaqC3sEoMiH2OWO54vD8X0cxx_7yHRDq-phg",
    description: "Intoxicating night jasmine with warm amber and patchouli.",
    notes: "Top: Bergamot · Heart: Jasmine · Base: Patchouli",
    tag: "Floral", rating: 4.4, reviews: 61,
  },
  {
    _id: "w6", name: "Dusk Noir", category: "Women", price: 2399,
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSLcz9rQz1v6ggn49dvC2l2h58LNssbuqyzmgOOrD56x7bW8nYorq3QG6xX5X_-4lNhdhDATZIp9fFnO5cGABGOsPBBI2Bvx1lNjv9wxHaEX_PxKLGdrk0qBBI",
    description: "Intoxicating night jasmine with warm amber and patchouli.",
    notes: "Top: Bergamot · Heart: Jasmine · Base: Patchouli",
    tag: "Floral", rating: 4.3, reviews: 47,
  },

  // UNISEX
  {
    _id: "u1", name: "White Musk", category: "Unisex", price: 2299,
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSLcz9rQz1v6ggn49dvC2l2h58LNssbuqyzmgOOrD56x7bW8nYorq3QG6xX5X_-4lNhdhDATZIp9fFnO5cGABGOsPBBI2Bvx1lNjv9wxHaEX_PxKLGdrk0qBBI",
    description: "A clean, airy musk that blends perfectly with any skin chemistry.",
    notes: "Top: Aldehydes · Heart: White Musk · Base: Vetiver",
    tag: "Signature", rating: 4.7, reviews: 189,
  },
  {
    _id: "u2", name: "Citrus Grove", category: "Unisex", price: 1899,
    img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop",
    description: "Vibrant citrus with neroli and a green tea finish.",
    notes: "Top: Lemon · Heart: Neroli · Base: Green Tea",
    tag: "Fresh", rating: 4.5, reviews: 112,
  },
  {
    _id: "u3", name: "Santal Nude", category: "Unisex", price: 2999, originalPrice: 3399,
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQl67hL1IY62108LAycqg9anh59RbbRIso1ad6hWFVcNd_acFj7qTja9G7ggepZJ6zi7d1jKvJS0Q5YXN8whCF1JvpgXcaAAFTMgtZtiU-ugPhbE8mkcSHh-qM",
    description: "Creamy sandalwood with a hint of rose and skin-like musk.",
    notes: "Top: Pink Pepper · Heart: Rose · Base: Sandalwood",
    tag: "Bestseller", rating: 4.9, reviews: 274,
  },
  {
    _id: "u4", name: "Black Pepper Oud", category: "Unisex", price: 3299,
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQRv7k2CqHgsmpm0e_xUvkIquSblUEwFQsEZL74mhr5tbQj2NkOGCcKEYH8MAkMWNS8npd1oqJ4373V9rqJwzOXYFbdsXxcYRsCPc19CRiyNXJdn7r_iDBT9xyP",
    description: "Spicy black pepper over rich oud — a bold statement for all.",
    notes: "Top: Black Pepper · Heart: Oud · Base: Labdanum",
    tag: "Premium", rating: 4.8, reviews: 98,
  },
  {
    _id: "u5", name: "Skin", category: "Unisex", price: 3299,
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQIZgN2zQW5LgP_ESuvQZFz9LiHZGuiGIxd3YT2KuEPt5y5JDZKu-Yp1A4Av9nHk2pKhTBtPHWvvzWqxNmqylSLaqC3sEoMiH2OWO54vD8X0cxx_7yHRDq-phg",
    description: "A skin-scent that disappears into you.",
    notes: "Top: Black Pepper · Heart: Oud · Base: Labdanum",
    tag: "Premium", rating: 4.6, reviews: 73,
  },
  {
    _id: "u7", name: "Sol de Janeiro Cheirosa 71", category: "Unisex", price: 3299,
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQWgzT3BM2woTIUG3n-cUn98k7Ki77YgiqbVD_tl7_bPRemkXirrEwAJR5HrE8WuMLpW7RRPlHvyzB5D0-wRmedT4hqtEHnAWnCv8i06Wpolb6-VdeI6nPejg",
    description: "Spicy black pepper over rich oud — a bold statement for all.",
    notes: "Top: Black Pepper · Heart: Oud · Base: Labdanum",
    tag: "Premium", rating: 4.7, reviews: 145,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CART HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const CART_KEY = "volente_cart";
const getCart  = () => { try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; } };
const saveCart = (c) => { localStorage.setItem(CART_KEY, JSON.stringify(c)); window.dispatchEvent(new Event("cartUpdated")); };

export const addToCart = (product, selectedSize, qty = 1) => {
  const cart = getCart();
  const idx  = cart.findIndex((i) => i._id === product._id && i.selectedSize === selectedSize);
  if (idx >= 0) { cart[idx].qty = (cart[idx].qty || 1) + qty; }
  else { cart.push({ ...product, selectedSize, qty }); }
  saveCart(cart);
};

// ─────────────────────────────────────────────────────────────────────────────
// TAG COLOURS
// ─────────────────────────────────────────────────────────────────────────────
const TAG_STYLES = {
  Bestseller: { background: "#2c2c2c", color: "#fff" },
  New:        { background: "#1a6b4a", color: "#fff" },
  Premium:    { background: "#7a5c38", color: "#fff" },
  Fresh:      { background: "#2a6a7a", color: "#fff" },
  Floral:     { background: "#7a3a5a", color: "#fff" },
  Signature:  { background: "#4a3a6a", color: "#fff" },
  default:    { background: "#e8dfd5", color: "#7a6e65" },
};

// ─────────────────────────────────────────────────────────────────────────────
// STAR RATING  (compact)
// ─────────────────────────────────────────────────────────────────────────────
function StarRating({ rating, reviews }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1,2,3,4,5].map((s) => (
        <Star key={s} style={{
          width: 10, height: 10,
          fill: s <= Math.round(rating) ? "#c9a96e" : "transparent",
          color: s <= Math.round(rating) ? "#c9a96e" : "#d8cfc4",
        }} />
      ))}
      <span style={{ fontSize: 9, color: "#a89880", fontFamily: "Barlow, sans-serif", marginLeft: 2 }}>
        {rating} ({reviews})
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM-SHEET MODAL  — slides up from bottom, mobile-native
// ─────────────────────────────────────────────────────────────────────────────
export function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product?._preselectedSize || null);
  const [qty,          setQty]          = useState(1);
  const [added,        setAdded]        = useState(false);
  const overlayRef = useRef(null);
  const sheetRef   = useRef(null);
  const navigate   = useNavigate();
  const sizes      = product?.sizes || ALL_SIZES;

  useEffect(() => {
    setSelectedSize(product?._preselectedSize || null);
    setQty(1); setAdded(false);
    document.body.style.overflow = "hidden";
    if (overlayRef.current && sheetRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22 });
      gsap.fromTo(sheetRef.current,   { y: "100%" },  { y: "0%", duration: 0.36, ease: "power3.out" });
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18 });
    gsap.to(sheetRef.current,   { y: "100%", duration: 0.26, ease: "power3.in", onComplete: onClose });
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => { setAdded(false); handleClose(); setTimeout(() => navigate("/checkout"), 260); }, 700);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, qty);
    handleClose();
    setTimeout(() => navigate("/checkout"), 260);
  };

  if (!product) return null;

  const tagStyle = TAG_STYLES[product.tag] || TAG_STYLES.default;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "flex-end",
      }}
    >
      <div
        ref={sheetRef}
        style={{
          width: "100%",
          maxHeight: "92dvh",
          background: "#f5f0eb",
          borderRadius: "22px 22px 0 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 -12px 48px rgba(0,0,0,0.2)",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 2px", flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.14)" }} />
        </div>

        {/* Scrollable area */}
        <div style={{ overflowY: "auto", flex: 1, WebkitOverflowScrolling: "touch" }}>

          {/* Image — full-bleed */}
          <div style={{ position: "relative", height: 230, background: "#ede7df", flexShrink: 0 }}>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 40%)",
              pointerEvents: "none",
            }} />

            {/* Close */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute", top: 12, right: 12,
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(0,0,0,0.38)", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X style={{ width: 16, height: 16, color: "#fff" }} />
            </button>

            {/* Badges */}
            <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
              <span style={{
                ...tagStyle,
                fontFamily: "Barlow, sans-serif",
                fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "4px 10px", borderRadius: 999,
              }}>
                {product.tag}
              </span>
              {discount && (
                <span style={{
                  background: "#c0392b", color: "#fff",
                  fontFamily: "Barlow, sans-serif",
                  fontSize: 9, fontWeight: 700,
                  padding: "4px 10px", borderRadius: 999,
                }}>
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div style={{ padding: "18px 18px 6px", fontFamily: "Barlow, sans-serif" }}>

            {/* Name & price */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#a89880", marginBottom: 3 }}>
                  {product.category} · Eau de Parfum
                </p>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24, fontWeight: 400, color: "#1a1a1a", lineHeight: 1.15,
                }}>
                  {product.name}
                </h2>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22, fontWeight: 300, color: "#1a1a1a",
                }}>
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
                {product.originalPrice && (
                  <p style={{ fontSize: 11, color: "#b0a090", textDecoration: "line-through" }}>
                    ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>

            {product.rating && <StarRating rating={product.rating} reviews={product.reviews} />}

            {product.description && (
              <p style={{ fontSize: 13, color: "#7a6e65", lineHeight: 1.7, marginTop: 10 }}>
                {product.description}
              </p>
            )}

            {product.notes && (
              <div style={{
                marginTop: 10, background: "#ede7df",
                borderRadius: 10, padding: "10px 14px",
                borderLeft: "3px solid #c9a96e",
              }}>
                <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.22em", color: "#a89880", marginBottom: 3 }}>
                  Scent Notes
                </p>
                <p style={{ fontSize: 12, color: "#2c2c2c" }}>{product.notes}</p>
              </div>
            )}

            {/* Size */}
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#a89880", marginBottom: 10 }}>
                Size {selectedSize && <span style={{ color: "#1a1a1a", fontWeight: 600 }}>— {selectedSize}</span>}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: "11px 4px", borderRadius: 10, textAlign: "center",
                      fontSize: 12, fontFamily: "Barlow, sans-serif",
                      border: selectedSize === s ? "2px solid #2c2c2c" : "1.5px solid #d5ccc3",
                      background: selectedSize === s ? "#2c2c2c" : "#fff",
                      color: selectedSize === s ? "#fff" : "#7a6e65",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginTop: 14, marginBottom: 4 }}>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#a89880", marginBottom: 10 }}>
                Quantity
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: "1.5px solid #d5ccc3", background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  <Minus style={{ width: 14, height: 14, color: "#2c2c2c" }} />
                </button>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22, fontWeight: 300, color: "#2c2c2c", minWidth: 26, textAlign: "center",
                }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: "1.5px solid #d5ccc3", background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  <Plus style={{ width: 14, height: 14, color: "#2c2c2c" }} />
                </button>
                {qty > 1 && (
                  <span style={{ fontSize: 12, color: "#a89880" }}>
                    Total: ₹{Number(product.price * qty).toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky CTA footer ── */}
        <div style={{
          padding: "12px 16px",
          paddingBottom: "max(14px, env(safe-area-inset-bottom, 14px))",
          background: "#f5f0eb",
          borderTop: "1px solid #ede7df",
          flexShrink: 0,
        }}>
          {!selectedSize && (
            <p style={{
              textAlign: "center", fontSize: 11,
              color: "#b55", fontFamily: "Barlow, sans-serif",
              letterSpacing: "0.08em", marginBottom: 8,
            }}>
              ↑ Please select a size to continue
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              style={{
                padding: "15px 0", borderRadius: 12,
                border: "1.5px solid",
                borderColor: added ? "#1a6b4a" : (selectedSize ? "#2c2c2c" : "#d5ccc3"),
                background: added ? "#1a6b4a" : "#fff",
                color: added ? "#fff" : (selectedSize ? "#2c2c2c" : "#b0a090"),
                fontFamily: "Barlow, sans-serif",
                fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                cursor: selectedSize ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                transition: "all 0.25s",
              }}
            >
              {added
                ? <><Check style={{ width: 14, height: 14 }} /> Added</>
                : <><ShoppingCart style={{ width: 14, height: 14 }} /> Cart</>
              }
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!selectedSize}
              style={{
                padding: "15px 0", borderRadius: 12,
                border: "none",
                background: selectedSize ? "#2c2c2c" : "#e8dfd5",
                color: selectedSize ? "#fff" : "#a89880",
                fontFamily: "Barlow, sans-serif",
                fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                cursor: selectedSize ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                transition: "all 0.25s",
              }}
            >
              <Zap style={{ width: 14, height: 14 }} /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD  — compact, mobile-first 2-column
// ─────────────────────────────────────────────────────────────────────────────
function ProductCard({ product, onOpen }) {
  const [wishlisted, setWishlisted] = useState(false);
  const tagStyle = TAG_STYLES[product.tag] || TAG_STYLES.default;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <div
      onClick={() => onOpen(product)}
      style={{
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
      }}
    >
      {/* ── Image ──────────────────────────────────── */}
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#f0ece6" }}>
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Top gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%)",
          pointerEvents: "none",
        }} />

        {/* Tag + discount — stacked top-left */}
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{
            ...tagStyle,
            fontFamily: "Barlow, sans-serif",
            fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "3px 8px", borderRadius: 999, display: "inline-block",
          }}>
            {product.tag}
          </span>
          {discount && (
            <span style={{
              background: "#c0392b", color: "#fff",
              fontFamily: "Barlow, sans-serif", fontSize: 8, fontWeight: 700,
              padding: "3px 8px", borderRadius: 999, display: "inline-block",
            }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist — always visible (mobile has no hover) */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted((w) => !w); }}
          style={{
            position: "absolute", top: 8, right: 8,
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 1px 5px rgba(0,0,0,0.12)",
          }}
        >
          <Heart style={{
            width: 13, height: 13,
            color: wishlisted ? "#e74c3c" : "#7a6e65",
            fill: wishlisted ? "#e74c3c" : "transparent",
            transition: "all 0.18s",
          }} />
        </button>

        {/* Rating pill — bottom-left */}
        {product.rating && (
          <div style={{
            position: "absolute", bottom: 7, left: 7,
            background: "rgba(255,255,255,0.92)",
            borderRadius: 999, padding: "3px 7px",
            display: "flex", alignItems: "center", gap: 3,
          }}>
            <Star style={{ width: 9, height: 9, fill: "#c9a96e", color: "#c9a96e" }} />
            <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 9, color: "#2c2c2c" }}>
              {product.rating}
            </span>
          </div>
        )}
      </div>

      {/* ── Body ───────────────────────────────────── */}
      <div style={{ padding: "10px 11px 12px", display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 15, fontWeight: 400, color: "#1a1a1a", lineHeight: 1.2,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          margin: 0,
        }}>
          {product.name}
        </h3>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16, fontWeight: 300, color: "#1a1a1a",
          }}>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 10, color: "#b0a090", textDecoration: "line-through" }}>
              ₹{Number(product.originalPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Notes — trimmed to 1 line */}
        {product.notes && (
          <p style={{
            fontFamily: "Barlow, sans-serif", fontSize: 9, color: "#a89880", lineHeight: 1.4,
            overflow: "hidden", display: "-webkit-box",
            WebkitLineClamp: 1, WebkitBoxOrient: "vertical",
            margin: 0,
          }}>
            {product.notes}
          </p>
        )}

        {/* CTA — full-width, dark pill */}
        <button
          onClick={(e) => { e.stopPropagation(); onOpen(product); }}
          style={{
            marginTop: "auto",
            padding: "10px 0",
            borderRadius: 9,
            border: "none",
            background: "#2c2c2c",
            color: "#fff",
            fontFamily: "Barlow, sans-serif",
            fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            width: "100%",
          }}
        >
          <ShoppingCart style={{ width: 11, height: 11 }} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT GRID
// mobile  → 2 cols  |  tablet → 3 cols  |  desktop → 4 cols
// ─────────────────────────────────────────────────────────────────────────────
function ProductGrid({ products, bg }) {
  const [activeProduct, setActiveProduct] = useState(null);
  if (!products.length) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Barlow:wght@300;400;500&display=swap');

        .volente-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          padding: 8px 12px 40px;
        }
        @media (min-width: 580px) {
          .volente-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 10px 16px 48px; }
        }
        @media (min-width: 900px) {
          .volente-grid { grid-template-columns: repeat(4, 1fr); gap: 18px; padding: 14px 20px 60px; }
        }
        /* Touch press feedback */
        .volente-grid > div { transition: transform 0.12s ease; }
        .volente-grid > div:active { transform: scale(0.96); }
      `}</style>

      <div style={{ background: bg }}>
        <div className="volente-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onOpen={setActiveProduct} />
          ))}
        </div>
      </div>

      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────
export function MenCards()    { return <ProductGrid products={ALL_PRODUCTS.filter((p) => p.category === "Men")}    bg="#dce8e5" />; }
export function WomenCards()  { return <ProductGrid products={ALL_PRODUCTS.filter((p) => p.category === "Women")}  bg="#f0e8e4" />; }
export function UnisexCards() { return <ProductGrid products={ALL_PRODUCTS.filter((p) => p.category === "Unisex")} bg="#ede7df" />; }