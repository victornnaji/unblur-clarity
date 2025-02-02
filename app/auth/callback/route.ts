import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { getErrorRedirect, getStatusRedirect, getURL } from "@/utils/helpers";
import { links } from "@/config";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const error_description = requestUrl.searchParams.get("error_description");
  const redirectTo =
    requestUrl.searchParams.get("redirectTo") || links.studio.path;

  if (error) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${getURL()}${links.auth.path}`,
        "Server Error",
        error_description ||
          "There was an error during the authentication process."
      )
    );
  }

  if (!code) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${getURL()}${links.auth.path}`,
        "Sign in process cancelled",
        "No authorization code was provided. Please try again"
      )
    );
  }

  const supabase = createClient();

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
    code
  );

  if (exchangeError) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${getURL()}${links.auth.path}`,
        exchangeError.name,
        "Sorry, we weren't able to log you in. Please try again."
      )
    );
  }

  return NextResponse.redirect(
    getStatusRedirect(
      `${getURL()}${decodeURIComponent(redirectTo)}`,
      "success",
      "Success!",
      "You are now signed in. Happy unblurring!"
    )
  );
}
