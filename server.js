const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
connectDB();

// ----------------------------------
// Routes Import
// ----------------------------------
const takhmeenForm = require("./routes/takhmeenForm");
const hofDetails = require("./routes/hofDetails");
const receipts = require("./routes/receipts");

// ----------------------------------
// Express configuration
// ----------------------------------
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "./client/public")));
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}

// ----------------------------------
// API Routes
// ----------------------------------
app.use("/api/v1/takhmeenform", takhmeenForm);
app.use("/api/v1/hof", hofDetails);
app.use("/api/v1/receipts", receipts);

// ----------------------------------
// Express server
// ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
