import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Truck, Menu, X } from 'lucide-react'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/attendance', icon: Users, label: 'Attendance' },
    { path: '/transport', icon: Truck, label: 'Transport' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${
          isOpen ? 'w-64' : 'w-0'
        } bg-blue-900 text-white transition-all duration-300 overflow-hidden md:w-64 md:relative absolute h-full z-40`}
      >
        <div className="p-6 mt-12 md:mt-0">
          <h1 className="text-2xl font-bold mb-8">QSSR</h1>
          <nav className="space-y-4">
            {menuItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(path)
                    ? 'bg-orange-500 text-white'
                    : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar