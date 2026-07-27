import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { requireAuth } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('Morning Slot (8:00 AM - 11:00 AM)');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 'PB-8942',
      date: '2026-07-26',
      total: 1899,
      status: 'Delivered',
      slot: 'Early Morning (5:30 AM - 7:30 AM)',
      items: [
        { name: 'Royal Rose & Marigold Wedding Garland', qty: 1, price: 1899 }
      ]
    }
  ]);

  // Load saved cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('phoolbazaar_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
    const savedWish = localStorage.getItem('phoolbazaar_wishlist');
    if (savedWish) {
      try { setWishlist(JSON.parse(savedWish)); } catch (e) {}
    }
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem('phoolbazaar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('phoolbazaar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, slot = selectedSlot, quantity = 1) => {
    const allow = requireAuth(() => {
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex((item) => item.product.id === product.id && item.slot === slot);
        if (existingIndex > -1) {
          const updated = [...prevCart];
          updated[existingIndex].quantity += quantity;
          return updated;
        }
        return [...prevCart, { product, quantity, slot }];
      });
      setIsCartOpen(true);
    });
    return allow;
  };

  const updateQuantity = (productId, slot, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, slot);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.slot === slot
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, slot) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.slot === slot)));
  };

  const toggleWishlist = (product) => {
    return requireAuth(() => {
      setWishlist((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) return prev.filter((p) => p.id !== product.id);
        return [...prev, product];
      });
    });
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const grandTotal = subtotal + deliveryFee;

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: 'PB-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      total: grandTotal,
      status: 'Placed',
      slot: selectedSlot,
      deliveryDate: deliveryDate,
      items: cart.map(item => ({
        name: item.product.name,
        qty: item.quantity,
        price: item.product.price,
        image: item.product.images[0]
      })),
      address: orderDetails.address,
      phone: orderDetails.phone,
      paymentMethod: orderDetails.paymentMethod || 'UPI / Cash on Delivery'
    };

    setOrderHistory(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      clearCart,
      subtotal,
      deliveryFee,
      grandTotal,
      selectedSlot,
      setSelectedSlot,
      deliveryDate,
      setDeliveryDate,
      orderHistory,
      placeOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
