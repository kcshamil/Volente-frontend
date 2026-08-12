import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  ChevronRight,
  Image,
  MessageSquare,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orderCount: 0,
    productCount: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getAuthConfig = () => {
    const token = localStorage.getItem("adminToken");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin");
      return;
    }

    const fetchData = async () => {
      try {
        const statsRes = await axios.get(
          `${API_URL}/admin/stats`,
          getAuthConfig()
        );

        const ordersRes = await axios.get(`${API_URL}/orders`, getAuthConfig());

        setStats({
          orderCount: statsRes.data?.orderCount || 0,
          productCount: statsRes.data?.productCount || 0,
          totalRevenue: statsRes.data?.totalRevenue || 0,
        });

        setRecentOrders((ordersRes.data?.data || []).slice(0, 5));
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

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
        Loading dashboard...
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
            className="flex items-center gap-3 p-3 bg-white/10 rounded-xl text-sm"
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
            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm transition-colors"
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

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1
              className="text-4xl font-light text-[#2c2c2c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Overview
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#a89880]">
              Dashboard / Statistics
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#ede7df]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                <ShoppingBag size={24} />
              </div>
              <p className="text-sm text-[#7a6e65]">Total Orders</p>
            </div>
            <p className="text-3xl font-light text-[#2c2c2c]">
              {stats.orderCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#ede7df]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 text-green-500 rounded-2xl">
                <DollarSign size={24} />
              </div>
              <p className="text-sm text-[#7a6e65]">Total Revenue</p>
            </div>
            <p className="text-3xl font-light text-[#2c2c2c]">
              ₹{Number(stats.totalRevenue).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#ede7df]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">
                <Package size={24} />
              </div>
              <p className="text-sm text-[#7a6e65]">Active Products</p>
            </div>
            <p className="text-3xl font-light text-[#2c2c2c]">
              {stats.productCount}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[#ede7df] overflow-hidden">
          <div className="p-6 border-b border-[#ede7df] flex justify-between items-center">
            <h2
              className="text-xl font-light text-[#2c2c2c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Recent Orders
            </h2>

            <Link
              to="/admin/orders"
              className="text-xs uppercase tracking-widest text-blue-500 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#fcfaf8] text-[10px] uppercase tracking-widest text-[#a89880]">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Items</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#ede7df]">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-[#a89880]"
                    >
                      No recent orders found.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="text-sm text-[#2c2c2c] hover:bg-[#fcfaf8] transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">
                        #{order.orderId}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium">
                          {order.customer?.name || "N/A"}
                        </p>
                        <p className="text-xs text-[#a89880]">
                          {order.customer?.phone || "N/A"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        {order.items?.length || 0} items
                      </td>

                      <td className="px-6 py-4 font-medium">
                        ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest ${order.status === "Pending"
                              ? "bg-orange-100 text-orange-600"
                              : order.status === "Confirmed"
                                ? "bg-blue-100 text-blue-600"
                                : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-green-100 text-green-600"
                            }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          to="/admin/orders"
                          className="text-[#a89880] hover:text-[#2c2c2c] transition-colors"
                        >
                          <ChevronRight size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}