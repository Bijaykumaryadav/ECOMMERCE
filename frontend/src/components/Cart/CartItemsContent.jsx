import React from 'react'

function CartItemsContent({cartItems}) {
  return (
    <div className = "flex items-center space-x-4 ">
        <img src={cartItems?.image} alt={cartItems?.title} className = "w-20 h-20 rounded object-cover"/>
    </div>
  )
}

export default CartItemsContent
