import MenuCard from './MenuCard';

function FeaturedSection({ featuredItems, onView, onOrder }) {
  return (
    <section className="bg-gray-50 py-16 px-4 animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Today's Best Sellers
          </h2>
          <p className="text-gray-600 text-lg">Most loved by our customers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredItems.map((item) => (
            <div key={item.id} className="animate-slide-up">
              <MenuCard item={item} onView={onView} onOrder={onOrder} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;

