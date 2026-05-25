import { useState } from "react";
import axios from "axios";
import { Package, Search, ShoppingBag } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function MyOrders() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!/^\d{10}$/.test(phone)) {
      alert("Enter valid 10-digit WhatsApp number");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      const res = await axios.get(`${API_URL}/orders/customer/${phone}`);
      setOrders(res.data?.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const statusClass = (status) => {
    if (status === "Pending") return "bg-orange-100 text-orange-600";
    if (status === "Confirmed") return "bg-blue-100 text-blue-600";
    if (status === "Cancelled") return "bg-red-100 text-red-600";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] px-5 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[9px] uppercase tracking-[0.35em] text-[#a89880] mb-2">
            Track Your Orders
          </p>
          <h1
            className="text-4xl font-light text-[#2c2c2c]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            My Orders
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-5 md:p-7 shadow-sm border border-[#ede7df] mb-8">
          <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
            WhatsApp Number
          </label>

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <div className="flex">
              <span className="bg-[#f5f0eb] border border-[#ede7df] rounded-l-xl px-4 py-3 text-sm text-[#7a6e65]">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 10-digit number"
                className="w-full border border-[#ede7df] rounded-r-xl px-4 py-3 text-sm outline-none"
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#2c2c2c] text-white px-6 py-3 rounded-xl text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Search size={14} />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {searched && orders.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#ede7df]">
            <ShoppingBag className="mx-auto mb-4 text-[#a89880]" size={42} />
            <p className="text-[#a89880]">No orders found for this number.</p>
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-[#ede7df] shadow-sm overflow-hidden"
            >
              <div className="p-5 border-b border-[#ede7df] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#fcfaf8]">
                <div>
                  <p className="text-sm font-medium text-[#2c2c2c]">
                    Order #{order.orderId}
                  </p>
                  <p className="text-xs text-[#a89880] mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <span
                  className={`w-fit px-3 py-1 rounded-full text-[10px] uppercase tracking-widest ${statusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="p-5">
                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-[#f5f0eb] rounded-lg flex items-center justify-center text-[#a89880]">
                          <Package size={16} />
                        </div>

                        <div>
                          <p className="font-medium text-[#2c2c2c]">
                            {item.name}{" "}
                            {item.selectedSize ? `(${item.selectedSize})` : ""}
                          </p>
                          <p className="text-xs text-[#a89880]">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>

                      <p className="font-medium text-[#2c2c2c]">
                        ₹
                        {Number(
                          (item.price || 0) * (item.qty || 1)
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-[#ede7df] flex justify-between">
                  <p className="font-medium text-[#2c2c2c]">Total</p>
                  <p className="text-lg text-[#2c2c2c]">
                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#ede7df]">
                  <p className="text-[10px] uppercase tracking-widest text-[#a89880] mb-3">
                    Delivery Details
                  </p>

                  <div className="space-y-2 text-sm">
                    <p className="text-[#2c2c2c]">
                      <strong>Name:</strong> {order.customer?.name || "N/A"}
                    </p>

                    <p className="text-[#2c2c2c]">
                      <strong>Phone:</strong> +91 {order.customer?.phone || "N/A"}
                    </p>

                    <p className="text-[#2c2c2c] leading-relaxed">
                      <strong>Address:</strong> {order.customer?.address || "N/A"}
                    </p>

                    <p className="text-[#2c2c2c]">
                      <strong>Location:</strong>{" "}
                      {order.customer?.city || "N/A"}
                      {order.customer?.district
                        ? `, ${order.customer.district}`
                        : ""}
                    </p>

                    <p className="text-[#2c2c2c]">
                      <strong>Pincode:</strong>{" "}
                      {order.customer?.pincode || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}