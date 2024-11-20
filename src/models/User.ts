import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "register",
    versionKey: false, // Prevent the creation of the __v field
  }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
