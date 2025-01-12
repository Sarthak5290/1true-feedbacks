import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";
import { NextResponse } from "next/server";
import { Message } from "@/app/model/User.model";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, content } = await request.json();

    if (!username || !content) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        { success: false, message: "User is not accepting messages" },
        { status: 403 }
      );
    }

    const newMessage = {
      content,
      createdAt: new Date(),
    };

    user.messages.push(newMessage as Message);

    await user.save();

    return NextResponse.json(
      { success: true, message: "Message created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { success: false, message: "Error creating message" },
      { status: 500 }
    );
  }
}
