import React from 'react'
import ShoppingHeader from './ShoppingHeader'
import { Outlet } from 'react-router-dom'
import ShoppingSidebar from './ShoppingSidebar'

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      {/* <ShoppingSidebar/> */}
      {/* <ShoppingHeader/> */}
      <main className='flex flex-col w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout
