import React from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { ProductCard } from '../components/ProductCard'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { CategoryAction } from '../components/CategoryAction'
import { SubcategoryAction } from '../components/SubcategoryAction'
import { ProductAction } from '../components/ProductAction'

export const Homepage = () => {
  return (
    <div className='mainlayout min-h-screen bg-pri text-sec font-script'>
      {/* navbar */}
      <Navbar />
      {/* header */}
      <div className="header flex items-center mx-5 justify-between">
        <div>
          <Breadcrumbs />
        </div>
        <div className='flex gap-3 py-6'>
          <CategoryAction />
          <SubcategoryAction />
          <ProductAction />
        </div>


      </div>
      {/* rest of the contents */}
      <div className='flex'>
        {/* sidebar */}
        <div>
          <Sidebar />
        </div>
        {/* main content */}
        <div>
          <ProductCard />
        </div>
      </div>
    </div>
  )
}
