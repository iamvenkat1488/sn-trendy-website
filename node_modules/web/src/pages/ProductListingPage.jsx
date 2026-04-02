
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import pb from '@/lib/pocketbaseClient.js';

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: 0,
    maxPrice: 50000,
    sizes: [],
    colors: [],
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let filterQuery = 'enabled = true';

      if (filters.category) {
        filterQuery += ` && category = "${filters.category}"`;
      }

      if (filters.search) {
        filterQuery += ` && name ~ "${filters.search}"`;
      }

      if (filters.minPrice > 0 || filters.maxPrice < 50000) {
        filterQuery += ` && price >= ${filters.minPrice} && price <= ${filters.maxPrice}`;
      }

      let sort = '-created';
      if (filters.sortBy === 'price-low') sort = 'price';
      if (filters.sortBy === 'price-high') sort = '-price';

      const records = await pb.collection('products').getFullList({
        filter: filterQuery,
        sort,
        $autoCancel: false
      });

      setProducts(records);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Shop Products - SN Trendy Collections</title>
        <meta name="description" content="Browse our collection of premium sarees, kurtis, lehengas, and western wear at SN Trendy Collections." />
      </Helmet>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">
              {filters.category ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1) : 'All Products'}
            </h1>
            <p className="text-muted-foreground">{products.length} products found</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} space-y-6`}>
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold mb-4">Filters</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">All Categories</option>
                    <option value="sarees">Sarees</option>
                    <option value="kurtis">Kurtis</option>
                    <option value="lehengas">Lehengas</option>
                    <option value="western">Western Dresses</option>
                    <option value="daily-wear">Daily Wear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹0</span>
                      <span>₹{filters.maxPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <div className="space-y-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <label key={size} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-input"
                          checked={filters.sizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange('sizes', [...filters.sizes, size]);
                            } else {
                              handleFilterChange('sizes', filters.sizes.filter(s => s !== size));
                            }
                          }}
                        />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFilters({
                    category: '',
                    search: '',
                    minPrice: 0,
                    maxPrice: 50000,
                    sizes: [],
                    colors: [],
                    sortBy: 'newest'
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">No products found</p>
                <Button onClick={() => setFilters({
                  category: '',
                  search: '',
                  minPrice: 0,
                  maxPrice: 50000,
                  sizes: [],
                  colors: [],
                  sortBy: 'newest'
                })}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductListingPage;
