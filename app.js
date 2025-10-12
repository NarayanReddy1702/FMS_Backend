import express from "express"
import dotenv from "dotenv"
import router from "./routers/auth.router.js"
import studentRouter from "./routers/student.router.js"
import cors from "cors"

dotenv.config()

const app = express()
app.use(cors({
  origin: "https://fmsminorproject.netlify.app", 
  credentials: true,               
}));
app.use(express.json())

app.use("/api/auth/user",router)
app.use("/api/auth/student",studentRouter)

export default app