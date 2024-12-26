import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Minus, Plus, Trash2, ShoppingCart, Tag, Check, X, Info } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import CartItemsContent from './CartItemsContent';
import { fetchCartItems } from '@/features/shop/cartSlice';

export default function Cart() {
  const {cartItems} = useSelector((state) => state.shopCart);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = cartItems && cartItems.items && cartItems.items.length > 0 
    ? cartItems.items.reduce((sum, currentItem) => sum + (
      currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem?.price
    ) * currentItem?.quantity, 0)
    : 0;

  const shipping = 9.99;
  const tax = subtotal * 0.08; // 8% tax

  useEffect(() => {
    dispatch(fetchCartItems(user?._id))
  }, [dispatch, user?._id]);

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [savedForLater, setSavedForLater] = useState([]);

  const validCoupons = {
    "SAVE20": { discount: 0.2, type: "percentage" },
    "FREESHIP": { discount: 9.99, type: "shipping" }
  };

  // Calculate discount based on applied coupon
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discount = subtotal * appliedCoupon.discount;
    } else if (appliedCoupon.type === "shipping") {
      discount = appliedCoupon.discount;
    }
  }

  // Calculate total including all components
  const totalCartAmount = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (validCoupons[coupon]) {
      setAppliedCoupon({
        code: coupon,
        ...validCoupons[coupon]
      });
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Cart Section */}
          <div className="lg:w-2/3">
            <Card className="border-border">
              <div className="border-b border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                  </div>
                  <span className="text-muted-foreground">
                    {cartItems?.items?.length || 0} items
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                  cartItems.items.map((item) => (
                    <CartItemsContent key={item._id} cartItems={item} />
                  ))
                ) : (
                  <p className="text-muted-foreground">Your cart is empty.</p>
                )}
              </div>

              {/* Coupon Section */}
              <div className="p-6 border-t border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <span className="font-medium">Apply Coupon Code</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                        className="max-w-xs bg-background"
                      />
                      <Button
                        onClick={applyCoupon}
                        disabled={!coupon}
                        variant="secondary"
                        className="whitespace-nowrap"
                      >
                        Apply Code
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-destructive text-sm mt-1">{couponError}</p>
                    )}
                  </div>
                  {appliedCoupon && (
                    <div className="bg-success/20 text-success-foreground px-4 py-2 rounded-md flex items-center space-x-2">
                      <Check className="h-4 w-4" />
                      <span>
                        {appliedCoupon.type === "percentage" 
                          ? `${appliedCoupon.discount * 100}% discount applied`
                          : "Free shipping applied"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeCoupon}
                        className="text-success-foreground hover:bg-success/30"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="border-border sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal ({cartItems?.items?.length || 0} items)</span>
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
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="h-px bg-border my-4" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalCartAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span>30-day easy returns</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}