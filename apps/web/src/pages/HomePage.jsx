import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import TrustBadges from '@/components/TrustBadges.jsx';
import WhatsAppButton from '@/components/WhatsAppButton.jsx';
import CustomerReviews from '@/components/CustomerReviews.jsx';
import HeroCarousel from '@/components/HeroCarousel.jsx';
import WhyChooseUs from '@/components/WhyChooseUs.jsx';
import Newsletter from '@/components/Newsletter.jsx';
import InstagramGallery from '@/components/InstagramGallery.jsx';
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
      const trending = await pb.collection('products').getList(1, 6, {
        filter: 'enabled = true',
        sort: '-rating,-reviews_count',
        $autoCancel: false
      });

      const arrivals = await pb.collection('products').getList(1, 6, {
        filter: 'enabled = true',
        sort: '-created',
        $autoCancel: false
      });

      setTrendingProducts(trending.items);
      setNewArrivals(arrivals.items);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Sarees', slug: 'sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop', description: 'Timeless elegance' },
    { name: 'Kurtis', slug: 'kurtis', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&h=600&fit=crop', description: 'Everyday chic' },
    { name: 'Lehengas', slug: 'lehengas', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&h=600&fit=crop', description: 'Bridal dreams' },
    { name: 'Western Dresses', slug: 'western', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop', description: 'Modern style' }
  ];

  return (
    <>
      <Helmet>
        <title>SN Trendy Collections - Elegance in Every Thread | Premium Ethnic & Western Wear</title>
        <meta name="description" content="Discover luxury fashion at SN Trendy Collections. Shop premium sarees, kurtis, lehengas, and western wear. Latest trends, affordable prices, trusted by 10,000+ customers." />
      </Helmet>
      <Header />

      <HeroCarousel />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground">Explore our curated collections</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-muted shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-medium mb-1 text-white/80">{category.description}</p>
                  <h3 className="font-display text-2xl font-bold">{category.name}</h3>
                  <div className="mt-3 inline-flex items-center text-sm font-medium group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <TrustBadges />

      <section className="bg-secondary/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Trending Now</h2>
            <p className="text-lg text-muted-foreground">Handpicked styles our customers love</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/products">
                  <Button size="lg" variant="outline" className="px-8">
                    View All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <WhyChooseUs />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">New Arrivals</h2>
          <p className="text-lg text-muted-foreground">Fresh styles just for you</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <CustomerReviews />

      <InstagramGallery />

      <Newsletter />

      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default HomePage;
