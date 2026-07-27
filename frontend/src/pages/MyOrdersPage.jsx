import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, MapPin, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function MyOrdersPage() {
  const { orderHistory } = useCart();
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          My Flower Orders & Event Bookings
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Track live delivery status of your daily pooja flowers and garlands
        </p>
      </div>

      {orderHistory.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-4">
          <div className="text-4xl">🌸</div>
          <h3 className="font-serif font-bold text-lg text-gray-800">No orders placed yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Order fresh jasmine garlands or daily pooja packs today!
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2.5 bg-rose-500 text-white font-bold text-xs rounded-full shadow-bloom"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orderHistory.map((order) => (
            <div
              key={order.id}
              className="glass-card rounded-3xl p-6 border border-white space-y-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <span className="font-mono font-bold text-rose-600 text-sm">{order.id}</span>
                  <span className="text-xs text-gray-400 ml-3">Placed on {order.date}</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {order.status}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-800">
                      {item.name} <span className="text-gray-400">x{item.qty}</span>
                    </span>
                    <span className="font-bold text-emerald-950">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Slot Info */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
                <div className="flex items-center gap-1 font-semibold text-emerald-800">
                  <Clock className="w-4 h-4 text-rose-500" /> Delivery Slot: {order.slot}
                </div>
                <div className="font-extrabold text-sm text-gray-900">
                  Total Paid: ₹{order.total}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
