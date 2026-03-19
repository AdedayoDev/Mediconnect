import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

/**
 * Toast notification component
 */
export const Toast = ({ message, type = "info", onClose }) => {
  const icons = {
    success: <CheckCircle className='w-5 h-5' />,
    error: <AlertCircle className='w-5 h-5' />,
    info: <Info className='w-5 h-5' />,
  };

  const colors = {
    success: "bg-green-500/10 border-green-500 text-green-400",
    error: "bg-red-500/10 border-red-500 text-red-400",
    info: "bg-blue-500/10 border-primary-500 text-primary-300",
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[type]}`}
    >
      {icons[type]}
      <span className='flex-1'>{message}</span>
      <button
        onClick={onClose}
        className='text-current hover:opacity-70 transition-opacity'
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

/**
 * Toast container for multiple toasts
 */
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-md'>
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
