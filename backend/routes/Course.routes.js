import express from "express";
import dotenv from "dotenv";
import Course from "../models/Course.js";
import adminauth from "../middleware/adminauth.js";
import auth from "../middleware/auth.js";
import mongoose from "mongoose";
const router = express.Router();
dotenv.config();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Error in fetching courses!",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
});

router.post("/", auth, adminauth, async (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return res.status(400).json({
      success: false,
      message: "Please provide all values!",
    });
  }
  try {
    const course = await Course.create({ title, description, price });
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Adding Course",
    });
  }
});

router.put("/:courseId", auth, adminauth, async (req, res) => {
  const { courseId } = req.params;
  const course = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res
        .status(400)
        .json({ success: false, message: "Course Invalid!" });
    }
    const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in updating course!",
    });
  }
});

router.delete("/:courseId", auth, adminauth, async (req, res) => {
  const { courseId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res
        .status(400)
        .json({ success: false, message: "Course Invalid!" });
    }
    const updatedCourse = await Course.findByIdAndDelete(courseId);
    res.status(200).json({
      success: true,
      message: "Course deleted!",
    });
  } catch (error) {
    console.log("Error in Updating Course: ", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
