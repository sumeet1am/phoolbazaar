import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Star, Truck, Calendar, MapPin, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../services/api';
import { SUPPORTED_CITIES, ACTIVE_CITY } from '../services/citiesConfig';

export default function Home() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const bestSellers = INITIAL_PRODUCTS.filter((p) => p.isBestSeller);
  const decorAndRentals = INITIAL_PRODUCTS.filter((p) => p.category === 'Decorations' || p.category === 'Rentals');

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        {/* Soft Glow Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-rose-200/40 via-emerald-200/30 to-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Animated Hubballi Delivery Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-extrabold shadow-sm mb-6"
          >
            <span className="text-base">📍</span>
            <span>Currently Delivering Only in Hubballi</span>
            <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold">Hubballi MVP</span>
          </motion.div>

          {/* Hero Banner Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.15] tracking-tight max-w-4xl mx-auto"
          >
            Serving Hubballi with Fresh Flowers &{' '}
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 bg-clip-text text-transparent italic">
              Pooja Essentials
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium"
          >
            Handpicked Mogra Garlands • Sacred Kamal Phool • Wedding Mandap Decor • 30-Min Delivery across Vidyanagar, Gokul Road, Keshwapur & Hubballi.
          </motion.p>

          {/* Hubballi Localities Pills */}
          <div className="mt-4 flex flex-wrap justify-center items-center gap-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-gray-500 mr-1">Hubballi Hubs:</span>
            {ACTIVE_CITY.localities.slice(0, 7).map((loc) => (
              <span key={loc} className="bg-white/80 border border-gray-200 text-emerald-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs">
                📍 {loc}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-sm shadow-bloom hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span>Order Flowers in Hubballi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/addresses"
              className="px-8 py-4 rounded-full bg-white border border-emerald-200 text-emerald-900 hover:bg-emerald-50 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Manage Delivery Address</span>
            </Link>
          </motion.div>

          {/* Value Proposition Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { title: 'Plucked Daily at 4 AM', desc: 'Direct farm freshness', icon: Clock, color: 'text-rose-500' },
              { title: '30-Min Hubballi Express', desc: 'Early morning pooja slot', icon: Truck, color: 'text-emerald-600' },
              { title: 'Handcrafted Garlands', desc: 'Expert Hubballi florists', icon: Award, color: 'text-amber-500' },
              { title: 'Zero Wilt Guarantee', desc: '100% fresh replacement', icon: ShieldCheck, color: 'text-purple-600' },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-4 rounded-2xl text-left flex items-start gap-3 border border-white">
                <feature.icon className={`w-6 h-6 ${feature.color} flex-shrink-0 mt-1`} />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{feature.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full">
              Explore Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Browse Hubballi Flower Market
            </h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INITIAL_CATEGORIES.slice(0, 12).map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -6, scale: 1.03 }}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="glass-card p-4 rounded-3xl text-center cursor-pointer border border-white hover:border-rose-300 transition-all shadow-sm hover:shadow-bloom group"
            >
              <div className="w-16 h-16 rounded-2xl mx-auto overflow-hidden shadow-inner mb-3 relative bg-emerald-50">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute bottom-1 right-1 text-base">{cat.icon}</span>
              </div>
              <h3 className="font-serif font-bold text-sm text-gray-900 group-hover:text-rose-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-gray-500 mt-0.5 block">{cat.count}+ Varieties</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Fresh Plucked Daily
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Most Popular Flowers in Hubballi
            </h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1">
            View Full Shop <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* FUTURE-READY MULTI-CITY EXPANSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 border border-white space-y-4 text-center bg-gradient-to-r from-emerald-50/80 via-white to-rose-50/80">
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            🌐 Multi-City Expansion Plan
          </span>
          <h3 className="font-serif text-2xl font-bold text-gray-900">
            Expanding PhoolBazaar Across Karnataka
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            {SUPPORTED_CITIES.map((city) => (
              <div
                key={city.id}
                className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
                  city.active
                    ? 'bg-rose-500 text-white border-rose-600 shadow-bloom'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                <span>📍 {city.name}</span>
                {city.active ? (
                  <span className="bg-white text-rose-600 text-[9px] px-1.5 py-0.2 rounded-full font-extrabold">Active MVP</span>
                ) : (
                  <span className="text-[10px] text-gray-400 font-semibold">{city.badge}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK PRODUCT MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
