import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  console.log("Received request to fetch user status.");

  try {
    console.log("Attempting to connect to database...");
    await dbConnect();
    console.log("Database connected successfully.");

    const username = params.username;
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
    const userInfo = await UserModel.findOne({ username: username }).select(
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
