import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";
import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized: Session not found",
        }),
        { status: 401 }
      );
    }

    const user: User = session.user as User;
    const userId = user.id;

    const { acceptMessages } = await request.json();
    if (typeof acceptMessages !== "boolean") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid input: acceptMessages must be a boolean",
        }),
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User status updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error: Failed to update user status",
      }),
      { status: 500 }
    );
  }
}

export async function GET() {  // Removed 'request' as it's not used
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized: Session not found",
        }),
        { status: 401 }
      );
    }

    const user: User = session.user as User;
    const userId = user.id;

    const userInfo = await UserModel.findById(userId).select("-password");
    if (!userInfo) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User is accepting messages",
        isAcceptingMessages: userInfo.isAcceptingMessages,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user information:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error: Failed to retrieve user information",
      }),
      { status: 500 }
    );
  }
}
