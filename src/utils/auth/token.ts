"use server";

import { cookies } from "next/headers";

import { AuthTokenResponsePassword } from "@supabase/supabase-js";

export const setAuthTokens = (data: AuthTokenResponsePassword["data"]) => {
  if (!data.session) return console.error("No session data found");
  const cookieStore = cookies();
  cookieStore.set("accessToken", data.session.access_token, {
    httpOnly: true,
  });
  cookieStore.set("refreshToken", data.session.refresh_token, {
    httpOnly: true,
  });
  cookieStore.set("tokenType", data.session.token_type, {
    httpOnly: true,
  });
};
