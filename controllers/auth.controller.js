import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

async function authRegister(req, res) {
     try {
    const { username, email, password ,role,gender} = req.body;

    if (!username || !email || !password || !role || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "Password length must be greater then 6" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

 const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hasPassword,
      profilePic,
      role,
      gender
    });

     res
      .status(201)
      .json({ message: "Register successfully !", user:{
        username:newUser.username,
        email:newUser.email,
        role:newUser.role,
        profilePic:newUser.profilePic,
        gender:newUser.gender
      }, success: true });
    
  } catch (error) {
    res.status(404).json({ message: "Auth Register error", success: false });
  }
}

async function authLogin(req,res){
   try {
      const {email,password}=req.body
      if(!email||!password){
        return res.status(400).json({message:"All Fields are required !"})
      }

      const existingUser = await User.findOne({email})
      if(!existingUser){
        return res.status(401).json({message:"Invaild email and password"})
      }

     const isMatch =  await bcrypt.compare(password,existingUser.password)
     if(!isMatch){
        return res.status(401).json({message:"Invaild email and password"})
     }
     const token = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token expiry
    );

    // Set cookie
   res.cookie("token", token, {
  httpOnly: true,
  secure: false, // in development, false
  sameSite: "lax", 
  maxAge: 60 * 60 * 1000,
});

    // Success response
    return res.status(200).json({
      message: "Login successful!",
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
        profilePic:existingUser.profilePic,
        gender:existingUser.gender
      },
      token,
      success: true,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

async function getAllUser(req,res) {
   try {
  const allUsers = await User.find(); 

  if (allUsers.length === 0) {
    return res.status(404).json({
      message: "No users found",
      success: false,
    });
  }

  res.status(200).json({
    message: "Fetched all users successfully!",
    users: allUsers,
    success: true,
  });
} catch (error) {
  console.error("Error fetching users:", error.message);
  res.status(500).json({
    message: "Failed to get all users",
    error: error.message,
    success: false,
  });
}

}

async function updateAuth(req,res) {
   try {
      const {id}=req.params
      const {email,username,gender} =req.body
       const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(400).json({ message: "Email already in use by another user", success: false });
    }
    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;
      const updateUser = await User.findByIdAndUpdate(id,{email,username,gender,profilePic},{new:true})
      if(!updateUser){
        return res.status(501).json({message:"Auth Update Error"})
      }
      res.status(201).json({message:"Update successfully !",success:true,user:{
        username:updateUser.username,
        email:updateUser.email,
        profilePic:updateUser.profilePic,
        gender:updateUser.gender,
        role:updateUser.role,
        _id:updateUser._id
      }})
   } catch (error) {
       res.status(404).json({message:"failed to update user"})
   }
}
async function getOneUser(req,res) {
     try {
      const {id}=req.params
      const getOneUser =await User.findOne({_id:id})
      res.status(201).json({message:"One user get Successfully !",success:true,userDet:getOneUser})
     } catch (error) {
      res.status(404).json({message:"Failed to get one User",success:false})
     }
     
}

async function deleteUser(req,res) {
  try {
    const {id}=req.params
    if(!id){
      return res.status(501).json({message:"failed to get id"})
    }
    
    const deleteUser = await User.findByIdAndDelete({_id:id})
    res.status(201).json({message:"User Delete Successfully!",success:true
    })

  } catch (error) {
    res.status(404).json({message:"failed to delete user",success:true})
  }
}
export { authRegister ,authLogin,getAllUser,updateAuth,deleteUser,getOneUser};
