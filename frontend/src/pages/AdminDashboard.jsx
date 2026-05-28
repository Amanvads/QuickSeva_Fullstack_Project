import React, { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const loadBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data.bookings);
  };

  useEffect(() => {
    loadBookings();
  }, []);

 const updateStatus = async (id, status) => {
  await api.patch(`/bookings/${id}/status`, { status });

  alert(`Booking ${status} successfully`);

  loadBookings();
};

const deleteBooking = async (id) => {
  await api.delete(`/bookings/${id}`);

  alert("Booking deleted successfully");

  loadBookings();
};
  const filteredBookings = bookings.filter(
    booking =>
      booking.serviceName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.customerName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <main className="section">
      <h2>Admin Dashboard</h2>

      <input
        type="text"
        placeholder="Search booking..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px"
        }}
      />

      <div className="stats">
        <div>
          <h3>{bookings.length}</h3>
          <p>Total Bookings</p>
        </div>

        <div>
          <h3>
            {
              bookings.filter(
                b => b.status === "Pending"
              ).length
            }
          </h3>

          <p>Pending</p>
        </div>

        <div>
          <h3>
            {
              bookings.filter(
                b => b.status === "Completed"
              ).length
            }
          </h3>

          <p>Completed</p>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.customerName}</td>

                <td>{booking.serviceName}</td>

                <td>{booking.preferredDate}</td>

                <td>{booking.status}</td>

                <td>
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateStatus(
                        booking._id,
                        e.target.value
                      )
                    }
                  >
                    <option>Pending</option>
                    <option>Accepted</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteBooking(booking._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AdminDashboard;