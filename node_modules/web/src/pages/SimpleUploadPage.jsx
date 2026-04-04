import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';

const SimpleUploadPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: 'Sarees',
    fabric: '',
    occasion: '',
    colors: [],
    colorInput: '',
  });
  
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    setImages([...images, ...files]);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast.error('Please fill product name and price');
      return;
    }

    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    if (formData.colors.length === 0) {
      toast.error('Please add at least one color variety');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', parseFloat(formData.price));
      data.append('original_price', formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price));
      data.append('description', formData.description || `Beautiful ${formData.name.toLowerCase()}`);
      data.append('category', formData.category);
      data.append('enabled', true);
      data.append('rating', 4.5);
      data.append('reviews_count', 0);
      
      // Add colors
      data.append('colors', JSON.stringify(formData.colors));
      
      // Add sizes based on category
      const sizes = formData.category === 'Sarees' 
        ? [{ size: 'Free Size', stock: 10 }]
        : [
            { size: 'S', stock: 5 },
            { size: 'M', stock: 5 },
            { size: 'L', stock: 5 },
            { size: 'XL', stock: 5 },
            { size: 'XXL', stock: 5 }
          ];
      data.append('sizes', JSON.stringify(sizes));
      
      // Add tags
      const tags = ['New Arrival'];
      if (formData.fabric) tags.push(formData.fabric);
      if (formData.occasion) tags.push(formData.occasion);
      data.append('tags', JSON.stringify(tags));

      // Add images
      images.forEach((image, index) => {
        data.append('images', image);
      });

      await pb.collection('products').create(data);
      
      toast.success('Product uploaded successfully! 🎉');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        originalPrice: '',
        description: '',
        category: 'Sarees',
        fabric: '',
        occasion: '',
        colors: [],
        colorInput: '',
      });
      setImages([]);
      setImagePreviews([]);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-3xl shadow-xl p-8 border border-border/50">
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl font-bold mb-2">Upload New Product</h1>
              <p className="text-muted-foreground">Easily add new arrivals to your boutique collection</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-3">Product Images (Max 10)</label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-border group">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 10 && (
                    <label className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors bg-secondary/50 hover:bg-secondary">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Red Silk Saree"
                  className="w-full px-4 py-3 rounded-xl border border-input focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-input focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="Sarees">Sarees</option>
                  <option value="Lehengas">Lehengas</option>
                  <option value="Dresses">Dresses</option>
                </select>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="2999"
                    className="w-full px-4 py-3 rounded-xl border border-input focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="3999"
                    className="w-full px-4 py-3 rounded-xl border border-input focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Colors - Multiple Varieties */}
              <div className="p-4 bg-muted/30 rounded-xl border border-border">
                <label className="block text-sm font-medium mb-1">Color Varieties *</label>
                <p className="text-xs text-muted-foreground mb-3">Add all the available colors for this item (e.g. Red, Blue, Pink). They will show up as selectable options.</p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={formData.colorInput}
                    onChange={(e) => setFormData({ ...formData, colorInput: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (formData.colorInput.trim() && !formData.colors.includes(formData.colorInput.trim())) {
                          setFormData({
                            ...formData,
                            colors: [...formData.colors, formData.colorInput.trim()],
                            colorInput: ''
                          });
                        }
                      }
                    }}
                    placeholder="Enter a color and press Enter or Add"
                    className="flex-1 px-4 py-3 rounded-xl border border-input focus:border-primary focus:outline-none transition-colors"
                  />
                  <Button 
                    type="button" 
                    onClick={() => {
                      if (formData.colorInput.trim() && !formData.colors.includes(formData.colorInput.trim())) {
                        setFormData({
                          ...formData,
                          colors: [...formData.colors, formData.colorInput.trim()],
                          colorInput: ''
                        });
                      }
                    }}
                    className="px-6 rounded-xl shrink-0"
                  >
                    Add
                  </Button>
                </div>
                
                {formData.colors.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.colors.map((c, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <div className="w-3 h-3 rounded-full mr-2 border border-primary/20" style={{backgroundColor: c.toLowerCase()}}></div>
                        {c}
                        <button 
                          type="button" 
                          onClick={() => setFormData({...formData, colors: formData.colors.filter((_, idx) => idx !== i)})}
                          className="ml-2 text-primary/50 hover:text-primary transition-colors focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Fabric & Occasion */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fabric</label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="Silk, Cotton, Georgette"
                    className="w-full px-4 py-3 rounded-xl border border-input focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Occasion</label>
                  <input
                    type="text"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    placeholder="Wedding, Party, Daily"
                    className="w-full px-4 py-3 rounded-xl border border-input focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Beautiful saree perfect for special occasions..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-input focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 text-lg"
                size="lg"
              >
                {loading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Product
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SimpleUploadPage;
