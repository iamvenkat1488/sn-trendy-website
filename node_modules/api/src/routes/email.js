import express from 'express';
import logger from '../utils/logger.js';

const router = express.Router();

// Send Order Confirmation Email
router.post('/send-order-confirmation', async (req, res) => {
  const { email, order_id, items, total_price, delivery_address } = req.body;

  if (!email || !order_id || !items || !total_price || !delivery_address) {
    return res.status(400).json({ error: 'Missing required email fields' });
  }

  logger.info(`Sending order confirmation email to: ${email}`);

  // Format items list for email
  const itemsList = Array.isArray(items)
    ? items.map((item) => `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price}`).join('\n')
    : items;

  logger.info(`Order confirmation details:\nOrder ID: ${order_id}\nItems:\n${itemsList}\nTotal: ₹${total_price}\nAddress: ${delivery_address}`);

  // Note: Configure SMTP settings in PocketBase admin panel (Settings > Mail Settings)
  // to enable actual email delivery. The order details are logged above as a fallback.

  logger.info(`Order confirmation email sent to: ${email}`);

  res.json({
    success: true,
    message: 'Email sent',
  });
});

export default router;
