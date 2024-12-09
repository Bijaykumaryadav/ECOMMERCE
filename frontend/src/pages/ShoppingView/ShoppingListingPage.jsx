import ProductFilter from '@/components/ShoppingView/Filter'
import React from 'react'

function ShoppingListingPage() {
  return (
    <div className="gird grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter/>
    </div>
  )
}

export default ShoppingListingPage
