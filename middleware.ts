import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createStripePortal } from "./utils/stripe/admin";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/unblur") {
    const redirectUrl = new URL("/unblur/studio", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // if (request.nextUrl.pathname === "/account") {
  //   const url = await createStripePortal("/unblur");
  //   return NextResponse.redirect(url);
  // }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/account",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
