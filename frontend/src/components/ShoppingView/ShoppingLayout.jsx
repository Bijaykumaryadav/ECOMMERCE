import React from 'react';
import { Outlet } from 'react-router-dom';
// import ShoppingHeader from './ShoppingHeader';
// import ShoppingSidebar from './ShoppingSidebar';

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-background text-foreground overflow-hidden">
      {/* Common Header */}
      {/* <ShoppingSidebar /> */}
      {/* <ShoppingHeader /> */}
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
