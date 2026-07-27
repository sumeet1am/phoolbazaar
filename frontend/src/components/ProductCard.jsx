import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Sparkles, Clock, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { checkTimeAvailability } from '../services/api';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Check live time availability
  const timeStatus = checkTimeAvailability(product.startTime, product.endTime, product.availableDays);
  const isAvailable = timeStatus.isAvailable && product.inStock && product.active !== false;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAvailable) return;

    const success = addToCart(product);
    if (success !== false) {
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      onClick={() => onQuickView && onQuickView(product)}
      className={`glass-card rounded-3xl overflow-hidden group cursor-pointer border hover:border-rose-300 transition-all flex flex-col justify-between h-full relative shadow-sm hover:shadow-bloom ${
        !isAvailable ? 'opacity-90 bg-gray-50/50' : 'border-white/80'
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-emerald-50/50">
        <img
          src={product.images?.[currentImageIndex] || product.images?.[0] || 'https://images.unsplash.com/photo-1596073413225-300dd1d416c2?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-gradient-to-r from-rose-500 to-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {product.badge}
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              ⭐ Best Seller
            </span>
          )}
          {product.isTrending && (
            <span className="bg-purple-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full glass-card flex items-center justify-center transition-transform active:scale-90 ${
            isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-gray-600 hover:text-rose-500'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Multi-image indicator dots */}
        {product.images?.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImageIndex === idx ? 'bg-white w-4' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-emerald-800 uppercase tracking-wider text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating || 5.0}</span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 text-base leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {product.unit} • Fresh Guaranteed
          </p>

          {/* Time availability text */}
          <div className="mt-2 text-[11px] font-semibold flex items-center gap-1">
            {isAvailable ? (
              <span className="text-emerald-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" /> Slot: {product.startTime} - {product.endTime}
              </span>
            ) : (
              <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-bold">
                <AlertCircle className="w-3 h-3" /> {timeStatus.message}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-emerald-50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg text-emerald-950">₹{product.price}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-[10px] text-rose-600 font-bold">
                Save {product.discount}% OFF
              </span>
            )}
          </div>

          {isAvailable ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAddToCart}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-rose-200'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add</span>
                </>
              )}
            </motion.button>
          ) : (
            <button
              disabled
              className="px-3 py-2 rounded-xl font-bold text-[11px] bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
