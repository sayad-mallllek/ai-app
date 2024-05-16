"use client";
import GoogleIcon from "@/components/google-icon";
import { FormActionSubmitType } from "@/types/auth.type";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleSignupSubmitForm } from "../api/actions/signup.actions";
import Input from "@/components/TextInput";
import Link from "next/link";

/* TO DO: Add Captcha */

const initalState: FormActionSubmitType<
  ["email", "password", "auth", "confirmPassword"]
> | null = null;

export default function Login() {
  const [state, formAction, pending] = useActionState(
    handleSignupSubmitForm,
    initalState
  );

  console.log(state);

  useEffect(() => {
    if (state?.errors.auth)
      toast(state?.errors?.auth?.join(", ") || "", {
        type: "error",
      });
  }, [state]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-slate-900">
      <div className="mt-7 max-w-[500px] grow bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign Up
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account yet?
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                href="/login"
              >
                Log in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              disabled={pending}
            >
              <GoogleIcon />
              Sign up with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>

            <form action={formAction}>
              <div className="grid gap-y-4">
                <Input
                  name="email"
                  id="email"
                  type="email"
                  required
                  aria-describedby="email-error"
                  errorMessage={state?.errors.email?.[0]}
                  label="Email address"
                />
                <Input
                  name="password"
                  id="hs-toggle-password"
                  type="password"
                  required
                  aria-describedby="password-error"
                  errorMessage={state?.errors.password?.[0]}
                  label="Password"
                />
                <Input
                  name="confirmPassword"
                  id="hs-toggle-confirm-password"
                  type="password"
                  required
                  aria-describedby="confirm-password-error"
                  errorMessage={state?.errors.confirmPassword?.[0]}
                  label="Cofirm Password"
                />

                <button
                  type="submit"
                  className="w-full mt-7 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={pending}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
