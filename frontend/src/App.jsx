import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FallingPetals from './components/FallingPetals';
import FlowerCursor from './components/FlowerCursor';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import OrderSuccess from './pages/OrderSuccess';
import MyOrdersPage from './pages/MyOrdersPage';
import AddressesPage from './pages/AddressesPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col justify-between relative selection:bg-rose-500 selection:text-white">
            
            {/* Flower Animations Ambient Overlay */}
            <FallingPetals />
            <FlowerCursor />

            {/* Top Navigation */}
            <Navbar />

            {/* Main Application Pages */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<ProductsPage />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/addresses" element={<AddressesPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* Global Overlays & Modals */}
            <AuthModal />
            <CartDrawer />

          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
