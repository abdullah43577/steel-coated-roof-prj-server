import { ZodError } from "zod";
import { Response } from "express";

interface IHandleErrors {
  res: Response;
  error: any;
}

export const handleErrors = function ({ res, error }: IHandleErrors) {
  //  if (error instanceof ZodError) {
  //    const errors = error.errors.map(err => ({
  //      field: err.path.join("."), // Converts ['user', 'email'] to 'user.email'
  //      message: err.message,
  //    }));
  //    return res.status(400).json({ message: "Validation error", errors });
  //  }

  // Generic/Unknown Error
  console.error("Unhandled error:", error);
  return res.status(500).json({
    message: typeof error === "string" ? error : "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? error : undefined,
  });
};
