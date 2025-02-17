import React, { useEffect, useState } from 'react';
import img from "../../assets/home/homepage1.webp";
import { useDispatch, useSelector } from 'react-redux';
import Address from '@/components/ShoppingView/Address';
import CartItemsContent from '@/components/Cart/CartItemsContent';
import { fetchCartItems } from '@/features/shop/cartSlice';
import { Button } from '@/components/ui/button';

function ShoppingCheckout() {
  const { addressList } = useSelector(state => state.shopAddress);
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.shopCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems(user?._id));
  }, [dispatch, user?._id]);

  // Calculate subtotal
  const subtotal = cartItems?.items?.reduce((sum, item) => 
    sum + (item?.salePrice > 0 ? item.salePrice : item?.price) * item?.quantity, 0) || 0;

  const shipping = 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const discount = 0; // Add logic for applied discounts if applicable
  const totalAmount = subtotal + shipping + tax - discount;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" alt="Checkout Background" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item) => (
              <CartItemsContent key={item._id} cartItems={item} />
            ))
          ) : (
            <p className="text-muted-foreground">Your cart is empty.</p>
          )}
          <div className="p-4 border-t mt-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="h-px bg-border my-3" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <Button className="w-full">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
