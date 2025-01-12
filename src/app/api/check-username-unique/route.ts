import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerrySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    // validate with zod
    const result = UsernameQuerrySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return new Response(
        JSON.stringify({
          success: false,
          errors: usernameErrors,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join("\n")
              : "Invalid querry parameters",
        }),
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingUserByUsername = await UserModel.findOne({
      username,
    });

    if (existingUserByUsername) {
      console.log("existingUserByUsername");
      return new Response(
        JSON.stringify({ success: false, message: "Username already exists" })
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Username is available" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username availability:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error checking username availability",
      }),
      { status: 500 }
    );
  }
}
