import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        QuickSeva
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/login">
          Customer Login
        </Link>

        <Link to="/book">
          Book Service
        </Link>

        <Link to="/bookings">
          My Bookings
        </Link>

        <Link to="/worker-login">
          Worker Login
        </Link>

        <Link to="/worker-dashboard">
          Worker Dashboard
        </Link>

        <Link to="/admin">
          Admin
        </Link>

        <button
          className="dark-btn"
          onClick={() =>
            document.body.classList.toggle("dark-mode")
          }
        >
          🌙
        </button>

      </div>

    </nav>
  );
}

export default Navbar;