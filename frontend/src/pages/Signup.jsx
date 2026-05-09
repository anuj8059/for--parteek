import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";

function Signup() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let res = await axiosInstance.post(
        "/register/",
        formData
      );
      console.log(res);
      
      setMessage("Account created successfully");

    } catch (error) {

      setMessage("Signup failed");

      console.log(error);

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Sign Up
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-red-500">
            {message}
          </p>
        )}
        <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>


      </div>

    </div>

  );
}

export default Signup;