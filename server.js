// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const sequelize = require("./config/db.config"); // Sequelize configuration
const userRoutes = require("./routes/user.routes"); // User routes

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Set the port number from environment variables or use 5000 as a default
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Test route to ensure the server is running
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Mount user routes
app.use("/api/users", userRoutes);

// Sync database and start the server
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced successfully");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
