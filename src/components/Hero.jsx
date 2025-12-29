import { siteConfig } from '../config/siteConfig';

function Hero({ onOrderClick }) {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello! I'd like to place an order.`);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleDirections = () => {
    window.open(siteConfig.mapsUrl, '_blank');
  };

  return (
    <section 
      className="relative text-white px-4 overflow-hidden min-h-[60vh] md:min-h-[75vh] flex items-center"
      style={{
        backgroundImage: 'url(/images/hero.jpg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Light dark overlay (35-45% opacity) */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Subtle red gradient at bottom only */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(120, 0, 0, 0.35) 100%)',
        }}
      ></div>
      
      <div className="container mx-auto text-center relative z-10 animate-fade-in py-12 md:py-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 animate-slide-up"
          style={{
            background: 'linear-gradient(135deg, #b00000 0%, #ff2d2d 100%)',
            boxShadow: '0 4px 15px rgba(255, 45, 45, 0.4)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        >
          <span className="text-white text-sm font-bold">🔥🚚 Delivery & Pickup Available</span>
        </div>
        
        {/* Main Title */}
        <h1 
          className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight animate-slide-up"
          style={{
            color: '#ff2d2d',
            fontWeight: 900,
            textShadow: '0 0 20px rgba(255, 45, 45, 0.6), 0 0 40px rgba(255, 45, 45, 0.4), 2px 2px 4px rgba(0, 0, 0, 0.8)',
            animationDelay: '0.1s',
          }}
        >
          LYALLPUR BAR-B-Q
        </h1>
        
        {/* Subtitle */}
        <p 
          className="text-xl md:text-2xl mb-6 font-light animate-slide-up"
          style={{
            color: '#ffd4a3',
            animationDelay: '0.2s',
          }}
        >
          Smoky flavors. Freshly grilled. Delivered fast.
        </p>
        
        {/* Info Chips - BBQ Style */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border transition-all duration-200 hover:brightness-125"
            style={{
              background: 'linear-gradient(135deg, #1a0000 0%, #4a0000 100%)',
              borderColor: '#ff2d2d',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(255, 45, 45, 0.3)',
            }}
          >
            Open: {siteConfig.timings}
          </div>
          <div 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border transition-all duration-200 hover:brightness-125"
            style={{
              background: 'linear-gradient(135deg, #1a0000 0%, #4a0000 100%)',
              borderColor: '#ff2d2d',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(255, 45, 45, 0.3)',
            }}
          >
            Delivery Fee: Rs {siteConfig.deliveryFee}
          </div>
          <div 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border transition-all duration-200 hover:brightness-125"
            style={{
              background: 'linear-gradient(135deg, #1a0000 0%, #4a0000 100%)',
              borderColor: '#ff2d2d',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(255, 45, 45, 0.3)',
            }}
          >
            Faisalabad
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-600/60 hover:scale-105 hover:-translate-y-1"
          >
            WhatsApp Us
          </button>
          <button
            onClick={handleDirections}
            className="px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #b00000 0%, #ff2d2d 100%)',
              boxShadow: '0 4px 15px rgba(255, 45, 45, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 8px 25px rgba(255, 45, 45, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 4px 15px rgba(255, 45, 45, 0.4)';
            }}
          >
            Get Directions
          </button>
        </div>
      </div>

      {/* Add pulse animation for badge */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(255, 45, 45, 0.4);
          }
          50% {
            box-shadow: 0 4px 25px rgba(255, 45, 45, 0.7);
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;
