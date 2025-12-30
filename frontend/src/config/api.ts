// src/config/api.ts

export const API_URL = import.meta.env.VITE_API_URL || 'https://shreyasacademy-pd3b.onrender.com';

// Debug log (remove after testing)
console.log('🔧 API Configuration:');
console.log('API_URL:', API_URL);
console.log('VITE_API_URL env:', import.meta.env.VITE_API_URL);