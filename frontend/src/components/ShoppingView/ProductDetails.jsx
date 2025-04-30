import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '@/features/shop/productSlice';
import { useParams } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/features/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [error, setError] = useState(null);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {toast} = useToast();
  const { cartItems } = useSelector((state) => state.shopCart);


  
  const productDetails = useSelector((state) => 
    isDataFetched ? state.shopProducts.productDetails : null
  );

  console.log(productDetails,"productDetails");


function handleAddToCart(getCurrentProductId, getTotalStock) {
  let getCartItems = cartItems.items || [];

  if (getCartItems.length) {
    const indexOfCurrentItem = getCartItems.findIndex(
      (item) => item.productId === getCurrentProductId
    );
    if (indexOfCurrentItem > -1) {
      const getExistingQuantity = getCartItems[indexOfCurrentItem].quantity;
      const totalRequested = getExistingQuantity + quantity;

      if (totalRequested > getTotalStock) {
        toast({
          title: `Only ${getTotalStock - getExistingQuantity} more item(s) can be added`,
          variant: "destructive",
        });
        return;
      }
    }
  }

  dispatch(
    addToCart({
      userId: user?._id,
      productId: getCurrentProductId,
      quantity,
    })
  ).then((data) => {
    if (data) {
      dispatch(fetchCartItems(user?._id));
      toast({
        title: "Product added to cart",
      });
    }
  });
}


  useEffect(() => {
    const getProductData = async () => {
      try {
        setError(null);
        const response = await dispatch(fetchProductDetails(id)).unwrap();
        setIsDataFetched(true);
      } catch (err) {
        setError(err.message || 'Failed to fetch product details');
        setIsDataFetched(false);
      }
    };

    getProductData();
  }, [id]);

  useEffect(() => {
    if (productDetails?.image) {
      setMainImage(productDetails.image);
    }
  }, [productDetails]);

  if (!isDataFetched || !productDetails) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-xl">Loading product details...</div>
      </div>
    );
  }

  console.log({productDetails});

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  const productImages = [
    productDetails.image,
  ].filter(Boolean); 

  const sizes = ['XS', 'SM', 'MD', 'L', 'XL','2XL'];

  const handleQuantityDecrease = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity(Math.min(productDetails.totalStock, quantity + 1));
  };

  const formatPrice = (price) => Number(price).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div>
          <div className="mb-4 border rounded-lg overflow-hidden">
            <img 
              src={mainImage || productDetails.image} 
              alt={productDetails.title}
              className="w-full h-[500px] object-cover"
              onError={(e) => {
                e.target.src = '/api/placeholder/600/800';
                e.target.onerror = null;
              }}
            />
          </div>
          <div className="flex space-x-2">
            {productImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Product view ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer border-2 ${
                  mainImage === img ? 'border-black' : 'border-transparent'
                }`}
                onClick={() => setMainImage(img)}
                onError={(e) => {
                  e.target.src = '/api/placeholder/600/800';
                  e.target.onerror = null;
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-3xl">{productDetails.title}</CardTitle>
                <Button variant="ghost" size="icon">
                  <Heart className="text-red-500" />
                </Button>
              </div>
              {productDetails.brand && (
                <div className="text-gray-600">
                  Brand: {productDetails.brand}
                </div>
              )}
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    ${formatPrice(productDetails.salePrice)}
                  </h3>
                  {productDetails.price !== productDetails.salePrice && (
                    <span className="text-gray-500 line-through">
                      ${formatPrice(productDetails.price)}
                    </span>
                  )}
                </div>
                <Badge variant={productDetails.totalStock > 0 ? "outline" : "secondary"}>
                  {productDetails.totalStock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <p className="text-gray-600 mb-4">{productDetails.description}</p>

              {/* Size Selection */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Size</h4>
                <Select 
                  onValueChange={setSelectedSize}
                  disabled={productDetails.totalStock === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
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
                  onClick={handleQuantityDecrease}
                  disabled={productDetails.totalStock === 0}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleQuantityIncrease}
                  disabled={productDetails.totalStock === 0}
                >
                  +
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full"
                  disabled={!selectedSize || productDetails.totalStock === 0}
                >
                  Buy Now
                </Button>
              </div>

              {/* Stock Warning */}
              {productDetails.totalStock <= 5 && productDetails.totalStock > 0 && (
                <p className="text-red-500 text-sm mt-4">
                  Only {productDetails.totalStock} items left in stock!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-gray-600">Category: {productDetails.category}</li>
                <li className="text-gray-600">Stock: {productDetails.totalStock} units</li>
                {productDetails.updatedAt && (
                  <li className="text-gray-600">
                    Last Updated: {new Date(productDetails.updatedAt).toLocaleDateString()}
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;