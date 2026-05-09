import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Product from '../components/Product'
import axiosInstance from '../api/axios'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/products/')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }
  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Product List</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                products.length > 0 ? products.map(product => (
                    <Product key={product.id} product={product} />
                )) : <p>No products available.</p>
            }
        </div>
    </div>
  )
}

export default ProductList