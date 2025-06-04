// src/components/Header.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const location = useLocation()

  return (
    <header className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Детский психологический тест
        </Link>

        {location.pathname !== '/' && (
          <Link to="/" className="text-sm underline">
            На главную
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
