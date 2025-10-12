import express, { Router } from "express"
import { deleteStudent, getAllStudent, registerStudent, updateAdmin, updateStudent } from "../controllers/student.controller.js"

const router =Router()

router.post("/register",registerStudent)
router.get("/all-student",getAllStudent)
router.delete("/delete-student/:id",deleteStudent)
router.put("/update-admin/:id",updateAdmin)
router.put("/update-student/:id",updateStudent)
export default router