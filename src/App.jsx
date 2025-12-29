import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import SearchBar from './components/SearchBar';
import MenuGrid from './components/MenuGrid';
import Footer from './components/Footer';
import ItemModal from './components/ItemModal';
import CheckoutModal from './components/CheckoutModal';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import { loadMenu } from './data/loadMenu';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [preselectedItem, setPreselectedItem] = useState(null);

  // Load menu from CMS on mount
  useEffect(() => {
    const fetchMenu = async () => {
      const items = await loadMenu();
      setMenuItems(items);
      setFilteredItems(items);
    };
    fetchMenu();
  }, []);

  // Get featured items (best sellers)
  const featuredItems = menuItems.filter(item => 
    item.id === 1 || item.id === 7 || item.id === 9
  );

  // Filter menu items based on search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, menuItems]);

  const handleView = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleOrder = (item, quantity = 1, notes = '') => {
    const cartItem = {
      ...item,
      quantity,
      notes,
    };
    // If cart is empty, add item. Otherwise, add to existing cart
    if (cart.length === 0) {
      setCart([cartItem]);
    } else {
      setCart([...cart, cartItem]);
    }
    setPreselectedItem(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (item, quantity, notes) => {
    const cartItem = {
      ...item,
      quantity,
      notes,
    };
    setCart([...cart, cartItem]);
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(index);
      return;
    }
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onOrderClick={handleOpenCheckout} cartItemCount={getCartItemCount()} />
      <Hero onOrderClick={handleOpenCheckout} />
      <FeaturedSection 
        featuredItems={featuredItems} 
        onView={handleView} 
        onOrder={handleOrder} 
      />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <MenuGrid items={filteredItems} onView={handleView} onOrder={handleOrder} />
      <Footer />
      
      {/* Cart Summary Button */}
      {cart.length > 0 && (
        <button
          onClick={handleOpenCheckout}
          className="fixed bottom-24 right-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 z-40 transition-all duration-200 hover:scale-110 hover:shadow-orange-600/50 animate-slide-up"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.4 2.924-6.75M6.75 15.75l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5l1.5-1.5m1.5 1.5l-1.5 1.5"
            />
          </svg>
          <span className="font-semibold">Cart ({getCartItemCount()})</span>
        </button>
      )}

      <FloatingWhatsAppButton />

      <ItemModal
        item={selectedItem}
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setSelectedItem(null);
        }}
        onAddToCart={handleAddToCart}
        onOrder={handleOrder}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setPreselectedItem(null);
        }}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        preselectedItem={preselectedItem}
      />
    </div>
  );
}

export default App;
