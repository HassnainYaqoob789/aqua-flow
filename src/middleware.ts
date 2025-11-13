import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userData = true; // Hard-coded false for testing (change to true to test logged-in case)
    console.error("Middleware triggered - Path:", pathname, "User Data:", userData); // Debug log
    if (userData) {
        // Simulate user logged in
        if (pathname === "/signin" || pathname === "/signup") {
            console.error("Redirecting to / because user is logged in");
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        // Simulate user not logged in
        if (pathname !== "/signin" && pathname !== "/signup") {
            console.error("Redirecting to /signin because user is not logged in");
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }
    console.error("Allowing request to proceed");
    return NextResponse.next();
}
export const config = {
    matcher: [
        "/",
        "/profile",
        "/signin",
        "/signup",
        "/calendar",
        "/form-elements",
        "/basic-tables",
        "/blank",
        "/error-404",
        "/line-chart",
        "/bar-chart",
        "/alerts",
        "/avatars",
        "/badge",
        "/buttons",
        "/images",
        "/videos",
    ],
};