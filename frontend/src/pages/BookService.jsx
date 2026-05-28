import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

function BookService() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    customerName: user?.name || "",
    phone: "",
    address: "",
    serviceName: "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });

  useEffect(() => {
    api.get("/services")
      .then(res => setServices(res.data.services))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/bookings", {
        ...form,
        userId: user?._id
      });

      setMessage(res.data.message);
      alert("Booking created successfully!");

      const whatsappMessage = `Hello QuickSeva, I want to book ${form.serviceName}. Name: ${form.customerName}, Phone: ${form.phone}, Address: ${form.address}, Date: ${form.preferredDate}, Time: ${form.preferredTime}`;

      window.open(
        `https://wa.me/919999999999?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank"
      );

      setForm({
        customerName: user?.name || "",
        phone: "",
        address: "",
        serviceName: "",
        preferredDate: "",
        preferredTime: "",
        notes: ""
      });

    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <main className="form-page">
      <div className="form-card">
        <h2>Book Your Service</h2>

        <p>
          Apni required service select karo aur booking submit karo.
        </p>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="customerName"
            placeholder="Your Name"
            value={form.customerName}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
          />

          <select
            name="serviceName"
            value={form.serviceName}
            onChange={handleChange}
          >
            <option value="">Select Service</option>

            {services.map(service => (
              <option key={service.id} value={service.name}>
                {service.name} - ₹{service.price}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
          />

          <input
            type="time"
            name="preferredTime"
            value={form.preferredTime}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Extra notes optional"
            value={form.notes}
            onChange={handleChange}
          />

          <button className="primary-btn" type="submit">
            Submit Booking
          </button>
          <button
            type="button"
            className="small-btn"
            onClick={() =>
            alert("Razorpay Payment Gateway Coming Soon 🚀")
            }
           >
              Pay Online
            </button>
        </form>
      </div>
    </main>
  );
}

export default BookService;