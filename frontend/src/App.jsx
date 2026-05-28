import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookService from "./pages/BookService";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerLogin from "./pages/WorkerLogin";
import WorkerDashboard from "./pages/WorkerDashboard";
import UserLogin from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
import "./App.css";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookService />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </>
  );
}

export default App;
