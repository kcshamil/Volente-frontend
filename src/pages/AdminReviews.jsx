import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Package,
  ShoppingBag,
  LogOut,
  Image,
  Search,
  Trash2,
  Star,
  MessageSquare,
  Filter,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const getAuthConfig = () => {
    const token = localStorage.getItem("adminToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      const res = await axios.get(`${API_URL}/perfumes/admin/reviews`, getAuthConfig());
      setReviews(res.data?.data || []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
      } else {
        alert("Failed to fetch reviews");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleDelete = async (perfumeId, reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      setDeletingId(reviewId);
      await axios.delete(
        `${API_URL}/perfumes/${perfumeId}/reviews/${reviewId}`,
        getAuthConfig()
      );
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      localStorage.removeItem("volente_perfumes");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }
      alert(err.response?.data?.message || "Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter((rev) => {
    const matchesSearch =
      rev.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.perfumeName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      selectedRating === "all" || rev.rating === Number(selectedRating);

    return matchesSearch && matchesRating;
  });

  // Calculate statistics
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : "0.0";
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${
              star <= rating
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center text-[#2c2c2c]">
        Loading reviews...
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
            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm transition-colors"
          >
            <ShoppingBag size={18} /> All Orders
          </Link>

          <Link
            to="/admin/reviews"
            className="flex items-center gap-3 p-3 bg-white/10 rounded-xl text-sm"
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

      <main className="flex-1 p-6 md:p-10 overflow-y-auto min-w-0">
        <header className="mb-10">
          <h1
            className="text-4xl font-light text-[#2c2c2c]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Customer Reviews
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#a89880]">
            Review & Moderation Management
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#ede7df]">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <MessageSquare size={22} />
              </div>
              <p className="text-sm text-[#7a6e65]">Total Reviews</p>
            </div>
            <p className="text-3xl font-light text-[#2c2c2c]">{totalReviews}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#ede7df]">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
                <Star size={22} className="fill-amber-500" />
              </div>
              <p className="text-sm text-[#7a6e65]">Average Rating</p>
            </div>
            <p className="text-3xl font-light text-[#2c2c2c]">
              {avgRating} <span className="text-sm text-[#a89880]">/ 5.0</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#ede7df]">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <Star size={22} className="fill-emerald-600" />
              </div>
              <p className="text-sm text-[#7a6e65]">5-Star Ratings</p>
            </div>
            <p className="text-3xl font-light text-[#2c2c2c]">{fiveStarCount}</p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#ede7df] p-4 mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 flex items-center gap-3 w-full border-b md:border-b-0 md:border-r border-[#ede7df] pb-3 md:pb-0 md:pr-4">
            <Search size={18} className="text-[#a89880] shrink-0" />
            <input
              type="text"
              placeholder="Search by customer, comment, or perfume..."
              className="w-full outline-none text-sm text-[#2c2c2c]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <Filter size={16} className="text-[#a89880]" />
            <span className="text-xs uppercase tracking-widest text-[#7a6e65]">
              Rating:
            </span>
            <select
              className="bg-[#f5f0eb] border border-[#ede7df] rounded-xl px-3 py-2 text-xs text-[#2c2c2c] outline-none"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#ede7df] p-12 text-center text-[#a89880]">
            No reviews found matching your search.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((rev) => (
              <div
                key={rev._id}
                className="bg-white rounded-3xl shadow-sm border border-[#ede7df] p-6 transition-all hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#ede7df] pb-4 mb-4">
                  {/* Perfume Info */}
                  <div className="flex items-center gap-4">
                    {rev.perfumeImg ? (
                      <img
                        src={rev.perfumeImg}
                        alt={rev.perfumeName}
                        className="w-14 h-14 object-cover rounded-xl border border-[#ede7df]"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-[#f5f0eb] rounded-xl flex items-center justify-center text-[#a89880]">
                        <Package size={20} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-[#2c2c2c] text-base">
                        {rev.perfumeName || "Product"}
                      </h3>
                      {rev.perfumeCategory && (
                        <span className="inline-block text-[9px] uppercase tracking-widest bg-[#2c2c2c] text-white px-2 py-0.5 rounded-full mt-1">
                          {rev.perfumeCategory}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Rating */}
                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="flex flex-col items-end gap-1">
                      {renderStars(rev.rating)}
                      <span className="text-[10px] text-[#a89880]">
                        {rev.rating}.0 out of 5
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(rev.perfumeId, rev._id)}
                      disabled={deletingId === rev._id}
                      className="flex items-center gap-1.5 bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 px-3 py-2 rounded-xl text-xs transition-colors disabled:opacity-50"
                      title="Delete Review"
                    >
                      <Trash2 size={14} />
                      <span>{deletingId === rev._id ? "Deleting..." : "Delete"}</span>
                    </button>
                  </div>
                </div>

                {/* Comment & Author */}
                <div>
                  <p className="text-sm text-[#2c2c2c] leading-relaxed mb-3 italic">
                    "{rev.comment}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#a89880]">
                    <span className="font-medium text-[#7a6e65]">
                      - {rev.name || "Anonymous"}
                    </span>
                    <span>
                      {rev.createdAt
                        ? new Date(rev.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
