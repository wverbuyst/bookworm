import { z } from "zod";

export const validationSchemaSignIn = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const validationSchemaSignUp = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().regex(/^\+\d{11}$/),
  email: z.string().email().min(1, { message: "Email is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  library: z.string().min(1, { message: "Library is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormFieldsSignIn = z.infer<typeof validationSchemaSignIn>;
export type FormfieldsSignUp = z.infer<typeof validationSchemaSignUp>;

export const defaultValuesSignIn: FormFieldsSignIn = {
  email: "",
  password: "",
};

export const defaultValuesSignUp: FormfieldsSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  country: "",
  library: "",
  password: "",
};
