import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();

  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  const wishlistOnly = searchParams.get('wishlist') === 'true';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high'

  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchQuery(searchParam);
  }, [categoryParam, searchParam]);

  // Filter products
  let filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    if (wishlistOnly) {
      return wishlist.some((w) => w.id === p.id);
    }
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    const newParams = new URLSearchParams(searchParams);
    if (catName === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', catName);
    }
    newParams.delete('wishlist');
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              {wishlistOnly ? 'Your Saved Flowers Wishlist ❤️' : 'Shop Flowers & Pooja Essentials'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Showing {filteredProducts.length} items • Fresh morning guaranteed
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Filter flowers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('All')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All' && !wishlistOnly
                ? 'bg-rose-500 text-white shadow-bloom'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-rose-50'
            }`}
          >
            🌸 All Products
          </button>
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.name && !wishlistOnly
                  ? 'bg-rose-500 text-white shadow-bloom'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-rose-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 space-y-4 glass-card rounded-3xl">
          <div className="text-4xl">🌺</div>
          <h3 className="font-serif font-bold text-xl text-gray-800">No flowers match your search</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try clearing search filters or pick another category above.
          </p>
          <button
            onClick={() => handleCategorySelect('All')}
            className="px-6 py-2.5 bg-rose-500 text-white text-xs font-bold rounded-full shadow-bloom"
          >
            Show All Flowers
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
