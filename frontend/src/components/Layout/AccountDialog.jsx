import React from 'react';
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { 
  User, 
  Settings, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  Truck,
  CreditCard 
} from "lucide-react";

const UserMenuSheet = ({ open, onOpenChange }) => {
  const handleLogout = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} side="right">
      <SheetContent className="w-[300px] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle>Account Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-1 mt-6">
          <Link 
            to="/profile"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <User size={20} />
            <span>My Profile</span>
          </Link>

          <Link 
            to="/orders"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <ShoppingBag size={20} />
            <span>My Orders</span>
          </Link>

          <Link 
            to="/wishlist"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <Heart size={20} />
            <span>Wishlist</span>
          </Link>

          <Link 
            to="/shipping-address"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <Truck size={20} />
            <span>Shipping Addresses</span>
          </Link>

          <Link 
            to="/payment-methods"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <CreditCard size={20} />
            <span>Payment Methods</span>
          </Link>

          <Link 
            to="/account-settings"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <Settings size={20} />
            <span>Account Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-red-500 w-full text-left mt-4"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenuSheet;