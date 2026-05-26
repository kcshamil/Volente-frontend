import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShoppingCart,
  Check,
  Zap,
  Minus,
  Plus,
  Heart,
  Star,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const ALL_SIZES = ["8ml", "50ml", "100ml"];
const CART_KEY = "volente_cart";

const FALLBACK_PERFUMES = [
  {
    _id: "fb-men-1",
    name: "Layam Edition",
    category: "Men",
    tag: "Premium",
    price: 2499,
    originalPrice: 2999,
    img: "/V3.jpeg",
    notes: "Oud · Cedar · Sandalwood",
    description: "A bold, intense woody composition with rich amber and spices. Designed for timeless presence.",
    rating: 4.8,
    reviews: 24
  },
  {
    _id: "fb-men-2",
    name: "Premium Dark Set",
    category: "Men",
    tag: "Bestseller",
    price: 1499,
    originalPrice: 1999,
    img: "/Lp8ml2.jpeg",
    notes: "Pepper · Cardamom · Amber",
    description: "Our signature dark 8ml collection featuring bold spices and deep earthy accents.",
    rating: 4.9,
    reviews: 42
  },
  {
    _id: "fb-unisex-1",
    name: "Luxury 8ml Set",
    category: "Unisex",
    tag: "Bestseller",
    price: 1299,
    originalPrice: 1599,
    img: "/Lp8ml.jpeg",
    notes: "Musk · Aldehydes · Vetiver",
    description: "A complete collection of elegant unisex blends for every mood and occasion.",
    rating: 4.7,
    reviews: 56
  },
  {
    _id: "fb-women-1",
    name: "Rose & Jasmine",
    category: "Women",
    tag: "Floral",
    price: 1799,
    originalPrice: 2199,
    img: "/Lp8ml.jpeg",
    notes: "Rose · Jasmine · Sweet Vanilla",
    description: "A soft, floral bouquet of fresh roses and jasmine with a touch of sweet vanilla.",
    rating: 4.8,
    reviews: 31
  },
  {
    _id: "fb-women-2",
    name: "Volonté Mist",
    category: "Women",
    tag: "Fresh",
    price: 1599,
    originalPrice: 1899,
    img: "/Lp8ml2.jpeg",
    notes: "Iris · Violet · Cashmere",
    description: "An elegant signature blend of fresh citrus, lavender, and sensual musk.",
    rating: 4.6,
    reviews: 18
  },
  {
    _id: "fb-unisex-2",
    name: "Signature Oud",
    category: "Unisex",
    tag: "Signature",
    price: 1899,
    originalPrice: 2499,
    img: "/V3.jpeg",
    notes: "Sandalwood · Oud · Labdanum",
    description: "Deep, mysterious wood notes paired with rich, dry incense oils.",
    rating: 4.9,
    reviews: 29
  }
];

function usePerfumes() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const res = await axios.get(`${API_URL}/perfumes`);
        const list = res.data?.data || res.data;
        if (Array.isArray(list) && list.length > 0) {
          setPerfumes(list);
        } else {
          setPerfumes(FALLBACK_PERFUMES);
        }
      } catch (err) {
        console.error("Error fetching perfumes, using fallbacks:", err);
        setPerfumes(FALLBACK_PERFUMES);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfumes();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        try {
          gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.refresh();
        } catch (e) {
          console.warn("GSAP ScrollTrigger refresh failed:", e);
        }
      }, 500);
    }
  }, [loading]);

  return { perfumes, loading };
}

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product, selectedSize, qty = 1) => {
  const cart = getCart();

  const index = cart.findIndex(
    (item) => item._id === product._id && item.selectedSize === selectedSize
  );

  if (index >= 0) {
    cart[index].qty = (cart[index].qty || 1) + qty;
  } else {
    cart.push({ ...product, selectedSize, qty });
  }

  saveCart(cart);
};

const TAG_STYLES = {
  Bestseller: { background: "#2c2c2c", color: "#fff" },
  New: { background: "#1a6b4a", color: "#fff" },
  Premium: { background: "#7a5c38", color: "#fff" },
  Fresh: { background: "#2a6a7a", color: "#fff" },
  Floral: { background: "#7a3a5a", color: "#fff" },
  Signature: { background: "#4a3a6a", color: "#fff" },
  default: { background: "#e8dfd5", color: "#7a6e65" },
};

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={11}
          fill={star <= Math.round(rating) ? "#c9a96e" : "transparent"}
          color={star <= Math.round(rating) ? "#c9a96e" : "#d8cfc4"}
        />
      ))}
      <span className="text-[10px] text-[#a89880] ml-1">
        {rating} ({reviews || 0})
      </span>
    </div>
  );
}

export function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  const sizes = product?.sizes || ALL_SIZES;

  useEffect(() => {
    setSelectedSize(product?._preselectedSize || null);
    setQty(1);
    setAdded(false);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addToCart(product, selectedSize, qty);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      onClose();
      navigate("/checkout");
    }, 500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;

    addToCart(product, selectedSize, qty);
    onClose();
    navigate("/checkout");
  };

  const tagStyle = TAG_STYLES[product.tag] || TAG_STYLES.default;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-[430px] h-[78vh] bg-[#f5f0eb] rounded-[22px] shadow-2xl overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
        >
          <X size={15} className="text-white" />
        </button>

        <div className="overflow-y-auto flex-1 min-h-0">
          <div className="relative h-[160px] bg-[#ede7df] flex items-center justify-center">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-contain"
            />

            {product.tag && (
              <span
                style={tagStyle}
                className="absolute top-3 left-3 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full"
              >
                {product.tag}
              </span>
            )}
          </div>

          <div className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-[#a89880] mb-1">
              {product.category} · Eau de Parfum
            </p>

            <div className="flex justify-between gap-3 mb-2">
              <h2
                className="text-2xl font-light text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {product.name}
              </h2>

              <p
                className="text-xl font-light text-[#1a1a1a] shrink-0"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>
            </div>

            {product.rating && (
              <StarRating rating={product.rating} reviews={product.reviews} />
            )}

            {product.description && (
              <p className="text-xs text-[#7a6e65] leading-relaxed mt-2">
                {product.description}
              </p>
            )}

            <div className="h-px bg-[#ede7df] my-4" />

            <p className="text-[10px] uppercase tracking-widest text-[#a89880] mb-2">
              Size{" "}
              {selectedSize && (
                <span className="text-[#2c2c2c]">— {selectedSize}</span>
              )}
            </p>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-xl text-xs border ${selectedSize === size
                    ? "bg-[#2c2c2c] text-white border-[#2c2c2c]"
                    : "bg-white text-[#7a6e65] border-[#d5ccc3]"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <p className="text-[10px] uppercase tracking-widest text-[#a89880] mb-2">
              Quantity
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border bg-white flex items-center justify-center"
              >
                <Minus size={14} />
              </button>

              <span className="text-lg text-[#2c2c2c]">{qty}</span>

              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 rounded-full border bg-white flex items-center justify-center"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-[#ede7df] bg-[#f5f0eb] p-3">
          {!selectedSize && (
            <p className="text-center text-[10px] text-red-500 mb-2">
              Please select a size to continue
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border ${selectedSize
                ? "bg-white text-[#2c2c2c] border-[#2c2c2c]"
                : "bg-white text-[#b0a090] border-[#d5ccc3]"
                }`}
            >
              {added ? <Check size={14} /> : <ShoppingCart size={14} />}
              {added ? "Added" : "Cart"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!selectedSize}
              className={`py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${selectedSize
                ? "bg-[#2c2c2c] text-white"
                : "bg-[#e8dfd5] text-[#a89880]"
                }`}
            >
              <Zap size={14} /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ProductCard({ product, onOpen }) {
  const [wishlisted, setWishlisted] = useState(false);

  const tagStyle = TAG_STYLES[product.tag] || TAG_STYLES.default;

  const hasOriginalPrice =
    Number(product.originalPrice) > Number(product.price);

  const discount = hasOriginalPrice
    ? Math.round(
        (1 - Number(product.price) / Number(product.originalPrice)) * 100
      )
    : null;

  return (
    <div
      onClick={() => onOpen(product)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col max-w-[210px] md:max-w-[250px] mx-auto"
    >
      <div className="relative h-[200px] md:h-[260px] overflow-hidden bg-[#f0ece6]">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Top Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.tag && (
            <span
              style={tagStyle}
              className="text-[7px] md:text-[8px] uppercase tracking-widest px-2 py-1 rounded-full"
            >
              {product.tag}
            </span>
          )}

          {discount > 0 && (
            <span className="bg-red-600 text-white text-[7px] md:text-[8px] px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((prev) => !prev);
          }}
          className="absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
        >
          <Heart
            size={14}
            color={wishlisted ? "#e74c3c" : "#7a6e65"}
            fill={wishlisted ? "#e74c3c" : "transparent"}
          />
        </button>

        {/* Rating */}
        {product.rating && (
          <div className="absolute bottom-2 left-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star size={10} fill="#c9a96e" color="#c9a96e" />
            <span className="text-[8px] md:text-[9px] text-[#2c2c2c]">
              {product.rating}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 md:p-3 flex flex-col gap-1 flex-1">
        <h3
          className="text-[14px] md:text-[16px] text-[#1a1a1a] leading-tight line-clamp-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span
            className="text-[15px] md:text-[17px] text-[#1a1a1a]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

          {hasOriginalPrice && (
            <span className="text-[9px] md:text-[10px] text-[#b0a090] line-through">
              ₹{Number(product.originalPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Notes */}
        {product.notes && (
          <p className="text-[8px] md:text-[9px] text-[#a89880] line-clamp-1">
            {product.notes}
          </p>
        )}

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen(product);
          }}
          className="mt-2 w-full bg-[#2c2c2c] text-white py-2 md:py-2.5 rounded-lg text-[8px] md:text-[9px] uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-black transition-all"
        >
          <ShoppingCart size={11} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductGrid({ products, bg }) {
  const [activeProduct, setActiveProduct] = useState(null);

  if (!products.length) {
    return (
      <div style={{ background: bg }} className="py-14 px-5 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white/70 dark:bg-black/45 backdrop-blur-md rounded-[24px] border border-[#ede7df] dark:border-[#242424] p-8 text-center shadow-md">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#a89880] mb-2 block font-medium">Coming Soon</span>
          <h3 
            className="text-2xl font-light text-[#2c2c2c] dark:text-[#f5f0eb] mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Curating Elegance
          </h3>
          <p className="text-xs text-[#7a6e65] dark:text-[#a89880] leading-relaxed max-w-sm mx-auto">
            Our master perfumers are currently aging and blending a signature selection of fragrances for this selection. Subscribe below to be notified first of the release.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: bg }}>
        <div className="volente-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onOpen={setActiveProduct}
            />
          ))}
        </div>
      </div>

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse max-w-[210px] mx-auto">
      <div className="h-[200px] bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded-lg w-full mt-3" />
      </div>
    </div>
  );
}

function SkeletonGrid({ bg }) {
  return (
    <div style={{ background: bg }} className="volente-grid">
      {[1, 2, 3, 4].map((item) => (
        <ProductSkeleton key={item} />
      ))}
    </div>
  );
}

export function MenCards() {
  const { perfumes, loading } = usePerfumes();

  if (loading) return <SkeletonGrid bg="#dce8e5" />;

  return (
    <ProductGrid
      products={perfumes.filter((p) => p.category === "Men")}
      bg="#dce8e5"
    />
  );
}

export function WomenCards() {
  const { perfumes, loading } = usePerfumes();

  if (loading) return <SkeletonGrid bg="#f0e8e4" />;

  return (
    <ProductGrid
      products={perfumes.filter((p) => p.category === "Women")}
      bg="#f0e8e4"
    />
  );
}

export function UnisexCards() {
  const { perfumes, loading } = usePerfumes();

  if (loading) return <SkeletonGrid bg="#ede7df" />;

  return (
    <ProductGrid
      products={perfumes.filter((p) => p.category === "Unisex")}
      bg="#ede7df"
    />
  );
}