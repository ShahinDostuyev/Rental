const express = require("express");
const { carController } = require("../controllers/carController");

const CarRoutes = express.Router();

CarRoutes.get("/", carController.getAll);
CarRoutes.get("/:id", carController.getCarById);
CarRoutes.post("/user/:userid", carController.getCarsByUserId);
CarRoutes.post("/add", carController.addCar);
CarRoutes.delete("/:id", carController.deleteCarById);
CarRoutes.get("/cars/params", carController.getCarByParams);

module.exports = {
  CarRoutes,
};
