import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    //console.log("Token from cookie:", token); // Log the token for debugging

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    //console.log("Decoded token:", decodedToken); // Log the decoded token for debugging

    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Unauthenticated");
  }
};
