import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";
import { NextRequest } from "next/server";

type Params = Promise<{ username: string }>;

// Updated type definition for the route handler
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
): Promise<Response> {
  // Add return type
  console.log("Received request to fetch user status.");

  try {
    console.log("Attempting to connect to database...");
    await dbConnect();
    console.log("Database connected successfully.");

    const { username } = await params;
    console.log("Received username:", username);

    if (!username) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username parameter is missing.",
        }),
        { status: 400 }
      );
    }

    console.log("Querying user with username:", username);
    const userInfo = await UserModel.findOne({ username }).select(
      "isAcceptingMessages"
    );
    console.log("Query result:", userInfo);

    if (!userInfo) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        isAcceptingMessages: userInfo.isAcceptingMessages,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user message status:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error: Failed to retrieve user status",
      }),
      { status: 500 }
    );
  }
}
