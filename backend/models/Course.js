import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
