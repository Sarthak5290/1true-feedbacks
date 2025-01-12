import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";
import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized",
      }),
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(session.user.id);

  try {
    const userData = await UserModel.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: {
          "messages.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);

    if (!userData || userData.length === 0) {
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
        messages: userData[0].messages,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error fetching messages",
      }),
      { status: 500 }
    );
  }
}
