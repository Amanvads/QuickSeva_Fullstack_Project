const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    address: String,
    serviceName: String,
    preferredDate: String,
    preferredTime: String,
    notes: String,

    rating: {
      type: Number,
      default: 0
    },

    review: {
      type: String,
      default: ""
    },

    userId: {
      type: String,
      required: false
    },

    status: {
      type: String,
      default: "Pending"
    },

    workerLat: {
      type: Number,
      default: null
    },

    workerLng: {
      type: Number,
      default: null
    },

    eta: {
      type: String,
      default: "Waiting for worker"
    },

    liveLocation: {
      type: String,
      default: "Worker is preparing"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);