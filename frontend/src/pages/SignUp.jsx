import React from "react";

function SignUp() {
  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
      
      <div className='w-[400px] bg-white p-8 rounded-2xl shadow-2xl'>
        
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        <form className="space-y-4">
          
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer font-medium">
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default SignUp;