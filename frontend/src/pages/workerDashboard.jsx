import React, { useEffect, useState } from "react";
import api from "../services/api";

function WorkerDashboard() {
  const [worker, setWorker] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedWorker = JSON.parse(localStorage.getItem("worker"));
    setWorker(savedWorker);

    api.get("/bookings")
      .then(res => setBookings(res.data.bookings))
      .catch(err => console.log(err));
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/bookings/${id}/status`, { status });

    const res = await api.get("/bookings");
    setBookings(res.data.bookings);

    alert(`Booking ${status} successfully`);
  };

  const shareLiveLocation = (id) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const workerLat = position.coords.latitude;
      const workerLng = position.coords.longitude;

      await api.patch(`/bookings/${id}/location`, {
        workerLat,
        workerLng,
        eta: "15-20 minutes",
        liveLocation: "Worker is on the way"
      });

      alert("Live location shared successfully");

      const res = await api.get("/bookings");
      setBookings(res.data.bookings);
    });
  };

  const logoutWorker = () => {
    localStorage.removeItem("worker");
    window.location.href = "/worker-login";
  };

  if (!worker) {
    return (
      <main className="section">
        <h2>Please login as worker first.</h2>
      </main>
    );
  }

  const matchedBookings = bookings.filter(
    booking => booking.serviceName === worker.serviceType
  );

  return (
    <main className="section">
      <h2>Worker Dashboard</h2>

      <button className="small-btn" onClick={logoutWorker}>
        Logout
      </button>

      <div className="form-card" style={{ marginTop: "20px" }}>
        <h3>Worker Profile</h3>

        {worker.photo && (
          <img
            src={worker.photo}
            alt={worker.name}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "15px",
              border: "4px solid #2563eb"
            }}
          />
        )}

        <p>
          <b>Name:</b> {worker.name}
        </p>

        <p>
          <b>Email:</b> {worker.email}
        </p>

        <p>
          <b>Phone:</b> {worker.phone}
        </p>

        <p>
          <b>Service:</b> {worker.serviceType}
        </p>
      </div>

      <div className="booking-list" style={{ marginTop: "20px" }}>
        {matchedBookings.length === 0 && (
          <p>No booking found for your service.</p>
        )}

        {matchedBookings.map(booking => (
          <div className="booking-card" key={booking._id}>
            <div>
              <h3>{booking.serviceName}</h3>

              <p>
                <b>Customer:</b> {booking.customerName}
              </p>

              <p>
                <b>Phone:</b> {booking.phone}
              </p>

              <p>
                <b>Address:</b> {booking.address}
              </p>

              <p>
                <b>Date:</b> {booking.preferredDate} at{" "}
                {booking.preferredTime}
              </p>

              <p>
                <b>Status:</b> {booking.status}
              </p>

              <button
                className="small-btn"
                onClick={() =>
                  updateStatus(booking._id, "Accepted")
                }
              >
                Accept
              </button>

              <button
                className="small-btn"
                onClick={() =>
                  updateStatus(booking._id, "Completed")
                }
              >
                Complete
              </button>

              <button
                className="small-btn"
                onClick={() =>
                  updateStatus(booking._id, "On The Way")
                }
              >
                On The Way
              </button>

              <button
                className="small-btn"
                onClick={() =>
                  shareLiveLocation(booking._id)
                }
              >
                📍 Share Live Location
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default WorkerDashboard;