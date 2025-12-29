import { useState } from 'react';
import MenuCard from './MenuCard';

function MenuGrid({ items, onView, onOrder }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(items.map(item => item.category))];

  // Filter items by category
  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 text-lg">No items found. Try a different search.</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-16 px-4 animate-fade-in">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Special BBQ Menu
          </h2>
          <p className="text-gray-600 text-lg">Explore our delicious selection</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No items in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <MenuCard item={item} onView={onView} onOrder={onOrder} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MenuGrid;
