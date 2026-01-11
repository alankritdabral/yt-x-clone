import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// connect DB and start server
const startServer = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URI}/${process.env.DB_NAME}`);
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
