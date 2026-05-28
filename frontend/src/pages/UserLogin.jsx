import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UserLogin() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

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
      const url = isRegister ? "/users/register" : "/users/login";
      const res = await api.post(url, form);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage(res.data.message);
      navigate("/book");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main className="form-page">
      <div className="form-card">
        <h2>{isRegister ? "Customer Register" : "Customer Login"}</h2>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
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

          <button className="primary-btn" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <button
          className="small-btn"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already registered? Login" : "New user? Register"}
        </button>
      </div>
    </main>
  );
}

export default UserLogin;