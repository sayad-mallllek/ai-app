import { DetailedHTMLProps, InputHTMLAttributes } from "react";

const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { errorMessage?: string; label?: string }
) => {
  return props.type === "password" ? (
    <div>
      <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
        {props.label}
      </label>
      <div className="relative">
        <input
          className="py-3 px-4 block w-full border-gray-600 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 outline-none"
          {...props}
        />
        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
          <svg
            className="size-5 text-red-500"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
        </div>
      </div>
      <p
        className="hidden text-xs text-red-600 mt-2"
        id={props["aria-describedby"]}
      >
        {props.errorMessage}
      </p>
    </div>
  ) : (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor="password"
          className="block text-sm mb-2 dark:text-white"
        >
          {props.label || "Password"}
        </label>
        <a
          className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
          href="../examples/html/recover-account.html"
        >
          Forgot password?
        </a>
      </div>
      <div className="relative">
        <input
          type="password"
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          {...props}
        />
        <button
          className="absolute top-0 end-0 p-3.5 rounded-e-md"
          type="button"
          data-hs-toggle-password={`{
      "target": "#${props["aria-describedby"]}"
    }`}
        >
          <svg
            className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className={`${props["aria-describedby"]}:hidden`}
              d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
            ></path>
            <path
              className={`${props["aria-describedby"]}:hidden`}
              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
            ></path>
            <path
              className={`${props["aria-describedby"]}:hidden`}
              d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
            ></path>
            <line
              className={`${props["aria-describedby"]}:hidden`}
              x1="2"
              x2="22"
              y1="2"
              y2="22"
            ></line>
            <path
              className={`hidden ${props["aria-describedby"]}:block`}
              d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
            ></path>
            <circle
              className={`hidden ${props["aria-describedby"]}:block`}
              cx="12"
              cy="12"
              r="3"
            ></circle>
          </svg>
        </button>
      </div>
      <p className="hidden text-xs text-red-600 mt-2" id="password-error">
        8+ characters required
      </p>
    </div>
  );
};

export default Input;
