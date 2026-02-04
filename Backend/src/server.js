import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesroutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

if(process.env.Node_ENV !== "production"){
  app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
}

app.use(express.json());
app.use("/api/notes", rateLimiter, notesRoutes);


// app.use(express.json())
// app.use((req,res,next) => {
//   console.log(`Request method is ${req.method} url is ${req.url}`);
//   next(); 
// });


app.use("/api/notes", notesRoutes);

if(process.env.Node_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
});
}

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
});
