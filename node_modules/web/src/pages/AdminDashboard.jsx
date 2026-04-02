
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductForm from '@/components/ProductForm.jsx';
import pb from '@/lib/pocketbaseClient.js';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('products').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setProducts(records);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('orders').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setOrders(records);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProduct = async (product) => {
    try {
      await pb.collection('products').update(product.id, {
        enabled: !product.enabled
      }, { $autoCancel: false });
      toast.success(product.enabled ? 'Product disabled' : 'Product enabled');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await pb.collection('products').delete(productId, { $autoCancel: false });
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await pb.collection('orders').update(orderId, {
        order_status: status
      }, { $autoCancel: false });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - SN Trendy Collections</title>
        <meta name="description" content="Manage products and orders at SN Trendy Collections." />
      </Helmet>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>
          {activeTab === 'products' && (
            <Button onClick={() => {
              setEditingProduct(null);
              setShowProductForm(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>

        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-2 font-medium transition-colors duration-200 ${
              activeTab === 'products'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-2 font-medium transition-colors duration-200 ${
              activeTab === 'orders'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Orders
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-muted/50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.images?.[0] 
                                ? pb.files.getUrl(product, product.images[0], { thumb: '100x100' })
                                : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=100&h=100&fit=crop'
                              }
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 capitalize">{product.category}</td>
                        <td className="px-6 py-4 font-semibold">₹{product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            product.enabled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.enabled ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleProduct(product)}
                            >
                              {product.enabled ? (
                                <ToggleRight className="h-5 w-5 text-green-600" />
                              ) : (
                                <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingProduct(product);
                                setShowProductForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Payment</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/50 transition-colors duration-200">
                        <td className="px-6 py-4 font-mono text-sm">{order.id.slice(0, 8)}</td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(order.created).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-semibold">₹{order.total_price?.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className="capitalize text-sm">{order.payment_status}</span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.order_status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="px-3 py-1 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">No orders yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            fetchProducts();
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;
