
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ShoppingCart, Heart, Star, Minus, Plus, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import siteConfig from '@/config/siteConfig.js';
import pb from '@/lib/pocketbaseClient.js';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const record = await pb.collection('products').getOne(id, { $autoCancel: false });
      setProduct(record);

      if (record.sizes?.length > 0) {
        setSelectedSize(record.sizes[0].size);
      }
      if (record.colors?.length > 0) {
        setSelectedColor(record.colors[0]);
      }

      const similar = await pb.collection('products').getList(1, 4, {
        filter: `category = "${record.category}" && id != "${id}" && enabled = true`,
        sort: '-created',
        $autoCancel: false
      });
      setSimilarProducts(similar.items);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success('Added to cart');
  };

  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    const message = `Hi! I want to order:

📦 Product: ${product.name}
💰 Price: ₹${product.price}
📏 Size: ${selectedSize}
🎨 Color: ${selectedColor}
🔢 Quantity: ${quantity}

Total: ₹${(product.price * quantity).toLocaleString()}

Please confirm availability and delivery details.`;
    
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStockStatus = () => {
    if (!product?.sizes || !selectedSize) return 'Select size';
    const sizeData = product.sizes.find(s => s.size === selectedSize);
    if (!sizeData) return 'Out of stock';
    if (sizeData.stock === 0) return 'Out of stock';
    if (sizeData.stock < 5) return 'Low stock';
    return 'In stock';
  };

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) return null;

  const discountPercent = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const currentImage = product.images?.[currentImageIndex]
    ? pb.files.getUrl(product, product.images[currentImageIndex])
    : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop';

  return (
    <>
      <Helmet>
        <title>{`${product.name} - SN Trendy Collections`}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {product.images?.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={pb.files.getUrl(product, img, { thumb: '100x100' })}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-display text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews_count || 0} reviews)
                </span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-4xl font-bold text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.original_price.toLocaleString()}
                    </span>
                    <span className="text-lg font-semibold text-destructive">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {product.sizes?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Select Size</label>
                  <span className={`text-sm font-medium ${
                    getStockStatus() === 'In stock' ? 'text-green-600' :
                    getStockStatus() === 'Low stock' ? 'text-orange-600' :
                    'text-destructive'
                  }`}>
                    {getStockStatus()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sizeData) => (
                    <button
                      key={sizeData.size}
                      onClick={() => setSelectedSize(sizeData.size)}
                      disabled={sizeData.stock === 0}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedSize === sizeData.size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : sizeData.stock === 0
                          ? 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                          : 'border-input hover:border-primary'
                      }`}
                    >
                      {sizeData.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors?.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-3 block">Select Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input hover:border-primary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Order on WhatsApp
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                💬 Order via WhatsApp for instant confirmation & COD option
              </p>
            </div>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => toast('Wishlist feature coming soon')}
            >
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </Button>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-bold mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductDetailPage;
