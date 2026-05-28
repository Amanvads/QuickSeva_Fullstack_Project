import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function WorkerLogin() {
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    serviceType: "",
    phone: "",
    photo: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = isRegister
        ? "/workers/register"
        : "/workers/login";

      const res = await api.post(url, form);

      localStorage.setItem(
        "worker",
        JSON.stringify(res.data.worker)
      );

      setMessage(res.data.message);

      navigate("/worker-dashboard");

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <main className="form-page">
      <div className="form-card">
        <h2>
          {isRegister
            ? "Worker Register"
            : "Worker Login"}
        </h2>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                name="name"
                placeholder="Worker Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                name="serviceType"
                placeholder="Service Type"
                value={form.serviceType}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                name="photo"
                placeholder="Profile Photo URL"
                value={form.photo}
                onChange={handleChange}
              />
            </>
          )}

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            className="primary-btn"
            type="submit"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <button
          className="small-btn"
          onClick={() =>
            setIsRegister(!isRegister)
          }
        >
          {isRegister
            ? "Already registered? Login"
            : "New worker? Register"}
        </button>
      </div>
    </main>
  );
}

export default WorkerLogin;