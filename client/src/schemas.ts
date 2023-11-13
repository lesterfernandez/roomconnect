import { z } from "zod";

export const apiErrorSchema = z.object({
  errorMessage: z.string(),
});

const userProfileBodySchema = z.object({
  username: z.string().min(1),
  displayName: z.string().min(1),
  profilePic: z.string().optional(),
  cleanliness: z.literal(1).or(z.literal(2)).or(z.literal(3)),
  budget: z.literal(1).or(z.literal(2)).or(z.literal(3)).or(z.literal(4)),
  coed: z.boolean(),
  gender: z.string().min(1),
  loudness: z.literal(1).or(z.literal(2)).or(z.literal(3)),
});

export const userProfileSchema = userProfileBodySchema.or(apiErrorSchema);

export const searchResultSchema = z.array(userProfileBodySchema).or(apiErrorSchema);

export const tokenMessageSchema = z.object({
  token: z.string(),
});

export const userCredentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const registerBodySchema = userProfileSchema.and(userCredentialsSchema);

export const messageSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  content: z.string().min(1),
});

export const serverMessageSchema = z.object({
  type: z.literal("message"),
  from: z.string(),
  content: z.string(),
  to: z.string(),
});

export const serverEventSchema = serverMessageSchema.or(
  z.object({
    type: z.literal("load"),
    conversations: z.array(messageSchema),
  })
);
