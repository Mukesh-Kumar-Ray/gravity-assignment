import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js"; 
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


connectDB();


app.use(cors({
  origin: "https://gravity-assignment-ub5x.vercel.app", 
  credentials: true
}));


//routers
app.use("/user", userRoutes);
app.use("/task", taskRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
