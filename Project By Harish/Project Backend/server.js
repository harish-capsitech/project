import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router} from "./routes/userRoutes.js";

const app = express();
 
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));
app.use(cookieParser());
 
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("API is running...");
});
 
app.listen(3300);