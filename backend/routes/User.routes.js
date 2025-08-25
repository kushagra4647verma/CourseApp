import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Course from "../models/Course.js";
import auth from "../middleware/auth.js";

const router = express.Router();

dotenv.config();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Provide all Values ",
    });
  }
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User exists!",
      });
    }

    const newUser = await User.create({ username, email, password });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      message: "User sign up sucessfull!",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not created! Server error!",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password!",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    if (user.password !== password) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid password!",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      success: true,
      message: "Sign in successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error! Cannot login!",
    });
  }
});

router.post("/:id/buy", auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    if (user.purchasedCourses.includes(course._id)) {
      return res
        .status(400)
        .json({ success: false, message: "Already purchased!" });
    }

    user.purchasedCourses.push(course._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Course purchased successfully!",
      data: user.purchasedCourses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error purchasing course",
    });
  }
});

router.get("/my-courses", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate("purchasedCourses");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: user.purchasedCourses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching purchased courses",
    });
  }
});

export default router;
