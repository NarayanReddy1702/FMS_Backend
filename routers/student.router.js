import express, { Router } from "express"
import { deleteStudent, getAllStudent, getOneStudent, registerStudent, updateAdmin, updateStudent } from "../controllers/student.controller.js"

const router =Router()

router.post("/register",registerStudent)
router.get("/all-student",getAllStudent)
router.delete("/delete-student/:id",deleteStudent)
router.put("/update-admin/:id",updateAdmin)
router.put("/update-student/:id",updateStudent)
router.get("/get-one-student/:id",getOneStudent)
export default router