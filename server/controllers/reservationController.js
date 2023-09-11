const { Reservation } = require("../models/Reservation");
const { Car } = require("../models/Car"); 
const { WebUser } = require("../models/WebUser");

const reservationController = {
  getAll: async (req, res) => {
    try {
      const reservations = await Reservation.find();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reservations" });
    }
  },
  getReservationById: async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = await Reservation.findById(id);
      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reservation" });
    }
  },
  getReservationsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await WebUser.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const reservations = await Reservation.find({ user: userId });
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user's reservations" });
    }
  },
  createReservation: async (req, res) => {
    try {
      const {
        userId,
        carId,
        startDate,
        endDate,
      } = req.body;

      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }

      const user = await WebUser.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const reservation = new Reservation({
        user: userId,
        car: carId,
        startDate,
        endDate,
      });

      const savedReservation = await reservation.save();
      res.status(201).json(savedReservation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a reservation" });
    }
  },
  deleteReservationById: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedReservation = await Reservation.findByIdAndDelete(id);

      if (!deletedReservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }

      res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = {
  reservationController,
};
