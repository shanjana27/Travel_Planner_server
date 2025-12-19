import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./Db/db.js";
import tripRoutes from "./Routes/tripRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import activityRoutes from "./Routes/activityRoutes.js";
dotenv.config();
connectDb();

const app = express();

// ✅ VERY IMPORTANT — put this BEFORE routes
app.use(cors());


app.use(express.json());

app.use("/api/trips", tripRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes); 

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
