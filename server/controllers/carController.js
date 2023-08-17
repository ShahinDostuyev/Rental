const { Car } = require("../models/Car");
const { WebUser } = require("../models/WebUser");

const carController = {
  getAll: async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cars" });
    }
  },
  getCarById: async (req, res) => {
    try {
      const { id } = req.params;
      const car = await Car.findById(id);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch car    " });
    }
  },
  getCarsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await WebUser.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user.ownedCars);
    } catch (error) {}
  },
  addCar: async (req, res) => {
    try {
      const {
        userId,
        carType,
        brand,
        model,
        manufactureYear,
        seatingCapacity,
        transmission,
        fuelType,
        mileage,
        features,
        price,
        insurance,
        additionalServices,
      } = req.body;
      const car = new Car({
        userId,
        carType,
        brand,
        model,
        manufactureYear,
        seatingCapacity,
        transmission,
        fuelType,
        mileage,
        features,
        price,
        insurance,
        additionalServices,
      });
      const savedCar = await car.save();

      const updatedUser = await WebUser.findByIdAndUpdate(
        userId,
        { $push: { ownedCars: savedCar } },
        { new: true }
      );

      if (!updatedUser) {
        await Car.findByIdAndDelete(savedCar._id);
        return res.status(404).json({ error: "User not found" });
      }

      res.status(201).json(savedCar);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a Car" });
    }
  },
  deleteCarById: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedCar = await Car.findByIdAndDelete(id);

      if (!deletedCar) {
        return res.status(404).json({ error: "Car not found" });
      }

      res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = {
  carController,
};
