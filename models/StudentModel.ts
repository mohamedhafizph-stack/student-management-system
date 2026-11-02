import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  studentId: { type: String, required: true, unique: true, trim: true },
  department: { type: String, required: true, trim: true },
  semester: { type: Number, required: true, min: 1, max: 12 },
  phone: { type: String }
}, { timestamps: true });

export const StudentModel = mongoose.model("Student", studentSchema);