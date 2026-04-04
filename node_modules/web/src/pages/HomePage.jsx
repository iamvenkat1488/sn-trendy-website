import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import HeroCarousel from '@/components/HeroCarousel.jsx';
import pb from '@/lib/pocketbaseClient.js';

const HomePage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const trending = await pb.collection('products').getList(1, 4, {
        filter: 'enabled = true && tags ~ "Trending"',
        sort: '-rating,-reviews_count',
        $autoCancel: false
      });

      const arrivals = await pb.collection('products').getList(1, 4, {
        filter: 'enabled = true',
        sort: '-created',
        $autoCancel: false
      });

      // If no trending items, fallback to some items
      if (trending.items.length === 0) {
        const anyTrending = await pb.collection('products').getList(1, 4, {
          filter: 'enabled = true',
          sort: '-price',
          $autoCancel: false
        });
        setTrendingProducts(anyTrending.items);
      } else {
        setTrendingProducts(trending.items);
      }
      
      setNewArrivals(arrivals.items);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Sarees', slug: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop', description: 'Timeless elegance' },
    { name: 'Lehengas', slug: 'Lehengas', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&h=600&fit=crop', description: 'Bridal dreams' },
    { name: 'Dresses', slug: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop', description: 'Modern style' }
  ];

  return (
    <div className="bg-background">
      <Helmet>
        <title>SN Trendy Collections - Elegance in Every Thread</title>
        <meta name="description" content="Discover luxury fashion at SN Trendy Collections. Shop premium sarees, lehengas, and dresses." />
      </Helmet>
      
      <Header />

      <main>
        {/* Elegant Hero Section */}
        <section className="mb-12">
          <HeroCarousel />
        </section>

        {/* Categories Section - Clean & Classy */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center text-center mb-16 px-4">
            <span className="text-primary text-sm uppercase tracking-[0.2em] font-semibold mb-3">Curated Fashion</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">Shop by Category</h2>
            <div className="h-1 w-24 bg-primary/20 mt-2 mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="group animate-fade-in block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                  <div className="absolute bottom-10 left-0 right-0text-center flex flex-col items-center">
                    <div className="bg-white/95 backdrop-blur-sm px-8 py-4 shadow-lg min-w-[200px] text-center transform translate-y-2 group-hover:-translate-y-2 transition-transform duration-500">
                      <h3 className="font-display text-2xl font-semibold text-foreground mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">{category.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products / New Arrivals */}
        <section className="bg-secondary/30 py-24 border-y border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center mb-16 px-4">
              <span className="text-primary text-sm uppercase tracking-[0.2em] font-semibold mb-3">Just In</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">New Arrivals</h2>
              <div className="h-1 w-24 bg-primary/20 mt-2 mb-6"></div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            <div className="text-center mt-16">
              <Link to="/products">
                <Button size="lg" variant="outline" className="px-10 py-6 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300">
                  View All Collections
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Minimal Trending Section */}
        {trendingProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="flex flex-col items-center justify-center text-center mb-16 px-4">
              <span className="text-primary text-sm uppercase tracking-[0.2em] font-semibold mb-3">Most Loved</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">Trending Now</h2>
              <div className="h-1 w-24 bg-primary/20 mt-2 mb-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
