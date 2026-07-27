import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Phone, User, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login, register } = useAuth();

  const [activeTab, setActiveTab] = useState(authModalMode || 'login'); // 'login' | 'register' | 'admin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === 'register') {
      if (!name || !email || !mobile || !password) {
        alert('Please fill out all fields');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      register(name, email, mobile, password);
    } else if (activeTab === 'admin') {
      login(email || 'admin@phoolbazaar.com', password || 'admin123', 'admin');
    } else {
      login(email || 'customer@phoolbazaar.com', password || 'password123', 'customer');
    }
  };

  const handleQuickDemoCustomer = () => {
    login('democustomer@phoolbazaar.com', 'demo123', 'customer');
  };

  const handleQuickDemoAdmin = () => {
    login('admin@phoolbazaar.com', 'admin123', 'admin');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass-modal rounded-3xl overflow-hidden shadow-2xl z-10 border border-white p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-500 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-rose-500 to-orange-400 mx-auto flex items-center justify-center text-3xl shadow-bloom text-white">
              🌸
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Welcome to PhoolBazaar
            </h2>
            <p className="text-xs text-gray-500">
              Please sign in to order fresh flowers & reserve event decorations.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-2xl bg-gray-100 p-1 mb-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                activeTab === 'login' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Customer Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                activeTab === 'register' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                activeTab === 'admin' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-600'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={activeTab === 'admin' ? 'admin@phoolbazaar.com' : 'ananya@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            {activeTab === 'register' && (
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            {activeTab === 'register' && (
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 rounded-2xl font-bold text-xs text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-purple-700 hover:bg-purple-800'
                  : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-bloom'
              }`}
            >
              <span>{activeTab === 'register' ? 'Create Account' : activeTab === 'admin' ? 'Admin Login' : 'Customer Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-4 border-t border-gray-200/80 text-center space-y-2">
            <span className="text-[11px] text-gray-400 font-semibold block">Quick One-Click Demo Logins:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleQuickDemoCustomer}
                className="flex-1 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold rounded-xl border border-rose-200 transition-colors"
              >
                👤 Customer Demo
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="flex-1 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold rounded-xl border border-purple-200 transition-colors"
              >
                👑 Admin Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
