const express = require("express");
const reservationController = express.Router();
const { reservationController } = require("../controllers/reservationController");


reservationController.get("/reservations", reservationController.getAll);

reservationController.get("/reservations/:id", reservationController.getReservationById);

reservationController.get("/users/:userId/reservations", reservationController.getReservationsByUserId);

reservationController.post("/reservations", reservationController.createReservation);

reservationController.delete("/reservations/:id", reservationController.deleteReservationById);

module.exports = reservationController;
