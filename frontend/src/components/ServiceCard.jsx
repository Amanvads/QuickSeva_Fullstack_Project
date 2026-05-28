import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-icon">{service.icon}</div>
      <h3>{service.name}</h3>
      <p className="category">{service.category}</p>
      <p>{service.description}</p>
      <div className="card-footer">
        <span>₹{service.price}</span>
        <span>{service.duration}</span>
      </div>
      <Link to="/book" className="small-btn">Book Now</Link>
    </div>
  );
}

export default ServiceCard;
