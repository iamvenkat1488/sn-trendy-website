import { Router } from 'express';
import healthCheck from './health-check.js';
// import razorpayRouter from './razorpay.js'; // TODO: re-enable when Razorpay is configured
import ordersRouter from './orders.js';
import emailRouter from './email.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    // router.use('/razorpay', razorpayRouter); // TODO: re-enable when Razorpay is configured
    router.use('/orders', ordersRouter);
    router.use('/send-order-confirmation-email', emailRouter);

    return router;
};
