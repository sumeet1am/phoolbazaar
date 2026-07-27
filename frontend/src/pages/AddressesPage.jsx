import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Star, Home as HomeIcon, Briefcase, Landmark, Check, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ACTIVE_CITY, validateDeliveryAddress } from '../services/citiesConfig';

export default function AddressesPage() {
  const { addresses, addAddress, editAddress, deleteAddress, setDefaultAddress } = useAuth();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    houseNo: '',
    streetArea: '',
    landmark: '',
    locality: 'Vidyanagar',
    city: 'Hubballi', // Fixed to Hubballi
    pincode: '580031',
    type: 'Home',
    isDefault: false
  });

  const [validationError, setValidationError] = useState('');

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      phone: '+91 ',
      houseNo: '',
      streetArea: '',
      landmark: '',
      locality: 'Vidyanagar',
      city: 'Hubballi',
      pincode: '580031',
      type: 'Home',
      isDefault: addresses.length === 0
    });
    setValidationError('');
    setShowAddressModal(true);
  };

  const handleOpenEditModal = (addr) => {
    setEditingId(addr.id);
    setFormData({
      fullName: addr.fullName,
      phone: addr.phone,
      houseNo: addr.houseNo,
      streetArea: addr.streetArea,
      landmark: addr.landmark || '',
      locality: addr.locality || 'Vidyanagar',
      city: 'Hubballi',
      pincode: addr.pincode,
      type: addr.type || 'Home',
      isDefault: !!addr.isDefault
    });
    setValidationError('');
    setShowAddressModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Delivery Address Validation for Hubballi
    const validation = validateDeliveryAddress('Hubballi', formData.pincode);
    if (!validation.isValid) {
      setValidationError(validation.message);
      return;
    }

    if (editingId) {
      editAddress(editingId, formData);
    } else {
      addAddress(formData);
    }

    setShowAddressModal(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Home': return <HomeIcon className="w-4 h-4 text-rose-500" />;
      case 'Work': return <Briefcase className="w-4 h-4 text-purple-600" />;
      case 'Temple': return <Landmark className="w-4 h-4 text-amber-500" />;
      default: return <MapPin className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-white">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>📍 Delivery Area: Hubballi City Only</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Delivery Addresses
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your saved Hubballi delivery addresses for quick checkout.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs rounded-full shadow-bloom flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Address Cards Grid */}
      {addresses.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-4">
          <div className="text-4xl">📍</div>
          <h3 className="font-serif font-bold text-lg text-gray-800">No saved addresses</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Please add a Hubballi delivery address before placing your order.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-6 py-2.5 bg-rose-500 text-white font-bold text-xs rounded-full shadow-bloom"
          >
            Add Hubballi Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`glass-card rounded-3xl p-6 border space-y-3 transition-all relative ${
                addr.isDefault ? 'border-rose-400 shadow-bloom bg-rose-50/20' : 'border-white hover:border-gray-200'
              }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    {getTypeIcon(addr.type)}
                  </div>
                  <span className="font-bold text-xs text-gray-900">{addr.type}</span>
                  {addr.isDefault && (
                    <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      ⭐ Default
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(addr)}
                    className="p-1.5 text-gray-400 hover:text-purple-700"
                    title="Edit address"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Address details */}
              <div>
                <h4 className="font-serif font-bold text-sm text-gray-900">{addr.fullName}</h4>
                <p className="text-xs text-gray-500 font-semibold">{addr.phone}</p>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                  {addr.houseNo}, {addr.streetArea}
                  {addr.landmark && <span className="block text-gray-500 text-[11px]">Landmark: {addr.landmark}</span>}
                  <span className="block font-bold text-emerald-900 mt-1">
                    {addr.locality}, {addr.city} - {addr.pincode}
                  </span>
                </p>
              </div>

              {/* Set Default Button */}
              {!addr.isDefault && (
                <button
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-[11px] font-bold text-rose-600 hover:text-rose-700 underline pt-1 block"
                >
                  Set as Default Address
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADDRESS MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  {editingId ? '✏️ Edit Delivery Address' : '➕ Add New Delivery Address'}
                </h3>
                <span className="text-[10px] text-rose-600 font-bold">
                  📍 Currently delivering only inside Hubballi city
                </span>
              </div>
              <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">House / Flat Number</label>
                <input
                  type="text"
                  required
                  placeholder="Flat 302, Royal Palms Apartment"
                  value={formData.houseNo}
                  onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Street / Area</label>
                <input
                  type="text"
                  required
                  placeholder="Near Shirur Park Main Road"
                  value={formData.streetArea}
                  onChange={(e) => setFormData({ ...formData, streetArea: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Landmark</label>
                  <input
                    type="text"
                    placeholder="Opp. BVB College"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Locality Area</label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl font-bold text-emerald-900"
                  >
                    {ACTIVE_CITY.localities.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City (FIXED TO HUBBALLI) & Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">City (Fixed)</label>
                  <input
                    type="text"
                    disabled
                    value="Hubballi"
                    className="w-full p-2.5 bg-gray-200 border border-gray-300 rounded-xl font-bold text-emerald-900 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Hubballi Pincode</label>
                  <input
                    type="text"
                    required
                    placeholder="580031"
                    value={formData.pincode}
                    onChange={(e) => {
                      setFormData({ ...formData, pincode: e.target.value });
                      setValidationError('');
                    }}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl font-bold"
                  />
                </div>
              </div>

              {/* Address Type */}
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Address Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Home', 'Work', 'Temple', 'Other'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: t })}
                      className={`p-2 rounded-xl border font-bold text-center transition-all ${
                        formData.type === t
                          ? 'border-rose-500 bg-rose-50 text-rose-800'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Default checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="rounded text-rose-500"
                />
                <span className="font-bold text-gray-700">Set as default delivery address</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-extrabold rounded-2xl shadow-bloom flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Hubballi Address</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
