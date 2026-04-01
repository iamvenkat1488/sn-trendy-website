
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import pb from '@/lib/pocketbaseClient.js';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const record = await pb.collection('orders').getOne(id, { $autoCancel: false });
      setOrder(record);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold mb-4">Order not found</h2>
            <Link to="/profile">
              <Button>View Orders</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const estimatedDelivery = new Date(order.created);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <>
      <Helmet>
        <title>Order Confirmation - SN Trendy Collections</title>
        <meta name="description" content="Your order has been confirmed at SN Trendy Collections." />
      </Helmet>
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold mb-2">Order Confirmed</h1>
          <p className="text-xl text-muted-foreground">Thank you for your purchase</p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-semibold">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Date</p>
              <p className="font-semibold">{new Date(order.created).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
              <p className="font-semibold capitalize">{order.payment_status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Status</p>
              <p className="font-semibold capitalize">{order.order_status}</p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">₹{order.subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground">Tax (18% GST)</span>
              <span className="font-semibold">₹{order.tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t">
              <span>Total</span>
              <span>₹{order.total_price?.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-display text-xl font-bold mb-3">Delivery Address</h3>
            <p className="text-muted-foreground">{order.delivery_address}</p>
            <p className="text-muted-foreground mt-2">Mobile: {order.mobile_number}</p>
          </div>

          <div className="bg-muted rounded-xl p-4 flex items-start space-x-3">
            <Package className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Estimated Delivery</p>
              <p className="text-sm text-muted-foreground">
                Your order will be delivered by {estimatedDelivery.toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link to="/profile" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              View All Orders
            </Button>
          </Link>
          <Link to="/products" className="flex-1">
            <Button className="w-full" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
