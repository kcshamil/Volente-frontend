import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, Send, Minus, Plus } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const CART_KEY = "volente_cart";

const KERALA_DISTRICTS = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

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

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const sync = () => setCart(getCart());
    window.addEventListener("cartUpdated", sync);
    return () => window.removeEventListener("cartUpdated", sync);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    saveCart(updated);
    setCart(updated);
  };

  const changeQty = (index, delta) => {
    const updated = cart.map((item, i) => {
      if (i !== index) return item;
      return { ...item, qty: Math.max(1, (item.qty || 1) + delta) };
    });

    saveCart(updated);
    setCart(updated);
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";

    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim())) {
      e.phone = "Enter valid 10-digit number";
    }

    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.district.trim()) e.district = "District is required";

    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim())) {
      e.pincode = "Enter valid 6-digit pincode";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = async () => {
    if (!validate() || cart.length === 0) return;

    setSending(true);

    try {
      const orderData = {
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          district: form.district.trim(),
          pincode: form.pincode.trim(),
        },
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          selectedSize: item.selectedSize,
          price: Number(item.price),
          qty: item.qty || 1,
        })),
        totalAmount: total,
      };

      const res = await axios.post(`${API_URL}/orders`, orderData);
      const savedOrder = res.data?.data;

      if (!savedOrder?.orderId) {
        alert("Order saved, but order ID not received.");
        return;
      }

      saveCart([]);
      setCart([]);

      navigate("/order-success", {
        state: { order: savedOrder },
      });
    } catch (err) {
      console.error("Failed to place order:", err);
      alert(
        err.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Barlow:wght@300;400;500&display=swap');
      `}</style>

      <div
        className="min-h-screen bg-[#f5f0eb] px-4 md:px-10 py-16"
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-2">
              Almost there
            </p>

            <h1
              className="text-5xl font-light text-[#2c2c2c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your Order
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center gap-6">
              <ShoppingBag className="h-16 w-16 text-[#c5b9ae]" />

              <p className="text-[#7a6e65] text-sm tracking-wide">
                Your cart is empty
              </p>

              <button
                onClick={() => navigate("/")}
                className="rounded-full bg-[#2c2c2c] px-8 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-[#1a1a1a] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="flex flex-col gap-4">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#a89880] mb-2">
                  Cart ({cart.length} item{cart.length > 1 ? "s" : ""})
                </h2>

                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-[#ede7df]"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#ede7df]">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2c2c2c] truncate">
                        {item.name}
                      </p>

                      {item.selectedSize && (
                        <p className="text-[10px] text-[#a89880] mt-0.5 uppercase tracking-wide">
                          {item.selectedSize}
                        </p>
                      )}

                      <p className="text-[11px] text-[#7a6e65] mt-1">
                        Rs. {Number(item.price).toLocaleString("en-IN")} each
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => changeQty(index, -1)}
                          className="w-7 h-7 rounded-full border border-[#e0d8d0] text-[#2c2c2c] flex items-center justify-center hover:bg-[#2c2c2c] hover:text-white transition-all"
                        >
                          <Minus className="h-3 w-3" />
                        </button>

                        <span className="text-sm font-medium text-[#2c2c2c] w-5 text-center">
                          {item.qty || 1}
                        </span>

                        <button
                          onClick={() => changeQty(index, 1)}
                          className="w-7 h-7 rounded-full border border-[#e0d8d0] text-[#2c2c2c] flex items-center justify-center hover:bg-[#2c2c2c] hover:text-white transition-all"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-[#c5b9ae] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <p className="text-sm font-medium text-[#2c2c2c]">
                        Rs.{" "}
                        {(
                          Number(item.price) * (item.qty || 1)
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center px-5 py-4 bg-[#2c2c2c] rounded-2xl mt-2">
                  <span className="text-[11px] uppercase tracking-widest text-white/60">
                    Total
                  </span>

                  <span
                    className="text-2xl font-light text-white"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Rs. {total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-5 bg-white/40 rounded-3xl p-5 md:p-6 border border-[#ede7df]">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#a89880]">
                  Delivery Details
                </h2>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Full Name <span className="text-red-400">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none placeholder-[#c5b9ae] ${
                      errors.name
                        ? "border-red-300"
                        : "border-[#e0d8d0] focus:border-[#2c2c2c]"
                    }`}
                  />

                  {errors.name && (
                    <p className="text-[10px] text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    WhatsApp Number <span className="text-red-400">*</span>
                    <span className="normal-case tracking-normal text-green-600 ml-1">
                      (updates sent here)
                    </span>
                  </label>

                  <div className="flex gap-2">
                    <div className="flex items-center bg-white border border-[#e0d8d0] rounded-xl px-3 text-sm text-[#7a6e65] shrink-0">
                      +91
                    </div>

                    <input
                      type="tel"
                      placeholder="10-digit WhatsApp number"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className={`flex-1 bg-white border rounded-xl px-4 py-3 text-sm outline-none placeholder-[#c5b9ae] ${
                        errors.phone
                          ? "border-red-300"
                          : "border-[#e0d8d0] focus:border-[#2c2c2c]"
                      }`}
                    />
                  </div>

                  {errors.phone && (
                    <p className="text-[10px] text-red-400">{errors.phone}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Delivery Address <span className="text-red-400">*</span>
                  </label>

                  <textarea
                    placeholder="House no, Street, Landmark"
                    rows={3}
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none placeholder-[#c5b9ae] resize-none ${
                      errors.address
                        ? "border-red-300"
                        : "border-[#e0d8d0] focus:border-[#2c2c2c]"
                    }`}
                  />

                  {errors.address && (
                    <p className="text-[10px] text-red-400">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                      City <span className="text-red-400">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none placeholder-[#c5b9ae] ${
                        errors.city
                          ? "border-red-300"
                          : "border-[#e0d8d0] focus:border-[#2c2c2c]"
                      }`}
                    />

                    {errors.city && (
                      <p className="text-[10px] text-red-400">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                      District <span className="text-red-400">*</span>
                    </label>

                    <select
                      value={form.district}
                      onChange={(e) =>
                        setForm({ ...form, district: e.target.value })
                      }
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none ${
                        form.district ? "text-[#2c2c2c]" : "text-[#a89880]"
                      } ${
                        errors.district
                          ? "border-red-300"
                          : "border-[#e0d8d0] focus:border-[#2c2c2c]"
                      }`}
                    >
                      <option value="">Select district</option>
                      {KERALA_DISTRICTS.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>

                    {errors.district && (
                      <p className="text-[10px] text-red-400">
                        {errors.district}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Pincode <span className="text-red-400">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="6-digit pincode"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pincode: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none placeholder-[#c5b9ae] ${
                      errors.pincode
                        ? "border-red-300"
                        : "border-[#e0d8d0] focus:border-[#2c2c2c]"
                    }`}
                  />

                  {errors.pincode && (
                    <p className="text-[10px] text-red-400">
                      {errors.pincode}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-4">
                  <span className="text-xl">✓</span>

                  <div>
                    <p className="text-[12px] text-green-800 font-medium mb-1">
                      Order confirmation process
                    </p>

                    <p className="text-[11px] text-green-700 leading-relaxed">
                      <strong>1.</strong> Your order will be saved as Pending.
                      <br />
                      <strong>2.</strong> Our team will verify product
                      availability and delivery details.
                      <br />
                      <strong>3.</strong> Once confirmed, you will receive a
                      WhatsApp update.
                      <br />
                      <strong>4.</strong> Track your order anytime from My
                      Orders.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={sending}
                  className={`w-full py-4 rounded-full text-[11px] uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    sending
                      ? "bg-green-600 text-white scale-[0.99]"
                      : "bg-[#2c2c2c] text-white hover:bg-[#1a1a1a] active:scale-[0.98]"
                  }`}
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Placing Order...
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}