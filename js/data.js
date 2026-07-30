/* ============================================================
   FLIGHT BOOKING WEBSITE - Sample Data
   ============================================================ */

// Airports Database
const airports = [
  { code: 'LOS', name: 'Murtala Muhammed International Airport', city: 'Lagos', country: 'Nigeria' },
  { code: 'ABV', name: 'Nnamdi Azikiwe International Airport', city: 'Abuja', country: 'Nigeria' },
  { code: 'PHC', name: 'Port Harcourt International Airport', city: 'Port Harcourt', country: 'Nigeria' },
  { code: 'KAN', name: 'Mallam Aminu Kano International Airport', city: 'Kano', country: 'Nigeria' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  { code: 'ADD', name: 'Bole International Airport', city: 'Addis Ababa', country: 'Ethiopia' },
  { code: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt' },
  { code: 'JNB', name: 'O.R. Tambo International Airport', city: 'Johannesburg', country: 'South Africa' },
  { code: 'NBO', name: 'Jomo Kenyatta International Airport', city: 'Nairobi', country: 'Kenya' },
  { code: 'ACC', name: 'Kotoka International Airport', city: 'Accra', country: 'Ghana' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' }
];

// Airlines
const airlines = [
  { code: 'EK', name: 'Emirates', logo: '✈' },
  { code: 'QR', name: 'Qatar Airways', logo: '✈' },
  { code: 'ET', name: 'Ethiopian Airlines', logo: '✈' },
  { code: 'TK', name: 'Turkish Airlines', logo: '✈' },
  { code: 'BA', name: 'British Airways', logo: '✈' },
  { code: 'AF', name: 'Air France', logo: '✈' },
  { code: 'LH', name: 'Lufthansa', logo: '✈' },
  { code: 'KL', name: 'KLM Royal Dutch', logo: '✈' },
  { code: 'SQ', name: 'Singapore Airlines', logo: '✈' },
  { code: 'NG', name: 'Aero Nigeria', logo: '✈' }
];

// Sample Flights
const flights = [
  {
    id: 1,
    airline: 'EK',
    flightNumber: 'EK 783',
    from: 'LOS',
    to: 'DXB',
    departureTime: '23:45',
    arrivalTime: '06:30',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-16',
    duration: '7h 45m',
    stops: 0,
    price: 850,
    currency: 'USD',
    seatsAvailable: 12,
    cabinClass: 'Economy',
    baggage: '30kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 2,
    airline: 'QR',
    flightNumber: 'QR 1406',
    from: 'LOS',
    to: 'DOH',
    departureTime: '10:15',
    arrivalTime: '19:30',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-15',
    duration: '6h 15m',
    stops: 0,
    price: 720,
    currency: 'USD',
    seatsAvailable: 8,
    cabinClass: 'Economy',
    baggage: '30kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 3,
    airline: 'ET',
    flightNumber: 'ET 900',
    from: 'LOS',
    to: 'ADD',
    departureTime: '13:30',
    arrivalTime: '20:00',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-15',
    duration: '4h 30m',
    stops: 0,
    price: 450,
    currency: 'USD',
    seatsAvailable: 22,
    cabinClass: 'Economy',
    baggage: '23kg',
    meal: true,
    wifi: false,
    entertainment: true
  },
  {
    id: 4,
    airline: 'TK',
    flightNumber: 'TK 624',
    from: 'LOS',
    to: 'IST',
    departureTime: '22:00',
    arrivalTime: '06:45',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-16',
    duration: '6h 45m',
    stops: 0,
    price: 680,
    currency: 'USD',
    seatsAvailable: 15,
    cabinClass: 'Economy',
    baggage: '30kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 5,
    airline: 'BA',
    flightNumber: 'BA 74',
    from: 'LOS',
    to: 'LHR',
    departureTime: '08:30',
    arrivalTime: '15:45',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-15',
    duration: '6h 15m',
    stops: 0,
    price: 920,
    currency: 'USD',
    seatsAvailable: 5,
    cabinClass: 'Economy',
    baggage: '23kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 6,
    airline: 'EK',
    flightNumber: 'EK 784',
    from: 'DXB',
    to: 'LOS',
    departureTime: '09:30',
    arrivalTime: '15:00',
    departureDate: '2026-07-20',
    arrivalDate: '2026-07-20',
    duration: '7h 30m',
    stops: 0,
    price: 820,
    currency: 'USD',
    seatsAvailable: 18,
    cabinClass: 'Economy',
    baggage: '30kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 7,
    airline: 'SQ',
    flightNumber: 'SQ 491',
    from: 'LOS',
    to: 'SIN',
    departureTime: '11:20',
    arrivalTime: '08:15',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-16',
    duration: '12h 55m',
    stops: 1,
    price: 1200,
    currency: 'USD',
    seatsAvailable: 10,
    cabinClass: 'Economy',
    baggage: '30kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 8,
    airline: 'AF',
    flightNumber: 'AF 149',
    from: 'LOS',
    to: 'CDG',
    departureTime: '23:10',
    arrivalTime: '06:30',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-16',
    duration: '6h 20m',
    stops: 0,
    price: 780,
    currency: 'USD',
    seatsAvailable: 20,
    cabinClass: 'Economy',
    baggage: '23kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 9,
    airline: 'LH',
    flightNumber: 'LH 565',
    from: 'LOS',
    to: 'FRA',
    departureTime: '22:30',
    arrivalTime: '06:00',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-16',
    duration: '6h 30m',
    stops: 0,
    price: 750,
    currency: 'USD',
    seatsAvailable: 14,
    cabinClass: 'Economy',
    baggage: '23kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 10,
    airline: 'KL',
    flightNumber: 'KL 588',
    from: 'LOS',
    to: 'AMS',
    departureTime: '22:45',
    arrivalTime: '06:15',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-16',
    duration: '6h 30m',
    stops: 0,
    price: 710,
    currency: 'USD',
    seatsAvailable: 25,
    cabinClass: 'Economy',
    baggage: '23kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 11,
    airline: 'NG',
    flightNumber: 'NG 201',
    from: 'LOS',
    to: 'ABV',
    departureTime: '07:00',
    arrivalTime: '08:15',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-15',
    duration: '1h 15m',
    stops: 0,
    price: 120,
    currency: 'USD',
    seatsAvailable: 40,
    cabinClass: 'Economy',
    baggage: '20kg',
    meal: false,
    wifi: false,
    entertainment: false
  },
  {
    id: 12,
    airline: 'NG',
    flightNumber: 'NG 305',
    from: 'LOS',
    to: 'PHC',
    departureTime: '14:30',
    arrivalTime: '15:30',
    departureDate: '2026-07-15',
    arrivalDate: '2026-07-15',
    duration: '1h 00m',
    stops: 0,
    price: 95,
    currency: 'USD',
    seatsAvailable: 35,
    cabinClass: 'Economy',
    baggage: '20kg',
    meal: false,
    wifi: false,
    entertainment: false
  },
  {
    id: 13,
    airline: 'EK',
    flightNumber: 'EK 785',
    from: 'LOS',
    to: 'DXB',
    departureTime: '02:15',
    arrivalTime: '08:45',
    departureDate: '2026-07-16',
    arrivalDate: '2026-07-16',
    duration: '7h 30m',
    stops: 0,
    price: 1200,
    currency: 'USD',
    seatsAvailable: 6,
    cabinClass: 'Business',
    baggage: '40kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 14,
    airline: 'QR',
    flightNumber: 'QR 1408',
    from: 'LOS',
    to: 'DOH',
    departureTime: '01:30',
    arrivalTime: '07:45',
    departureDate: '2026-07-16',
    arrivalDate: '2026-07-16',
    duration: '6h 15m',
    stops: 0,
    price: 1800,
    currency: 'USD',
    seatsAvailable: 4,
    cabinClass: 'First',
    baggage: '50kg',
    meal: true,
    wifi: true,
    entertainment: true
  },
  {
    id: 15,
    airline: 'ET',
    flightNumber: 'ET 508',
    from: 'ADD',
    to: 'LOS',
    departureTime: '10:00',
    arrivalTime: '12:30',
    departureDate: '2026-07-18',
    arrivalDate: '2026-07-18',
    duration: '4h 30m',
    stops: 0,
    price: 420,
    currency: 'USD',
    seatsAvailable: 28,
    cabinClass: 'Economy',
    baggage: '23kg',
    meal: true,
    wifi: false,
    entertainment: true
  }
];

// Popular Destinations
const destinations = [
  { name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', price: '$850', rating: 4.8 },
  { name: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', price: '$920', rating: 4.7 },
  { name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop', price: '$780', rating: 4.9 },
  { name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop', price: '$1,200', rating: 4.6 },
  { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop', price: '$1,500', rating: 4.8 },
  { name: 'Cairo', country: 'Egypt', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&h=300&fit=crop', price: '$550', rating: 4.5 }
];

// Travel Offers
const offers = [
  { title: 'Summer Sale - 30% Off', description: 'Book your summer getaway with exclusive discounts to top destinations worldwide.', image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=250&fit=crop', originalPrice: '$1,200', discountedPrice: '$840', badge: '-30%' },
  { title: 'Business Class Upgrade', description: 'Experience luxury travel with complimentary lounge access and premium amenities.', image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&h=250&fit=crop', originalPrice: '$2,500', discountedPrice: '$1,875', badge: '-25%' },
  { title: 'Family Package Deal', description: 'Travel with family and save big! Kids fly at 50% off on selected routes.', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop', originalPrice: '$2,000', discountedPrice: '$1,400', badge: '-30%' }
];

// Testimonials
const testimonials = [
  { name: 'Sarah Johnson', role: 'Business Traveler', text: 'The booking experience was seamless. Found the best deals and the interface is incredibly user-friendly. Highly recommend!', rating: 5, avatar: 'SJ' },
  { name: 'Michael Chen', role: 'Frequent Flyer', text: 'I use this platform for all my travels. The flight tracking feature and real-time updates are game-changers.', rating: 5, avatar: 'MC' },
  { name: 'Amara Okafor', role: 'Vacation Traveler', text: 'Booked my family vacation here and saved over 40%! The customer support was exceptional throughout our journey.', rating: 5, avatar: 'AO' }
];

// Flight Status Data (Mock)
const flightStatuses = [
  { flight: 'EK 783', route: 'LOS → DXB', status: 'On Time', time: '23:45' },
  { flight: 'QR 1406', route: 'LOS → DOH', status: 'Boarding', time: '10:15' },
  { flight: 'ET 900', route: 'LOS → ADD', status: 'Delayed', time: '14:30' },
  { flight: 'TK 624', route: 'LOS → IST', status: 'On Time', time: '22:00' },
  { flight: 'BA 74', route: 'LOS → LHR', status: 'Cancelled', time: '08:30' }
];

// Weather Data (Mock)
const weatherData = {
  'Lagos': { temp: '32°C', desc: 'Partly Cloudy', icon: 'fa-cloud-sun' },
  'Dubai': { temp: '41°C', desc: 'Sunny', icon: 'fa-sun' },
  'London': { temp: '18°C', desc: 'Light Rain', icon: 'fa-cloud-rain' },
  'New York': { temp: '26°C', desc: 'Clear Sky', icon: 'fa-sun' },
  'Tokyo': { temp: '28°C', desc: 'Humid', icon: 'fa-cloud' },
  'Paris': { temp: '22°C', desc: 'Cloudy', icon: 'fa-cloud' }
};

// FAQ Data
const faqData = [
  { question: 'How do I book a flight?', answer: 'Simply enter your departure and destination cities, select your travel dates, choose from available flights, fill in passenger details, and complete payment. Your e-ticket will be sent to your email.' },
  { question: 'Can I change or cancel my booking?', answer: 'Yes, you can modify or cancel your booking through your account dashboard. Fees may apply depending on the fare type and timing of changes.' },
  { question: 'What baggage allowance is included?', answer: 'Baggage allowance varies by airline and fare class. Economy typically includes 20-30kg checked baggage, while Business and First Class include 40-50kg.' },
  { question: 'How do I select my seat?', answer: 'Seat selection is available during the booking process. You can choose your preferred seat from the interactive seat map before confirming your booking.' },
  { question: 'Is travel insurance included?', answer: 'Travel insurance is optional and can be added during checkout. We partner with leading insurance providers to offer comprehensive coverage.' },
  { question: 'What payment methods are accepted?', answer: 'We accept all major credit/debit cards, bank transfers, and digital wallets including Visa, Mastercard, PayPal, and Apple Pay.' }
];

// User Data (Mock)
const currentUser = {
  name: 'Ogar Michael',
  email: 'ogar.michael@example.com',
  memberSince: '2024',
  upcomingTrips: 2,
  totalBookings: 15,
  savedPassengers: 3,
  favoriteDestinations: 5
};

// Booking History (Mock)
const bookingHistory = [
  { id: 'BK-2024-001', route: 'Lagos → Dubai', date: 'Mar 15, 2026', status: 'completed', price: '$850', airline: 'Emirates' },
  { id: 'BK-2024-002', route: 'Dubai → London', date: 'Apr 20, 2026', status: 'completed', price: '$720', airline: 'Qatar Airways' },
  { id: 'BK-2024-003', route: 'Lagos → Abuja', date: 'Jun 10, 2026', status: 'completed', price: '$120', airline: 'Aero Nigeria' },
  { id: 'BK-2024-004', route: 'Lagos → Paris', date: 'Aug 5, 2026', status: 'upcoming', price: '$780', airline: 'Air France' },
  { id: 'BK-2024-005', route: 'Paris → Lagos', date: 'Aug 20, 2026', status: 'upcoming', price: '$750', airline: 'Air France' }
];

// Saved Passengers (Mock)
const savedPassengers = [
  { name: 'Jane Michael', type: 'Adult', document: 'Passport: AB123456' },
  { name: 'Tommy Michael', type: 'Child', document: 'Passport: CD789012' },
  { name: 'Emma Michael', type: 'Infant', document: 'Passport: EF345678' }
];

// Notifications (Mock)
const notifications = [
  { message: 'Your flight LOS → CDG on Aug 5 is confirmed', time: '2 hours ago', read: false },
  { message: 'Price drop alert! Lagos to Dubai now from $720', time: '1 day ago', read: false },
  { message: 'Check-in now available for your Abuja trip', time: '2 days ago', read: true },
  { message: 'Your booking BK-2024-003 has been completed', time: '5 days ago', read: true }
];