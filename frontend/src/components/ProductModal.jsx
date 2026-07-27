import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, ShieldCheck, Clock, Truck, Heart, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { INITIAL_TIMESLOTS } from '../services/api';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const { addToCart, wishlist, toggleWishlist, selectedSlot, setSelectedSlot } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlist.some((i) => i.id === product.id);

  const handleAddToCart = () => {
    const success = addToCart(product, selectedSlot, quantity);
    if (success !== false) {
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-modal rounded-3xl overflow-hidden shadow-2xl z-10 my-auto border border-white/90 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-700 shadow-md transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery */}
          <div className="p-6 bg-gradient-to-b from-rose-50/50 via-emerald-50/30 to-white flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border border-white">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  ✨ {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-rose-500 scale-105 shadow-md' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 p-3 bg-emerald-50/80 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900 font-semibold">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>100% Farm-Fresh Guarantee • Handpicked Daily at 4:00 AM</span>
            </div>
          </div>

          {/* Right: Details & Buying options */}
          <div className="p-6 md:p-8 flex flex-col justify-between bg-white max-h-[80vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-rose-100 text-rose-700 font-bold text-xs px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-rose-500"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>
              </div>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-2 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-gray-400 text-xs">({product.reviewsCount} customer reviews)</span>
                <span className="text-emerald-700 bg-emerald-50 text-xs px-2 py-0.5 rounded font-semibold">
                  In Stock ({product.unit})
                </span>
              </div>

              {/* Price section */}
              <div className="mt-4 p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-950">₹{product.price}</span>
                {product.mrp && (
                  <span className="text-base text-gray-400 line-through">₹{product.mrp}</span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-extrabold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Delivery Slot Selection */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-rose-500" /> Select Delivery Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INITIAL_TIMESLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.label)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedSlot === slot.label
                          ? 'border-rose-500 bg-rose-50/80 font-bold text-rose-900 shadow-sm'
                          : 'border-gray-200 hover:border-rose-200 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold">{slot.label}</div>
                      <div className="text-[10px] text-gray-500">{slot.type}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-extrabold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:shadow-bloom text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Shopping Cart (₹{product.price * quantity})
                  </>
                )}
              </motion.button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
