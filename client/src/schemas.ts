import { z } from "zod";

export const apiErrorSchema = z.object({
  errorMessage: z.string(),
});

export const userProfileSchema = z
  .object({
    profilePic: z.string().optional(),
    displayName: z.string().min(1),
    budget: z.literal(1).or(z.literal(2)).or(z.literal(3)).or(z.literal(4)),
    gender: z.string().min(1),
    cleanliness: z.literal(1).or(z.literal(2)).or(z.literal(3)),
    loudness: z.literal(1).or(z.literal(2)).or(z.literal(3)),
    coed: z.boolean(),
  })
  .or(apiErrorSchema);

export const tokenMessageSchema = z.object({
  token: z.string(),
});

export const userCredentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const registerBodySchema = userProfileSchema.and(userCredentialsSchema);

