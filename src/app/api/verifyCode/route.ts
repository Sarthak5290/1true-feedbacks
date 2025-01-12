import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  console.log("Database connected successfully");

  try {
    const { username, code } = await request.json();
    console.log("Payload received:", { username, code });

    if (!username || !code) {
      console.error("Missing username or code in request payload");
      return NextResponse.json(
        { message: "Username and verification code are required" },
        { status: 400 }
      );
    }

    const decodedUsername = decodeURIComponent(username);
    console.log("Decoded username:", decodedUsername);

    const user = await UserModel.findOne({ username: decodedUsername });
    console.log("User found:", user);

    if (!user) {
      console.error("User not found in database");
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    console.log("Verification details:", {
      isCodeValid,
      isCodeNotExpired,
      verifyCode: user.verifyCode,
      verifyCodeExpiry: user.verifyCodeExpiry,
    });

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      console.log("User verified and saved successfully");

      return NextResponse.json(
        { message: "User verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      console.warn("Verification code has expired");
      return NextResponse.json(
        { message: "Verification code has expired" },
        { status: 401 }
      );
    }

    console.warn("Invalid verification code provided");
    return NextResponse.json(
      { message: "Invalid verification code" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { message: "An error occurred while verifying the user." },
      { status: 500 }
    );
  }
}
