import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // create token data

    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    // create token

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "10d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in production
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.log("Something went wrong", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
