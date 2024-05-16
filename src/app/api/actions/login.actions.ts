"use server";

import { setAuthTokens } from "@/utils/auth/token";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const supabase = createClient();

import { z } from "zod";
import { FormActionSubmitType } from "@/types/auth.type";

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
  _: FormActionSubmitType<["email", "password", "auth"]> | null | void,
  data: FormData
): Promise<FormActionSubmitType<["email", "password", "auth"]> | undefined> {
  "use server";

  const email = data.get("email")?.toString();
  const password = data.get("password")?.toString();

  const validatedFields = loginSchema.safeParse({
    email,
    password,
  });

  const form = {
    email,
    password,
  };

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
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { errors: { auth: [String(error.message)] }, form };
    } else {
      setAuthTokens(data);
    }
  } catch (error: any) {
    return { errors: { auth: [String(error.message)] }, form };
  }
  redirect("/");
}
