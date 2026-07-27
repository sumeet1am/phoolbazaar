// Multi-City Configuration Engine (Future Ready)

export const SUPPORTED_CITIES = [
  {
    id: 'hubballi',
    name: 'Hubballi',
    state: 'Karnataka',
    active: true, // Currently active for MVP
    validPincodes: ['580020', '580021', '580023', '580024', '580028', '580029', '580030', '580031', '580032', '580025'],
    localities: [
      'Vidyanagar',
      'Gokul Road',
      'Deshpande Nagar',
      'Keshwapur',
      'Unkal',
      'Navanagar',
      'Hosur',
      'Rayapur',
      'Bengeri',
      'Old Hubballi',
      'Airport Road',
      'Shirur Park'
    ]
  },
  {
    id: 'dharwad',
    name: 'Dharwad',
    state: 'Karnataka',
    active: false, // Coming soon
    badge: 'Expansion Phase 2'
  },
  {
    id: 'belagavi',
    name: 'Belagavi',
    state: 'Karnataka',
    active: false,
    badge: 'Expansion Phase 2'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    active: false,
    badge: 'Upcoming'
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    state: 'Karnataka',
    active: false,
    badge: 'Upcoming'
  }
];

export const ACTIVE_CITY = SUPPORTED_CITIES.find(c => c.active) || SUPPORTED_CITIES[0];

// Validate if pincode belongs to Hubballi
export const validateDeliveryAddress = (city, pincode) => {
  if (city.toLowerCase().trim() !== 'hubballi') {
    return {
      isValid: false,
      message: '❌ Sorry, we currently deliver only within Hubballi city.'
    };
  }

  const cleanPincode = (pincode || '').toString().trim();

  // Must start with 580 and be in Hubballi valid pincodes list
  if (cleanPincode.startsWith('580') && cleanPincode.length === 6) {
    return {
      isValid: true,
      message: '✅ Valid Hubballi Delivery Address'
    };
  }

  return {
    isValid: false,
    message: '❌ Sorry, we currently deliver only within Hubballi city.'
  };
};
