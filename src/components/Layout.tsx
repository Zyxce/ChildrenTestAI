// src/components/Layout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
