import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

// Define interface for Message
interface IMessage {
  _id: Types.ObjectId;
  // Add other message properties as needed
}

// Define interface for User
interface IUser {
  username: string;
  isAcceptingMessages: boolean;
  messages: IMessage[];
  save(): Promise<IUser>;
}

export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { username, messageId } = await request.json();

    console.log("Received request:", { username, messageId });

    // Validate messageId format
    if (!Types.ObjectId.isValid(messageId)) {
      return NextResponse.json(
        { success: false, message: "Invalid messageId" },
        { status: 400 }
      );
    }

    if (!username || !messageId) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ username }) as IUser | null;

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

    // Find the message by its ID
    const messageIndex = user.messages.findIndex(
      (msg: IMessage) => msg._id.toString() === messageId
    );

    console.log("Message index:", messageIndex);

    if (messageIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    // Remove the message from the user's messages
    user.messages.splice(messageIndex, 1);

    await user.save();

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting message" },
      { status: 500 }
    );
  }
}