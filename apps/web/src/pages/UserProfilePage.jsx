
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { User, Package, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';

const UserProfilePage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const records = await pb.collection('orders').getList(1, 10, {
        filter: `user_id = "${currentUser.id}"`,
        sort: '-created',
        $autoCancel: false
      });
      setOrders(records.items);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile - SN Trendy Collections</title>
        <meta name="description" content="Manage your profile and view your orders at SN Trendy Collections." />
      </Helmet>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">{currentUser?.name}</h2>
                  <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Link to="/profile">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Profile Information
                  </Button>
                </Link>
                <Link to="/wishlist">
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">Order History</h2>
                <Package className="h-6 w-6 text-muted-foreground" />
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border rounded-xl p-4 hover:border-primary transition-colors duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold mb-1">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{order.total_price?.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground capitalize">{order.order_status}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <p className="text-sm text-muted-foreground">
                          {order.items?.length || 0} items
                        </p>
                        <Link to={`/confirmation/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground mb-4">No orders yet</p>
                  <Link to="/products">
                    <Button>Start Shopping</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfilePage;
