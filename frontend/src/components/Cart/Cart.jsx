import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Minus, Plus, Trash2, ShoppingCart, Tag, Check, X, Info } from "lucide-react";

export default function Cart() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      color: "Space Gray",
      sku: "WH-001"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      color: "Black",
      sku: "SW-002"
    }
  ]);

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [savedForLater, setSavedForLater] = useState([]);

  const validCoupons = {
    "SAVE20": { discount: 0.2, type: "percentage" },
    "FREESHIP": { discount: 9.99, type: "shipping" }
  };

  const updateQuantity = (id, change) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const removeItem = (id) => {
    const itemToRemove = items.find(item => item.id === id);
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    setSavedForLater(prev => [...prev, itemToRemove]);
  };

  const moveToCart = (id) => {
    const itemToMove = savedForLater.find(item => item.id === id);
    setSavedForLater(prev => prev.filter(item => item.id !== id));
    setItems(prev => [...prev, itemToMove]);
  };

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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discount = subtotal * appliedCoupon.discount;
    } else if (appliedCoupon.type === "shipping") {
      discount = appliedCoupon.discount;
    }
  }
  
  const total = subtotal + shipping + tax - discount;

  // [Rest of the JSX remains the same...]
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* [Previous JSX code remains exactly the same...] */}
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
                    {items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-md object-cover border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      <p className="text-sm font-medium text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 rounded-full bg-background"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 rounded-full bg-background"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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

            {/* Saved for Later */}
            {savedForLater.length > 0 && (
              <Card className="mt-6 border-border">
                <div className="p-6">
                  <h2 className="text-lg font-semibold">Saved for Later</h2>
                  <div className="mt-4 space-y-4">
                    {savedForLater.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-md object-cover border border-border"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveToCart(item.id)}
                          className="bg-background"
                        >
                          Move to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="border-border sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal ({items.length} items)</span>
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
                    <span>${total.toFixed(2)}</span>
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