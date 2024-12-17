import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: 'Premium Leather Jacket',
    brand: 'Urban Styles',
    price: 249.99,
    rating: 4.5,
    reviewCount: 127,
    description: 'Elevate your style with this meticulously crafted leather jacket. Designed for both comfort and sophistication, it features premium quality leather and a tailored fit that complements any outfit.',
    features: [
      'Genuine leather construction',
      'Soft inner lining',
      'Multiple pockets',
      'Adjustable cuffs',
      'Versatile design for various occasions'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Dark Brown', hex: '#5D4037' }
    ],
    images: [
      '/api/placeholder/600/800',
      '/api/placeholder/600/800',
      '/api/placeholder/600/800',
      '/api/placeholder/600/800'
    ]
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div>
          <div className="mb-4 border rounded-lg overflow-hidden">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Product view ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer border-2 ${
                  mainImage === img ? 'border-black' : 'border-transparent'
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-3xl">{product.name}</CardTitle>
                <Button variant="ghost" size="icon">
                  <Heart className="text-red-500" />
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</h3>
                <Badge variant="outline">In Stock</Badge>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Color</h4>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <div 
                      key={color.name}
                      className="w-8 h-8 rounded-full border-2 cursor-pointer"
                      style={{ 
                        backgroundColor: color.hex,
                        borderColor: color.hex 
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Size</h4>
                <Select onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity Selection */}
              <div className="flex items-center space-x-4 mb-6">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  disabled={!selectedSize}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full"
                  disabled={!selectedSize}
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product Features */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Product Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;