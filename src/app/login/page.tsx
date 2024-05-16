"use client";
import GoogleIcon from "@/components/google-icon";
import Input from "@/components/TextInput";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { handleLoginSubmitForm } from "../api/actions/login.actions";
import { toast } from "react-toastify";
import { FormActionSubmitType } from "@/types/auth.type";
import Link from "next/link";

const initalState: FormActionSubmitType<["email", "password", "auth"]> | null =
  null;

export default function Login() {
  const [state, formAction, pending] = useActionState(
    handleLoginSubmitForm,
    initalState
  );

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
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don't have an account yet?
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                href="/signup"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <GoogleIcon />
              Log in with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>

            <form
              onSubmit={
                pending
                  ? (event) => {
                      event.preventDefault();
                    }
                  : undefined
              }
              action={formAction}
            >
              <div className="grid gap-y-4">
                <Input
                  name="email"
                  id="email"
                  type="email"
                  required
                  aria-describedby="email-error"
                  errorMessage={state?.errors.email?.[0]}
                  label="Email address"
                  defaultValue={state?.form?.email}
                />
                <Input
                  name="password"
                  id="hs-toggle-password"
                  type="password"
                  required
                  aria-describedby="password-error"
                  errorMessage={state?.errors.password?.[0]}
                  label="Password"
                  defaultValue={state?.form?.password}
                />
                <button
                  type="submit"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  disabled={pending}
                  className="w-full mt-7 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
