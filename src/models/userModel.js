import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,

    verifyToken: String,
    verifyTokenExpiry: Date,

    /*How do they work?
    
    all the above 4 are stored in the db

    let say if user goes to user/verify/:token

    then a verify token is generated and one portion stored in the db

    and the other portion is sent to the user via email/sms

    and the user clicks on the link and it is verified

    and in the similar way forgot password token work.
    
    */
  },
  { timestamps: true }
);

const User = mongoose.model.User || mongoose.model("User", userSchema);

export default User;
