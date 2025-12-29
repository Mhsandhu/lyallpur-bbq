import { siteConfig } from '../config/siteConfig';

function InfoBar() {
  return (
    <div className="bg-gray-800 text-white py-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="text-orange-400">⏰</span>
            <span>{siteConfig.timings}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400">🚚</span>
            <span>Delivery Fee: Rs {siteConfig.deliveryFee}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400">📍</span>
            <span className="hidden sm:inline">{siteConfig.address}</span>
            <span className="sm:hidden">Faisalabad</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoBar;

