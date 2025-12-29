function MenuCard({ item, onView, onOrder }) {
  return (
    <div className="group bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40">
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
        {/* Price pill badge */}
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">
          Rs {item.price}
        </div>
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                  tag === 'Bestseller'
                    ? 'bg-green-600/90 text-white'
                    : tag === 'Spicy'
                    ? 'bg-red-600/90 text-white'
                    : 'bg-orange-600/90 text-white'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        {/* Portion chip */}
        <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <span>{item.portion}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onView(item)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            View
          </button>
          <button
            onClick={() => onOrder(item)}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-orange-600/50"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
