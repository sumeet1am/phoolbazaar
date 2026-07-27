import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, MapPin, Truck, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'PB-9821';
  const { orderHistory } = useCart();

  const currentOrder = orderHistory.find((o) => o.id === orderId) || orderHistory[0];

  useEffect(() => {
    // Flower Confetti Burst Effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Flower colors: Rose pink, marigold orange, lotus purple, emerald green
      confetti({ ...defaults, particleCount, origin: { x: 0.3, y: 0.5 }, colors: ['#f43f5e', '#f97316', '#a855f7', '#15803d'] });
      confetti({ ...defaults, particleCount, origin: { x: 0.7, y: 0.5 }, colors: ['#f43f5e', '#eab308', '#ec4899', '#064e3b'] });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-8 sm:p-12 text-center border border-white shadow-2xl space-y-8 relative overflow-hidden"
      >
        {/* Top Success Badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-4xl shadow-bloom">
          🌸
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
            Order Confirmed 🎉
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Thank You for Ordering with PhoolBazaar!
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Order Reference ID: <span className="font-mono font-bold text-rose-600">{currentOrder?.id || orderId}</span>
          </p>
        </div>

        {/* Live Order Tracker */}
        <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-left space-y-4">
          <h3 className="font-serif font-bold text-sm text-emerald-950 flex items-center gap-2">
            <Truck className="w-4 h-4 text-rose-500" /> Live Order Status Tracker
          </h3>

          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
              <span className="text-emerald-900 block">Placed</span>
            </div>
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white mx-auto flex items-center justify-center font-bold animate-pulse">🌸</div>
              <span className="text-rose-600 block">Plucking at 4 AM</span>
            </div>
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 mx-auto flex items-center justify-center font-bold">3</div>
              <span className="text-gray-400 block">Packing</span>
            </div>
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 mx-auto flex items-center justify-center font-bold">4</div>
              <span className="text-gray-400 block">Delivered</span>
            </div>
          </div>
        </div>

        {/* Delivery Slot Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
          <div className="space-y-1">
            <span className="text-gray-400 uppercase font-bold text-[10px]">Delivery Slot</span>
            <p className="font-bold text-gray-800 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-500" /> {currentOrder?.slot || 'Early Morning (5:30 AM - 7:30 AM)'}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400 uppercase font-bold text-[10px]">Delivery Address</span>
            <p className="font-bold text-gray-800 truncate">
              {currentOrder?.address || '108 Lotus Garden Residency, MG Road, Bengaluru'}
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/my-orders"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs shadow-bloom hover:from-rose-600 hover:to-rose-700 transition-all flex items-center gap-2"
          >
            <span>View All My Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-all"
          >
            Continue Shopping
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
