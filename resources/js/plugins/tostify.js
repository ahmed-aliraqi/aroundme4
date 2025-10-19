import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Default toast options
const defaultOptions = {
    autoClose: 3000,
    position: toast.POSITION.TOP_LEFT,
    rtl: true,
    type: "success"
};

// Create a wrapper function that applies default options
const toastWithDefaults = (message, options = {}) => {
    const mergedOptions = { ...defaultOptions, ...options };
    return toast(message, mergedOptions);
};

// Add all toast methods to the wrapper
toastWithDefaults.success = (message, options = {}) => {
    const mergedOptions = { ...defaultOptions, ...options, type: "success" };
    return toast.success(message, mergedOptions);
};

toastWithDefaults.error = (message, options = {}) => {
    const mergedOptions = { ...defaultOptions, ...options, type: "error" };
    return toast.error(message, mergedOptions);
};

toastWithDefaults.info = (message, options = {}) => {
    const mergedOptions = { ...defaultOptions, ...options, type: "info" };
    return toast.info(message, mergedOptions);
};

toastWithDefaults.warning = (message, options = {}) => {
    const mergedOptions = { ...defaultOptions, ...options, type: "warning" };
    return toast.warning(message, mergedOptions);
};

// Expose the POSITION constant
toastWithDefaults.POSITION = toast.POSITION;

export default toastWithDefaults;
