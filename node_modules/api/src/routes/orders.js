import express from 'express';
import pocketbaseClient from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Create Order
router.post('/create', async (req, res) => {
  const {
    user_id,
    items,
    subtotal,
    tax,
    total_price,
    delivery_address,
    mobile_number,
    razorpay_order_id,
    razorpay_payment_id,
  } = req.body;

  if (!user_id || !items || !total_price || !delivery_address || !mobile_number) {
    return res.status(400).json({ error: 'Missing required order fields' });
  }

  logger.info(`Creating order for user: ${user_id}`);

  const orderData = {
    user_id,
    items: JSON.stringify(items),
    subtotal: subtotal || 0,
    tax: tax || 0,
    total_price,
    delivery_address,
    mobile_number,
    razorpay_order_id: razorpay_order_id || '',
    razorpay_payment_id: razorpay_payment_id || '',
    status: 'pending',
    payment_status: 'pending',
    order_status: 'pending',
  };

  const createdOrder = await pocketbaseClient.collection('orders').create(orderData);

  logger.info(`Order created successfully: ${createdOrder.id}`);

  res.json({
    id: createdOrder.id,
    order_id: createdOrder.id,
    created_at: createdOrder.created,
  });
});

export default router;
