import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import courseRouter from "./routes/Course.routes.js";
import usersRouter from "./routes/User.routes.js";

const __dirname = path.resolve();
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/courses", courseRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(5001, () => {
  connectDB();
  console.log("Server is running!!");
});
