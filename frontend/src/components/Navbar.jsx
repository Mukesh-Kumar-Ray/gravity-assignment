import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();

     const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">ToDo App</h1>
      <div className="space-x-4">
         {!isAuthenticated ? (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? "underline" : ""}>Login</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "underline" : ""}>Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "underline" : ""}>Dashboard</NavLink>
            <button onClick={handleLogout} className="ml-4 underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;