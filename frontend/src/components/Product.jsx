import React from 'react'
import { Link } from 'react-router-dom'

function Product({ product }) {
  const BaseUrl = import.meta.env.VITE_BASE_URL

  return (
    <Link to={`/products/${product.id}`} className='block'>
    <div   className='border p-4 rounded-lg shadow-md'>
      <img src={BaseUrl + product.image} alt={product.name} className='w-full h-48 object-cover rounded-md' />
      <h2 className=' bg-slate-600 text-white p-2 rounded-md'>{product.name}</h2>
      <p className='text-gray-700'>{product.description}</p>
      <p className='text-lg font-bold'>${product.price}</p> 

    </div>
    </Link>
  )
}

export default Product