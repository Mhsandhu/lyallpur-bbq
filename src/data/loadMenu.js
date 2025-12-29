import { menuItems as fallbackMenu } from './menu';

let cachedMenu = null;

export const loadMenu = async () => {
  // Return cached menu if available
  if (cachedMenu) {
    return cachedMenu;
  }

  try {
    const response = await fetch('/data/menu.json');
    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }
    const data = await response.json();
    
    // Convert string IDs to numbers for compatibility
    const items = data.items.map(item => ({
      ...item,
      id: parseInt(item.id, 10) || item.id,
    }));
    
    cachedMenu = items;
    return items;
  } catch (error) {
    console.warn('Failed to load menu from CMS, using fallback:', error);
    // Return fallback menu data
    return fallbackMenu;
  }
};

// Preload menu on module load
loadMenu();

