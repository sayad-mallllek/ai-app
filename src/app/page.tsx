"use client";

import ChatLoader from "@/components/ChatLoader/chat-loader";
import FormInput from "@/components/FormInput";
import LogoIcon from "@/components/logo-icon";
import { useCompletion } from "ai/react";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion();

  const [markdown, setMarkdown] = useState();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    setInput("");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <ul className="mt-16 space-y-5 overflow-auto">
        <li className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
          <LogoIcon />

          <div className="space-y-3">
            <h2 className="font-medium text-gray-800 dark:text-white">
              How can we help?
            </h2>
            <div className="space-y-1.5">
              <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                You can ask questions like:
              </p>
              <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                <li className="text-sm text-gray-800 dark:text-white">
                  How many Starter Pages & Examples are there?
                </li>

                <li className="text-sm text-gray-800 dark:text-white">
                  Is there a PRO version?
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className="max-w-4xl min-h-12 py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
          {isLoading ? <ChatLoader /> : <LogoIcon />}
          <div className="space-y-3">
            {completion && <ReactMarkdown>{completion}</ReactMarkdown>}
          </div>
        </li>
      </ul>
      <footer className="sticky bottom-0 z-10 mt-auto bg-white border-t border-gray-200 pt-2 pb-3 sm:pt-4 sm:pb-6 dark:bg-slate-900 dark:border-gray-700">
        <FormInput
          formSubmit={formSubmit}
          handleInputChange={handleInputChange}
          input={input}
          stop={stop}
          isLoading={isLoading}
        />
      </footer>
    </div>
  );
}
