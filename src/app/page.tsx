"use client";

import ChatLoader from "@/components/ChatLoader/chat-loader";
import FormInput from "@/components/FormInput";
import LogoIcon from "@/components/logo-icon";
import Message from "@/components/Message/message";
import SidebarIcon from "@/components/sidebar-icon";
import Sidebar from "@/components/Sidebar/sidebar";
import { createClient } from "@/utils/supabase/client";
import { useCompletion } from "ai/react";
import { useEffect } from "react";

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

  const testSupabase = async () => {
    const supabase = createClient();
    const { data: notes } = await supabase.from("notes").select();
  };

  useEffect(() => {
    testSupabase();
  }, []);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    setInput("");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Sidebar />
      <ul className="mt-16 space-y-5 overflow-auto">
        <Message completion={"How can we help you?"} />
        <Message completion={completion} isLoading={isLoading} />
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
