const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const sequelize = require("./config/db.config"); // Sequelize configuration
const userRoutes = require("./routes/user.routes"); // User routes
const authRoutes = require("./routes/auth.routes"); // Auth routes
const setupSwagger = require("./config/swagger"); // Adjust the path as needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Setup Swagger
setupSwagger(app);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
