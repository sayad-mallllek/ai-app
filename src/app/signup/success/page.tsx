"use server";

import SuccessCheckIcon from "@/components/success-check-icon";

export default async function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-slate-900">
      <div className="relative mt-7 max-w-[500px] grow bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="absolute -top-6 -left-6 rounded-full ">
          <SuccessCheckIcon className="fill-green-400 h-12 w-12 " />
        </div>
        <div className="p-4 md:p-7">
          <h3 className="font-bold text-3xl text-center mb-4 md:mb-8">
            Verification link sent{" "}
          </h3>
          <p className="text-center text-gray-200">
            A link has been sent to your email. Please click on the link to
            verify your email address. You will be redirected to the main page
            afterwards.
          </p>
          <p className="text-center mt-7 text-gray-300">
            You may close this window
          </p>
        </div>
      </div>
    </div>
  );
}
