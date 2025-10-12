import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    fathersName: {
      type: String,
      required: true,
    },
    mothersName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    course: {
      type: String,
      enum: ["B.Tech", "MBA", "M.Tech", "Diploma"],
      required: true,
    },
    courseFee: {
      type: Number,
    },
    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
