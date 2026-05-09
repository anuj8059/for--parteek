import React from 'react'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, updateQuantity } = useCart()
  const baseURL = import.meta.env.VITE_BASE_URL
  console.log('this : ', cartItems);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={baseURL+item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-500">₹{item.product.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-3 py-1 flex gap-2 rounded items-center">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  -
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(item.product.id, 0)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </span>
              <span className="font-semibold">
                ₹{item.product.price * item.quantity}
              </span>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-bold">Total:</h2>
          <span className="text-xl font-bold text-green-600">
            ₹{totalPrice}
          </span>
        </div>

        <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};


export default Cart