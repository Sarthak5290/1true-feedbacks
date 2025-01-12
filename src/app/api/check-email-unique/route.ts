import { dbConnect } from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User.model";
import { z } from "zod";

const EmailQuerySchema = z.object({
  email: z
    .string()
    .email("Invalid email address format")
    .nonempty("Email is required"),
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      email: searchParams.get("email"),
    };

    // Validate query parameters with Zod
    const result = EmailQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const emailErrors = result.error.format().email?._errors || [];
      return new Response(
        JSON.stringify({
          success: false,
          errors: emailErrors,
          message:
            emailErrors?.length > 0
              ? emailErrors.join("\n")
              : "Invalid query parameters",
        }),
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Check if email exists in the database
    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    if (existingUserByEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email already exists",
        }),
        { status: 409 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email is available",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking email availability:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error checking email availability",
      }),
      { status: 500 }
    );
  }
}
