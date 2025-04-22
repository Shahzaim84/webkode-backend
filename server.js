// Import All the Packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

const app = express();

dotenv.config();

import connecttomongodb from "./config/db.js";

connecttomongodb();

// Routes
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";

// App Uses
app.use(cors({ origin: '*' , credentials: true}));
// app.use(cookieParser());
app.use(fileUpload({useTempFiles: true, tempFileDir: '/tmp'}));
app.use(express.json({ limit: '50mb' })); 

// Routes
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)

// Define Port and Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});