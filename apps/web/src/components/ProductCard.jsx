
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);

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

  // Check for badges
  const hasNewBadge = product.tags?.includes('New Arrival');
  const hasTrendingBadge = product.tags?.includes('Trending');
  const hasBestSellerBadge = product.tags?.includes('Best Seller');
  const hasSaleBadge = product.tags?.includes('Sale') || discountPercent > 0;

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasSaleBadge && (
              <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {discountPercent}% OFF
              </div>
            )}
            {hasNewBadge && (
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                NEW
              </div>
            )}
            {hasTrendingBadge && (
              <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                🔥 TRENDING
              </div>
            )}
            {hasBestSellerBadge && (
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                ⭐ BEST SELLER
              </div>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toast('Wishlist feature coming soon');
            }}
            className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur rounded-full hover:bg-background hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <Heart className="h-4 w-4" />
          </button>
          
          {/* Quick View Overlay */}
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <Button
              onClick={handleQuickAdd}
              className="bg-white text-black hover:bg-white/90"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>
          
          {/* Category Badge */}
          <div className="mb-2">
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
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
          
          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-muted-foreground">Colors:</span>
              <div className="flex gap-1">
                {product.colors.slice(0, 4).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border-2 border-border"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={handleQuickAdd}
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            size="sm"
            variant="outline"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
