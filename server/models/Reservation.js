const { default: mongoose, Schema } = require("mongoose");

const ReservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "WebUser",
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = { Reservation };
