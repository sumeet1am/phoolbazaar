import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Search, ShieldCheck, LogOut, Menu, X, Sparkles, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, isAdmin, isGuest, logout, openAuthModal } = useAuth();
  const { cart, wishlist, openCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-floral-emerald via-emerald-800 to-floral-emerald text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-sm">
        <span className="animate-pulse">📍</span>
        <span className="font-bold">Currently Delivering Only in Hubballi City • Serving Hubballi with Fresh Flowers & Pooja Essentials</span>
        <span className="hidden md:inline bg-rose-500/30 text-rose-200 text-[10px] px-2 py-0.5 rounded-full border border-rose-400/40">30-Min Hubballi Express</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 via-rose-400 to-orange-400 flex items-center justify-center text-2xl shadow-bloom text-white"
            >
              🌸
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold bg-gradient-to-r from-floral-emerald via-emerald-900 to-rose-600 bg-clip-text text-transparent">
                  PhoolBazaar
                </span>
                <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> Hubballi
                </span>
              </div>
              <span className="block text-[10px] tracking-widest text-emerald-700 uppercase font-semibold">
                Fresh Flowers • Pooja • Decor
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Search Mogra, Rose Garlands, Lotus in Hubballi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white/80 border border-emerald-100 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-emerald-700 absolute left-4 top-3.5" />
          </form>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-rose-600 transition-colors flex items-center gap-1">
              Shop Catalog <Sparkles className="w-3 h-3 text-rose-500" />
            </Link>
            <Link to="/shop?category=Decorations" className="hover:text-rose-600 transition-colors">Decorations</Link>
            <Link to="/shop?category=Rentals" className="hover:text-rose-600 transition-colors">Rentals</Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            
            {/* Wishlist */}
            <button
              onClick={() => navigate('/shop?wishlist=true')}
              className="relative p-2.5 rounded-full hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-2 border border-emerald-200"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-rose-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            {isGuest ? (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-semibold rounded-full hover:shadow-bloom transition-all transform hover:-translate-y-0.5"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-white border border-emerald-200 rounded-full hover:border-emerald-400 transition-all shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-gray-800 max-w-[80px] truncate">{user.name}</span>
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                      </div>

                      {isAdmin ? (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Admin Seller Panel</span>
                        </Link>
                      ) : (
                        <>
                          <Link
                            to="/my-orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 font-medium"
                          >
                            <Calendar className="w-4 h-4 text-rose-500" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            to="/addresses"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 font-medium"
                          >
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            <span>My Delivery Addresses</span>
                          </Link>
                        </>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 text-left font-medium border-t border-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
