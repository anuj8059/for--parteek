import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useCart } from "../context/CartContext";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {getUserName} = useCart();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axiosInstance.post(
        "/login/",
        {
          username: username,
          password: password,
        },
      );
      console.log(res);
      
      getUserName()
      setMessage("Login successful");
      navigate('/')

    } catch (error) {
        console.log(error);
        
      setMessage("Invalid credentials");

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm font-medium">
              Username
            </label>

            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-red-500">
            {message}
          </p>
        )}

        <p>Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>

      </div>

    </div>
  );
}

export default Login;