import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().trim().min(1, {
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Password confirmation must be at least 8 characters",
  })
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Password and password confirmation do not match",
})