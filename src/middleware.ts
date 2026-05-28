import { withAuth } from "next-auth/middleware";
 
import { NextResponse } from "next/server";
 
export default withAuth(
  function middleware(req) {
    console.log("middleware running");
    const token = req.nextauth.token;
 
    const pathname = req.nextUrl.pathname;
 
    // SUBJECTS → ADMIN ONLY
    if (
      pathname.startsWith("/subjects") &&
      token?.role !== "ADMIN"
    // !["ADMIN", "TEACHER"].includes(
    //     token?.role as string
    //   )
    ) {
      return NextResponse.redirect(
        new URL("/unauthorized", req.url)
      );
    }
 
    // LESSONS → ADMIN + TEACHER
    if (
      pathname.startsWith("/lessons") &&
      !["ADMIN", "TEACHER"].includes(
        token?.role as string
      )
    ) {
      return NextResponse.redirect(
        new URL("/unauthorized", req.url)
      );
    }
 
    // UNITS → ADMIN + TEACHER
    if (
      pathname.startsWith("/units") &&
      !["ADMIN", "TEACHER"].includes(
        token?.role as string
      )
    ) {
      return NextResponse.redirect(
        new URL("/unauthorized", req.url)
      );
    }
  },
 
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
 
    pages: {
      signIn: "/login",
    },
  }
);
 
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lessons/:path*",
    "/subjects/:path*",
    "/units/:path*",
  ],
};
 