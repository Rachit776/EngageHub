import express from "express";
import "dotenv/config";

import authRoute from "./routes/authRoute.js ";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth" , authRoute)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});