"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

import { z } from "zod";

const signUpSchema = z.object({
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
});

const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email({
      message: "Invalid Email Format",
    }),
  password: z.string({
    invalid_type_error: "Invalid Password",
  }),
});

export async function handleLoginSubmitForm(
  _: {
    errors: {
      email?: string[];
      password?: string[];
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

  const validatedFields = loginSchema.safeParse({
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
      console.log("Signed in successfully", data);
    }
  } catch (error: any) {
    return { errors: { auth: [String(error.message)] } };
  }
}
