import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Registration } from './pages/Registration'
import { Login } from './pages/Login'
import { Homepage } from './pages/Homepage'
import { ProductDetails } from './components/ProductDetails'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/details' element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}
