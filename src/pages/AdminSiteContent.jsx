import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Image,
  Package,
  ShoppingBag,
  LogOut,
  Upload,
  Save,
  MessageSquare,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fields = [
  ["heroImage", "Hero Image"],
  ["quizImage", "Quiz Section Image"],
  ["menImage", "Men Section Image"],
  ["womenImage", "Women Section Image"],
  ["unisexImage", "Unisex Section Image"],
  ["carImage", "Car Section Image"],
  ["giftImage", "Gift Section Image"],
  ["latestDrop1Image", "Latest Drop 1"],
  ["latestDrop2Image", "Latest Drop 2"],
  ["latestDrop3Image", "Latest Drop 3"],
];

export default function AdminSiteContent() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState("");
  const navigate = useNavigate();

  const getAuthConfig = () => {
    const token = localStorage.getItem("adminToken");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${API_URL}/site-content`);
      setContent(res.data?.data || {});
    } catch (err) {
      console.error(err);
      alert("Failed to fetch site images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin");
      return;
    }

    fetchContent();
  }, [navigate]);

  const handleUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingKey(key);

      const data = new FormData();
      data.append("image", file);

      const res = await axios.post(`${API_URL}/upload/product-image`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setContent((prev) => ({
        ...prev,
        [key]: res.data.imageUrl,
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploadingKey("");
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/site-content`, content, getAuthConfig());
      localStorage.setItem("volente_site_content", JSON.stringify(content));
      alert("Site images updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save site images");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
        Loading site images...
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
          <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm">
            <Package size={18} /> Dashboard
          </Link>

          <Link to="/admin/products" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm">
            <Package size={18} /> Manage Products
          </Link>

          <Link to="/admin/orders" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm">
            <ShoppingBag size={18} /> All Orders
          </Link>

          <Link to="/admin/reviews" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm">
            <MessageSquare size={18} /> Manage Reviews
          </Link>

          <Link to="/admin/site-content" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl text-sm">
            <Image size={18} /> Site Images
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl text-sm"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <header className="mb-8 flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1
              className="text-4xl font-light text-[#2c2c2c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Site Images
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#a89880]">
              Manage homepage editable images
            </p>
          </div>

          <button
            onClick={handleSave}
            className="bg-[#2c2c2c] text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest flex items-center gap-2 w-fit"
          >
            <Save size={15} /> Save Changes
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {fields.map(([key, label]) => (
            <div key={key} className="bg-white rounded-3xl border border-[#ede7df] p-5 shadow-sm">
              <h3 className="text-sm font-medium text-[#2c2c2c] mb-4">
                {label}
              </h3>

              <div className="h-44 rounded-2xl bg-[#f5f0eb] overflow-hidden border border-[#ede7df] mb-4">
                {content[key] ? (
                  <img
                    src={content[key]}
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#a89880]">
                    No image
                  </div>
                )}
              </div>

              <input
                type="text"
                value={content[key] || ""}
                onChange={(e) =>
                  setContent({ ...content, [key]: e.target.value })
                }
                className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm mb-3"
                placeholder="Paste image URL"
              />

              <label className="cursor-pointer w-full border-2 border-dashed border-[#d8c3a5] rounded-xl py-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#7a6e65] hover:bg-[#fcf8f3]">
                <Upload size={14} />
                {uploadingKey === key ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, key)}
                  className="hidden"
                />
              </label>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}