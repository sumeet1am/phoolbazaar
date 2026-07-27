import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Clock, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { INITIAL_TIMESLOTS } from '../services/api';
import { validateDeliveryAddress } from '../services/citiesConfig';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    grandTotal,
    selectedSlot,
    setSelectedSlot,
    deliveryDate,
    setDeliveryDate,
    placeOrder
  } = useCart();

  const { user, addresses, getDefaultAddress } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(false);
  
  // Selected address state
  const [selectedAddrId, setSelectedAddrId] = useState(() => getDefaultAddress()?.id || addresses[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Code');

  if (!isCartOpen) return null;

  const currentAddress = addresses.find((a) => a.id === selectedAddrId) || addresses[0] || null;
  const addressValidation = currentAddress
    ? validateDeliveryAddress(currentAddress.city, currentAddress.pincode)
    : { isValid: false, message: 'Please add a Hubballi delivery address' };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'PHOOL100') {
      setCouponApplied(true);
      setDiscountAmount(100);
    } else if (couponCode.trim().toUpperCase() === 'FIRST50') {
      setCouponApplied(true);
      setDiscountAmount(50);
    } else {
      alert('Invalid coupon code! Try PHOOL100 or FIRST50');
    }
  };

  const finalTotal = Math.max(0, grandTotal - discountAmount);

  const handleFinalCheckout = () => {
    if (!currentAddress) {
      alert('Please select or add a delivery address');
      navigate('/addresses');
      closeCart();
      return;
    }

    if (!addressValidation.isValid) {
      alert('❌ Sorry, we currently deliver only within Hubballi city.');
      return;
    }

    const formattedAddress = `${currentAddress.houseNo}, ${currentAddress.streetArea}, Landmark: ${currentAddress.landmark || 'N/A'}, ${currentAddress.locality}, Hubballi - ${currentAddress.pincode}`;

    const newOrder = placeOrder({
      address: formattedAddress,
      phone: currentAddress.phone || user?.mobile || '+91 98765 43210',
      paymentMethod
    });

    closeCart();
    setCheckoutStep(false);
    navigate(`/order-success?orderId=${newOrder.id}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-rose-50 to-emerald-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold text-lg shadow-bloom">
                  🌸
                </div>
                <div>
                  <h2 className="font-serif font-bold text-xl text-gray-900">
                    {checkoutStep ? 'Select Hubballi Address' : 'Your Flower Basket'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    📍 Hubballi Delivery Only • {cart.length} item{cart.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center text-3xl">
                    🌺
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-gray-800">Your basket is empty</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs">
                      Add fresh jasmine garlands, daily pooja flowers, or decor to get started!
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 bg-rose-500 text-white font-bold text-xs rounded-full shadow-bloom"
                  >
                    Browse Flowers Catalog
                  </button>
                </div>
              ) : !checkoutStep ? (
                /* CART ITEMS */
                <>
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-3 bg-gray-50/80 rounded-2xl border border-gray-100 items-center justify-between"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-xs text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                            {item.slot}
                          </p>
                          <span className="font-extrabold text-sm text-emerald-950 mt-1 block">
                            ₹{item.product.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.slot, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.slot, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.slot)}
                          className="p-1.5 text-gray-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Slot & Delivery Date Picker */}
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-4 h-4 text-rose-500" /> Delivery Date & Slot
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Delivery Date</label>
                        <input
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full mt-1 p-2 bg-white border border-emerald-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Time Slot</label>
                        <select
                          value={selectedSlot}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                          className="w-full mt-1 p-2 bg-white border border-emerald-200 rounded-xl text-xs font-semibold"
                        >
                          {INITIAL_TIMESLOTS.map((s) => (
                            <option key={s.id} value={s.label}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Promo */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. PHOOL100)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs uppercase"
                      />
                      <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl hover:bg-emerald-900"
                    >
                      Apply
                    </button>
                  </form>
                </>
              ) : (
                /* CHECKOUT & ADDRESS SELECTION STEP */
                <div className="space-y-4">
                  
                  {/* Hubballi Validation Alert */}
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-1">
                    <span className="font-bold text-rose-800 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-rose-600" /> Hubballi Delivery Check
                    </span>
                    <p className="text-gray-600 text-[11px]">
                      PhoolBazaar currently operates exclusively within Hubballi city limits.
                    </p>
                  </div>

                  {/* Address List Picker */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-gray-700 uppercase">
                        Select Delivery Address
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          closeCart();
                          navigate('/addresses');
                        }}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 underline"
                      >
                        + Add / Manage Addresses
                      </button>
                    </div>

                    <div className="space-y-2 max-h-56 overflow-y-auto">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddrId(addr.id)}
                          className={`p-3 rounded-2xl border cursor-pointer text-xs transition-all ${
                            selectedAddrId === addr.id
                              ? 'border-rose-500 bg-rose-50/80 shadow-sm'
                              : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-gray-900">
                            <span>{addr.fullName} ({addr.type})</span>
                            <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded">
                              {addr.city}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1 text-[11px] truncate">
                            {addr.houseNo}, {addr.streetArea}, {addr.locality} - {addr.pincode}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Validation status badge */}
                  {!addressValidation.isValid && (
                    <div className="p-3 bg-rose-100 text-rose-800 font-bold text-xs rounded-xl flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                      <span>{addressValidation.message}</span>
                    </div>
                  )}

                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Payment Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['UPI / QR Code', 'Cash on Delivery'].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setPaymentMethod(mode)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                            paymentMethod === mode
                              ? 'border-rose-500 bg-rose-50 text-rose-800'
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep(false)}
                    className="text-xs font-bold text-gray-500 underline"
                  >
                    ← Back to Cart Items
                  </button>
                </div>
              )}
            </div>

            {/* Footer CTAs */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge (Hubballi)</span>
                    <span className="font-bold text-emerald-700">
                      {deliveryFee === 0 ? 'FREE (Above ₹499)' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Grand Total</span>
                    <span className="text-emerald-950 text-xl">₹{finalTotal}</span>
                  </div>
                </div>

                {!checkoutStep ? (
                  <button
                    onClick={() => setCheckoutStep(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-sm rounded-2xl shadow-bloom flex items-center justify-center gap-2 hover:from-rose-600 hover:to-rose-700 transition-all"
                  >
                    <span>Select Hubballi Address & Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled={!addressValidation.isValid}
                    onClick={handleFinalCheckout}
                    className={`w-full py-3.5 text-white font-bold text-sm rounded-2xl shadow-emerald-glow flex items-center justify-center gap-2 transition-all ${
                      addressValidation.isValid
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <span>Place Order (₹{finalTotal})</span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
