import { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { openWhatsApp } from '../utils/whatsapp';

function CheckoutModal({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, preselectedItem }) {
  const [orderType, setOrderType] = useState('Pickup');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (preselectedItem && cart.length === 0) {
      // If there's a preselected item and cart is empty, add it to cart
      // This will be handled by parent component
    }
  }, [preselectedItem, cart]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'Delivery' ? siteConfig.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  const validate = () => {
    const newErrors = {};
    if (!customer.name.trim()) newErrors.name = 'Name is required';
    if (!customer.phone.trim()) newErrors.phone = 'Phone is required';
    if (orderType === 'Delivery' && !customer.address.trim()) {
      newErrors.address = 'Address is required for delivery';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderData = {
      orderType,
      items: cart,
      customer,
      subtotal,
      deliveryFee,
      grandTotal,
    };

    openWhatsApp(orderData);
    onClose();
    // Reset form
    setCustomer({ name: '', phone: '', address: '', notes: '' });
    setOrderType('Pickup');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" 
      onClick={onClose}
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div 
        className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
        style={{
          border: '1px solid rgba(255, 0, 0, 0.18)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 0, 0, 0.1)',
        }}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 
              className="text-3xl font-extrabold"
              style={{
                color: '#ff1e1e',
                fontWeight: 900,
                textShadow: '0 0 6px rgba(255, 0, 0, 0.7), 0 0 14px rgba(255, 0, 0, 0.6), 0 0 28px rgba(255, 0, 0, 0.4)',
              }}
            >
              Checkout
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200"
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 0, 0, 0.1)';
                e.target.style.boxShadow = '0 0 12px rgba(255, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f3f4f6';
                e.target.style.boxShadow = 'none';
              }}
            >
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6 text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #ff2d2d 0%, #ff6b35 100%)',
                  boxShadow: '0 4px 15px rgba(255, 45, 45, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 45, 45, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 45, 45, 0.4)';
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Neon Segmented Control for Order Type */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3 text-sm">Order Type</label>
                <div 
                  className="flex gap-2 p-1 rounded-xl"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <button
                    onClick={() => setOrderType('Pickup')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      orderType === 'Pickup'
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    style={
                      orderType === 'Pickup'
                        ? {
                            background: 'linear-gradient(135deg, #ff2d2d 0%, #ff6b35 100%)',
                            boxShadow: '0 0 12px rgba(255, 45, 45, 0.6)',
                            transform: 'scale(1.02)',
                          }
                        : {}
                    }
                  >
                    Pickup
                  </button>
                  <button
                    onClick={() => setOrderType('Delivery')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      orderType === 'Delivery'
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    style={
                      orderType === 'Delivery'
                        ? {
                            background: 'linear-gradient(135deg, #ff2d2d 0%, #ff6b35 100%)',
                            boxShadow: '0 0 12px rgba(255, 45, 45, 0.6)',
                            transform: 'scale(1.02)',
                          }
                        : {}
                    }
                  >
                    Delivery
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 ${
                    errors.name ? 'border-2 border-red-500' : 'border border-gray-300'
                  }`}
                  style={{
                    background: errors.name ? '#fff' : '#fff',
                  }}
                  onFocus={(e) => {
                    if (!errors.name) {
                      e.target.style.borderColor = '#ef4444';
                      e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.name) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 ${
                    errors.phone ? 'border-2 border-red-500' : 'border border-gray-300'
                  }`}
                  style={{
                    background: '#fff',
                  }}
                  onFocus={(e) => {
                    if (!errors.phone) {
                      e.target.style.borderColor = '#ef4444';
                      e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.phone) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {orderType === 'Delivery' && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 resize-none transition-all duration-200 ${
                      errors.address ? 'border-2 border-red-500' : 'border border-gray-300'
                    }`}
                    style={{
                      background: '#fff',
                    }}
                    rows="3"
                    onFocus={(e) => {
                      if (!errors.address) {
                        e.target.style.borderColor = '#ef4444';
                        e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.address) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                    placeholder="Enter your delivery address"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Notes (Optional)</label>
                <textarea
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 border border-gray-300 resize-none transition-all duration-200"
                  style={{
                    background: '#fff',
                  }}
                  rows="3"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ef4444';
                    e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Any special instructions..."
                />
              </div>

              {/* Receipt Card - Order Summary */}
              <div 
                className="mb-6 rounded-2xl p-5 bg-gray-50"
                style={{
                  border: '1px solid rgba(255, 0, 0, 0.2)',
                }}
              >
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Order Summary</h3>
                <div className="space-y-3 mb-5">
                  {cart.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-start p-3 rounded-xl bg-white"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.portion} × {item.quantity}</p>
                        {item.notes && (
                          <p className="text-xs text-gray-500 italic mt-1">Note: {item.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <div 
                          className="flex items-center gap-2 rounded-lg p-1 bg-gray-100"
                        >
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="w-8 h-8 rounded font-bold text-sm text-gray-700 transition-all duration-200 hover:scale-110 bg-white hover:bg-red-100"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 rounded font-bold text-sm text-gray-700 transition-all duration-200 hover:scale-110 bg-white hover:bg-red-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-gray-900 w-24 text-right" style={{ fontFamily: 'monospace' }}>
                          Rs {item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded transition-all duration-200"
                          aria-label="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals Breakdown */}
                <div className="border-t border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-gray-900" style={{ fontFamily: 'monospace' }}>Rs {subtotal}</span>
                  </div>
                  {orderType === 'Delivery' && (
                    <div className="flex justify-between text-gray-700">
                      <span>Delivery Fee:</span>
                      <span className="font-semibold text-gray-900" style={{ fontFamily: 'monospace' }}>Rs {deliveryFee}</span>
                    </div>
                  )}
                  <div 
                    className="flex justify-between text-xl font-bold pt-3 border-t border-gray-300"
                    style={{
                      color: '#ff1e1e',
                      textShadow: '0 0 8px rgba(255, 0, 0, 0.5)',
                    }}
                  >
                    <span>Grand Total:</span>
                    <span style={{ fontFamily: 'monospace' }}>Rs {grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Primary CTA Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl font-semibold text-lg text-white transition-all duration-200 relative overflow-hidden flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #ff2d2d 0%, #ff6b35 100%)',
                  boxShadow: '0 4px 15px rgba(255, 45, 45, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 45, 45, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 45, 45, 0.4)';
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Send Order via WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
