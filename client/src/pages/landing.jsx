import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          📌 JobTracker
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your job hunt in one place. Organize applications, set deadlines,
          and stay on top of your career.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
