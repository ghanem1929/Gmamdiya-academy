const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");

const app = express();

connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/authentification"));
app.use("/api/players", require("./routes/players"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
