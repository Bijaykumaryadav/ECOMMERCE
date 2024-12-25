import React from 'react'
import { Button } from '../ui/button';
import {Minus,Plus, Trash} from "lucide-react"
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem } from '@/features/shop/cartSlice';

function CartItemsContent({cartItems}) {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  function handleCartItemDelete(getCartItem){
    dispatch(deleteCartItem({userId:user?._id,productId:getCartItem?.productId}));
  }

  return (
    <div className = "flex items-center space-x-4 border rounded p-4">
        <img src={cartItems?.image} alt={cartItems?.title} className = "w-20 h-20 rounded object-cover"/>
        <div className="flex-1">
          <h3 className="font-extrabold">{cartItems?.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Button variant="outline" className='h-8 w-8 rounded-full' size="icon">
              <Minus className="w-4 h-4"/>
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold">{cartItems?.quantity}</span>
            <Button variant="outline" className='h-8 w-8 rounded-full' size="icon">
              <Plus className="w-4 h-4"/>
              <span className="sr-only">Decrease</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">${(
            (cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity
            ).toFixed(2)}</p>
            <Trash className="cursor-pointer mt-1" size={20} onClick={()=> handleCartItemDelete(cartItems)}/>
        </div>
    </div>
  )
}

export default CartItemsContent