import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 text-white pt-16 pb-12 overflow-hidden mt-20">
      {/* Soft Glow Circles */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-emerald-900/80">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-xl shadow-bloom">
                🌸
              </div>
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-white via-rose-200 to-amber-200 bg-clip-text text-transparent">
                PhoolBazaar
              </span>
            </div>

            <p className="text-xs text-emerald-200/80 max-w-sm leading-relaxed">
              India's premier floral marketplace. Plucked fresh at 4 AM daily from local flower farms. Delivering pure fragrance, temple offerings, wedding garlands, and stage decorations to your doorstep.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-400" /> Daily Morning Slot 5:30 AM
              </span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-serif font-bold text-sm text-rose-300 uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li><Link to="/shop?category=Loose Flowers" className="hover:text-rose-300 transition-colors">Loose Fresh Flowers</Link></li>
              <li><Link to="/shop?category=Garlands" className="hover:text-rose-300 transition-colors">Wedding & Temple Garlands</Link></li>
              <li><Link to="/shop?category=Pooja Items" className="hover:text-rose-300 transition-colors">Pooja Essentials & Durva</Link></li>
              <li><Link to="/shop?category=Fresh Fruits" className="hover:text-rose-300 transition-colors">Temple Fruit Baskets</Link></li>
              <li><Link to="/shop?category=Decorations" className="hover:text-rose-300 transition-colors">Mandap & Car Decor</Link></li>
              <li><Link to="/shop?category=Rentals" className="hover:text-rose-300 transition-colors">Sound & Shamiyana Rentals</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-rose-300 uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li><Link to="/my-orders" className="hover:text-rose-300 transition-colors">Track Order Live</Link></li>
              <li><Link to="/shop" className="hover:text-rose-300 transition-colors">Flower Care Guide</Link></li>
              <li><Link to="/admin" className="hover:text-rose-300 transition-colors text-amber-300 font-semibold">Admin Dashboard Login</Link></li>
              <li><a href="#contact" className="hover:text-rose-300 transition-colors">Bulk Festive Inquiries</a></li>
              <li><a href="#terms" className="hover:text-rose-300 transition-colors">Refund & Replacement Guarantee</a></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-serif font-bold text-sm text-rose-300 uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-xs text-emerald-200/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400" />
                <span>+91 98765 43210 (24x7 Helpline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400" />
                <span>orders@phoolbazaar.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 mt-0.5" />
                <span>Flower Market Hub, MG Road, Bengaluru, Karnataka - 560001</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-4">
          <p>© 2026 🌸 PhoolBazaar Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for flower lovers across India.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
