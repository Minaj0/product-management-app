import React from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { ProductActions } from '../components/ProductActions'
import { ProductCard } from '../components/ProductCard'

export const Homepage = () => {
  return (
    <div className='mainlayout min-h-screen bg-pri text-sec font-script'>
      {/* navbar */}
      <Navbar />
      {/* header */}
      <ProductActions />
      {/* rest of the contents */}
      <div className='flex'>
        {/* sidebar */}
        <div>
          <Sidebar />
        </div>
        {/* main content */}
        <div flex-1>
          <ProductCard />
        </div>
      </div>
    </div>
  )
}
