import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema(
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

const User = mongoose.models?.User || model("User", UserSchema);
export default User;
