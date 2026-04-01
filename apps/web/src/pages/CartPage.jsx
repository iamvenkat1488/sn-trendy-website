
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import pb from '@/lib/pocketbaseClient.js';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - SN Trendy Collections</title>
          <meta name="description" content="View your shopping cart at SN Trendy Collections." />
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
            <Link to="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart - SN Trendy Collections</title>
        <meta name="description" content="Review your shopping cart and proceed to checkout at SN Trendy Collections." />
      </Helmet>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const imageUrl = item.image 
                ? `${pb.baseUrl}/api/files/products/${item.id}/${item.image}?thumb=100x100`
                : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=100&h=100&fit=crop';

              return (
                <div key={`${item.id}-${item.size}-${item.color}`} className="bg-card rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center space-x-6">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-xl font-bold">₹{item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                    >
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-display text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Tax (18% GST)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full mb-3"
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>

              <Link to="/products">
                <Button variant="outline" className="w-full" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
