import express from "express";
import "dotenv/config";

import authRoute from "./routes/authRoute.js ";

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth" , authRoute)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});