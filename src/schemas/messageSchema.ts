import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Content is required")
    .max(300, "Content is too long"),
});
