import express from "express"
import { authLogin, authRegister, deleteUser, getAllUser, getOneUser, updateAuth } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/register",authRegister)
router.post("/login",authLogin)
router.get("/allUsers",getAllUser)
router.put("/updateAuth/:id",updateAuth)
router.delete("/deleteAuth/:id",deleteUser)
router.get("/getAUser/:id",getOneUser)


export default router