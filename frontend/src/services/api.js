import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('phoolbazaar_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to check if current time falls within product availability window
export const checkTimeAvailability = (startTimeStr, endTimeStr, availableDays = []) => {
  if (!startTimeStr || !endTimeStr) return { isAvailable: true, message: 'Available' };

  const now = new Date();
  const currentDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];

  if (availableDays.length > 0 && !availableDays.includes(currentDay)) {
    return {
      isAvailable: false,
      message: `🔴 Currently Unavailable • Available on ${availableDays[0]}`
    };
  }

  // Parse time strings "HH:MM" (24h or "4:30 AM")
  const parseTime = (str) => {
    let [time, modifier] = str.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + (minutes || 0);
  };

  try {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = parseTime(startTimeStr);
    const endMinutes = parseTime(endTimeStr);

    if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return { isAvailable: true, message: 'Available Now' };
    } else {
      return {
        isAvailable: false,
        message: `🔴 Currently Unavailable • Available at ${startTimeStr}`
      };
    }
  } catch (e) {
    return { isAvailable: true, message: 'Available' };
  }
};

export const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Fresh Desi Jasmine Flowers (Mogra)',
    category: 'Loose Flowers',
    subCategory: 'Jasmine',
    price: 349,
    mrp: 499,
    discount: 30,
    unit: '500 grams',
    stock: 45,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1596073413225-300dd1d416c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Freshly plucked sweet fragrance white Mogra flowers. Sourced directly from farms every morning at 4 AM.',
    shortDescription: 'Morning plucked fragrant Mogra for daily pooja and veni.',
    badge: 'Morning Plucked',
    isBestSeller: true,
    isTrending: true,
    isTodaysSpecial: true,
    inStock: true,
    active: true,
    startTime: '04:30 AM',
    endTime: '11:00 AM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p2',
    name: 'Royal Dutch Red Roses (Rose Petals & Stems)',
    category: 'Loose Flowers',
    subCategory: 'Roses',
    price: 299,
    mrp: 399,
    discount: 25,
    unit: '1 kg',
    stock: 80,
    rating: 4.9,
    reviewsCount: 110,
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Deep red velvet roses for temple decor, romantic celebrations, and petals shower.',
    shortDescription: 'Fresh red rose petals plucked at sunrise.',
    badge: 'Trending',
    isBestSeller: true,
    isTrending: true,
    inStock: true,
    active: true,
    startTime: '05:00 AM',
    endTime: '09:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p3',
    name: 'Golden Marigold Flower Garlands (Genda Phool)',
    category: 'Garlands',
    subCategory: 'Marigold',
    price: 399,
    mrp: 599,
    discount: 33,
    unit: 'Pack of 5 Garlands',
    stock: 60,
    rating: 4.8,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bright golden and orange marigold garlands for home entry door, mandap, and temple pooja.',
    shortDescription: 'Long 6ft dense marigold door drapes.',
    badge: 'Festive Special',
    isBestSeller: true,
    inStock: true,
    active: true,
    startTime: '05:00 AM',
    endTime: '08:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p4',
    name: 'Fresh Pink Lotus Flowers (Kamal Phool)',
    category: 'Loose Flowers',
    subCategory: 'Lotus',
    price: 349,
    mrp: 499,
    discount: 30,
    unit: 'Pack of 5 Lotus Stems',
    stock: 25,
    rating: 5.0,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sacred Pink Lotus flowers ideal for Mahalaxmi Pooja, Satyanarayan Katha, and home decor.',
    shortDescription: 'Sacred unblemished pink lotus flowers.',
    badge: 'Auspicious Choice',
    isTodaysSpecial: true,
    inStock: true,
    active: true,
    startTime: '05:00 AM',
    endTime: '11:30 AM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p5',
    name: 'Luxury Velvet Red Rose & Orchid Bouquet',
    category: 'Bouquets',
    subCategory: 'Gift Bouquets',
    price: 899,
    mrp: 1299,
    discount: 30,
    unit: '1 Premium Bouquet',
    stock: 30,
    rating: 4.9,
    reviewsCount: 160,
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted bouquet wrapped in luxury matte paper with satin ribbon.',
    shortDescription: 'Elegant rose & orchid arrangement with gift card.',
    badge: 'New Arrival',
    isNewArrival: true,
    isTrending: true,
    inStock: true,
    active: true,
    startTime: '08:00 AM',
    endTime: '10:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p6',
    name: 'Daily Temple Pooja Basket with Durva & Bilva',
    category: 'Pooja Kits',
    subCategory: 'Pooja Essentials',
    price: 199,
    mrp: 299,
    discount: 33,
    unit: '1 Complete Kit',
    stock: 120,
    rating: 4.8,
    reviewsCount: 230,
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Includes Lotus, Red Hibiscus, Bilva leaves, Durva grass, Jasmine & Agarbatti.',
    shortDescription: 'Complete morning temple pooja basket.',
    badge: 'Express 30-Min',
    isBestSeller: true,
    inStock: true,
    active: true,
    startTime: '04:30 AM',
    endTime: '11:00 AM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p7',
    name: 'Fresh Unblemished Banana Leaves (Pooja & Feast)',
    category: 'Banana Leaves',
    subCategory: 'Pooja Leaves',
    price: 149,
    mrp: 220,
    discount: 32,
    unit: 'Bundle of 10 Leaves',
    stock: 200,
    rating: 4.9,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crisp green farm-fresh banana leaves for traditional South Indian feasts and mandatory temple offerings.',
    shortDescription: '100% natural unblemished banana leaves.',
    badge: 'Farm Fresh',
    isBestSeller: true,
    inStock: true,
    active: true,
    startTime: '05:00 AM',
    endTime: '08:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p8',
    name: 'Pair of Live Auspicious Banana Trees (Pooja Stalks)',
    category: 'Banana Trees',
    subCategory: 'Pooja Trees',
    price: 499,
    mrp: 699,
    discount: 28,
    unit: 'Pair (2 Trees with Roots)',
    stock: 40,
    rating: 4.9,
    reviewsCount: 74,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fresh twin banana plants for wedding entrance gate and housewarming rituals.',
    shortDescription: 'Pair of 6ft tall auspicious banana trees.',
    badge: 'Auspicious Ritual',
    isTodaysSpecial: true,
    inStock: true,
    active: true,
    startTime: '06:00 AM',
    endTime: '07:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p9',
    name: 'Fresh Temple Sugarcane Stalks (Ganna)',
    category: 'Sugarcane',
    subCategory: 'Festive Sugarcane',
    price: 199,
    mrp: 299,
    discount: 33,
    unit: 'Set of 2 Full Stalks',
    stock: 50,
    rating: 4.7,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sweet tall green sugarcane stalks for Pongal, Chhath Puja, and Gauri-Ganesh festivals.',
    shortDescription: 'Sweet juicy temple sugarcane stalks.',
    badge: 'Festive Essential',
    inStock: true,
    active: true,
    startTime: '06:00 AM',
    endTime: '07:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p10',
    name: 'Sacred Temple Fruit Basket (Panchamrit Offering)',
    category: 'Fresh Fruits',
    subCategory: 'Temple Fruits',
    price: 599,
    mrp: 799,
    discount: 25,
    unit: '3.5 kg Deluxe Basket',
    stock: 35,
    rating: 4.9,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handpicked spotless Coconuts, Yelakki Bananas, Pomegranate, Kashmiri Apples, and Grapes.',
    shortDescription: 'Handpicked fresh temple offering fruit hamper.',
    badge: 'Deluxe Pack',
    isBestSeller: true,
    inStock: true,
    active: true,
    startTime: '05:30 AM',
    endTime: '08:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p11',
    name: 'Handcrafted Royal Brass Diya & Scented Flower Gift Box',
    category: 'Gifts',
    subCategory: 'Gift Items',
    price: 1299,
    mrp: 1799,
    discount: 27,
    unit: '1 Gift Hamper',
    stock: 25,
    rating: 5.0,
    reviewsCount: 43,
    images: [
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Includes pure brass oil diya, dried rose petals, organic chandan dhoop, and brass bell.',
    shortDescription: 'Luxury brass diya & floral fragrance hamper.',
    badge: 'Luxury Gift',
    isNewArrival: true,
    inStock: true,
    active: true,
    startTime: '00:00 AM',
    endTime: '11:59 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p12',
    name: 'Grand Royal Wedding Mandap Flower Styling Service',
    category: 'Decorations',
    subCategory: 'Mandap Decorations',
    price: 24999,
    mrp: 32000,
    discount: 22,
    unit: 'Full Setup Service',
    stock: 5,
    rating: 5.0,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bespoke fresh flower wedding mandap decoration with orchids, roses, tuberoses, and warm fairy lights.',
    shortDescription: 'Complete wedding stage & mandap floral decor.',
    badge: 'Bespoke Decor',
    isFeatured: true,
    inStock: true,
    active: true,
    startTime: '00:00 AM',
    endTime: '11:59 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p13',
    name: 'Bridal Luxury Car Floral Decoration Service',
    category: 'Car Decoration',
    subCategory: 'Vehicle Styling',
    price: 3499,
    mrp: 4500,
    discount: 22,
    unit: 'Per Vehicle Setup',
    stock: 10,
    rating: 4.9,
    reviewsCount: 94,
    images: [
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sleek luxury wedding car flower styling using non-damaging floral mounts, lilies, and red roses.',
    shortDescription: 'On-site luxury wedding car flower decoration.',
    badge: 'On-Site Setup',
    inStock: true,
    active: true,
    startTime: '07:00 AM',
    endTime: '08:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p14',
    name: 'Traditional Royal Shamiyana Tent (30x30ft Rental)',
    category: 'Shamiyana',
    subCategory: 'Tent Rentals',
    price: 4999,
    mrp: 6500,
    discount: 23,
    unit: 'Per Day Rental',
    stock: 8,
    rating: 4.8,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Waterproof decorative velvet Shamiyana tent with traditional floral border drapes for haldi & reception.',
    shortDescription: '30x30ft waterproof royal shamiyana tent.',
    badge: 'Event Rental',
    inStock: true,
    active: true,
    startTime: '00:00 AM',
    endTime: '11:59 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p15',
    name: 'JBL 1000W Active Sound System & Wireless Mics (Rental)',
    category: 'Sound System',
    subCategory: 'Audio Equipment',
    price: 1499,
    mrp: 2000,
    discount: 25,
    unit: 'Per Day Rental',
    stock: 12,
    rating: 4.9,
    reviewsCount: 45,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dual JBL active speakers with 2 cordless UHF microphones for pooja ceremonies, weddings, and haldi events.',
    shortDescription: 'High-power JBL sound setup with wireless mics.',
    badge: 'Rental Special',
    isBestSeller: true,
    inStock: true,
    active: true,
    startTime: '00:00 AM',
    endTime: '11:59 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'p16',
    name: 'Royal AC Function Hall Booking (Capacity 500 Guests)',
    category: 'Function Hall',
    subCategory: 'Venue Booking',
    price: 35000,
    mrp: 45000,
    discount: 22,
    unit: 'Full Day Venue',
    stock: 2,
    rating: 5.0,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Air-conditioned luxury function hall with centralized stage, green rooms, and dining area.',
    shortDescription: '500-guest AC convention hall for weddings.',
    badge: 'Venue Booking',
    inStock: true,
    active: true,
    startTime: '00:00 AM',
    endTime: '11:59 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }
];

export const INITIAL_CATEGORIES = [
  { id: 'c1', name: 'Loose Flowers', icon: '🌸', count: 42, image: 'https://images.unsplash.com/photo-1596073413225-300dd1d416c2?auto=format&fit=crop&w=600&q=80' },
  { id: 'c2', name: 'Garlands', icon: '🌺', count: 35, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80' },
  { id: 'c3', name: 'Pooja Kits', icon: '🪔', count: 58, image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80' },
  { id: 'c4', name: 'Bouquets', icon: '💐', count: 28, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80' },
  { id: 'c5', name: 'Banana Leaves', icon: '🍌', count: 12, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80' },
  { id: 'c6', name: 'Banana Trees', icon: '🎋', count: 8, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80' },
  { id: 'c7', name: 'Sugarcane', icon: '🎍', count: 6, image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80' },
  { id: 'c8', name: 'Fresh Fruits', icon: '🍎', count: 24, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80' },
  { id: 'c9', name: 'Gifts', icon: '🎁', count: 18, image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=600&q=80' },
  { id: 'c10', name: 'Decorations', icon: '🎉', count: 19, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
  { id: 'c11', name: 'Car Decoration', icon: '🚗', count: 10, image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80' },
  { id: 'c12', name: 'Shamiyana', icon: '🎪', count: 14, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80' },
  { id: 'c13', name: 'Sound System', icon: '🔊', count: 15, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80' },
  { id: 'c14', name: 'Function Hall', icon: '🏛', count: 5, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80' }
];

export const INITIAL_TIMESLOTS = [
  { id: 'ts1', label: 'Early Morning (5:30 AM - 7:30 AM)', type: 'Pooja Special', active: true },
  { id: 'ts2', label: 'Morning Slot (8:00 AM - 11:00 AM)', type: 'Standard', active: true },
  { id: 'ts3', label: 'Afternoon Slot (12:00 PM - 3:00 PM)', type: 'Standard', active: true },
  { id: 'ts4', label: 'Evening Slot (5:00 PM - 8:00 PM)', type: 'Festival Express', active: true }
];

export default api;
