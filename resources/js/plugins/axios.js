import axios from 'axios';
import { Locale } from '@/plugins/locales';

// Get CSRF token safely (browser only)
let token = null;
if (typeof document !== 'undefined') {
    const meta = document.head.querySelector('meta[name="csrf-token"]');
    token = meta ? meta.getAttribute('content') : null;
}

// Create axios instance
const axiosInstance = axios.create({
    baseURL: '',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        'X-ACCEPT-LANGUAGE': typeof Locale !== 'undefined' && Locale.getCode ? Locale.getCode() : 'en',
        'X-CSRF-TOKEN': token || '',
    },
    withCredentials: true,
});

// Optional: Add interceptors here
axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

// Attach to window only in browser
if (typeof window !== 'undefined') {
    window.axios = axiosInstance;
}

export default axiosInstance;
