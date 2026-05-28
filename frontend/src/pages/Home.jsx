import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const services = [
    { name: "Hair Cutting", price: 199, image: "/images/hair.jpg" },
    { name: "Massage", price: 699, image: "/images/massage.jpg" },
    { name: "Home Cleaning", price: 599, image: "/images/cleaning.jpg" },
    { name: "Painting", price: 1499, image: "/images/painting.jpg" },
    { name: "Beauty Parlour", price: 799, image: "/images/beauty.jpg" },
    { name: "Cooking", price: 599, image: "/images/cooking.jpg" },
  ];

  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const recommendService = () => {
    const text = query.toLowerCase();

    if (text.includes("hair") || text.includes("cut")) {
      setSuggestion("Recommended Service: Hair Cutting");
    } else if (text.includes("clean") || text.includes("saaf")) {
      setSuggestion("Recommended Service: Home Cleaning");
    } else if (text.includes("massage") || text.includes("body")) {
      setSuggestion("Recommended Service: Massage");
    } else if (text.includes("paint") || text.includes("wall")) {
      setSuggestion("Recommended Service: Painting");
    } else if (text.includes("beauty") || text.includes("makeup")) {
      setSuggestion("Recommended Service: Beauty Parlour");
    } else if (text.includes("cook") || text.includes("khana")) {
      setSuggestion("Recommended Service: Cooking");
    } else {
      setSuggestion("Sorry, no matching service found.");
    }
  };

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setQuery(voiceText);
    };

    recognition.start();
  };

  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>QuickSeva</h1>

          <p>
            Book trusted home services instantly from skilled workers.
          </p>

          <Link to="/book">
            <button className="primary-btn">
              Book Service
            </button>
          </Link>
        </div>
      </section>

      {/* AI Search */}
      <div style={{ marginTop: "25px", padding: "20px" }}>
        <input
          type="text"
          placeholder="Tell us your need..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="small-btn" onClick={recommendService}>
          AI Suggest
        </button>

        <button className="small-btn" onClick={startVoiceSearch}>
          🎤 Voice
        </button>

        {suggestion && <h3>{suggestion}</h3>}
      </div>

      {/* Services Section */}
      <section className="services-section">
        <h2>Popular Services</h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <img
                src={service.image}
                alt={service.name}
                className="service-image"
              />

              <h3>{service.name}</h3>

              <p>
                Professional {service.name.toLowerCase()} service at your home.
              </p>

              <h4>Starting from ₹{service.price}</h4>

              <Link to="/book">
                <button className="small-btn">
                  Book Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About QuickSeva</h2>

        <p>
          QuickSeva is a full-stack home service booking platform where
          customers can book trusted workers for daily services like haircut,
          massage, cooking, painting, beauty parlour and home cleaning.
        </p>

        <div className="about-points">
          <div>✅ Easy Service Booking</div>
          <div>✅ Worker Dashboard</div>
          <div>✅ Live Location Tracking</div>
          <div>✅ Review & Rating</div>
        </div>
      </section>

      {/* Footer */}
      <section className="footer">
        <div className="footer-content">

          <div>
            <h2>QuickSeva</h2>

            <p>
              Trusted home services platform for booking skilled workers
              instantly.
            </p>
          </div>

          <div>
            <h3>Services</h3>

            <p>Hair Cutting</p>
            <p>Massage</p>
            <p>Home Cleaning</p>
            <p>Painting</p>
            <p>Cooking</p>
            <p>Beauty Parlour</p>
          </div>

          <div>
            <h3>Contact</h3>

            <p>📞 +91 9546902690</p>
            <p>📧 support@quickseva.com</p>
            <p>📍 Bhopal, India</p>
          </div>

        </div>

        <hr />

        <p className="copyright">
          © 2026 QuickSeva. All rights reserved.
        </p>
      </section>

    </main>
  );
}

export default Home;