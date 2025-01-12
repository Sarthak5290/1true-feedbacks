import jwt from "jsonwebtoken";

export const signJwtAccessToken = (userId: string) => {
  const payload = { userId };
  const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key"; // Use environment variables for secrets
  const options = { expiresIn: "1h" }; // Token expires in 1 hour

  try {
    const token = jwt.sign(payload, secretKey, options);
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    return null;
  }
};
