// Import All the Packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import Stripe from "stripe";
import path from 'path';
import { fileURLToPath } from 'url';
import logRequest from "./middlewares/logMiddleware.js";
import axios from "axios"

const app = express();

dotenv.config();

import connecttomongodb from "./config/db.js";

connecttomongodb();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Routes
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

// App Uses
app.use(cors({ origin: '*' , credentials: true}));
// app.use(cookieParser());
app.use(fileUpload({useTempFiles: true, tempFileDir: '/tmp'}));
app.use(express.json({ limit: '50mb' })); 

// __dirname replacement in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logRequest);

// Serve invoice PDFs
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

// Routes
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/subscriptions", subscriptionRouter)
app.use("/api", dashboardRouter)


// Define Port and Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
