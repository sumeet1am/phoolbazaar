import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Copy, ShoppingBag, Users, DollarSign, Clock, Check, X, MapPin, Search, Filter } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../services/api';
import { ACTIVE_CITY } from '../services/citiesConfig';

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const UNITS = ['Kg', '500 Grams', 'Gram', 'Piece', 'Bundle', 'Dozen', 'Packet', 'Box', 'Set of Garlands', 'Full Setup', 'Per Day Rental'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [localityFilter, setLocalityFilter] = useState('All');

  // Product Edit/Add Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Loose Flowers',
    subCategory: '',
    price: '',
    mrp: '',
    unit: '500 grams',
    stock: 50,
    shortDescription: '',
    description: '',
    badge: 'Farm Plucked',
    isBestSeller: false,
    isTrending: false,
    isTodaysSpecial: false,
    isNewArrival: false,
    isFeatured: false,
    active: true,
    inStock: true,
    startTime: '05:00 AM',
    endTime: '08:00 PM',
    availableDays: ALL_DAYS,
    images: []
  });

  // Hubballi Orders Data
  const [ordersList, setOrdersList] = useState([
    {
      id: 'PB-8942',
      customer: 'Ananya Sharma',
      phone: '+91 98765 43210',
      houseNo: 'Flat 302, Royal Palms',
      streetArea: 'Near Shirur Park',
      landmark: 'Opp. BVB College',
      locality: 'Vidyanagar',
      city: 'Hubballi',
      pincode: '580031',
      total: 1899,
      status: 'Placed',
      slot: 'Early Morning (5:30 AM - 7:30 AM)',
      date: '2026-07-27',
      items: 'Royal Rose & Marigold Garland x 1'
    },
    {
      id: 'PB-8941',
      customer: 'Rahul Verma',
      phone: '+91 98123 45678',
      houseNo: 'House #42, Gokul Road',
      streetArea: 'Behind Airport Road',
      landmark: 'Near KTC Bus Stop',
      locality: 'Gokul Road',
      city: 'Hubballi',
      pincode: '580030',
      total: 349,
      status: 'Packing',
      slot: 'Morning Slot (8:00 AM - 11:00 AM)',
      date: '2026-07-27',
      items: 'Fresh Desi Jasmine Flowers x 1'
    }
  ]);

  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      category: 'Loose Flowers',
      subCategory: '',
      price: '',
      mrp: '',
      unit: '500 grams',
      stock: 50,
      shortDescription: '',
      description: 'Fresh plucked directly from farm.',
      badge: 'Farm Plucked',
      isBestSeller: false,
      isTrending: false,
      isTodaysSpecial: false,
      isNewArrival: true,
      isFeatured: false,
      active: true,
      inStock: true,
      startTime: '05:00 AM',
      endTime: '08:00 PM',
      availableDays: ALL_DAYS,
      images: ['https://images.unsplash.com/photo-1596073413225-300dd1d416c2?auto=format&fit=crop&w=800&q=80']
    });
    setShowProductModal(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category || 'Loose Flowers',
      subCategory: product.subCategory || '',
      price: product.price,
      mrp: product.mrp || product.price,
      unit: product.unit || '500 grams',
      stock: product.stock || 50,
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      badge: product.badge || '',
      isBestSeller: !!product.isBestSeller,
      isTrending: !!product.isTrending,
      isTodaysSpecial: !!product.isTodaysSpecial,
      isNewArrival: !!product.isNewArrival,
      isFeatured: !!product.isFeatured,
      active: product.active !== false,
      inStock: product.inStock !== false,
      startTime: product.startTime || '05:00 AM',
      endTime: product.endTime || '08:00 PM',
      availableDays: product.availableDays || ALL_DAYS,
      images: product.images || []
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Product name and selling price are required.');
      return;
    }

    const priceNum = parseFloat(formData.price);
    const mrpNum = parseFloat(formData.mrp) || priceNum * 1.25;
    const discount = Math.round(((mrpNum - priceNum) / mrpNum) * 100);

    if (editingProductId) {
      setProductsList((prev) =>
        prev.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                ...formData,
                price: priceNum,
                mrp: Math.round(mrpNum),
                discount: Math.max(0, discount)
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: 'p_' + Date.now(),
        ...formData,
        price: priceNum,
        mrp: Math.round(mrpNum),
        discount: Math.max(0, discount),
        rating: 5.0,
        reviewsCount: 1
      };
      setProductsList([newProduct, ...productsList]);
    }
    setShowProductModal(false);
  };

  const handleDuplicateProduct = (product) => {
    const duplicated = {
      ...product,
      id: 'p_' + Date.now(),
      name: `${product.name} (Copy)`
    };
    setProductsList([duplicated, ...productsList]);
  };

  const handleToggleStock = (productId) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleToggleActive = (productId) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, active: !p.active } : p))
    );
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Delete this product from catalog?')) {
      setProductsList((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const filteredProducts = productsList.filter((p) => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchQuery =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const filteredOrders = ordersList.filter((o) => {
    return localityFilter === 'All' || o.locality === localityFilter;
  });

  const totalRevenue = ordersList.reduce((sum, o) => sum + o.total, 0) + 42890;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full uppercase">
                Blinkit / Shopify Hubballi Panel
              </span>
              <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-600" /> Hubballi MVP
              </span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-gray-900 mt-1">
              PhoolBazaar Hubballi Store Management
            </h1>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-6 py-3 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-xs rounded-full shadow-bloom flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase">Total Sales (Hubballi)</span>
            <h3 className="font-serif text-2xl font-extrabold text-gray-900">₹{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase">Active Products</span>
            <h3 className="font-serif text-2xl font-extrabold text-gray-900">{productsList.length}</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase">Pending Orders</span>
            <h3 className="font-serif text-2xl font-extrabold text-gray-900">{ordersList.length}</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase">Hubballi Users</span>
            <h3 className="font-serif text-2xl font-extrabold text-gray-900">1,240</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {[
          { id: 'products', label: '🛒 Product Inventory' },
          { id: 'orders', label: '📍 Hubballi Orders & Locality Filter' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-6 text-xs font-extrabold whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-purple-700 text-purple-700 bg-purple-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: PRODUCT LIST DATA TABLE */}
      {activeTab === 'products' && (
        <div className="glass-card rounded-3xl p-6 border border-white space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-500">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
              >
                <option value="All">All Categories ({productsList.length})</option>
                {INITIAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-gray-100/80 text-gray-700 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Image & Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Pricing</th>
                  <th className="p-3.5">Stock & Unit</th>
                  <th className="p-3.5">Available Window</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-rose-50/20 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1596073413225-300dd1d416c2?auto=format&fit=crop&w=800&q=80'}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-sm"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block line-clamp-1">{p.name}</span>
                        <div className="flex gap-1 mt-0.5">
                          {p.badge && <span className="bg-rose-100 text-rose-700 text-[9px] font-extrabold px-1.5 py-0.2 rounded">{p.badge}</span>}
                          {p.isBestSeller && <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1 py-0.2 rounded">⭐ Best</span>}
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">
                        {p.category}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-extrabold text-emerald-950 text-sm">₹{p.price}</div>
                      {p.mrp && <div className="text-gray-400 line-through text-[10px]">₹{p.mrp} ({p.discount}% OFF)</div>}
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleStock(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          p.inStock
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {p.inStock ? `In Stock (${p.stock || 50})` : 'Out of Stock'}
                      </button>
                      <span className="text-[10px] text-gray-500 block mt-0.5">{p.unit}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-gray-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-500" />
                        <span>{p.startTime || '05:00 AM'} - {p.endTime || '08:00 PM'}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleActive(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.active !== false ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-700'
                        }`}
                      >
                        {p.active !== false ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateProduct(p)}
                          className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                          title="Duplicate Product"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: HUBBALLI ORDERS & LOCALITY FILTER */}
      {activeTab === 'orders' && (
        <div className="glass-card rounded-3xl p-6 border border-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-600" /> Hubballi Customer Orders ({filteredOrders.length})
            </h3>

            {/* Filter by Hubballi Locality */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Filter Locality:</span>
              <select
                value={localityFilter}
                onChange={(e) => setLocalityFilter(e.target.value)}
                className="p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-emerald-900"
              >
                <option value="All">All Hubballi Localities</option>
                {ACTIVE_CITY.localities.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-5 bg-white rounded-2xl border border-gray-200 space-y-3 shadow-xs">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="font-mono font-bold text-rose-600 text-sm">{order.id}</span>
                    <span className="text-xs font-bold text-gray-900 ml-3">{order.customer} ({order.phone})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-gray-900">Total: ₹{order.total}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Complete Hubballi Address Display */}
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs space-y-1">
                  <div className="font-bold text-emerald-950 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> Complete Hubballi Address:
                  </div>
                  <p className="text-gray-800 font-medium">
                    {order.houseNo}, {order.streetArea}, <span className="font-bold text-emerald-900">Locality: {order.locality}</span>, Landmark: {order.landmark}, {order.city} - {order.pincode}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                    ⏰ Time Slot: {order.slot}
                  </p>
                </div>

                <div className="text-xs text-gray-600 font-semibold">
                  Items: {order.items}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL PRODUCT EDITOR DIALOG */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-auto max-h-[90vh] overflow-y-auto border border-gray-100"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  {editingProductId ? '✏️ Edit Product Details' : '🌸 Add New Product to Catalog'}
                </h3>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  📷 Product Images (Upload / Camera Capture)
                </label>
                <ImageUploader
                  images={formData.images}
                  onChange={(newImages) => setFormData({ ...formData, images: newImages })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Fresh Mogra Jasmine Flowers"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl font-semibold"
                  >
                    {INITIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="349"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl font-bold text-emerald-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    placeholder="499"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Stock Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl font-semibold"
                  >
                    {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-3">
                <h4 className="font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-600" /> Time Availability Window (Customer Check)
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Available Start Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 04:30 AM"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full p-2.5 bg-white border border-rose-200 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Available End Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 11:00 AM"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full p-2.5 bg-white border border-rose-200 rounded-xl font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-700 hover:bg-purple-800 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Product to Catalog</span>
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
