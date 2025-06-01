import React from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { ProductActions } from '../components/ProductActions'
import { ProductCard } from '../components/ProductCard'
import { Breadcrumbs } from '../components/Breadcrumbs'

export const Homepage = () => {
  return (
    <div className='mainlayout min-h-screen bg-pri text-sec font-script'>
      {/* navbar */}
      <Navbar />
      {/* header */}
      <div className="header flex items-center mx-5">
        <Breadcrumbs />
        <ProductActions />
      </div>
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
