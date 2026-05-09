import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'


function Navbar() {
    const { cartItems, userName } = useCart()
    const [cartCount, setCartCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0)
        setCartCount(count)
        console.log(cartItems);
        
    }, [cartItems])

  return (
    <>
    <nav className="navbar w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="navbar-brand">E-Commerce</div>
        <ul className="navbar-menu flex space-x-4">
  {userName ? (
    <li>
      <Link to="/">{userName}</Link>
    </li>
  ) : (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </>
  )}
            <li><Link to="/">Home</Link></li>

            <li onClick={()=>{userName?null:navigate('/login')}}><Link to="/cart">Cart{cartCount > 0 && ` (${cartCount})`}</Link></li>
        </ul>
    </nav>        
    </>
  )
}

export default Navbar