import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String },
  credits: { type: Number, required: true, min: 1, max: 10 }
}, { timestamps: true });

export const CourseModel = mongoose.model("Course", courseSchema);