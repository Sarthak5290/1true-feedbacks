import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in environment variables");
}
console.log("Resend API Key:", !!process.env.RESEND_API_KEY); // Add this in resend.ts
const resend = new Resend(process.env.RESEND_API_KEY);

export { resend };
