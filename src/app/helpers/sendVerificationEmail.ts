import { resend } from "../lib/resend";
import VerificationEmail from "../emails/verificationEmail";
import { ApiResponse } from "../types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log("Sending email with:", {
      to: email,
      username,
      verifyCode,
    }); // Log the details to debug email sending

    const emailContent = VerificationEmail({ username, otp: verifyCode });
    console.log("Rendered Email Content:", emailContent); // Ensure email is rendered correctly

    const verifyEmailSent = await resend.emails.send({
      // Only send to your verified email
      from: "onboarding@resend.dev",
      to: "gaikwadrajaram03@gmail.com",
      subject: "trueFeedback | Verification Code",
      react: emailContent,
    });

    console.log(verifyEmailSent);

    console.log("Email successfully sent.");
    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Error sending verification email",
    };
  }
}
