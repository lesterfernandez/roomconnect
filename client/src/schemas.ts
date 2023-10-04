import { z } from "zod";

export const apiErrorSchema = z.object({
  errorMessage: z.string(),
});

export const userProfileSchema = z
  .object({
    profilePic: z.string().optional(),
    displayName: z.string(),
    budget: z.literal(1).or(z.literal(2)).or(z.literal(3)).or(z.literal(4)),
    gender: z.string(),
    cleanliness: z.literal(1).or(z.literal(2)).or(z.literal(3)),
    loudness: z.literal(1).or(z.literal(2)).or(z.literal(3)),
    coed: z.boolean(),
  })
  .or(apiErrorSchema);

export const tokenMessageSchema = z.object({
  token: z.string(),
});
