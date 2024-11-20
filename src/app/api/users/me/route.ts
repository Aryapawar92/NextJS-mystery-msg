import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    // Extract userId from token
    const userId = await getDataFromToken(request);
    //console.log("User ID from token:", userId); // Check if userId is valid

    // Query the user from the database
    const user = await User.findOne({ _id: userId }).select("-password");
    //console.log("User from database:", user); // Check if the user is returned

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ data: user });
  } catch (error: any) {
    console.error("Error in GET method:", error.message); // Log any error
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
