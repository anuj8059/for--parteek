import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useCart } from "../context/CartContext";

function ProductDetail() {

  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingbtn, setLoadingbtn] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    axiosInstance
      .get(`/products/${id}/`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
        console.log(response);
        
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  const loaderfnc = () => {
    setLoadingbtn(true);
   setTimeout(() => {
    setLoadingbtn(false);
   }, 1000);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading product...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );



  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8">

        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={import.meta.env.VITE_BASE_URL + product.image}
            alt={product.name}
            className="w-full max-h-[400px] object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <p className="text-gray-600 mb-6">
              {product.description}
            </p>

            <p className="text-2xl font-semibold text-green-600 mb-6">
              ${product.price}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              onClick={() =>{addToCart(product);loaderfnc()}}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition " disabled={loadingbtn} 
            >
              Add to Cart{loadingbtn?<span className="animate-spin">...</span>:null}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;