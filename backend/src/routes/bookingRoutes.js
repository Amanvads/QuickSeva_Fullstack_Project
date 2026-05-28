const express = require("express");

const {
  getBookings,
  createBooking,
  updateBookingStatus,
  updateWorkerLocation,
  submitReview,
  deleteBooking
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getBookings);

router.post("/", createBooking);

router.patch("/:id/status", updateBookingStatus);

router.patch("/:id/location", updateWorkerLocation);

router.patch("/:id/review", submitReview);

router.delete("/:id", deleteBooking);

module.exports = router;