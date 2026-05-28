const express = require("express");
const Worker = require("../models/Worker");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, serviceType, phone, photo } = req.body;

    if (!name || !email || !password || !serviceType || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingWorker = await Worker.findOne({ email });

    if (existingWorker) {
      return res.status(400).json({ message: "Worker already exists" });
    }

    const worker = await Worker.create({
      name,
      email,
      password,
      serviceType,
      phone,
      photo
    });

    res.status(201).json({
      message: "Worker registered successfully",
      worker
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });

    if (!worker || worker.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Worker login successful",
      worker
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;