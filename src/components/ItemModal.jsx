import { useState } from 'react';

function ItemModal({ item, isOpen, onClose, onAddToCart, onOrder }) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    onAddToCart(item, quantity, notes);
    setQuantity(1);
    setNotes('');
    onClose();
  };

  const handleOrder = () => {
    onOrder(item, quantity, notes);
    setQuantity(1);
    setNotes('');
    onClose();
  };

  const increment = () => setQuantity(qty => qty + 1);
  const decrement = () => setQuantity(qty => Math.max(1, qty - 1));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-72">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-t-2xl"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{item.name}</h2>
              <p className="text-gray-600">{item.portion}</p>
              {item.description && (
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-orange-600">Rs {item.price}</p>
            </div>
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="flex gap-2 mb-6">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tag === 'Bestseller'
                      ? 'bg-green-100 text-green-700'
                      : tag === 'Spicy'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={decrement}
                className="bg-gray-100 hover:bg-gray-200 w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105"
              >
                −
              </button>
              <span className="text-3xl font-bold w-16 text-center">{quantity}</span>
              <button
                onClick={increment}
                className="bg-gray-100 hover:bg-gray-200 w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105"
              >
                +
              </button>
            </div>
            <p className="text-gray-600 mt-3 text-lg font-semibold">
              Total: <span className="text-orange-600">Rs {item.price * quantity}</span>
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">Special Instructions (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none transition-all duration-200"
              rows="3"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              onClick={handleOrder}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-orange-600/50"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
