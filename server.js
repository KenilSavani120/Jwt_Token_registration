import express from "express";
import dotenv from "dotenv"
import connectDb from "./database/db.js"
import routes from "./routes/phone_routes.js";
// import routes from "./routes/auth.js";

import { authenticateToken } from "./Authentication/auth.js";


dotenv.config();
const app = express();

//Environment variables
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
routes.use(authenticateToken);

connectDb()

// Routes
app.use('/phone/v1/',routes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});