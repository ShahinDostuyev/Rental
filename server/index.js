const express = require("express");
const { db } = require("./config/db");

const app = express();

const cors = require("cors");
const port = 8080;

const { webUserRoutes } = require("./routes/webUserRoute");

require("dotenv").config();
app.use(express.json());
app.use(cors());
db.connect();

app.use("/api/webuser", webUserRoutes);

app.listen(port, () => {
  console.log("Server is running...");
});
