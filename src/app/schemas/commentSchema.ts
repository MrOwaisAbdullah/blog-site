import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";


export const commentSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters")
    .trim()
    .transform((input:string) => DOMPurify.sanitize(input)), // Removes malicious HTML

  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters")
    .trim()
    .transform((input:string) => DOMPurify.sanitize(input)), // Removes malicious HTML

  comment: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(600, "Comment cannot exceed 1000 characters")
    .trim()
    .transform((input:string) => DOMPurify.sanitize(input)), // Removes malicious HTML

  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug cannot exceed 200 characters")
    .trim()
    .transform((input:string) => DOMPurify.sanitize(input)), // Removes malicious HTML
});
