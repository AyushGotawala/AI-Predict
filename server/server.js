require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running at:`);
      console.log(`http://localhost:${port}`);
      console.log(`${process.env.GLOBAL_PORT}:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Server is running and accessible!");
});
