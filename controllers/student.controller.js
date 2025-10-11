import { json } from "express";
import Student from "../models/student.model.js";
import jwt from "jsonwebtoken";

async function registerStudent(req, res) {
  try {
    const {
      firstName,
      lastName,
      fathersName,
      mothersName,
      phoneNo,
      course,
      year,
      email,
      gender,
      dateOfBirth,
      address,
    } = req.body;

    // 1️⃣ Validate required fields
    if (
      !firstName ||
      !lastName ||
      !fathersName ||
      !mothersName ||
      !phoneNo ||
      !course ||
      !year ||
      !email ||
      !gender ||
      !dateOfBirth ||
      !address
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // 2️⃣ Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(409)
        .json({ message: "Student already registered", success: false });
    }

    // 3️⃣ Set profile picture
    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${firstName}`
        : `https://avatar.iran.liara.run/public/girl?username=${firstName}`;

    // 4️⃣ Determine course fee
    let courseFee;
    switch (course) {
      case "B.Tech":
        courseFee = 500000;
        break;
      case "Diploma":
        courseFee = 350000;
        break;
      case "M.Tech":
        courseFee = 400000;
        break;
      case "MBA":
        courseFee = 1000000;
        break;
      default:
        courseFee = 0;
    }

    // 5️⃣ Create new student
    const newStudent = await Student.create({
      firstName,
      lastName,
      fathersName,
      mothersName,
      phoneNo,
      course,
      year,
      email,
      gender,
      dateOfBirth,
      address,
      profilePic,
      courseFee,
    });

    console.log("✅ Student registered:", newStudent);

    // 6️⃣ Generate JWT token
    const token = jwt.sign(
      {
        _id: newStudent._id,
        email: newStudent.email,
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        course: newStudent.course,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 7️⃣ Send response
    return res.status(201).json({
      message: "Student registered successfully!",
      student: newStudent,
      token,
      success: true,
    });
  } catch (error) {
    console.error("❌ Student registration error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
}

async function getAllStudent(req,res) {
  try {
    const studentDet = await Student.find()
    if(studentDet.length===0){
      return res.status(404).json({message:"No student Found" , success:false})
    }    
  
    res.status(201).json({message:"Get All Student Successfully !", student:studentDet, success:true})
  } catch (error) {
    res.status(404).json({message:"Failed to get all student",success:false})
  }
}


async function updateStudent(req,res) {
   try {
    const {id}=req.params
     const {
      firstName,
      lastName,
      fathersName,
      mothersName,
      phoneNo,
      course,
      year,
      email,
      courseFee,
      gender,
      dateOfBirth,
      address,
    } = req.body;
     const existingStudent = await Student.findOne({ email });
    if (existingStudent && existingStudent._id.toString() !== id) {
      return res.status(400).json({ message: "Email already in use by another user", success: false });
    }

     const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${firstName}`
        : `https://avatar.iran.liara.run/public/girl?username=${firstName}`;

   const updateStudent =  await Student.findByIdAndUpdate(id,{firstName,lastName,fathersName,mothersName,phoneNo,course,year,profilePic,courseFee,email,gender,dateOfBirth,address},{new:true})
   if(!updateStudent){
    return res.status(501).json({message:"Uupdate Fail"})
   }

   res.status(201).json({message:"Update Successfully !" , success:true,student :updateStudent})
   } catch (error) {
      res.status(404).json({message:"Failed to update student"})
   }
}

async function deleteStudent(req,res) {
  try {
    const {id}=req.params

    if(!id){
      return res.status(404).json({message:"Failed to get ID",message:false})
    }
    const deleteUser = await Student.findByIdAndDelete({_id:id})
    res.status(201).json({message:"student deleted successfully !",success:true})
  } catch (error) {
   res.status(404).json({message:"Failed to delete student !"}) 
  }
}
export { registerStudent,getAllStudent ,updateStudent,deleteStudent};
