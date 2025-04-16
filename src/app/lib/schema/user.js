import mongoose from "mongoose";
import connectToDatabase from "@/app/lib/db"; // Import MongoDB connection

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  name: { type: String },
  rollNo: { type: String },
  branch: { type: String },
  dob: { type: String },
  gender: { type: String },
  phone: { type: String },
  address: { type: String },
});


const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function createUser(userData) {
  await connectToDatabase(); // Connect before using Mongoose models
  return await User.create(userData);
}

export async function findUserByEmail(email) {
  await connectToDatabase(); // Connect before using Mongoose models
  return await User.findOne({ email });
}

// Add the updateUser function
export async function updateUser(email, updateData) {
  await connectToDatabase(); // Connect before using Mongoose models
  return await User.findOneAndUpdate({ email }, updateData, { new: true });
}

export default User;
