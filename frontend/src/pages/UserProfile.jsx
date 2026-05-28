import React from "react";

function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <main className="section">
        <h2>Please login first.</h2>
      </main>
    );
  }

  return (
    <main className="section">
      <h2>Customer Profile</h2>

      <div className="form-card">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>
    </main>
  );
}

export default UserProfile;