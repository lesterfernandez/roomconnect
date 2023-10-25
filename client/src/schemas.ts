import { z } from "zod";

export const apiErrorSchema = z.object({
  errorMessage: z.string(),
});

const userProfileBodySchema = z
.object({
  profilePic: z.string().optional(),
  budget: z.literal(1).or(z.literal(2)).or(z.literal(3)).or(z.literal(4)),
  cleanliness: z.literal(1).or(z.literal(2)).or(z.literal(3)),
  coed: z.boolean(),
  displayName: z.string().min(1),
  gender: z.string().min(1),
  loudness: z.literal(1).or(z.literal(2)).or(z.literal(3)),
});

export const userProfileSchema = userProfileBodySchema
  .or(apiErrorSchema);

export const searchResultSchema = z.array(userProfileBodySchema);

export const tokenMessageSchema = z.object({
  token: z.string(),
});

export const userCredentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const registerBodySchema = userProfileSchema.and(userCredentialsSchema);
