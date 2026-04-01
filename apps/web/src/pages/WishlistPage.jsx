
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import pb from '@/lib/pocketbaseClient.js';

const WishlistPage = () => {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const records = await pb.collection('wishlist').getFullList({
        filter: `user_id = "${currentUser.id}"`,
        sort: '-created',
        $autoCancel: false
      });

      const productIds = records.map(r => r.product_id);
      if (productIds.length > 0) {
        const products = await pb.collection('products').getFullList({
          filter: productIds.map(id => `id = "${id}"`).join(' || '),
          $autoCancel: false
        });
        setWishlistItems(products);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const wishlistRecord = await pb.collection('wishlist').getFirstListItem(
        `user_id = "${currentUser.id}" && product_id = "${productId}"`,
        { $autoCancel: false }
      );
      await pb.collection('wishlist').delete(wishlistRecord.id, { $autoCancel: false });
      setWishlistItems(prev => prev.filter(item => item.id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleAddToCart = (product) => {
    const defaultSize = product.sizes?.[0]?.size || 'M';
    const defaultColor = product.colors?.[0] || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
    toast.success('Added to cart');
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist - SN Trendy Collections</title>
        <meta name="description" content="View your saved items at SN Trendy Collections." />
      </Helmet>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold mb-8">My Wishlist</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const imageUrl = product.images?.[0] 
                ? pb.files.getUrl(product, product.images[0], { thumb: '300x300' })
                : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop';

              return (
                <div key={product.id} className="bg-card rounded-2xl overflow-hidden shadow-sm">
                  <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1 hover:text-primary transition-colors duration-200">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-xl font-bold mb-4">₹{product.price.toLocaleString()}</p>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => handleRemove(product.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love for later</p>
            <Link to="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default WishlistPage;
