import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Package,
  ShoppingBag,
  LogOut,
  ExternalLink,
  Image,
  MessageSquare,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthConfig = () => {
    const token = localStorage.getItem("adminToken");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin");
        return;
      }

      const res = await axios.get(`${API_URL}/orders`, getAuthConfig());
      setOrders(res.data?.data || []);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/orders/${id}/status`,
        { status },
        getAuthConfig()
      );

      fetchOrders();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const sendWhatsAppUpdate = (order) => {
    const phone = order.customer?.phone;

    if (!phone) {
      alert("Customer phone number not found");
      return;
    }

    const message = `
        Hello ${order.customer?.name || "Customer"},

        Your Volente order has been updated.

        [ORDER ID] ${order.orderId}
        [STATUS] ${order.status}
        [TOTAL] Rs.${Number(order.totalAmount || 0).toLocaleString("en-IN")}

        You can track your order anytime from My Orders.

        Thank you for shopping with Volente.

        - Team Volente
`;

    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#2c2c2c] text-white p-6 flex flex-col">
        <h2
          className="text-2xl font-light mb-10 text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Volente Admin
        </h2>

        <nav className="flex-1 space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm transition-colors"
          >
            <Package size={18} /> Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm transition-colors"
          >
            <Package size={18} /> Manage Products
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-3 bg-white/10 rounded-xl text-sm"
          >
            <ShoppingBag size={18} /> All Orders
          </Link>
          <Link
            to="/admin/reviews"
            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm transition-colors"
          >
            <MessageSquare size={18} /> Manage Reviews
          </Link>
          <Link
            to="/admin/site-content"
            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm transition-colors"
          >
            <Image size={18} /> Site Images
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl text-sm transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-5 md:p-10 overflow-y-auto min-w-0">
        <header className="mb-10">
          <h1
            className="text-4xl font-light text-[#2c2c2c]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            All Orders
          </h1>

          <p className="text-xs uppercase tracking-[0.2em] text-[#a89880]">
            Order History & Management
          </p>
        </header>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-sm border border-[#ede7df] overflow-hidden"
            >
              <div className="p-5 md:p-6 bg-[#fcfaf8] border-b border-[#ede7df] flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div className="flex items-center gap-4 flex-wrap min-w-0">
                  <span className="text-sm font-medium text-[#2c2c2c] break-words">
                    Order #{order.orderId || "N/A"}
                  </span>

                  <span className="text-xs text-[#a89880]">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest ${order.status === "Pending"
                      ? "bg-orange-100 text-orange-600"
                      : order.status === "Confirmed"
                        ? "bg-blue-100 text-blue-600"
                        : order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <select
                    value={order.status || "Pending"}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="bg-white border border-[#ede7df] rounded-xl px-3 py-2 text-xs outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href={`https://wa.me/91${order.customer?.phone || ""}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-green-600 hover:underline"
                    >
                      <ExternalLink size={14} />
                      Contact Customer
                    </a>

                    <button
                      onClick={() => sendWhatsAppUpdate(order)}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      <ExternalLink size={14} />
                      Send WhatsApp Update
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 min-w-0">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#a89880] mb-4">
                    Items
                  </h4>

                  <div className="space-y-4">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 bg-[#f5f0eb] rounded-lg overflow-hidden shrink-0">
                            <div className="w-full h-full flex items-center justify-center text-[#a89880]">
                              <Package size={16} />
                            </div>
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-[#2c2c2c] break-words">
                              {item.name || "Product"}{" "}
                              {item.selectedSize ? `(${item.selectedSize})` : ""}
                            </p>

                            <p className="text-xs text-[#a89880]">
                              Qty: {item.qty || 1}
                            </p>
                          </div>
                        </div>

                        <p className="font-medium text-[#2c2c2c] shrink-0">
                          ₹
                          {Number(
                            (item.price || 0) * (item.qty || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-[#ede7df] flex justify-between items-center gap-4">
                      <p className="font-medium text-[#2c2c2c]">
                        Total Amount
                      </p>

                      <p className="text-lg font-light text-[#2c2c2c] shrink-0">
                        ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-[#a89880] uppercase">
                    Address
                  </p>

                  <p className="text-[#2c2c2c] leading-relaxed break-words whitespace-normal">
                    {order.customer?.address || "N/A"}
                  </p>

                  <p className="text-[#2c2c2c] break-words mt-2">
                    {order.customer?.city || "N/A"}
                    {order.customer?.district ? `, ${order.customer.district}` : ""}
                  </p>

                  <p className="text-[#2c2c2c] break-words">
                    PIN - {order.customer?.pincode || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-20 text-[#a89880]">
              No orders found yet.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}