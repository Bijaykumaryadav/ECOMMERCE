import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'

function AdminLayout() {
  return (
    <div>
      <AdminHeader/>
      <AdminSidebar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout
