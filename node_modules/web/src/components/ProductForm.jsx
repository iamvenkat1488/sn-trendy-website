
import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

const ProductForm = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: 'sarees',
    enabled: true
  });
  const [sizes, setSizes] = useState([{ size: 'S', stock: 0 }]);
  const [colors, setColors] = useState(['']);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        original_price: product.original_price || '',
        category: product.category || 'sarees',
        enabled: product.enabled !== false
      });
      setSizes(product.sizes || [{ size: 'S', stock: 0 }]);
      setColors(product.colors || ['']);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', parseFloat(formData.price));
      data.append('original_price', parseFloat(formData.original_price || 0));
      data.append('category', formData.category);
      data.append('enabled', formData.enabled);
      data.append('sizes', JSON.stringify(sizes.filter(s => s.size)));
      data.append('colors', JSON.stringify(colors.filter(c => c)));
      data.append('rating', 4.5);
      data.append('reviews_count', 0);

      images.forEach((image) => {
        data.append('images', image);
      });

      if (product) {
        await pb.collection('products').update(product.id, data, { $autoCancel: false });
        toast.success('Product updated successfully');
      } else {
        await pb.collection('products').create(data, { $autoCancel: false });
        toast.success('Product created successfully');
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const addSize = () => {
    setSizes([...sizes, { size: '', stock: 0 }]);
  };

  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (index, field, value) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  const addColor = () => {
    setColors([...colors, '']);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index, value) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="sarees">Sarees</option>
                <option value="kurtis">Kurtis</option>
                <option value="lehengas">Lehengas</option>
                <option value="western">Western Dresses</option>
                <option value="daily-wear">Daily Wear</option>
              </select>
            </div>

            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <input
                id="price"
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <Label htmlFor="original_price">Original Price (₹)</Label>
              <input
                id="original_price"
                type="number"
                min="0"
                step="0.01"
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Sizes & Stock</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSize}>
                <Plus className="h-4 w-4 mr-1" />
                Add Size
              </Button>
            </div>
            <div className="space-y-2">
              {sizes.map((size, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <select
                    value={size.size}
                    onChange={(e) => updateSize(index, 'size', e.target.value)}
                    className="px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Stock"
                    min="0"
                    value={size.stock}
                    onChange={(e) => updateSize(index, 'stock', parseInt(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSize(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Colors</Label>
              <Button type="button" variant="outline" size="sm" onClick={addColor}>
                <Plus className="h-4 w-4 mr-1" />
                Add Color
              </Button>
            </div>
            <div className="space-y-2">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Color name"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeColor(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="images">Product Images</Label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-sm text-muted-foreground mt-1">Upload up to 10 images</p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="enabled"
              type="checkbox"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="enabled" className="cursor-pointer">Enable product</Label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
