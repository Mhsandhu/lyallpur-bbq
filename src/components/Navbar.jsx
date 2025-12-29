import { useState, useEffect } from 'react';

function Navbar({ onOrderClick, cartItemCount }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-2xl'
          : ''
      }`}
      style={{
        background: '#0b0b0b',
        borderBottom: '1px solid rgba(255, 0, 0, 0.3)',
        boxShadow: scrolled ? '0 4px 20px rgba(255, 0, 0, 0.2)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="LYALLPUR BAR-B-Q Logo"
              className="h-[36px] md:h-[48px] w-auto"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(255, 0, 0, 0.6))',
                backgroundColor: 'transparent',
                objectFit: 'contain',
              }}
              onError={(e) => {
                // Try fallback path
                if (e.target.src.includes('/logo.jpg') && !e.target.src.includes('images')) {
                  e.target.src = '/images/logo.jpg.jpg';
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
            <div 
              className="text-xl md:text-2xl font-extrabold tracking-wider"
              style={{
                color: '#ff1e1e',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textShadow: '0 0 6px rgba(255, 0, 0, 0.7), 0 0 14px rgba(255, 0, 0, 0.6), 0 0 28px rgba(255, 0, 0, 0.4)',
              }}
            >
              LYALLPUR BAR-B-Q
            </div>
          </div>
          <div className="flex items-center gap-3">
            {cartItemCount > 0 && (
              <button
                onClick={onOrderClick}
                className="relative bg-gray-800 hover:bg-gray-700 p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
                aria-label="Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.4 2.924-6.75M6.75 15.75l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5l1.5-1.5m1.5 1.5l-1.5 1.5"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              </button>
            )}
            <button
              onClick={onOrderClick}
              className="px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 text-white relative overflow-hidden"
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
              Order
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
