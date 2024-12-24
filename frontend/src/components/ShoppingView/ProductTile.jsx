import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { brandOptionsMap, categoryOptionsMap } from '@/config';
import { Link } from 'react-router-dom';
import { fetchProductDetails } from '@/features/shop/productSlice';
import { useDispatch } from 'react-redux';

function ShoppingProductTile({ product , handleAddtoCart }) {
  const dispatch = useDispatch();

  // Generate the productNameSlug from the product title
  const productNameSlug = product?.title
    ?.toLowerCase()
    ?.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with '-'
    ?.replace(/^-+|-+$/g, ''); // Remove leading or trailing '-'

  // // Function to fetch product details
  // const handleGetProductDetails = () => {
  //   if (!product?._id) return;

  //   dispatch(fetchProductDetails(product._id))
  //     .unwrap()
  //     .then((data) => {
  //       console.log('Fetched product details:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching product details:', error);
  //     });
  // };

  return (
    <Card className="w-full max-w-sm mx-auto">
      {/* Link to the product details page */}
      <Link
        to={`/shop/${productNameSlug}/${product?._id}`}
        // onClick={handleGetProductDetails}
      >
        <div className="relative">
          {/* Product Image */}
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {/* Sales Badge */}
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sales
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category] || 'Unknown Category'}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand] || 'Unknown Brand'}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? 'line-through' : ''
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
        {/* Add to Cart Button */}
        <CardFooter>
          <Button className="w-full" onClick={() => handleAddtoCart(product?._id)}>Add to cart</Button>
        </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
