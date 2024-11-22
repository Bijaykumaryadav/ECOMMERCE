import React from 'react'
import { Footer, Header } from '../../components/Layout';
import { Outlet } from 'react-router-dom';

function LayoutPage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default LayoutPage
