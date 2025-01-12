import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch only the username field from the User collection
    const creators = await UserModel.aggregate([
      {
        $project: {
          username: 1, // Include only the username field
        },
      },
    ]);

    console.log(creators);
    
    if (!creators || creators.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No creators found",
        }),
        { status: 404 }
      );
    }

    // Return the usernames in the response
    return new Response(
      JSON.stringify({
        success: true,
        creators,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching creators:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error fetching creators",
      }),
      { status: 500 }
    );
  }
}
