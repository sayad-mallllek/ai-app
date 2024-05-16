"use server";

import { setAuthTokens } from "@/utils/auth/token";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const supabase = createClient();

import { z } from "zod";
import { FormActionSubmitType } from "@/types/auth.type";

const signUpSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Invalid Email",
      })
      .email({
        message: "Invalid Email Format",
      }),
    password: z
      .string({
        invalid_type_error: "Invalid Password",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      }),
    confirmPassword: z
      .string({
        invalid_type_error: "Invalid Password",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function handleSignupSubmitForm(
  _: FormActionSubmitType<
    ["email", "password", "auth", "confirmPassword"]
  > | null | void,
  data: FormData
): Promise<
  | FormActionSubmitType<["email", "password", "auth", "confirmPassword"]>
  | undefined
> {
  "use server";

  const email = data.get("email")?.toString();
  const password = data.get("password")?.toString();
  const confirmPassword = data.get("confirmPassword")?.toString();

  const form = {
    email,
    password,
    confirmPassword,
  };

  const validatedFields = signUpSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      form,
    };
  }

  /* This is only done so typescript won't nag down */
  if (!email || !password)
    return {
      errors: {
        email: ["Email is required"],
        password: ["Password is required"],
      },
      form,
    };

  try {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "/",
      },
    });
    if (error) {
      return { errors: { auth: [String(error.message)] }, form };
    }
  } catch (error: any) {
    return { errors: { auth: [String(error.message)] }, form };
  }
  redirect("/signup/success");
}
