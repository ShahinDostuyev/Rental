const express = require("express");
const { carController } = require("../controllers/carController");

const CarRoutes = express.Router();

CarRoutes.post("/", carController.getAll);
CarRoutes.post("/:id", carController.getCarById);
CarRoutes.post("/user/:userid", carController.getCarsByUserId);
CarRoutes.post("/add", carController.addCar);
CarRoutes.delete("/:id", carController.deleteCarById);

module.exports = {
  CarRoutes,
};
