const { default: mongoose, Schema } = require("mongoose");

const CarSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "WebUser",
    },
    carClass: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    manufactureYear: {
      type: Number,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    insurance: {
      type: String,
      required: true,
    },
    additionalServices: {
      type: [String],
    },
    contactInformation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = { Car };
