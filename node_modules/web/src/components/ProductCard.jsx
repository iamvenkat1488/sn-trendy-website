
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    const defaultSize = product.sizes?.[0]?.size || 'M';
    const defaultColor = product.colors?.[0] || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
    toast.success('Added to cart');
  };

  const imageUrl = product.images?.[0] 
    ? pb.files.getUrl(product, product.images[0], { thumb: '300x300' })
    : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop';

  const discountPercent = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold">
              {discountPercent}% OFF
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toast('Wishlist feature coming soon');
            }}
            className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition-colors duration-200"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating || 0)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews_count || 0})</span>
          </div>

          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-2xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.original_price && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.original_price.toLocaleString()}
              </span>
            )}
          </div>

          <Button
            onClick={handleQuickAdd}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
