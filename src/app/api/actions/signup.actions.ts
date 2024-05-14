"use server";

import { setAuthTokens } from "@/utils/auth/token";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const supabase = createClient();

import { z } from "zod";

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
  _: {
    errors: {
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
      auth?: string[];
    };
  } | null | void,
  data: FormData
): Promise<
  | {
      errors: {
        email?: string[];
        password?: string[];
        auth?: string[];
      };
    }
  | undefined
> {
  "use server";

  const email = data.get("email")?.toString();
  const password = data.get("password")?.toString();

  const validatedFields = signUpSchema.safeParse({
    email,
    password,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!email || !password)
    return {
      errors: {
        email: ["Email is required"],
        password: ["Password is required"],
      },
    };

  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { errors: { auth: [String(error.message)] } };
    } else {
      setAuthTokens(data);
    }
  } catch (error: any) {
    return { errors: { auth: [String(error.message)] } };
  }
  redirect("/");
}
