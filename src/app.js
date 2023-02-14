require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cartRoutes = require("../src/routes/cartRoutes");
const productRoutes = require("../src/routes/productRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/products", productRoutes);

const port = process.env.PORT || 5000;
async function run() {
  try {
    // Connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start server; listen to requests on port
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
run();
