import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, 
  paymentId: String,
  amount: Number,
  status: String,
}); 

export const Order = mongoose.model("Order", orderSchema);