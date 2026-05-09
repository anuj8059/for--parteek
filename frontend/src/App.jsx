import { useState } from 'react'
import ProductList from './pages/ProductList'
import { Route, Routes } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar />
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      
    </Routes>


    </>
  )    
}

export default App
