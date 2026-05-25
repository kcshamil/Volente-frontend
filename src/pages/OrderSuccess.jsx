import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

const SHOP_NAME = "Volente";
const SHOP_PHONE = "+91 8891163878";
const SHOP_WA = "919207388631";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { order } = location.state || {};

  const orderId = order?.orderId;
  const customerName = order?.customer?.name;

  const iconRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const targets = [iconRef.current, cardRef.current].filter(Boolean);

    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { y: 28, scale: 0.97 },
      {
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      }
    );
  }, []);

  const itemLines =
    order?.items
      ?.map(
        (item) =>
          `• ${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ""} ×${item.qty || 1
          } = Rs.${Number((item.price || 0) * (item.qty || 1)).toLocaleString(
            "en-IN"
          )}`
      )
      .join("\n") || "";

  const customerReceiptUrl = order
    ? `https://wa.me/91${order.customer?.phone}?text=${encodeURIComponent(
      `Order Placed - ${SHOP_NAME}\n` +
      `------------------------------\n` +
      `Hi ${order.customer?.name || "Customer"}, your order has been placed.\n\n` +
      `Order ID: #${order.orderId}\n` +
      `------------------------------\n` +
      `Your Items:\n\n` +
      `${itemLines}\n` +
      `------------------------------\n` +
      `Total: Rs. ${Number(order.totalAmount || 0).toLocaleString("en-IN")}\n\n` +
      `Deliver to: ${order.customer?.address || ""}, ${order.customer?.city || ""
      }, ${order.customer?.district || ""} - ${order.customer?.pincode || ""
      }\n` +
      `------------------------------\n` +
      `Your order is currently Pending. Our team will confirm it shortly.\n\n` +
      `For queries: ${SHOP_PHONE}\n` +
      `Thank you for shopping with us.`
    )}`
    : "#";

  const waStatusUrl = `https://wa.me/${SHOP_WA}?text=${encodeURIComponent(
    `Hi ${SHOP_NAME}, I'd like to check the status of my order *${orderId || ""}*`
  )}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Barlow:wght@300;400;500&display=swap');

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(1.65); opacity: 0; }
        }

        .pulse-a {
          animation: pulse-ring 1.8s ease-out infinite;
        }

        .pulse-b {
          animation: pulse-ring 1.8s ease-out 0.55s infinite;
        }

        @keyframes draw-check {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }

        .check-path {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: draw-check 0.55s ease-out 0.35s forwards;
        }
      `}</style>

      <div
        className="min-h-screen bg-[#f5f0eb] flex items-center justify-center px-5 py-20"
        style={{ fontFamily: "Barlow, sans-serif" }}
      >
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          <div ref={iconRef} className="relative flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full bg-green-200 pulse-a" />
            <div className="absolute w-28 h-28 rounded-full bg-green-100 pulse-b" />

            <div className="relative z-10 w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-200">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path
                  className="check-path"
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div
            ref={cardRef}
            className="w-full bg-white rounded-3xl shadow-sm border border-[#ede7df] px-7 py-9 text-center"
          >
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#a89880] mb-2">
              Order Placed
            </p>

            <h1
              className="text-[36px] font-light text-[#2c2c2c] mb-3 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {customerName
                ? `Thank you, ${customerName.split(" ")[0]}!`
                : "Thank You!"}
            </h1>

            {orderId && (
              <div className="inline-flex items-center gap-2 bg-[#f5f0eb] rounded-full px-4 py-1.5 mb-5">
                <span className="text-[9px] uppercase tracking-widest text-[#a89880]">
                  Order ID
                </span>
                <span className="text-[13px] font-semibold text-[#2c2c2c] tracking-wide">
                  {orderId}
                </span>
              </div>
            )}

            <p className="text-[13px] text-[#7a6e65] leading-relaxed mb-6">
              Your order has been saved successfully. You can open the WhatsApp
              receipt below and contact us anytime for order updates.
            </p>

            <div className="w-10 h-px bg-[#e0d8d0] mx-auto mb-6" />

            <div className="flex flex-col gap-2.5 text-left mb-8">
              <Step
                icon="📩"
                label="Order Received"
                desc="Your order details have been saved successfully."
                done
              />
              <Step
                icon="✅"
                label="Confirmation"
                desc="Our team will confirm your order shortly."
                active
              />
              <Step
                icon="🚚"
                label="Dispatch"
                desc="Your perfume will be packed and shipped."
              />
              <Step icon="🎁" label="Delivered" desc="Enjoy your fragrance!" />
            </div>

            <div className="flex flex-col gap-3">
              {order && (
                <a
                  href={customerReceiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#2c2c2c] hover:bg-black text-white text-[11px] uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <WaIcon /> Open WhatsApp Receipt
                </a>
              )}

              <a
                href={waStatusUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-[11px] uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-all"
              >
                <WaIcon /> Check Order Status
              </a>

              <button
                onClick={() => navigate("/")}
                className="w-full py-3.5 rounded-full border border-[#2c2c2c] text-[#2c2c2c] text-[11px] uppercase tracking-widest font-medium hover:bg-[#2c2c2c] hover:text-white transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <p className="text-[11px] text-[#a89880] text-center">
            Need help? Call{" "}
            <a
              href={`tel:${SHOP_PHONE}`}
              className="text-[#2c2c2c] font-medium hover:underline"
            >
              {SHOP_PHONE}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

function Step({ icon, label, desc, done = false, active = false }) {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl ${done
        ? "bg-green-50 border border-green-100"
        : active
          ? "bg-[#f5f0eb] border border-[#e0d8d0]"
          : "opacity-50"
        }`}
    >
      <span className="text-base mt-0.5 shrink-0">{icon}</span>

      <div>
        <p
          className={`text-[12px] font-medium ${done
            ? "text-green-700"
            : active
              ? "text-[#2c2c2c]"
              : "text-[#a89880]"
            }`}
        >
          {label}

          {done && (
            <span className="ml-2 text-[9px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Done
            </span>
          )}

          {active && (
            <span className="ml-2 text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Pending
            </span>
          )}
        </p>

        <p className="text-[11px] text-[#a89880] mt-0.5 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 32 32">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.494 2.027 7.808L.057 31.428a.75.75 0 0 0 .916.916l7.62-2.013A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.207 20.157c-.395-.198-2.338-1.152-2.7-1.284-.36-.13-.624-.198-.887.198-.263.395-1.02 1.284-1.25 1.547-.23.263-.46.296-.856.099-.395-.198-1.668-.615-3.176-1.96-1.174-1.047-1.966-2.34-2.197-2.735-.23-.395-.025-.609.173-.806.177-.177.395-.46.593-.69.198-.23.263-.395.395-.66.131-.263.066-.494-.033-.69-.099-.198-.887-2.143-1.216-2.932-.32-.769-.647-.665-.887-.677-.23-.01-.494-.013-.757-.013-.264 0-.69.099-1.052.494-.362.395-1.382 1.35-1.382 3.294 0 1.943 1.415 3.822 1.612 4.085.198.263 2.785 4.252 6.748 5.963.943.407 1.678.65 2.252.831.946.302 1.807.26 2.487.158.759-.113 2.338-.956 2.667-1.878.329-.921.329-1.71.23-1.877-.099-.164-.362-.263-.757-.46z" />
    </svg>
  );
}