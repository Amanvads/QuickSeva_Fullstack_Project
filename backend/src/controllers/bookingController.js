const Booking = require("../models/Booking");
const services = require("../data/services");

const getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: bookings.length,
    bookings
  });
};

const createBooking = async (req, res) => {
  const {
    customerName,
    phone,
    address,
    serviceName,
    preferredDate,
    preferredTime,
    notes,
    userId
  } = req.body;

  if (
    !customerName ||
    !phone ||
    !address ||
    !serviceName ||
    !preferredDate ||
    !preferredTime
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields"
    });
  }

  const isValidService = services.some(
    (service) => service.name === serviceName
  );

  if (!isValidService) {
    return res.status(400).json({
      success: false,
      message: "Invalid service selected"
    });
  }

  const booking = await Booking.create({
    customerName,
    phone,
    address,
    serviceName,
    preferredDate,
    preferredTime,
    notes,
    userId
  });

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    booking
  });
};

const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status
    },
    { new: true }
  );

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }

  res.json({
    success: true,
    message: "Booking status updated",
    booking
  });
};

const updateWorkerLocation = async (req, res) => {
  const { workerLat, workerLng, eta, liveLocation } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      workerLat,
      workerLng,
      eta,
      liveLocation
    },
    { new: true }
  );

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }

  res.json({
    success: true,
    message: "Worker location updated",
    booking
  });
};

const submitReview = async (req, res) => {
  const { rating, review } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      rating,
      review
    },
    { new: true }
  );

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }

  res.json({
    success: true,
    message: "Review submitted successfully",
    booking
  });
};

const deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }

  res.json({
    success: true,
    message: "Booking deleted successfully"
  });
};

module.exports = {
  getBookings,
  createBooking,
  updateBookingStatus,
  updateWorkerLocation,
  submitReview,
  deleteBooking
};