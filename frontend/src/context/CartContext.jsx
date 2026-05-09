import { createContext, useContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import { useNavigate } from 'react-router-dom'

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const getUserName = async () => {
    try {
        const res = await axiosInstance.get('/profile/')
        setUserName(res.data?.username)
    }
    catch (error) {
        console.error('Error fetching username:', error)
    }
  }

  const addToCart = async (product) => {
    if (userName === '') {
        navigate('/login')
    }
    try {
        const res = await axiosInstance.post('/cart/add/', { product_id: product.id })
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id == product.id)
            if (existingItem) {
                return prevItems.map(item =>
                    item.product.id == product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            } else {
                return [...prevItems, res.data.cartItem]
            }
        })
    }
    catch (error) {
        console.error('Error adding to cart:', error)
    }
    
  }


  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axiosInstance.post(`/cart/update/`, { product_id: productId, quantity })
      if(quantity === 0) {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId))
        return
      }else {
      setCartItems(prevItems => {
        return prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity: quantity } : item
        )
      })}
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  

  useEffect(() => {
    try {
        const fetchCartItems = async () => {
            const res = await axiosInstance.get('/cart/')
            setCartItems(res.data?.carts)
        }
        fetchCartItems()
    }
    catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
        console.error('Error fetching cart items:', error)
    }
  }, [])

  useEffect(() => {
    getUserName()
  }, [])



  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, userName, getUserName }}>
      {children}
    </CartContext.Provider>
  )
}