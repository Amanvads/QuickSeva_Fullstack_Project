import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const loadBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await api.get("/bookings");

    const filteredBookings = res.data.bookings.filter(
      booking => booking.userId === user?._id
    );

    setBookings(filteredBookings);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    bookings.forEach((booking) => {
      if (booking.status === "Accepted") {
        toast.success("Worker accepted your booking");
      }

      if (booking.status === "On The Way") {
        toast.success("Worker is on the way 🚚");
      }

      if (booking.status === "Completed") {
        toast.success("Service completed successfully");
      }
    });
  }, [bookings]);

  const cancelBooking = async (id) => {
    await api.delete(`/bookings/${id}`);
    loadBookings();
  };

  const submitReview = async (id) => {
    const rating = prompt("Enter rating 1 to 5");
    const review = prompt("Write your review");

    if (!rating || !review) {
      alert("Rating and review required");
      return;
    }

    await api.patch(`/bookings/${id}/review`, {
      rating,
      review
    });

    alert("Review submitted successfully");
    loadBookings();
  };

  const filteredBookings = bookings.filter(booking =>
    booking.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="section">
      <h2>My Bookings</h2>

      <input
        type="text"
        placeholder="Search service..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px"
        }}
      />

      <div className="booking-list">
        {filteredBookings.length === 0 && (
          <p>No booking found.</p>
        )}

        {filteredBookings.map(booking => (
          <div className="booking-card" key={booking._id}>
            <div>
              <h3>{booking.serviceName}</h3>

              <p>
                <b>Name:</b> {booking.customerName}
              </p>

              <p>
                <b>Phone:</b> {booking.phone}
              </p>

              <p>
                <b>Address:</b> {booking.address}
              </p>

              <p>
                <b>Tracking:</b>{" "}
                {booking.liveLocation || "Worker is preparing"}
              </p>

              <p>
                <b>ETA:</b> {booking.eta || "Waiting for worker"}
              </p>

              {booking.workerLat && booking.workerLng && (
                <a
                  href={`https://www.google.com/maps?q=${booking.workerLat},${booking.workerLng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="small-btn">
                    🗺️ View Worker Live Location
                  </button>
                </a>
              )}

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="small-btn">
                  📍 Open Map
                </button>
              </a>

              <p>
                <b>Date:</b> {booking.preferredDate} at{" "}
                {booking.preferredTime}
              </p>

              <p>
                <b>Notes:</b> {booking.notes || "No notes"}
              </p>

              {booking.status === "Completed" && (
                <div style={{ marginTop: "15px" }}>

                  <button
                    className="small-btn"
                    onClick={() => submitReview(booking._id)}
                  >
                    Submit Review
                  </button>

                </div>
              )}
            </div>

            <div>
              <span className={`status ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>

              <br />
              <br />

              <button
                className="delete-btn"
                onClick={() => cancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyBookings;