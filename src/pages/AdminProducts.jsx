import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Package,
  ShoppingBag,
  Plus,
  Search,
  Trash2,
  Edit2,
  LogOut,
  X,
  Image,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialFormData = {
  name: "",
  category: "Men",
  price: "",
  originalPrice: "",
  img: "",
  description: "",
  notes: "",
  tag: "",
  rating: 4.5,
  reviews: 0,
  sizes: ["30ml", "50ml", "75ml", "100ml"],
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [uploadingImage, setUploadingImage] = useState(false);

  const navigate = useNavigate();

  const getAuthConfig = () => {
    const token = localStorage.getItem("adminToken");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/perfumes`);
      setProducts(res.data?.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
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

    fetchProducts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingProduct(null);
    setShowModal(false);
    setUploadingImage(false);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      category: product.category || "Men",
      price: product.price || "",
      originalPrice: product.originalPrice || "",
      img: product.img || "",
      description: product.description || "",
      notes: product.notes || "",
      tag: product.tag || "",
      rating: product.rating || 4.5,
      reviews: product.reviews || 0,
      sizes: productSizes,
      sizesText: productSizes.join(", "),
    });

    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploadingImage(true);

      const data = new FormData();
      data.append("image", file);

      const token = localStorage.getItem("adminToken");

      const res = await axios.post(`${API_URL}/upload/product-image`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.imageUrl) {
        setFormData((prev) => ({
          ...prev,
          img: res.data.imageUrl,
        }));
      } else {
        alert("Image URL not received from server");
      }
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      alert(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/perfumes/${id}`, getAuthConfig());
      setProducts((prev) => prev.filter((p) => p._id !== id));
      localStorage.removeItem("volente_perfumes");
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.img) {
      alert("Please upload an image or paste an image URL");
      return;
    }

    if (Number(formData.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (formData.originalPrice && Number(formData.originalPrice) < 0) {
      alert("Original price cannot be negative");
      return;
    }

    if (!formData.sizes || formData.sizes.length === 0) {
      alert("Please add at least one size");
      return;
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      originalPrice: formData.originalPrice
        ? Number(formData.originalPrice)
        : undefined,
      img: formData.img,
      description: formData.description,
      notes: formData.notes,
      tag: formData.tag,
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      sizes: formData.sizes,
    };

    try {
      if (editingProduct) {
        await axios.put(
          `${API_URL}/perfumes/${editingProduct._id}`,
          payload,
          getAuthConfig()
        );
      } else {
        await axios.post(`${API_URL}/perfumes`, payload, getAuthConfig());
      }

      localStorage.removeItem("volente_perfumes");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      alert(err.response?.data?.message || "Failed to save product");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
        Loading products...
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
            className="flex items-center gap-3 p-3 bg-white/10 rounded-xl text-sm"
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
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1
              className="text-4xl font-light text-[#2c2c2c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Manage Products
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#a89880]">
              Inventory Control
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="bg-[#2c2c2c] text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#1a1a1a] transition-all"
          >
            <Plus size={16} /> Add Product
          </button>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-[#ede7df] p-4 mb-8 flex items-center gap-4">
          <Search size={18} className="text-[#a89880]" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none text-sm text-[#2c2c2c]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-[#a89880]">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm border border-[#ede7df] overflow-hidden group"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-2 left-2 bg-[#2c2c2c] text-white text-[8px] uppercase tracking-widest px-2 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-[#2c2c2c] mb-1 truncate">
                    {product.name}
                  </h3>

                  <p className="text-sm text-[#a89880] mb-3">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  {product.sizes?.length > 0 && (
                    <p className="text-[10px] text-[#7a6e65] mb-3">
                      {product.sizes.join(", ")}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(product)}
                      className="flex-1 bg-[#f5f0eb] text-[#2c2c2c] py-2 rounded-lg text-xs flex items-center justify-center gap-1 hover:bg-[#ede7df] transition-colors"
                    >
                      <Edit2 size={12} /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-3xl p-6 md:p-8 shadow-2xl relative">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-[#a89880] hover:text-[#2c2c2c]"
              >
                <X size={24} />
              </button>

              <h2
                className="text-3xl font-light mb-8 pr-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Product Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Category
                  </label>
                  <select
                    className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Car">Car</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Price ₹
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Original Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Available Sizes / ML
                  </label>

                  <input
                    type="text"
                    inputMode="text"
                    placeholder="Example: 8ml, 30ml, 100ml"
                    className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm"
                    value={formData.sizesText || ""}
                    onChange={(e) => {
                      const text = e.target.value;

                      setFormData({
                        ...formData,
                        sizesText: text,
                        sizes: text
                          .split(",")
                          .map((s) => s.trim())
                          .filter((s) => s !== ""),
                      });
                    }}
                  />

                  <p className="text-[10px] text-[#a89880]">
                    Separate sizes using comma
                  </p>
                </div>

                <div className="space-y-4 md:col-span-2 bg-[#fcf8f3] border border-[#eadfce] rounded-2xl p-5">
                  <h3 className="text-xs uppercase tracking-widest text-[#7a6e65]">
                    Product Image
                  </h3>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#a89880]">
                      Upload Image
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full border-2 border-dashed border-[#d8c3a5] bg-white rounded-xl px-4 py-4 text-sm cursor-pointer file:bg-[#2c2c2c] file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:mr-4 hover:border-[#b89b72] transition-all"
                    />

                    {uploadingImage && (
                      <p className="text-xs text-blue-500">
                        Uploading image...
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-[#e5d8c7]" />
                    <span className="text-[10px] uppercase tracking-widest text-[#b0a090]">
                      OR
                    </span>
                    <div className="flex-1 h-px bg-[#e5d8c7]" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#a89880]">
                      Image URL
                    </label>

                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm bg-white"
                      value={formData.img}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          img: e.target.value,
                        })
                      }
                    />
                  </div>

                  {formData.img && (
                    <div className="w-36 h-36 rounded-2xl overflow-hidden border border-[#eadfce] bg-white">
                      <img
                        src={formData.img}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Notes
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#7a6e65]">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#ede7df] rounded-xl px-4 py-3 text-sm"
                    value={formData.tag}
                    onChange={(e) =>
                      setFormData({ ...formData, tag: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="md:col-span-2 bg-[#2c2c2c] text-white py-4 rounded-xl text-[11px] uppercase tracking-widest hover:bg-[#1a1a1a] transition-all disabled:opacity-50"
                >
                  {uploadingImage
                    ? "Uploading Image..."
                    : editingProduct
                      ? "Update Product"
                      : "Save Product"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}