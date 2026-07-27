import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [authRedirectAction, setAuthRedirectAction] = useState(null);

  // Address Management state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr_default',
      fullName: 'Ananya Sharma',
      phone: '+91 98765 43210',
      houseNo: 'Flat 302, Royal Palms',
      streetArea: 'Near Shirur Park, Vidyanagar',
      landmark: 'Opp. BVB College',
      locality: 'Vidyanagar',
      city: 'Hubballi',
      pincode: '580031',
      type: 'Home',
      isDefault: true
    }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('phoolbazaar_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('phoolbazaar_user');
      }
    }
    const savedAddr = localStorage.getItem('phoolbazaar_addresses');
    if (savedAddr) {
      try { setAddresses(JSON.parse(savedAddr)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('phoolbazaar_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const openAuthModal = (mode = 'login', onSuccessCallback = null) => {
    setAuthModalMode(mode);
    setAuthRedirectAction(() => onSuccessCallback);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthRedirectAction(null);
  };

  const requireAuth = (callback) => {
    if (!user) {
      openAuthModal('login', callback);
      return false;
    }
    if (callback) callback();
    return true;
  };

  const login = (email, password, role = 'customer') => {
    const userData = {
      id: role === 'admin' ? 'usr_admin' : 'usr_' + Date.now(),
      name: role === 'admin' ? 'Admin Manager' : email.split('@')[0],
      email: email,
      mobile: '+91 98765 43210',
      role: role
    };
    setUser(userData);
    localStorage.setItem('phoolbazaar_user', JSON.stringify(userData));
    localStorage.setItem('phoolbazaar_token', 'token_' + Date.now());

    if (authRedirectAction) {
      authRedirectAction();
    }
    closeAuthModal();
    return userData;
  };

  const register = (name, email, mobile, password) => {
    const userData = {
      id: 'usr_' + Date.now(),
      name,
      email,
      mobile,
      role: 'customer'
    };
    setUser(userData);
    localStorage.setItem('phoolbazaar_user', JSON.stringify(userData));
    localStorage.setItem('phoolbazaar_token', 'token_' + Date.now());

    if (authRedirectAction) {
      authRedirectAction();
    }
    closeAuthModal();
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('phoolbazaar_user');
    localStorage.removeItem('phoolbazaar_token');
  };

  // Address Handlers
  const addAddress = (newAddr) => {
    const isFirst = addresses.length === 0;
    const created = {
      ...newAddr,
      id: 'addr_' + Date.now(),
      city: 'Hubballi', // Always fixed to Hubballi
      isDefault: isFirst || newAddr.isDefault
    };

    if (created.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(created));
    } else {
      setAddresses((prev) => [...prev, created]);
    }
    return created;
  };

  const editAddress = (id, updatedData) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updatedData, city: 'Hubballi' };
        }
        if (updatedData.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
  };

  const getDefaultAddress = () => {
    return addresses.find((a) => a.isDefault) || addresses[0] || null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isGuest: !user,
      isAdmin: user?.role === 'admin',
      isAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      openAuthModal,
      closeAuthModal,
      requireAuth,
      login,
      register,
      logout,
      addresses,
      addAddress,
      editAddress,
      deleteAddress,
      setDefaultAddress,
      getDefaultAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
