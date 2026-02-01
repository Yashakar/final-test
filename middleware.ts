
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This middleware protects all routes and extracts the tenantId from the session
export default authMiddleware({
  publicRoutes: ["/api/public"],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Redirect logged in users to organization selection if they don't have a tenant/org
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/org-selection") {
      // In a real app, you'd redirect to an org selection page
      // const orgSelection = new URL("/org-selection", req.url);
      // return NextResponse.redirect(orgSelection);
    }

    // Extract tenantId from metadata or orgId
    const tenantId = auth.orgId || auth.orgSlug || "default-tenant";
    
    // Add tenantId to headers so the app can use it for database filtering
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-tenant-id", tenantId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
