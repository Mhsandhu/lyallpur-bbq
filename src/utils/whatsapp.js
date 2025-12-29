import { siteConfig } from '../config/siteConfig';

export const buildWhatsAppMessage = (orderData) => {
  const { orderType, items, customer, subtotal, deliveryFee, grandTotal } = orderData;

  let message = `LYALLPUR BAR-B-Q - New Order\n`;
  message += `Open: ${siteConfig.timings}\n`;
  message += `Order Type: ${orderType}\n\n`;
  message += `Items:\n`;

  items.forEach((item) => {
    const lineTotal = item.price * item.quantity;
    message += `- ${item.name} (${item.portion}) x${item.quantity} = Rs ${lineTotal}\n`;
  });

  message += `\nSubtotal: Rs ${subtotal}\n`;
  if (orderType === 'Delivery') {
    message += `Delivery Fee: Rs ${deliveryFee}\n`;
  }
  message += `Grand Total: Rs ${grandTotal}\n\n`;
  message += `Customer:\n`;
  message += `Name: ${customer.name}\n`;
  message += `Phone: ${customer.phone}\n`;
  if (orderType === 'Delivery' && customer.address) {
    message += `Address: ${customer.address}\n`;
  }
  if (customer.notes) {
    message += `Notes: ${customer.notes}\n`;
  }

  return message;
};

export const openWhatsApp = (orderData) => {
  const message = buildWhatsAppMessage(orderData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

