import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, Send, Minus, Plus } from "lucide-react";


// ── Config ───────────────────────────────────────────────
const ADMIN_WHATSAPP = "919207388631"; // Format: 91XXXXXXXXXX
const SHOP_NAME      = "Volente";
const SHOP_ADDRESS   = "Near New Bus Stand, Manjeri";
const SHOP_PHONE     = "+91 8891163878";
const SHOP_WA        = "919207388631"; // Admin WA for customer to contact

// ── Cart helpers ─────────────────────────────────────────
const CART_KEY = "volente_cart";

const getCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

// ── Generate short order ID ───────────────────────────────
const generateOrderId = () => {
  const now = Date.now();
  return "VLT" + now.toString(36).toUpperCase().slice(-6);
};

export default function Checkout() {
  const navigate = useNavigate();
  const [cart,    setCart]    = useState(getCart);
  const [form,    setForm]    = useState({ name: "", phone: "", address: "", pincode: "" });
  const [errors,  setErrors]  = useState({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const sync = () => setCart(getCart());
    window.addEventListener("cartUpdated", sync);
    return () => window.removeEventListener("cartUpdated", sync);
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price) * (item.qty || 1), 0);

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
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()))
                              e.phone   = "Enter valid 10-digit number";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim()))
                              e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Message to ADMIN ─────────────────────────────────────
  // Includes a pre-built "Confirm Order" link admin can tap to reply to customer
  const buildAdminMessage = (orderId, itemLines) => {
    const date = new Date().toLocaleDateString("en-IN", {
      day: "2-digit", month: "2-digit", year: "numeric",
    });

    // Pre-built confirmation message admin sends to customer
    const confirmText = encodeURIComponent(
      `✅ *Order Confirmed — ${SHOP_NAME}*\n` +
      `──────────────────────────────\n` +
      `Hi ${form.name}! 🎉\n\n` +
      `Your order *#${orderId}* has been confirmed and is being prepared.\n\n` +
      `🧾 *Your Items:*\n${itemLines}\n\n` +
      `💰 *Total: Rs. ${total.toLocaleString("en-IN")}*\n` +
      `──────────────────────────────\n` +
      `📍 Delivering to:\n${form.address}, ${form.pincode}\n\n` +
      `We'll keep you updated on dispatch.\n` +
      `Thank you for shopping with *${SHOP_NAME}*! 🛍️`
    );

    const confirmLink = `https://wa.me/91${form.phone}?text=${confirmText}`;

    return encodeURIComponent(
      `🛍️ *New Order — ${SHOP_NAME}*\n` +
      `──────────────────────────────\n` +
      `🆔 Order ID: *#${orderId}*\n` +
      `📅 Date: ${date}\n` +
      `──────────────────────────────\n` +
      `👤 *Customer Details*\n\n` +
      `• Name: ${form.name}\n` +
      `• Phone: +91 ${form.phone}\n` +
      `• Address: ${form.address}\n` +
      `• Pincode: ${form.pincode}\n` +
      `──────────────────────────────\n` +
      `🧾 *Order Summary*\n\n` +
      `${itemLines}\n` +
      `──────────────────────────────\n` +
      `💰 *Total: Rs. ${total.toLocaleString("en-IN")}*\n` +
      `──────────────────────────────\n` +
      `📲 *Confirm this order to customer:*\n` +
      `${confirmLink}\n` +
      `──────────────────────────────\n` +
      `👆 Tap the link above to send confirmation to customer on WhatsApp`
    );
  };

  // ── Message to CUSTOMER (receipt) ────────────────────────
  const buildCustomerMessage = (orderId, itemLines) => {
    return encodeURIComponent(
      `🛍️ *Order Placed — ${SHOP_NAME}*\n` +
      `──────────────────────────────\n` +
      `Hi ${form.name}! Your order has been placed.\n\n` +
      `🆔 Order ID: *#${orderId}*\n` +
      `──────────────────────────────\n` +
      `🧾 *Your Items:*\n\n` +
      `${itemLines}\n` +
      `──────────────────────────────\n` +
      `💰 *Total: Rs. ${total.toLocaleString("en-IN")}*\n\n` +
      `📍 Deliver to: ${form.address}, ${form.pincode}\n` +
      `──────────────────────────────\n` +
      `Our team will confirm your order shortly.\n\n` +
      `📞 For queries: ${SHOP_PHONE}\n` +
      `🏪 ${SHOP_NAME}, ${SHOP_ADDRESS}\n` +
      `──────────────────────────────\n` +
      `Thank you for shopping with us! 🙏`
    );
  };

  // ── Place Order ───────────────────────────────────────────
  const handleOrder = () => {
    if (!validate() || cart.length === 0) return;

    setSending(true);
    const orderId = generateOrderId();

    const itemLines = cart
      .map((item) =>
        `• ${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ""} ×${item.qty || 1} = Rs.${(Number(item.price) * (item.qty || 1)).toLocaleString("en-IN")}`
      )
      .join("\n");

    // Step 1: Open WhatsApp to ADMIN
    const adminUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${buildAdminMessage(orderId, itemLines)}`;
    window.open(adminUrl, "_blank");

    // Step 2: After brief delay, open WhatsApp receipt TO CUSTOMER (self-send on their number)
    setTimeout(() => {
      const customerUrl = `https://wa.me/91${form.phone}?text=${buildCustomerMessage(orderId, itemLines)}`;
      window.open(customerUrl, "_blank");
    }, 1200);

    // Step 3: Clear cart and navigate to success
    setTimeout(() => {
      saveCart([]);
      setCart([]);
      setSending(false);
      navigate("/order-success", { state: { orderId, customerName: form.name } });
    }, 2000);
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
        <div className="mx-auto max-w-5xl">

          {/* Page title */}
          <div className="mb-12 text-center">
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-2">Almost there</p>
            <h1
              className="text-5xl font-light text-[#2c2c2c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your Order
            </h1>
          </div>

          {cart.length === 0 ? (
            /* ── Empty cart ── */
            <div className="text-center py-24 flex flex-col items-center gap-6">
              <ShoppingBag className="h-16 w-16 text-[#c5b9ae]" />
              <p className="text-[#7a6e65] text-sm tracking-wide">Your cart is empty</p>
              <button
                onClick={() => navigate("/")}
                className="rounded-full bg-[#2c2c2c] px-8 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-[#1a1a1a] transition-colors"
              >
                Continue Shopping
              </button>
            </div>

          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* ── LEFT: Cart items ── */}
              <div className="flex flex-col gap-4">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#a89880] mb-2">
                  Cart ({cart.length} item{cart.length > 1 ? "s" : ""})
                </h2>

                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-[#ede7df]"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#ede7df]">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2c2c2c] truncate">{item.name}</p>
                      {item.selectedSize && (
                        <p className="text-[10px] text-[#a89880] mt-0.5 uppercase tracking-wide">
                          {item.selectedSize}
                        </p>
                      )}
                      <p className="text-[11px] text-[#7a6e65] mt-1">
                        Rs. {Number(item.price).toLocaleString("en-IN")} each
                      </p>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => changeQty(index, -1)}
                          className="w-7 h-7 rounded-full border border-[#e0d8d0] text-[#2c2c2c] flex items-center justify-center hover:bg-[#2c2c2c] hover:text-white hover:border-[#2c2c2c] transition-all"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium text-[#2c2c2c] w-5 text-center">
                          {item.qty || 1}
                        </span>
                        <button
                          onClick={() => changeQty(index, 1)}
                          className="w-7 h-7 rounded-full border border-[#e0d8d0] text-[#2c2c2c] flex items-center justify-center hover:bg-[#2c2c2c] hover:text-white hover:border-[#2c2c2c] transition-all"
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
                        Rs. {(Number(item.price) * (item.qty || 1)).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex justify-between items-center px-5 py-4 bg-[#2c2c2c] rounded-2xl mt-2">
                  <span className="text-[11px] uppercase tracking-widest text-white/60">Total</span>
                  <span
                    className="text-2xl font-light text-white"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Rs. {total.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* How it works info box */}
                <div className="rounded-2xl border border-[#e0d8d0] bg-white p-5 flex flex-col gap-3">
                  <p className="text-[10px] uppercase tracking-widest text-[#a89880]">How it works</p>
                  <div className="flex items-start gap-3">
                    <span className="text-base mt-0.5">1️⃣</span>
                    <p className="text-[12px] text-[#7a6e65] leading-relaxed">
                      You send your order to us via WhatsApp.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-base mt-0.5">2️⃣</span>
                    <p className="text-[12px] text-[#7a6e65] leading-relaxed">
                      You also receive an order receipt on your WhatsApp number.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-base mt-0.5">3️⃣</span>
                    <p className="text-[12px] text-[#7a6e65] leading-relaxed">
                      Our team reviews and sends you a <strong className="text-[#2c2c2c]">confirmation message</strong> on WhatsApp once the order is confirmed.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Customer form ── */}
              <div className="flex flex-col gap-5">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#a89880] mb-1">
                  Delivery Details
                </h2>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#2c2c2c] outline-none placeholder-[#c5b9ae] transition-colors
                      ${errors.name ? "border-red-300 focus:border-red-400" : "border-[#e0d8d0] focus:border-[#2c2c2c]"}`}
                  />
                  {errors.name && <p className="text-[10px] text-red-400">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    WhatsApp Number
                    <span className="normal-case tracking-normal text-green-600 ml-1">(confirmation sent here)</span>
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
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                      className={`flex-1 bg-white border rounded-xl px-4 py-3 text-sm text-[#2c2c2c] outline-none placeholder-[#c5b9ae] transition-colors
                        ${errors.phone ? "border-red-300 focus:border-red-400" : "border-[#e0d8d0] focus:border-[#2c2c2c]"}`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-400">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">Delivery Address</label>
                  <textarea
                    placeholder="House no, Street, Landmark, City"
                    rows={3}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#2c2c2c] outline-none placeholder-[#c5b9ae] resize-none transition-colors
                      ${errors.address ? "border-red-300 focus:border-red-400" : "border-[#e0d8d0] focus:border-[#2c2c2c]"}`}
                  />
                  {errors.address && <p className="text-[10px] text-red-400">{errors.address}</p>}
                </div>

                {/* Pincode */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">Pincode</label>
                  <input
                    type="text"
                    placeholder="6-digit pincode"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#2c2c2c] outline-none placeholder-[#c5b9ae] transition-colors
                      ${errors.pincode ? "border-red-300 focus:border-red-400" : "border-[#e0d8d0] focus:border-[#2c2c2c]"}`}
                  />
                  {errors.pincode && <p className="text-[10px] text-red-400">{errors.pincode}</p>}
                </div>

                {/* What happens note */}
                <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-4">
                  <span className="text-xl">📲</span>
                  <div>
                    <p className="text-[12px] text-green-800 font-medium mb-1">Two WhatsApp messages will open:</p>
                    <p className="text-[11px] text-green-700 leading-relaxed">
                      <strong>1.</strong> Your order is sent to our team.<br />
                      <strong>2.</strong> Your order receipt is sent to your number.<br />
                      <strong>3.</strong> We'll WhatsApp you back to confirm! ✅
                    </p>
                  </div>
                </div>

                {/* Place Order button */}
                <button
                  onClick={handleOrder}
                  disabled={sending}
                  className={`w-full py-4 rounded-full text-[11px] uppercase tracking-widest font-medium
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${sending
                      ? "bg-green-600 text-white scale-[0.99]"
                      : "bg-[#2c2c2c] text-white hover:bg-[#1a1a1a] active:scale-[0.98]"
                    }`}
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending Order…
                    </span>
                  ) : (
                    <><Send className="h-4 w-4" /> Place Order via WhatsApp</>
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