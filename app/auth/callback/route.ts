import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const error_description = requestUrl.searchParams.get("error_description");

  if (error) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${requestUrl.origin}/signin`,
        "Server Error",
        error_description ||
          "There was an error during the authentication process."
      )
    );
  }

  if (!code) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${requestUrl.origin}/signin`,
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
        `${requestUrl.origin}/signin`,
        exchangeError.name,
        "Sorry, we weren't able to log you in. Please try again."
      )
    );
  }

  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/unblur`,
      "success",
      "Success!",
      "You are now signed in. Happy unblurring!"
    )
  );
}
