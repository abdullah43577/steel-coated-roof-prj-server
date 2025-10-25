import z from "zod";

export const contactFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_no: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  roof_type: z.string().min(1, "Roof type is required"),
  project_type: z.string().min(1, "Project type is required"),
  message: z.string().optional(),
  code: z.string().min(6, "Verification code must be 6 digits"),
});
