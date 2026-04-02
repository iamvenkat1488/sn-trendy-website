
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient.js';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    mobileNumber: currentUser?.phone || ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
    }
  }, [isAuthenticated, cartItems, navigate]);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      toast.error('Please enter a valid mobile number');
      return;
    }

    setLoading(true);

    try {
      const deliveryAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`;

      // TODO: Re-enable Razorpay payment flow when ready
      // const scriptLoaded = await loadRazorpayScript(); ...

      const createOrderResponse = await apiServerClient.fetch('/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          items: cartItems,
          subtotal,
          tax,
          total_price: total,
          delivery_address: deliveryAddress,
          mobile_number: formData.mobileNumber,
        })
      });

      if (!createOrderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderRecord = await createOrderResponse.json();

      await apiServerClient.fetch('/send-order-confirmation-email/send-order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          order_id: orderRecord.id,
          items: cartItems,
          total_price: total,
          delivery_address: deliveryAddress
        })
      });

      clearCart();
      toast.success('Order placed successfully');
      navigate(`/confirmation/${orderRecord.id}`);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout - SN Trendy Collections</title>
        <meta name="description" content="Complete your purchase at SN Trendy Collections." />
      </Helmet>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Delivery Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      required
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Mumbai"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State</Label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="400001"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-display text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} ({item.size}) x {item.quantity}
                    </span>
                    <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CheckoutPage;
