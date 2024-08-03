// DEPENDENCIAS
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
// * IMPORT ROUTES
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import listingRoute from "./routes/listing.route.js";
// CONFIG DOTENV
dotenv.config();
// __DIRNAME
// const __dirname = path.resolve();
// * CONECT TO DATABASE
mongoose
  .connect(
    "mongodb+srv://marcos:fasdfhaufgaisuo2312@general.wugamgm.mongodb.net/?retryWrites=true&w=majority&appName=General"
  )
  .then(console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.log(err);
  });
// * APP VARIABLE
const app = express();
// APP USE
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "/client/dist")));
// *** ROUTES
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute);
// APP GET
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });
// ! HANDLE ERROR
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
// * LISTEN SERVER PORT 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
