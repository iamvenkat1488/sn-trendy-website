import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import logger from '../utils/logger.js';

const router = express.Router();

let razorpayInstance = null;

// Initialize Razorpay only if credentials are available
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    logger.info('Razorpay initialized successfully');
  } catch (error) {
    logger.warn('Failed to initialize Razorpay:', error.message);
  }
} else {
  logger.warn('Razorpay credentials not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env to enable Razorpay payments.');
}

// Create Razorpay Order
router.post('/create-order', async (req, res, next) => {
  try {
    if (!razorpayInstance) {
      return res.status(503).json({ error: 'Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.' });
    }

    const { amount, currency, receipt, notes } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required' });
    }

    logger.info(`Creating Razorpay order: amount=${amount}, currency=${currency}`);

    const order = await razorpayInstance.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    });

    logger.info(`Razorpay order created: ${order.id}`);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    next(error);
  }
});

// Verify Payment Signature
router.post('/verify-payment', async (req, res, next) => {
  try {
    if (!razorpayInstance) {
      return res.status(503).json({ error: 'Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required payment verification fields' });
    }

    logger.info(`Verifying payment: order_id=${razorpay_order_id}, payment_id=${razorpay_payment_id}`);

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      logger.error(`Payment verification failed for order ${razorpay_order_id}`);
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    logger.info(`Payment verified successfully: ${razorpay_order_id}`);

    res.json({
      success: true,
      message: 'Payment verified',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
