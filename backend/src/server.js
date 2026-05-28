const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });
const userRoutes = require("./routes/userRoutes");

console.log("MONGO_URI:", process.env.MONGO_URI);

const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const workerRoutes = require("./routes/workerRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "QuickSeva Backend API is running",
    author: "Aman Kumar",
    project: "Home Service Booking Platform"
  });
});

app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

connectDB();

app.listen(PORT, () => {
  console.log(`QuickSeva backend running on http://localhost:${PORT}`);
});
